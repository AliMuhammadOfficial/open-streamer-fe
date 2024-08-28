import type { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export const metadata: Metadata = {
  title: "Reset Password - Open Streamer",
  description: "Reset your password on Open Streamer",
};

export default function ResetPassword() {
  return (
    <div className="w-full lg:grid min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your new password below
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Reset password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}