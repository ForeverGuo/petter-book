"use client"

import { cn } from "components/lib/utils"
import { Button } from "components/ui/button"
import { Card, CardContent } from "components/ui/card"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import Image from 'next/image'
import { signIn } from "next-auth/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons"
 
import { LoginFormProps } from "./login.type"
export function LoginForm({
  className,
  formData,
  onUpdate,
  onSubmit
}: LoginFormProps) {
  const handleLogin = async () => {
    try {
      const res = await signIn("google");
      console.log(res, "====================")
    } catch (error) {
      console.error("登录失败:", error);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your book reading
                </p>
              </div>
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="please input username"
                  onChange={(e) => onUpdate('username', e.target.value)}
                  value={formData.username}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required
                  value={formData.password}
                  placeholder="please input password"
                  onChange={(e) => onUpdate('password', e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full mt-3"
              >
                Login
              </Button>
              </form>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="w-full cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="94 97.5 192.1 185">
                    <path d="m282.8 170.7-.2-.7-26.2-68.2a6.8 6.8 0 0 0-2.7-3.2 7 7 0 0 0-8 .4 7 7 0 0 0-2.3 3.5l-17.6 54h-71.5l-17.7-54a6.9 6.9 0 0 0-2.3-3.5 7 7 0 0 0-8-.4 6.9 6.9 0 0 0-2.7 3.2L97.4 170l-.2.7a48.5 48.5 0 0 0 16 56l.2.2.2.1 39.8 29.8 19.7 15 12 9a8 8 0 0 0 9.8 0l12-9 19.7-15 40-30h.1a48.6 48.6 0 0 0 16.1-56Z" fill="currentColor"/>
                    <path d="m282.8 170.7-.2-.7a88.3 88.3 0 0 0-35.2 15.8L190 229.2a53007 53007 0 0 0 36.6 27.7l40-30h.1a48.6 48.6 0 0 0 16.1-56.2Z" fill="currentColor"/>
                    <path d="m153.4 256.9 19.7 14.9 12 9a8 8 0 0 0 9.8 0l12-9 19.7-15-36.6-27.6-36.6 27.7Z" fill="currentColor"/>
                    <path d="M132.6 185.8A88.2 88.2 0 0 0 97.4 170l-.2.7a48.5 48.5 0 0 0 16 56l.2.2.2.1 39.8 29.8 36.6-27.6Z" fill="currentColor"/>
                  </svg>
                  <span className="sr-only">Login with GitLab</span>
                </Button>
                <Button variant="outline" className="w-full cursor-pointer" onClick={() => handleLogin()}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" className="w-full cursor-pointer" onClick={() => signIn("github", { callbackUrl: "/home" })}>
                  <GitHubLogoIcon />
                  <span className="sr-only">Login with GitHub</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </div>
          <div className="relative hidden bg-muted md:block">
            <Image
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
              src="/images/logo.png"
              width={300}
              height={300}
              alt="Image"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
