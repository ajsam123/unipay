import  { z } from "zod"

export const bankDetailsSchema = z.object({
  bankCode: z.string().min(1, "Please select a bank"),

  accountNumber: z
    .string()
    .trim()
    .refine((val) => /^\d{10}$/.test(val), {
      message: "Account number must be exactly 10 digits",
    }),
});
