import { registerSchema } from "@/schemas/register.schema";
import z from "zod";

export type RegisterSchemaType = z.infer<typeof registerSchema>;
