import { WebhookEvent } from "@clerk/express";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { Webhook } from "svix";

import { db } from "../config/db";
import { users } from "../schemas/user.schema";
import { asyncHandler } from "../utils/async-handler";

export const syncUserData = asyncHandler(
  async (req: Request, res: Response) => {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;

    if (!SIGNING_SECRET) {
      throw new Error(
        "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env",
      );
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers and body
    const headers = req.headers;
    const payload = req.body;

    // Get Svix headers for verification
    const svix_id = headers["svix-id"] as string | undefined;
    const svix_timestamp = headers["svix-timestamp"] as string | undefined;
    const svix_signature = headers["svix-signature"] as string | undefined;

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      res.status(400).json({
        success: false,
        message: "Error: Missing svix headers",
      });
      return;
    }

    let evt: WebhookEvent;

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If verification fails, error out and return error code
    try {
      evt = wh.verify(JSON.stringify(payload), {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err: any) {
      console.log("Error: Could not verify webhook:", err.message);
      res.status(400).json({
        success: false,
        message: err.message,
      });
      return;
    }

    const { id } = evt.data;
    const eventType = evt.type;

    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );

    if (eventType === "user.created") {
      const { id, email_addresses, image_url, first_name, last_name } =
        evt.data;

      const user = {
        id,
        email: email_addresses[0].email_address,
        firstName: first_name || "",
        lastName: last_name || "",
        photo: image_url,
      };
      try {
        await db.insert(users).values(user);
        return res.status(200).json({ message: "New user created" });
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }

    if (eventType === "user.updated") {
      const { id, email_addresses, image_url, first_name, last_name } =
        evt.data;

      const user = {
        email: email_addresses[0].email_address,
        firstName: first_name || "",
        lastName: last_name || "",
        photo: image_url,
      };

      try {
        await db.update(users).set(user).where(eq(users.id, id));
        return res.status(200).json({ message: "User Updated Successfully" });
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }

    if (eventType === "user.deleted") {
      const { id, deleted } = evt.data;
      if (id && deleted) {
        try {
          await db.delete(users).where(eq(users.id, id));
          return res.status(200).json({ message: "User Deleted Successfully" });
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  },
);
