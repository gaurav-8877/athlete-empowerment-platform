import { NextResponse } from "next/server";

const athletes = [
  {
    id: 1,
    name: "Aisha Kamau",
    sport: "Track & Field",
    country: "Kenya",
    bio: "200m sprinter with a dream to qualify for the World Championships.",
    achievements: [
      "National U20 silver medalist",
      "Personal best 200m: 23.15s",
      "Regional Games finalist",
    ],
    photos: [
      "https://images.unsplash.com/photo-1521417537009-7a0d1af0baf6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop",
    ],
    videos: [
      "https://images.unsplash.com/photo-1520975936116-5f73a6b1b7b0?q=80&w=1200&auto=format&fit=crop",
    ],
    needs: [
      { type: "money", amount: 3500, purpose: "Training & travel" },
      { type: "equipment", item: "Spikes & gear" },
    ],
    wallet: "0xAE1...A1",
  },
  {
    id: 2,
    name: "Mateo Alvarez",
    sport: "Football",
    country: "Argentina",
    bio: "Left winger with explosive pace and vision.",
    achievements: ["U18 league top assister", "Regional Cup semi-finalist"],
    photos: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
    ],
    videos: [
      "https://images.unsplash.com/photo-1521417537009-7a0d1af0baf6?q=80&w=1200&auto=format&fit=crop",
    ],
    needs: [{ type: "kits", item: "Team kits for season" }],
    wallet: "0xAE2...B2",
  },
];

export async function GET() {
  return NextResponse.json({ athletes });
}