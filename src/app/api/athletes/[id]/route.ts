import { NextResponse } from "next/server";

const athletes = [
  { id: 1, name: "Aisha Kamau", sport: "Track & Field", country: "Kenya" },
  { id: 2, name: "Mateo Alvarez", sport: "Football", country: "Argentina" },
];

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const athlete = athletes.find((a) => a.id === Number(params.id));
  if (!athlete) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ athlete });
}