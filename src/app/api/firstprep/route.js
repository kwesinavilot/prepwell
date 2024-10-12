import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const formData = await request.formData();
    const role = formData.get("roleName");
    const description = formData.get("description");
    const resume = formData.get("resume");

    if (!role || !description || !resume) {
        return NextResponse.json({
            error: "Missing required fields",
        });
    }

    // save to database
    console.log(role, description, resume);

    return NextResponse.json({
        success: true,
    });
}