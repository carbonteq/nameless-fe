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
import { Input } from "@/components/ui/input";
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
    <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 60px)"}}>
      <form onSubmit={handleSubmit}>
        <Card className="w-[400px] shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
            {/* <CardDescription>Sign In with great ease</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
                <InputField label="Email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                <InputField label="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>
          </CardContent>
          <CardFooter >
            <Button type="submit">Sign In</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
