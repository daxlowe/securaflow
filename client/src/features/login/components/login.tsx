"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLogin } from '@/hooks/useLogin';
import { useState } from "react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Login({ className, ...props }: UserAuthFormProps) {
    const { login, isLoading } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        
        await login(email, password);
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={onSubmit}>
            <div className="grid gap-2">
            <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                Email
                </Label>
                <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                Password
                </Label>
                <Input
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button disabled={isLoading}>
                {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Log In
            </Button>
            </div>
        </form>
        </div>
    )
}