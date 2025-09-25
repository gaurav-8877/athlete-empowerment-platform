"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SponsorshipDashboard() {
  const [type, setType] = useState("money");
  const [tx, setTx] = useState<string|undefined>();
  async function donate(formData: FormData) {
    const payload = {
      athleteId: Number(formData.get("athleteId")),
      type: type as any,
      amount: formData.get("amount") ? Number(formData.get("amount")) : undefined,
      note: String(formData.get("note")||""),
    };
    const res = await fetch("/api/donations", { method: "POST", body: JSON.stringify(payload) });
    const json = await res.json();
    setTx(json.txHash);
  }

  const allocations = [
    { id: 1, athlete: "Aisha Kamau", purpose: "Training & travel", percentage: 60 },
    { id: 2, athlete: "Team Kits", purpose: "Equipment", percentage: 40 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Sponsorship & Transparency</h1>
      <Card>
        <CardHeader><CardTitle>Make a Donation</CardTitle></CardHeader>
        <CardContent>
          <form action={donate} className="grid sm:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="money">Money</SelectItem>
                  <SelectItem value="kits">Kits</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="athleteId">Athlete ID</Label>
              <Input id="athleteId" name="athleteId" type="number" placeholder="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" name="amount" type="number" placeholder="250" />
            </div>
            <div className="space-y-2 sm:col-span-4">
              <Label htmlFor="note">Note</Label>
              <Textarea id="note" name="note" placeholder="Message to the athlete" />
            </div>
            <div className="sm:col-span-4">
              <Button type="submit">Donate</Button>
              {tx && (
                <div className="mt-2 text-sm">Tx: <a className="underline" href={`https://etherscan.io/tx/${tx}`} target="_blank" rel="noreferrer">{tx}</a></div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Fund Allocation Tracking</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Beneficiary</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Allocation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.athlete}</TableCell>
                  <TableCell>{a.purpose}</TableCell>
                  <TableCell>{a.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-sm text-muted-foreground mt-3">Blockchain receipts available for each disbursement.</p>
        </CardContent>
      </Card>
    </div>
  );
}