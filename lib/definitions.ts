import { z } from "zod";

export const loginFormSchema = z.object({
    name: z.string().min(3, { message: 'Name should be at least 3 characters long' }).trim(),
    password: z.string().min(8, { message: 'Password should be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Password should contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Password should contain at least one number.' })
    .trim()
});

export type LoginState = z.infer<typeof loginFormSchema>;