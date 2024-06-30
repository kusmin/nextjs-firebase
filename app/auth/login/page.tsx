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
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase/config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async () => {
    setLoading(true);
    // try {
    //   const res = await signInWithEmailAndPassword(email, password);
    //   console.log({ res });
    //   sessionStorage.setItem("user", "");
    //   res?.user.email ? router.push("/") : setError("Something went wrong");
    // } catch (e) {
    //   console.error(e);
    // }
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      sessionStorage.setItem("user", data.idToken);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <LoadingButton
          loading={loading}
          className="w-full"
          type="submit"
          onClick={handleSignIn}
        >
          Sign in
        </LoadingButton>
        <p>
          Don&apos;t have an account? &nbsp;
          <Link href="/auth/register" className="underline">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
export default LoginPage;
