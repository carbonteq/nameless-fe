"use client";
import { forgotPasswordSchema, signInSchema } from "@/components/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/slices/authSlice";
import InputField from "@/components/inputfield";
import { userService } from "../services/userService";


export default function SignIn() {

  const dispatch = useDispatch();
  const router = useRouter();
  //const userId = useSelector((state: any) => state.auth.userId);

  // if (userId) {
  //   router.push("/");
  // }

  const func = () => {
    router.push('/')
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const [forgot, setForgot] = useState(false)


  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // ZOD Validation
    const result = signInSchema.safeParse({ email, password });

    if (!result.success) {
      const formErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: formErrors.email?.[0],
        password: formErrors.password?.[0],
      });
      return;
    }
    setErrors({});

    // Sending POST Request to the server for login

    await userService.loginService(email, password, dispatch, setUserId, func)

  };

  const handleForgotPassword = () => {
    setForgot(true)
  }

  const handlePasswordSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // ZOD Validation
    const result = forgotPasswordSchema.safeParse({ email });

    if (!result.success) {
      const formErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: formErrors.email?.[0],
      });
      return;
    }
    setErrors({});

    // Sending POST Request to the server for login

    await userService.forgotPasswordService(email, func)
  }

  return (
    <div className="flex items-center justify-center">

      {!forgot && (
        <form onSubmit={handleSubmit}>
          <Card className="w-[400px] shadow-lg pt-2 mt-16 bg-gray-100 bg-opacity-95 dark:bg-gray-900 dark:bg-opacity-95">
            <CardHeader>
              <CardTitle className="text-center">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <InputField
                  label="Email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  error={errors.email}
                />
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
                Sign In
              </Button>
              <br />
              <div>
                <span>Don't have an account? </span>
                <Link href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </div>
              <div
                onClick={handleForgotPassword}
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </div>
            </CardFooter>
          </Card>
        </form>
      )}

      {forgot && (
        <form onSubmit={handlePasswordSubmit}>
          <Card className="w-[400px] shadow-lg pt-2 mt-16 bg-gray-100 bg-opacity-95 dark:bg-gray-900 dark:bg-opacity-95">
            <CardHeader>
              <CardTitle className="text-center">Password Reset Request</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <InputField
                  label="Email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  error={errors.email}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <Button className="w-full mb-2" type="submit">
                Send Request
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}



    </div>
  );
}
