"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import login from "@/lib/action/login";
import { LoaderCircle } from "lucide-react";

const SubmitButton = () => {
  const {pending} = useFormStatus()
  return <Button className="cursor-pointer">
     {pending ?

     <div className="flex items-center gap-2">
       <LoaderCircle className="animate-spin"/>
       <span>Please wait</span>
     </div>
     
      : 'login'}
  </Button>
}

const initialState = {
  type: '',
  message: ''
};

const Login = () => {
  const [state, formAction] = useFormState(login, initialState);
  if(state.type === 'success'){
    window.location.href = '/'
  }
  useEffect(() => {
    if (state?.type === "success") {
      fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
      });
    }
  }, [state]);

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <p aria-live="polite" className={`${state.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>{state.message}</p>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
           

          <SubmitButton state={state}/>

            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/login-image.webp"
          width={1920}
          height={1080}
          style={{ objectFit: "cover" }}
          alt="Image"
          className="h-screen"
        />
      </div>
    </div>
  );
};

export default Login;
