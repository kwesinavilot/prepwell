"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { auth } from "@/services/auth"

export default async function Dashboard() {
    const session = await auth()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                    <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
                </div>
            </div>
        </div>
    )
}
