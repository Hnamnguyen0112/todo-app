import { z } from "zod";

export const CreateTaskSchema = z.object({
  columnId: z.string().min(1),
  assigneeId: z.string().nullable(),
  position: z.number().int().min(0),
  title: z.string().min(1),
  description: z.string().nullable(),
  dueDate: z.number().nullable(),
  priority: z.number().int().min(0),
});
