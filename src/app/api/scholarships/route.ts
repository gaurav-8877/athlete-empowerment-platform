import { NextResponse } from "next/server";

const scholarships = [
  {
    id: 101,
    title: "Global Youth Sports Scholarship",
    sponsor: "Global Sports Trust",
    deadline: "2025-12-01",
    country: "Global",
    amount: 5000,
  },
  {
    id: 102,
    title: "Women in Athletics Grant",
    sponsor: "RunStrong Foundation",
    deadline: "2025-11-15",
    country: "Global",
    amount: 3000,
  },
];

export async function GET() {
  return NextResponse.json({ scholarships });
}