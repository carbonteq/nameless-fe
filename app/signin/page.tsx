"use client";
import InputField from "@/components/inputfield";
import { ThemeColour } from "@/components/primitives";
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

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log({
      email: email,
      password: password
    })
  };

  return (
    <div className="flex items-center justify-center" >
      <form onSubmit={handleSubmit}>
        {/* We can apply the same navbar colour to our card through ThemeColor from primitives.tsx */}
        <Card className={`w-[400px] shadow-lg pt-2 mt-16 dark:bg-gray-900 `}>
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
              Sign In
            </Button>
            <br />

            <div>
              <text>Don't have an account? </text>
              <Link href="/signup"
                className="text-blue-500 hover:underline">Sign Up
              </Link>
            </div>
            <Link href="/forgotpassword"
              className="text-blue-500 hover:underline">Forgot Password?
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );

}
