"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { signInSchema } from "@/components/schema";
import { useRouter } from "next/navigation";
import InputField from "@/components/inputfield";
import { userService } from "../services/userService";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/slices/authSlice";


export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});
    const router = useRouter();
    const dispatch = useDispatch();

    const onSuccess = () => {
        router.push('/')
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // ZOD Validation
        const result = signInSchema.safeParse({ email, password, username });

        if (result.success === false) {
            const formErrors = result.error.flatten().fieldErrors;
            setErrors({
                email: formErrors.email?.[0],
                password: formErrors.password?.[0],
            });

            return;
        }
        setErrors({});

        await userService.signUpService(username, email, password, dispatch, setUserId, onSuccess)
    };

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit}>
                <Card className="w-[400px] shadow-lg pt-2 mt-16 bg-gray-100 bg-opacity-95 dark:bg-gray-900 dark:bg-opacity-95">
                    <CardHeader>
                        <CardTitle className="text-center">Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <InputField
                                label="Username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                            <InputField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                error={errors.email}
                            />
                            <InputField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                error={errors.password}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center">
                        <Button className="w-full mb-2" type="submit">
                            Sign Up
                        </Button>
                        <br />
                        <div>
                            <span>Already have an account? </span>
                            <Link href="/signin" className="text-blue-500 hover:underline">
                                Sign In
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}