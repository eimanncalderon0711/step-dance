import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const payments = await prisma.paymentOption.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ data: payments });
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch payment options" },
      { status: 500 }
    );
  }
}