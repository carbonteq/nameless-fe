"use client"
import { useEffect } from 'react';
import InputField from "@/components/inputfield";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from 'react';
import { resetPasswordSchema } from '@/components/schema';
import { usePathname, useRouter } from 'next/navigation';
import resetPasswordService from '@/app/services/resetPassword';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ password?: string }>(
        {},
    );

    const pathname = usePathname();
    console.log(pathname)
    let path = pathname.split('/signin/')[1];
    console.log(path);

    const router = useRouter();

    const func = () => {
        router.push('/')
    }

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        console.log("Hello")
        // const result = resetPasswordSchema.safeParse({ password });

        // if (!result.success) {
        //     const formErrors = result.error.flatten().fieldErrors;
        //     setErrors({
        //         password: formErrors.password?.[0],
        //     });
        //     return;
        // }
        // setErrors({});

        await resetPasswordService(password, path, func)
    };

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit}>
                <Card className="w-[400px] shadow-lg pt-2 mt-16 bg-gray-100 bg-opacity-95 dark:bg-gray-900 dark:bg-opacity-95">
                    <CardHeader>
                        <CardTitle className="text-center">Set New Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <InputField
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                error={errors.password}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center">
                        <Button className="w-full mb-2" type="submit">
                            Reset
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default ResetPassword;
