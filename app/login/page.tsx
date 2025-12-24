"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Simulate a request while keeping the UI responsive
    setTimeout(() => {
      setLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12 lg:flex-row lg:items-center">
    

        <Card className="w-full max-w-md border-primary/10 bg-card/90 shadow-lg shadow-primary/10 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Sign in</CardTitle>
        
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  minLength={8}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <label className="flex items-center gap-2 font-medium">
                  <Checkbox id="remember" name="remember" />
                  <span className="leading-none">Remember me</span>
                </label>
                <span className="text-xs">SSO enabled</span>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing you in..." : "Sign in"}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                asChild
              >
                <Link href="/">Return to catalog</Link>
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex justify-center gap-2">
              <span>New here?</span>
              <Link
                href="#"
                className="font-medium text-primary hover:text-primary/80"
              >
                Request access
              </Link>
            </div>
            <p className="text-center text-xs leading-relaxed">
              By continuing you agree to our acceptable use policy and
              acknowledge our security practices keep your checkout data
              encrypted end-to-end.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
