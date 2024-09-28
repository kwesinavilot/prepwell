// "use client"
// import { signOut } from "next-auth/react"
// import { useSession } from "next-auth/react"
// import { Button } from "@/components/ui/button"
// import Image from "next/image"

// export default function Dashboard() {
//     const { data: session } = useSession()
//     console.log(session)

//     if (!session) {
//         return <div>Access Denied</div>
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <div className="p-8 bg-white rounded-lg shadow-md">
//                 <div className="flex items-center mb-6">
//                     <Image
//                         src={session.user.image}
//                         alt="User avatar"
//                         width={64}
//                         height={64}
//                         className="rounded-full mr-4"
//                     />
//                     <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
//                 </div>
//                 <Button onClick={() => signOut()} variant="outline">
//                     Logout
//                 </Button>
//             </div>
//         </div>
//     )
// }
