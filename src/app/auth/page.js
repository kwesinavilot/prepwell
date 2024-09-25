"use client";

import React from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FaGoogle } from "react-icons/fa6";
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { signIn } from "next-auth/react"

const formSchema = z.object({
    email: z.string()
        .email({
            message: "Please enter a valid email address.",
        })
        .min(6, {
            message: "Email must be at least 7 characters long.",
        }),
})

export default function SignUp() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values) {
        console.log(values)
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md mx-auto">
                <Link className="flex text-center items-center justify-center hash-tx-color" href="/">
                    <h2 className="text-2xl text-center font-bold sm:inline-block text-blue-600">
                        Prepwell
                    </h2>
                </Link>

                <div className="text-center mb-8">
                    <h2 className="mt-6 text-md font-semibold tracking-tight">
                        Create an account or sign in
                    </h2>
                </div>

                <Button
                    variant="outline"
                    className="mb-8 w-full text-white p-6 bg-blue-600 hover:bg-blue-600/90 hover:text-white"
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                >
                    <FaGoogle className="mr-2 h-4 w-4" />
                    Continue with Google
                </Button>

                <div className="relative mb-5">
                    <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                    </div>

                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            or
                        </span>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full p-6">
                            Continue with Email
                        </Button>
                    </form>
                </Form>

                <p className="mt-3 text-center text-sm text-gray-600">
                    By signing up or logging in, you agree to our{' '}
                    <Link href="/terms" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Privacy Policy
                    </Link>
                    .
                </p>

                {/* <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Log in
                </Link>
            </p> */}
            </div>
        </div>
    );
}