import { NextResponse } from "next/server";

type Donation = {
  athleteId: number;
  type: "money" | "kits" | "equipment";
  amount?: number;
  note?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as Donation;
  // Simulate blockchain tx hash
  const txHash = `0x${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
  return NextResponse.json({ success: true, txHash, allocationUrl: `https://etherscan.io/tx/${txHash}` });
}