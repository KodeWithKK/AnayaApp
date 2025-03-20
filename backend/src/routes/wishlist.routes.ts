import { requireAuth } from "@clerk/express";
import { Router } from "express";

import {
  getAllWishlists,
  toggleWishlist,
} from "../controller/wishlist.controller";

const router = Router();

router.get("/all", requireAuth(), getAllWishlists);
router.post("/toggle/:productId", requireAuth(), toggleWishlist);

export default router;
