import { z } from "zod";

export const updateUserSchema = z
    .object({
        name: z.string().min(2, "Name is required"),
        email: z.email("Invalid email"),
        password: z.string().min(6, "Password must have at least 6 characters").optional().or(z.literal("")),
        confirmPassword: z.string().optional().or(z.literal("")),
    })
    .refine(
        (data) => {
            if (!data.password && !data.confirmPassword) return true;
            return data.password === data.confirmPassword;
        },
        {
            message: "Password does not match",
            path: ["confirmPassword"],
        }
    );

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
