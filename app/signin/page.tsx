"use client";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/components/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const dispatch = useDispatch();
  const router = useRouter();

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
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User created successfully:", result);
        toast({
          title: "Success",
          description: "Successfully Signed In",
        });
        const decodedToken = Jwt.decode(result.token);
        //console.log("DECODED TOKEN = ", decodedToken)
        if (decodedToken && typeof decodedToken === 'object' && 'userId' in decodedToken.data) {
          console.log("User ID:", decodedToken.data.userId);
          dispatch(setUserId(decodedToken.data.userId));
        } else {
          console.error("Invalid token");
        }
        router.push("/");
      } else {
        const errorText = await response.text();
        //console.error("Error Signing In the User:", errorText);
      }
    } catch (error) {
      console.error("Network error:", error);

    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <Card className="w-[400px] shadow-lg pt-2 mt-16 bg-[#b0b0b0] dark:bg-gray-900">
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
