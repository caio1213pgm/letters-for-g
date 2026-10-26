import { unlockLetterSchema } from "@/schemas/unlockLetter.schema";
import z from "zod";

export type UnlockLetterSchemaType = z.infer<typeof unlockLetterSchema>;
