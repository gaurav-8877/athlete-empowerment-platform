import { NextResponse } from "next/server";

const events = [
  { id: 201, name: "Nairobi Regional Track Meet", date: "2025-10-21", location: "Nairobi, KE" },
  { id: 202, name: "Buenos Aires Youth Cup", date: "2025-11-10", location: "Buenos Aires, AR" },
];

export async function GET() {
  return NextResponse.json({ events });
}