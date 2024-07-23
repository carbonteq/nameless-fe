import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z
        .string()
        .min(6, "Incorrect Password")
        .min(1, "Password is required"),
});

export const signUpSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .min(1, "Password is required"),
});