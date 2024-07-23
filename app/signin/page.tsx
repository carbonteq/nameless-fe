"use client";
import { signInSchema } from "@/components/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Jwt from "jsonwebtoken"
import { setUserId } from "../redux/slices/authSlice";
import InputField from "@/components/inputfield";
import { useSelector } from "react-redux";
import extractToken from "../token";
import loginService from "../services/login";


export default function SignIn() {

  const dispatch = useDispatch();
  const router = useRouter();
  //const userId = useSelector((state: any) => state.auth.userId);

  // if (userId) {
  //   router.push("/");
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );


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

    const loginEmail = email
    const loginPassword = password
    const response = await loginService(loginEmail, loginPassword, dispatch, setUserId)
    if (response.ok) {
      router.push('/')
    }
    // if (response.ok) {
    //     const result = await response.json();
    //     console.log("User created successfully:", result);
    //     toast({
    //       title: "Success",
    //       description: "Successfully Signed In",
    //     });

    //     //Saving the token to Browser's Local Storage
    //     localStorage.setItem("jwtToken", result.token);

    //     dispatch(setUserId(extractToken(result.token)))
    //     router.push('/')

    //   } else {
    //     const errorText = await response.text();
    //   }
    // } catch (error) {
    //   console.error("Network error:", error);
    // }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <Card className="w-[400px] shadow-lg pt-2 mt-16 bg-gray-100 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50">
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
            <Link
              href="/forgotpassword"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
