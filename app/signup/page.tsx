"use client";
import InputField from "@/components/inputfield";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { signInSchema } from "@/components/schema";
import { toast } from "@/components/ui/use-toast";
import router from "next/router";


export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [signedIn, setSignedIn] = useState(false)
    const [errors, setErrors] = useState<{ email?: string, password?: string, username?: string }>({});


    const handleSubmit = async (event: { preventDefault: () => void; }) => {

        event.preventDefault();
        const result = signInSchema.safeParse({ email, password, username });
        if (!result.success) {
            const formErrors = result.error.flatten().fieldErrors;
            setErrors({
                email: formErrors.email?.[0],
                password: formErrors.password?.[0],
                username: formErrors.password?.[0]
            });
            toast({
                title: "Disclaimer",
                description: "Invalid Credentials",
            })
            return
        }

        try {
            const response = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                const result = await response.json();
                toast({
                    title: "WO-HOO",
                    description: "Account Created",
                })
                setPassword('')
                setEmail('')
                setUsername('')
                setSignedIn(true)
            } else {
                console.error('Error creating user:', response.statusText);
                toast({
                    title: "Disclaimer",
                    description: response.statusText,
                })
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center" >
            <form onSubmit={handleSubmit}>
                <Card className="w-[400px] shadow-lg pt-2 mt-16 bg-[#b0b0b0] dark:bg-gray-900">
                    <CardHeader>
                        <CardTitle className="text-center">Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <InputField
                                label="Username"
                                value={username}
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                            <InputField
                                label="Email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                            <InputField
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>

                    </CardContent>

                    <CardFooter className="flex flex-col items-center">
                        <Button className="w-full mb-2" type="submit">
                            Sign Up
                        </Button>
                        <br />

                        <div>
                            <text>Already have an account? </text>
                            <Link href="/signin"
                                className="text-blue-500 hover:underline">Sign In
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );

}
