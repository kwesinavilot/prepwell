import { prisma } from "@/services/prisma";
import fs from "fs";
import path from "path";
import { auth } from "@/services/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await auth();
    if (!session || !session.user || !session.user.userID) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userID = session.user.userID;

    const formData = await request.formData();
    const role = formData.get("roleName");
    const description = formData.get("description");
    const file = formData.get("resume");

    if (!role || !description || !file) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const filename = `${year}${month}${day}_${file.name.replace(/\s/g, "_")}`;
    const filepath = `/storage/vitaes/${filename}`;
    const fullPath = path.join(process.cwd(), 'public', filepath);
    const dirPath = path.dirname(fullPath);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    try {
        // Save the file to the public folder
        const data = await file.arrayBuffer();
        await fs.promises.writeFile(fullPath, Buffer.from(data));

        await prisma.$transaction(async (tx) => {
            const user = await tx.user.update({
                where: { id: userID },
                data: { first_prep: "MIDWAY" },
            });

            const profile = await tx.profile.upsert({
                where: { userId: userID },
                create: { userId: userID, resume: filepath },
                update: { resume: filepath },
            });

            // Find or create the job
            const job = await tx.job.upsert({
                where: {
                    userId_title: {
                        userId: userID,
                        title: role,
                    }
                },
                create: {
                    userId: userID,
                    title: role,
                    description: description,
                },
                update: { description: description },
            });
        });

        // Update the session
        await auth().update({
            user: { first_prep: "MIDWAY" }
        });

        return NextResponse.json({ message: "First prep data saved successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error while saving first prep data" }, { status: 500 });
    }
}