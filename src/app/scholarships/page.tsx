"use client";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ScholarshipsPage() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { (async ()=>{ const r = await fetch("/api/scholarships"); const j = await r.json(); setRows(j.scholarships||[]); })(); }, []);
  const filtered = useMemo(()=> rows.filter(r => `${r.title} ${r.sponsor} ${r.country}`.toLowerCase().includes(q.toLowerCase())), [rows, q]);

  async function apply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      scholarshipId: Number(fd.get("scholarshipId")),
      name: String(fd.get("name")),
      email: String(fd.get("email")),
      country: String(fd.get("country")),
      statement: String(fd.get("statement")),
    };
    const res = await fetch("/api/scholarships/apply", { method: "POST", body: JSON.stringify(payload) });
    const j = await res.json();
    if (j.success) alert(`Application submitted! ID: ${j.applicationId}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Scholarships & Grants</h1>
      <Card>
        <CardHeader><CardTitle>Find Opportunities</CardTitle></CardHeader>
        <CardContent>
          <Input placeholder="Search by title, sponsor, country" value={q} onChange={(e)=>setQ(e.target.value)} />
          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Sponsor</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s)=> (
                  <TableRow key={s.id}>
                    <TableCell>{s.title}</TableCell>
                    <TableCell>{s.sponsor}</TableCell>
                    <TableCell>{s.country}</TableCell>
                    <TableCell>${s.amount}</TableCell>
                    <TableCell>{s.deadline}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="underline">Apply</button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Apply: {s.title}</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={apply} className="space-y-3">
                            <input type="hidden" name="scholarshipId" value={s.id} />
                            <Input name="name" placeholder="Full name" required />
                            <Input name="email" type="email" placeholder="Email" required />
                            <Input name="country" placeholder="Country" />
                            <textarea name="statement" className="w-full border rounded-md p-2" placeholder="Motivation statement" />
                            <DialogFooter>
                              <Button type="submit">Submit Application</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}