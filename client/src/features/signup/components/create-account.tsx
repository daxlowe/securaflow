"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSignup } from '@/hooks/useSignup';
import { useState } from "react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CreateAccount({ className, ...props }: UserAuthFormProps) {
    const { signup, isLoading, error } = useSignup();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();

        await signup(firstName, lastName, email, password);
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={onSubmit}>
            <div className="grid gap-2">
            <div className="grid gap-1">
                <Label className="sr-only" htmlFor="firstName">
                First Name*
                </Label>
                <Input
                id="firstName"
                placeholder="First Name*"
                type="name"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="grid gap-1">
                <Label className="sr-only" htmlFor="lastName">
                Last Name*
                </Label>
                <Input
                id="lastName"
                placeholder="Last Name*"
                type="name"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="grid gap-1">
                <Label className="sr-only">
                Email*
                </Label>
                <Input
                id="email"
                placeholder="name@example.com*"
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                Password*
                </Label>
                <Input
                id="password"
                placeholder="Password*"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
                />
                <p className="px-1 text-right text-sm text-muted-foreground">
                * Required
                </p>

                <p className="px-1 text-left text-sm text-muted-foreground">
                Passwords must be at least 8 characters long and contain at least: One uppercase letter, One lowercase letter, One number, and One symbol
                </p>
            </div>
            <Button disabled={isLoading}>
                {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up
            </Button>
            {error && <div className="error">{error}</div>}
            </div>
        </form>
        </div>
    )
}