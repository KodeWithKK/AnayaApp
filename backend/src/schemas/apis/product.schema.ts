import * as z from "zod";

export const brandApiBody = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const productApiBody = z.object({
  name: z.string(),
  mrp: z.number(),
  manufacturer: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  baseColour: z.string().optional(),
  brandId: z.number(),
  description: z.string().optional(),
  materialAndCare: z.string().optional(),
  specifications: z.record(z.string()).optional(),
  createdAt: z.string().optional(),
});
