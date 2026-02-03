import { z } from "zod";

export const onboardingSchema = z.object({
  university: z.string().min(1, "University is required"),
  matricNo: z.string().min(1, "Matric number is required"),
  faculty: z.string().min(1, "Faculty is required"),
  department: z.string().min(1, "Department is required"),
  idCardUrl: z.instanceof(File, { message: "School ID is required" }),
});
