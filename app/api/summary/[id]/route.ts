

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const id = (await params).id;
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const summary = await prisma.summary.findUnique({
      where: { id },
    });

    if (!summary) {
      return NextResponse.json({ error: "Summary not found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (summary.userId !== user?.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    await prisma.summary.delete({
      where: { id},
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[SUMMARY_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
