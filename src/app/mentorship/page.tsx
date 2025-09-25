"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export default function MentorshipHub() {
  async function postFeedback(formData: FormData) {
    alert("Feedback posted! Coaches worldwide can respond.");
  }

  const videos = [
    { id: 1, title: "Speed Drills for Sprinters", thumb: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200&auto=format&fit=crop" },
    { id: 2, title: "Nutrition Basics for Endurance", thumb: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop" },
  ];

  const guides = [
    { id: 1, title: "Weekly 5K Improvement Plan" },
    { id: 2, title: "Recovery & Mobility Routine" },
  ];

  // Community forum state
  const [threads, setThreads] = useState<any[]>([]);
  useEffect(() => { (async ()=>{ const r = await fetch("/api/forum"); const j = await r.json(); setThreads(j.threads||[]); })(); }, []);

  async function createThread(formData: FormData) {
    const payload = {
      author: String(formData.get("author")||"Anonymous"),
      title: String(formData.get("title")||"Untitled"),
      body: String(formData.get("body")||"")
    };
    const res = await fetch("/api/forum", { method: "POST", body: JSON.stringify(payload) });
    const j = await res.json();
    if (j.success) setThreads((prev)=> [j.thread, ...prev]);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Mentorship Hub</h1>
      <Card>
        <CardHeader><CardTitle>Training Videos</CardTitle></CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map(v => (
              <div key={v.id} className="space-y-2">
                <img src={v.thumb} alt={v.title} className="w-full h-44 object-cover rounded-md" />
                <div className="font-medium">{v.title}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Nutrition & Fitness Guides</CardTitle></CardHeader>
        <CardContent>
          <ul className="list-disc pl-6">
            {guides.map(g => (<li key={g.id}>{g.title}</li>))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Upload Clip for Coaching Feedback</CardTitle></CardHeader>
        <CardContent>
          <form action={postFeedback} className="grid sm:grid-cols-2 gap-4">
            <div>
              <Input type="url" name="video" placeholder="Video URL (YouTube, etc.)" />
            </div>
            <div>
              <Textarea name="context" placeholder="Add context: goals, issues, etc." />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Submit for Feedback</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Community Forum */}
      <Card>
        <CardHeader><CardTitle>Community Forum</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <form action={createThread} className="grid sm:grid-cols-3 gap-3">
            <Input name="author" placeholder="Your name" />
            <Input name="title" placeholder="Topic title" />
            <div className="sm:col-span-3">
              <Textarea name="body" placeholder="Start the discussion..." />
            </div>
            <div className="sm:col-span-3">
              <Button type="submit">Post</Button>
            </div>
          </form>
          <div className="space-y-3">
            {threads.map((t)=> (
              <div key={t.id} className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground">{t.author} • {new Date(t.createdAt).toLocaleString()}</div>
                <div className="font-medium">{t.title}</div>
                <p className="text-sm">{t.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}