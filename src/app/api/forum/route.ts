import { NextResponse } from "next/server";

let threads = [
  { id: 1, author: "Coach Lina", title: "Sprint start critique", body: "Share blocks setup videos.", createdAt: new Date().toISOString() },
  { id: 2, author: "Aisha K.", title: "Hip mobility drills?", body: "Looking for routines to improve stride length.", createdAt: new Date().toISOString() },
];

export async function GET() {
  return NextResponse.json({ threads });
}

export async function POST(req: Request) {
  const { author, title, body } = await req.json();
  const id = threads.length ? Math.max(...threads.map(t=>t.id)) + 1 : 1;
  const thread = { id, author: author || "Anonymous", title, body, createdAt: new Date().toISOString() };
  threads = [thread, ...threads];
  return NextResponse.json({ success: true, thread });
}