import { Link, createFileRoute } from "@tanstack/react-router";
import { AMENITIES, getRoom, formatKina, roomsLeft, todayPNG } from "@/lib/motel";
import { useBookings } from "@/lib/bookings";
import { BookingBar } from "@/components/booking-bar";
import { buttonVariants } from "@/components/ui/button";
import { Users, Maximize2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/rooms/$slug")({
  component: RoomDetail,
});

function RoomDetail() {
  const { slug } = Route.useParams();
  const room = getRoom(slug);
  const setDraft = useBookings((s) => s.setDraft);

  if (!room) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Room not listed</h1>
        <p className="mt-3 text-muted">That code is not in the current house.</p>
        <Link to="/rooms" className={buttonVariants({ className: "mt-8" })}>
          View rooms
        </Link>
      </div>
    );
  }

  const left = roomsLeft(room.slug, todayPNG(), room.inventory);
  const amenityMeta = AMENITIES.filter((a) => room.amenities.includes(a.id));

  return (
    <div>
      <div className="relative">
        <img
          src={room.image}
          alt={room.name}
          className="h-[46vh] min-h-72 w-full object-cover sm:h-[56vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Link
            to="/rooms"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            All rooms
          </Link>
          <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            {room.code} · {room.bestFor}
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-6xl">{room.name}</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            {room.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <span className="inline-flex items-center gap-2 text-muted">
              <Users className="size-4" /> Sleeps {room.guests}
            </span>
            <span className="inline-flex items-center gap-2 text-muted">
              <Maximize2 className="size-4" /> {room.sizeM2} m²
            </span>
            <span className="text-muted">{room.beds}</span>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {amenityMeta.map((item) => (
              <li key={item.id} className="rounded-lg bg-surface p-4 shadow-[var(--shadow-border)]">
                <p className="font-medium">{item.name}</p>
                <p className="mt-1 text-sm text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] lg:sticky lg:top-24">
          <p className="font-display text-4xl tabular-nums">{formatKina(room.rate)}</p>
          <p className="text-sm text-muted">per night · PNG kina</p>
          <p className="mt-2 text-sm text-ok">
            {left} of {room.inventory} open tonight
          </p>
          <div className="mt-6">
            <BookingBar compact roomSlug={room.slug} />
          </div>
          <button
            type="button"
            className={buttonVariants({ variant: "ghost", className: "mt-2 w-full" })}
            onClick={() => setDraft({ roomSlug: room.slug })}
          >
            Keep this room on the hold form
          </button>
        </aside>
      </div>
    </div>
  );
}
