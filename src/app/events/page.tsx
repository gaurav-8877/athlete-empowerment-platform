"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  useEffect(()=>{(async()=>{ const r = await fetch("/api/events"); const j = await r.json(); setEvents(j.events||[]); })();},[]);

  // Registration dialog state
  const [open, setOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function registerSubmit() {
    if (!selectedEventId) return;
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter your name and email");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: selectedEventId, name, email })
      });
      const j = await res.json();
      if (j?.success) {
        toast.success(`Registered! ID: ${j.registrationId}`);
        setOpen(false);
        setName("");
        setEmail("");
        setSelectedEventId(null);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (e) {
      toast.error("Something went wrong. Try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Events & Tournaments</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(ev => (
          <Card key={ev.id}>
            <CardHeader><CardTitle>{ev.name}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{ev.date} • {ev.location}</p>
              <Button
                className="mt-3"
                onClick={() => { setSelectedEventId(ev.id); setOpen(true); }}
              >
                Register
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Registration Dialog */}
      <Dialog open={open} onOpenChange={(o)=>{ setOpen(o); if(!o){ setName(""); setEmail(""); setSelectedEventId(null); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register for Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reg-name">Full name</Label>
              <Input id="reg-name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input id="reg-email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="jane@example.com" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={()=>setOpen(false)} disabled={submitting}>Cancel</Button>
            <Button onClick={registerSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}