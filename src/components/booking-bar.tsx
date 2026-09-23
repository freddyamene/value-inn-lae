import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { addDays, nightsBetween, todayPNG } from "@/lib/motel";
import { useBookings } from "@/lib/bookings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BookingBar({
  compact = false,
  datesOnly = false,
  roomSlug,
}: {
  compact?: boolean;
  datesOnly?: boolean;
  roomSlug?: string;
}) {
  const navigate = useNavigate();
  const draft = useBookings((s) => s.draft);
  const setDraft = useBookings((s) => s.setDraft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const minIn = todayPNG();
  const minOut = addDays(draft.checkIn || minIn, 1);
  const nights = nightsBetween(draft.checkIn, draft.checkOut);

  function go(e: React.FormEvent) {
    e.preventDefault();
    if (datesOnly) return;
    if (roomSlug) setDraft({ roomSlug });
    void navigate({ to: roomSlug ? "/book" : "/rooms" });
  }

  if (!mounted) {
    return (
      <div
        className={
          compact
            ? "h-40 rounded-xl bg-surface/80"
            : "h-28 rounded-xl bg-bg/80 shadow-[var(--shadow-border)]"
        }
        aria-hidden
      />
    );
  }

  return (
    <form
      onSubmit={go}
      className={
        compact
          ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          : "grid gap-3 rounded-xl bg-bg/80 p-3 shadow-[var(--shadow-border)] backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-[1fr_1fr_7rem_auto] lg:p-2 lg:pl-4"
      }
    >
      <Field label="Arrive">
        <Input
          type="date"
          required
          min={minIn}
          value={draft.checkIn}
          onChange={(e) => {
            const checkIn = e.target.value;
            const checkOut =
              nightsBetween(checkIn, draft.checkOut) < 1
                ? addDays(checkIn, 1)
                : draft.checkOut;
            setDraft({ checkIn, checkOut });
          }}
        />
      </Field>
      <Field label="Depart">
        <Input
          type="date"
          required
          min={minOut}
          value={draft.checkOut}
          onChange={(e) => setDraft({ checkOut: e.target.value })}
        />
      </Field>
      <Field label="Guests">
        <Input
          type="number"
          min={1}
          max={4}
          value={draft.guests}
          onChange={(e) =>
            setDraft({ guests: Math.max(1, Number(e.target.value) || 1) })
          }
        />
      </Field>
      {datesOnly ? null : (
        <div className="flex items-end">
          <Button type="submit" className="w-full lg:h-11" size="lg">
            {roomSlug ? "Hold this room" : "Check stay"}
            <ArrowRight />
          </Button>
        </div>
      )}
      {nights > 0 && !compact ? (
        <p className="px-1 text-xs text-muted sm:col-span-2 lg:col-span-4">
          {nights} night{nights === 1 ? "" : "s"} · rates in PNG kina ·
          confirmation from reception
        </p>
      ) : null}
    </form>
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
