import { loginSchema } from "@/schemas/login.schema";
import z from "zod";

export type loginSchemaType = z.infer<typeof loginSchema>;
