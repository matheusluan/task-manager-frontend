import { z } from 'zod';

export const registerSchema = z
    .object({
        name: z.string().min(2, 'Name is required'),
        email: z.email('Invalid email'),
        password: z.string().min(6, 'Password must have 6 digits'),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password does not match',
        path: ['confirmPassword'],
    });

export type RegisterSchema = z.infer<typeof registerSchema>;
