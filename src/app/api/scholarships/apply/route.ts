import { NextResponse } from "next/server";

type Application = {
  scholarshipId: number;
  name: string;
  email: string;
  country?: string;
  statement?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as Application;
  const applicationId = Math.floor(Math.random()*1_000_000);
  return NextResponse.json({ success: true, applicationId, received: body });
}