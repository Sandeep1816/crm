import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: Request, { params }: { params: { employeeId: string } }) {
  try {
    const count = await prisma.lead.count({
      where: { employeeId: params.employeeId },
    });

    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch employee lead count" }, { status: 500 });
  }
}
