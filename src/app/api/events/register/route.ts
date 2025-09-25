import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { eventId, name, email } = await req.json();
  const regId = `${eventId}-${Date.now()}`;
  return NextResponse.json({ success: true, registrationId: regId });
}