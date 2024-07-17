"use client";
import { Button, Input } from "@nextui-org/react";
import type React from "react";
import { useState } from "react";

const SignInPage: React.FC = () => {
  const [username_email, setUsername_Email] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ username_email, password });
  };

  return (
    <div className="outer-container">
      <div className="container">
        <h1 className="title">Sign In</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <Input
              type="email"
              value={username_email}
              onChange={(e) => setUsername_Email(e.target.value)}
              placeholder="Enter your username/email"
              fullWidth
              required
            />
          </div>
          <div className="input-group">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              fullWidth
              required
            />
          </div>
          <Button type="submit" fullWidth>
            Sign In
          </Button>
        </form>
      </div>
      <style jsx>{`
        .outer-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80vh; /* Increased height */
        }
        .container {
          width: 90%;
          max-width: 500px;
          padding: 100px; /* Increased padding */
          background-color: white;
          box-shadow: 0 7px 78px 8px rgba(0, 0, 0, 0.1);
          border-radius: 0px;
        }
        .title {
          text-align: center;
          margin-bottom: 90px;
          position: relative;
        }
        .title::after {
          content: "";
          display: block;
          width: 100%;
          height: 2px;
          background-color: #000;
          margin: 10px auto 0;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      `}</style>
    </div>
  );
};

export default SignInPage;
