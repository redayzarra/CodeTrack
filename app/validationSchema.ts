import { z } from "zod";

// Zod schema for validation
export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Description is required"),
  description: z.string().min(1),
});
