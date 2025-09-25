"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Athlete {
  id: number | string;
  name: string;
  sport?: string;
  bio?: string;
  photos?: string[];
}

interface EventItem {
  id: number | string;
  name: string;
  date?: string;
}

interface Props {
  athletes: Athlete[];
  events: EventItem[];
}

export const HomeClient = ({ athletes, events }: Props) => {
  const [sport, setSport] = useState<string>("all_sports");

  const filtered = useMemo(() => {
    if (sport === "all_sports") return athletes;
    const needle = sport.replace(/_/g, " ").toLowerCase();
    return athletes.filter((a) => a.sport?.toLowerCase().includes(needle));
  }, [sport, athletes]);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop"
          alt="Athletes training"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Empower Athletes. Fuel Dreams.</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create profiles, get sponsored with on-chain transparency, access world-class mentorship, and find scholarships and events.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/sponsorship"><Button size="lg">Sponsor an Athlete</Button></Link>
              <Link href="/mentorship"><Button size="lg" variant="outline">Mentorship Hub</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase + Matching */}
      <section className="mx-auto max-w-7xl px-4 py-12 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Featured Athletes</h2>
          <div className="w-56">
            <Select value={sport} onValueChange={setSport}>
              <SelectTrigger><SelectValue placeholder="Filter sport" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all_sports">All Sports</SelectItem>
                <SelectItem value="track_&_field">Track & Field</SelectItem>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="boxing">Boxing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <Card key={a.id} className="overflow-hidden">
              <img src={a.photos?.[0] || "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop"} alt={a.name} className="h-40 w-full object-cover" />
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{a.name}</span>
                  <span className="text-sm font-normal text-muted-foreground">{a.sport}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{a.bio}</p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/athletes/${a.id}`}><Button size="sm">View Profile</Button></Link>
                  <Link href={`/sponsorship`}><Button size="sm" variant="outline">Sponsor</Button></Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Transparency */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold">Blockchain Transparency</h2>
            <p className="mt-2 text-muted-foreground">
              Every donation generates a public transaction hash so you can trace allocations end-to-end.
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="/sponsorship"><Button>Donate Now</Button></Link>
              <a className="underline text-sm self-center" href="https://etherscan.io/" target="_blank" rel="noreferrer">See how it works</a>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1642790599489-854df36f3943?q=80&w=1600&auto=format&fit=crop"
            alt="Blockchain visual"
            className="rounded-lg object-cover w-full h-56"
          />
        </div>
      </section>

      {/* Opportunities */}
      <section className="mx-auto max-w-7xl px-4 py-12 grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Scholarships & Grants</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Search and apply to global funding opportunities.</p>
            <Link href="/scholarships"><Button className="mt-4">Find Scholarships</Button></Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Upcoming Events</CardTitle></CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              {events.slice(0,3).map((ev)=> (
                <li key={ev.id} className="flex items-center justify-between">
                  <span>{ev.name}</span>
                  <span className="text-muted-foreground">{ev.date}</span>
                </li>
              ))}
            </ul>
            <Link href="/events"><Button className="mt-4" variant="outline">View All Events</Button></Link>
          </CardContent>
        </Card>
      </section>

      {/* Community CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold">Join the community</h3>
              <p className="text-primary-foreground/80">Upload clips, get feedback from coaches, and grow faster together.</p>
            </div>
            <Link href="/mentorship"><Button size="lg" variant="secondary">Go to Mentorship Hub</Button></Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};