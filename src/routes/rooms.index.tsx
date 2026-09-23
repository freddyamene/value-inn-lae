import { Link, createFileRoute } from "@tanstack/react-router";
import { ROOMS, formatKina, roomsLeft, todayPNG } from "@/lib/motel";
import { BookingBar } from "@/components/booking-bar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, Maximize2 } from "lucide-react";

export const Route = createFileRoute("/rooms/")({ component: RoomsPage });

function RoomsPage() {
  const today = todayPNG();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
        02 / Rooms
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">Choose a room.</h1>
      <p className="mt-4 max-w-xl text-muted">
        Indicative kina rates, confirmed by reception. Occupancy below is a live
        house view for planning — not a locked inventory feed.
      </p>
      <div className="mt-8 max-w-4xl">
        <BookingBar compact />
      </div>
      <div className="mt-12 grid gap-8">
        {ROOMS.map((room) => {
          const left = roomsLeft(room.slug, today, room.inventory);
          return (
            <article
              key={room.slug}
              className="grid overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] lg:grid-cols-[1.15fr_1fr]"
            >
              <img
                src={room.image}
                alt={room.name}
                className="aspect-[3/2] h-full w-full object-cover lg:aspect-auto"
              />
              <div className="flex flex-col p-6 sm:p-8">
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                  {room.code} · {room.bestFor}
                </p>
                <h2 className="mt-2 font-display text-3xl">{room.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {room.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-4" /> {room.guests} guests
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Maximize2 className="size-4" /> {room.sizeM2} m²
                  </span>
                  <span>{room.beds}</span>
                </div>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
                  <div>
                    <p className="font-display text-3xl tabular-nums">
                      {formatKina(room.rate)}
                    </p>
                    <p className="text-xs text-muted">
                      per night · {left} of {room.inventory} open tonight
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to="/rooms/$slug"
                      params={{ slug: room.slug }}
                      className={cn(buttonVariants({ variant: "outline" }))}
                    >
                      Details
                    </Link>
                    <Link
                      to="/book"
                      search={{ room: room.slug }}
                      className={buttonVariants()}
                    >
                      Hold
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
