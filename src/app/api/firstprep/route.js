import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/prisma";

export async function POST(request) {
    const formData = await request.formData();
    const role = formData.get("roleName");
    const description = formData.get("description");
    const resume = formData.get("resume");

    if (!role || !description || !resume) {
        return NextResponse.json({
            error: "Missing required fields",
        }, {
            status: 400,
        });
    }

    try {
        // save to database
        await prisma.$transaction(async (tx) => {
            // save the resume in the Profile table
            const profile = await tx.profile.create({
                data: {
                    resume: resume,
                },
            });

            // save the role and description in the Jobs table
            const job = await tx.job.create({
                data: {
                    title: role,
                    description: description,
                },
            });

            // finally, update their first_prep status. Options are YES, MIDWAY, NOTSTARTED and DECLINED
            await tx.user.update({
                where: {
                    id: profile.id,
                },
                data: {
                    first_prep: "MIDWAY",
                },
            });
        });

        return NextResponse.json({
            success: true,
        }, {
            status: 201,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "Failed to save first prep data",
        }, {
            status: 500,
        });
    }
}
