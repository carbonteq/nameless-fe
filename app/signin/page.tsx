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
        <Card className="w-[400px] shadow-lg pt-2 mt-16">
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
              <a href="#" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </div>
            <a href="#" className="text-blue-500 hover:underline mb-2">
              Forgot Password?
            </a>
          </CardFooter>
        </Card>
      </form>
    </div>
  );

}
