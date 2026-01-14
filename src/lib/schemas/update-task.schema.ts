import { z } from "zod";

export const updateTaskSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
    status: z.enum(["PENDING", "IN_PROGRESS", "DONE"], { message: "Status is required" }),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"], { message: "Priority is required" }),
    dueDate: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), { message: "Invalid date format" }),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
