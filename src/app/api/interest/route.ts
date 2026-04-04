import { NextRequest, NextResponse } from "next/server";

const interestDb: Array<{
  productId: string;
  productName: string;
  email: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}> = [];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { productId, productName, email, startDate, endDate } = body;

  if (!productId || !email || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  interestDb.push({
    productId,
    productName: productName || productId,
    email,
    startDate,
    endDate,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    message:
      "Thank you! We'll notify you if this product becomes available for your dates.",
  });
}

export async function GET() {
  return NextResponse.json({ registrations: interestDb });
}
