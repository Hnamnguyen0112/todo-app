import { z } from "zod";

export const CreateColumnSchema = z.object({
  name: z.string().min(1),
  position: z.number().int().min(0),
});

export const UpdateColumnSchema = z.object({
  name: z.string().min(1),
  position: z.number().int().min(0),
});
