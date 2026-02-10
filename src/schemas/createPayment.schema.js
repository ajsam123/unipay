import { z } from "zod";

export const createPaymentLinkSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(val) && Number(val) > 0, {
      message: "Amount must be a valid number",
    }),

  description: z.string().optional(),
});
