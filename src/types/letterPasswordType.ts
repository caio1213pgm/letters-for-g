import { letterPasswordSchema } from "@/schemas/letterPassword.schema";
import z from "zod";

export type LetterPasswordSchemaType = z.infer<typeof letterPasswordSchema>;
