import { z } from "zod";

// Helper function to parse a string to a number
const parseNumber = (val: any) => {
  const parsed = Number.parseFloat(val);
  return isNaN(parsed) ? undefined : parsed;
};

export const reportPersonFormSchema = z.object({
  fullname: z.string().min(1, "Name is required").max(100, "Name is too long"),

  gender: z.enum(["Male", "Female", "Other"]),

  age: z.preprocess(
    parseNumber,
    z
      .number()
      .nonnegative("Age must be a positive number")
      .lt(120, "Age must be less than 120")
      .refine((val) => val !== undefined, "Age is required"),
  ),

  describe_appearance: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description is too long"),

  last_seen_location: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(200, "Location is too long"),

  follow_up_name: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name is too long"),

  follow_up_phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone number must contain 10 digits"),

  follow_up_email: z
    .string()
    .min(1, "Email is Required")
    .email("Invalid Email"),

  follow_up_address: z
    .string()
    .min(1, "Address is Required")
    .max(200, "Address is too long"),

  file: z
    .object({
      uri: z.string(),
      name: z.string(),
      type: z.string().optional(),
    })
    .refine((val) => val.uri && val.name, "Lost person image is requried"),
});

export type IReportPersonForm = z.infer<typeof reportPersonFormSchema>;
