"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AthleteProfilePage() {
  const params = useParams();
  const id = Number(params?.id);
  const [athlete, setAthlete] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [donationType, setDonationType] = useState<"money"|"kits"|"equipment">("money");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/athletes");
        const data = await res.json();
        setAthlete(data.athletes.find((a: any) => a.id === id));
      } finally { setLoading(false); }
    }
    if (Number.isFinite(id)) load();
  }, [id]);

  async function donate(formData: FormData) {
    const payload: any = {
      athleteId: id,
      type: donationType,
      amount: formData.get("amount") ? Number(formData.get("amount")) : undefined,
      note: String(formData.get("note") || ""),
    };
    const res = await fetch("/api/donations", { method: "POST", body: JSON.stringify(payload) });
    const json = await res.json();
    alert(`Thank you! Tx: ${json.txHash}`);
  }

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-10">Loading...</div>;
  if (!athlete) return <div className="max-w-7xl mx-auto px-4 py-10">Athlete not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img src={athlete.photos?.[0] || "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=1200&auto=format&fit=crop"} alt={athlete.name} className="w-full md:w-80 h-56 object-cover rounded-lg" />
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold">{athlete.name}</h1>
          <p className="text-muted-foreground">{athlete.sport} • {athlete.country}</p>
          <p>{athlete.bio}</p>
          <div className="flex gap-2">
            <Button>Follow</Button>
            <Button variant="outline">Message</Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="sponsor">Sponsor</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <Card>
            <CardHeader><CardTitle>About</CardTitle></CardHeader>
            <CardContent>
              <p>{athlete.bio}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="achievements">
          <Card>
            <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-1">
                {(athlete.achievements||[]).map((a: string) => <li key={a}>{a}</li>)}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="media">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(athlete.photos||[]).map((p: string) => (
              <img key={p} src={p} alt="photo" className="w-full h-48 object-cover rounded-lg" />
            ))}
            {(athlete.videos||[]).map((v: string) => (
              <img key={v} src={v} alt="video placeholder" className="w-full h-48 object-cover rounded-lg" />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="sponsor">
          <Card>
            <CardHeader><CardTitle>Sponsor {athlete.name}</CardTitle></CardHeader>
            <CardContent>
              <form action={donate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Donation Type</Label>
                    <Select value={donationType} onValueChange={(v)=>setDonationType(v as any)}>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="money">Money</SelectItem>
                        <SelectItem value="kits">Kits</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (USD)</Label>
                    <Input id="amount" name="amount" type="number" placeholder="250" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="note">Note</Label>
                    <Textarea id="note" name="note" placeholder="Message for the athlete" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Funds sent to wallet: {athlete.wallet} • Transparency: on-chain receipt provided after donation.</div>
                <Button type="submit">Donate</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}