import { HomeClient } from "@/components/home/home-client";
import { headers } from "next/headers";

export default async function HomePage() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const protocol = h.get("x-forwarded-proto") ?? "http";
  const base = `${protocol}://${host}`;

  const [aRes, eRes] = await Promise.all([
    fetch(`${base}/api/athletes`, { cache: "no-store" }),
    fetch(`${base}/api/events`, { cache: "no-store" }),
  ]);

  const [a, e] = await Promise.all([aRes.json(), eRes.json()]);
  const athletes = a?.athletes ?? [];
  const events = e?.events ?? [];

  return <HomeClient athletes={athletes} events={events} />;
}