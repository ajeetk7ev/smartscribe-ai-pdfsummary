import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const summaries = await prisma.summary.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(summaries);
  } catch (err) {
    console.error("[SUMMARY_FETCH_ERROR]", err);
    return NextResponse.json({ error: "Failed to fetch summaries." }, { status: 500 });
  }
}
