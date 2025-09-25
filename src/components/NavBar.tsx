"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/athletes/1", label: "Athletes" },
  { href: "/sponsorship", label: "Sponsorship" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/events", label: "Events" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <header className="w-full border-b sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-primary inline-flex items-center justify-center text-primary-foreground font-bold">AE</span>
          <span className="font-semibold">Athlete Empowerment</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <Button variant={pathname === l.href ? "default" : "ghost"} className="font-medium">
                {l.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Link href="/sponsorship">
            <Button>Donate</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}