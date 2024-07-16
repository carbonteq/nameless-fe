"use client";
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
  const [username_email, setUsername_Email] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log({
        email: username_email,
        password: password
    })
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 60px)", paddingTop: "40px" }}>
      <form onSubmit={handleSubmit}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            {/* <CardDescription>Sign In with great ease</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <h1>Email</h1>
                <Input
                  type="email"
                  value={username_email}
                  onChange={(e) => setUsername_Email(e.target.value)}
                  placeholder="Enter your username/email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <h1>Password</h1>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Sign In</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
