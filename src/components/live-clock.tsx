import { useEffect, useState } from "react";
import { MOTEL } from "@/lib/motel";
import { cn } from "@/lib/utils";

function partsNow() {
  const d = new Date();
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: MOTEL.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(d);
  const date = new Intl.DateTimeFormat("en-GB", {
    timeZone: MOTEL.timezone,
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(d);
  return { time, date };
}

export function LiveClock({ className }: { className?: string }) {
  const [now, setNow] = useState<{ time: string; date: string } | null>(null);

  useEffect(() => {
    setNow(partsNow());
    const id = window.setInterval(() => setNow(partsNow()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "flex items-baseline gap-2 font-sans text-xs uppercase tracking-widest tabular-nums text-muted",
        className,
      )}
      aria-label={now ? `Lae time ${now.time} ${MOTEL.tzShort}` : "Lae time"}
    >
      <span className="text-fg">{now?.time ?? "--:--:--"}</span>
      <span>{MOTEL.tzShort}</span>
      <span className="hidden sm:inline">{now?.date ?? ""}</span>
    </div>
  );
}
