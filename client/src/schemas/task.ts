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

export const DeleteTaskSchema = z.object({
  columnId: z.string().min(1),
});

export const UpdateTaskSchema = z.object({
  columnId: z.string().min(1),
  assigneeId: z.string().nullable(),
  title: z.string().min(1),
  description: z.string().nullable(),
  dueDate: z.number().nullable(),
  priority: z.number().int().min(0).nullable(),
});

export const ChangeTaskStatusSchema = z.object({
  columnId: z.string().min(1),
  position: z.number().int().min(0),
});
