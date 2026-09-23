import { useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ROOMS,
  formatKina,
  formatLongDate,
  getRoom,
  nightsBetween,
  roomsLeft,
} from "@/lib/motel";
import { useBookings, type Reservation } from "@/lib/bookings";
import { BookingBar } from "@/components/booking-bar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type BookSearch = { room?: string };

export const Route = createFileRoute("/book")({
  component: BookPage,
  validateSearch: (s: Record<string, unknown>): BookSearch => ({
    room: typeof s.room === "string" ? s.room : undefined,
  }),
});

function BookPage() {
  const { room: roomFromSearch } = Route.useSearch();
  const draft = useBookings((s) => s.draft);
  const setDraft = useBookings((s) => s.setDraft);
  const submit = useBookings((s) => s.submit);
  const reservations = useBookings((s) => s.reservations);
  const [done, setDone] = useState<Reservation | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (roomFromSearch && getRoom(roomFromSearch)) {
      setDraft({ roomSlug: roomFromSearch });
    }
  }, [roomFromSearch, setDraft]);

  const room = getRoom(draft.roomSlug);
  const nights = nightsBetween(draft.checkIn, draft.checkOut);
  const total = room && nights > 0 ? room.rate * nights : 0;

  const occupancy = useMemo(() => {
    if (!room || !draft.checkIn || nights < 1) return [];
    const days: { date: string; left: number }[] = [];
    const start = new Date(`${draft.checkIn}T00:00:00Z`);
    for (let i = 0; i < nights; i += 1) {
      const d = new Date(start);
      d.setUTCDate(start.getUTCDate() + i);
      const date = d.toISOString().slice(0, 10);
      days.push({ date, left: roomsLeft(room.slug, date, room.inventory) });
    }
    return days;
  }, [room, draft.checkIn, nights]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!room) {
      toast("Pick a room first.");
      return;
    }
    const res = submit();
    if (!res) {
      toast("Add a name, a phone, and at least one night.");
      return;
    }
    setDone(res);
    toast(`Hold ${res.id} is with the desk.`);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <div className="flex size-12 items-center justify-center rounded-md bg-ok/15 text-ok">
          <Check className="size-5" />
        </div>
        <p className="mt-6 text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
          Hold placed
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">
          {done.id}
        </h1>
        <p className="mt-4 text-muted">
          {done.roomName} · {done.nights} night{done.nights === 1 ? "" : "s"} ·{" "}
          {formatLongDate(done.checkIn)} → {formatLongDate(done.checkOut)}
        </p>
        <p className="mt-2 font-display text-3xl tabular-nums">
          {formatKina(done.total)}
        </p>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          This is a request, not a charged booking. Reception will confirm on{" "}
          {done.phone}. Keep this reference if you call.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="button" onClick={() => setDone(null)}>
            Another stay
          </Button>
          <Link to="/" className={buttonVariants({ variant: "outline" })}>
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_20rem]">
      <div>
        <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
          Reserve
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">
          Hold a room.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Dates and a contact. We confirm by phone. Nothing is charged on this
          page.
        </p>

        <div className="mt-8">
          <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            1 · Dates
          </p>
          <div className="mt-3">
            <BookingBar compact datesOnly />
          </div>
        </div>

        <fieldset className="mt-10">
          <legend className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            2 · Room
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {ROOMS.map((r) => {
              const selected = draft.roomSlug === r.slug;
              const tooMany = draft.guests > r.guests;
              return (
                <button
                  key={r.slug}
                  type="button"
                  disabled={tooMany}
                  onClick={() => setDraft({ roomSlug: r.slug })}
                  className={cn(
                    "rounded-lg p-4 text-left shadow-[var(--shadow-border)] transition-[box-shadow,opacity] duration-150 disabled:opacity-40",
                    selected
                      ? "shadow-[var(--shadow-border-hover)] bg-surface"
                      : "bg-surface hover:shadow-[var(--shadow-border-hover)]",
                  )}
                >
                  <p className="font-display text-xl">{r.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    {formatKina(r.rate)} · sleeps {r.guests}
                    {tooMany ? " · too small for this party" : ""}
                  </p>
                </button>
              );
            })}
          </div>
        </fieldset>

        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            3 · Contact
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <Input
                required
                autoComplete="name"
                value={draft.name}
                onChange={(e) => setDraft({ name: e.target.value })}
              />
            </Field>
            <Field label="Phone">
              <Input
                required
                type="tel"
                autoComplete="tel"
                placeholder="+675 …"
                value={draft.phone}
                onChange={(e) => setDraft({ phone: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Email (optional)">
            <Input
              type="email"
              autoComplete="email"
              value={draft.email}
              onChange={(e) => setDraft({ email: e.target.value })}
            />
          </Field>
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-primary"
              checked={draft.transfer}
              onChange={(e) => setDraft({ transfer: e.target.checked })}
            />
            Need a Nadzab transfer
          </label>
          <Field label="Notes for the desk">
            <Textarea
              rows={4}
              placeholder="Flight time, company, late arrival…"
              value={draft.notes}
              onChange={(e) => setDraft({ notes: e.target.value })}
            />
          </Field>
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Send hold to the desk
          </Button>
        </form>
      </div>

      <aside className="h-fit rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] lg:sticky lg:top-24">
        <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
          Estimate
        </p>
        {room && nights > 0 ? (
          <>
            <p className="mt-3 font-display text-2xl">{room.name}</p>
            <p className="mt-1 text-sm text-muted">
              {formatLongDate(draft.checkIn)} → {formatLongDate(draft.checkOut)}
            </p>
            <dl className="mt-5 space-y-2 text-sm">
              <Row
                k={`${nights} night${nights === 1 ? "" : "s"} × ${formatKina(room.rate)}`}
                v={formatKina(total)}
              />
              <Row k="Online charge" v="None" />
            </dl>
            <p className="mt-4 font-display text-3xl tabular-nums">
              {formatKina(total)}
            </p>
            <ul className="mt-5 space-y-1.5 text-xs text-muted">
              {occupancy.map((d) => (
                <li key={d.date} className="flex justify-between">
                  <span>{formatLongDate(d.date)}</span>
                  <span className={d.left === 0 ? "text-fg" : "text-ok"}>
                    {d.left === 0 ? "Full" : `${d.left} open`}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-3 text-sm text-muted">
            Pick dates and a room to see the kina total.
          </p>
        )}

        {hydrated && reservations.length > 0 ? (
          <div className="mt-8 border-t border-fg/10 pt-5">
            <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
              Recent holds
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {reservations.slice(0, 3).map((r) => (
                <li key={r.id}>
                  <span className="text-fg">{r.id}</span>
                  <span className="block text-xs text-muted">
                    {r.roomName} · {formatLongDate(r.checkIn)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{k}</dt>
      <dd className="tabular-nums">{v}</dd>
    </div>
  );
}
