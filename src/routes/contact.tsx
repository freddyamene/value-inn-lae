import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { MOTEL } from "@/lib/motel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Printer, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (!name || !phone) {
      toast("Name and phone are required.");
      return;
    }
    const payload = {
      name,
      phone,
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      at: new Date().toISOString(),
    };
    const prev = JSON.parse(localStorage.getItem("value-inn-enquiries") ?? "[]") as unknown[];
    localStorage.setItem("value-inn-enquiries", JSON.stringify([payload, ...prev].slice(0, 20)));
    setSent(true);
    toast("Message stored. Call the desk if you need a same-day answer.");
    e.currentTarget.reset();
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
      <div>
        <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
          04 / Desk
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">
          Speak to reception.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          The fastest path is the phone. Holds sent online are confirmed by the
          desk — usually the same day.
        </p>
        <ul className="mt-10 space-y-6">
          <li className="flex gap-4">
            <Phone className="mt-1 size-4 text-muted" />
            <div>
              <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                Phone
              </p>
              <a href={MOTEL.phoneHref} className="font-display text-2xl hover:text-primary">
                {MOTEL.phone}
              </a>
            </div>
          </li>
          <li className="flex gap-4">
            <Printer className="mt-1 size-4 text-muted" />
            <div>
              <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                Fax
              </p>
              <p className="font-display text-2xl">{MOTEL.fax}</p>
            </div>
          </li>
          <li className="flex gap-4">
            <MapPin className="mt-1 size-4 text-muted" />
            <div>
              <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                Address
              </p>
              <p className="mt-1">
                {MOTEL.address}
                <br />
                {MOTEL.poBox}
                <br />
                {MOTEL.city}, {MOTEL.province}
                <br />
                {MOTEL.country}
              </p>
            </div>
          </li>
        </ul>
        <img
          src="/images/reception.jpg"
          alt="Reception desk at Value Inn"
          className="mt-10 aspect-[16/10] w-full rounded-xl object-cover"
        />
      </div>

      <form
        onSubmit={onSubmit}
        className="h-fit space-y-4 rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8"
      >
        <h2 className="font-display text-3xl">Write to the desk</h2>
        {sent ? (
          <p className="text-sm text-ok">
            Received on this device. For a same-day hold, call {MOTEL.phone}.
          </p>
        ) : null}
        <label className="flex flex-col gap-1.5">
          <Label>Name</Label>
          <Input name="name" required autoComplete="name" />
        </label>
        <label className="flex flex-col gap-1.5">
          <Label>Phone</Label>
          <Input name="phone" type="tel" required autoComplete="tel" />
        </label>
        <label className="flex flex-col gap-1.5">
          <Label>Email</Label>
          <Input name="email" type="email" autoComplete="email" />
        </label>
        <label className="flex flex-col gap-1.5">
          <Label>Message</Label>
          <Textarea name="message" rows={5} required />
        </label>
        <Button type="submit" size="lg" className="w-full">
          Send message
        </Button>
        <p className="text-xs text-muted">
          Messages stay on this device so you can keep a copy. They are not a
          substitute for calling reception.
        </p>
      </form>
    </div>
  );
}
