import { Link, createFileRoute } from "@tanstack/react-router";
import { AMENITIES, MOTEL } from "@/lib/motel";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stay")({ component: StayPage });

function StayPage() {
  return (
    <div>
      <section className="relative min-h-[70vh] overflow-hidden">
        <img
          src="/images/courtyard.jpg"
          alt="Value Inn courtyard and exterior corridors"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-primary">
            01 / Stay
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-6xl">
            Compound first. Then the room.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Lae is a working city. Value Inn is built around that: a gated yard,
          parking inside the fence, cooled rooms, and a desk that picks up. The
          inn is a motel — honest, practical, and close to the people who fly
          into Nadzab for a week of work.
        </p>
        <dl className="mt-12 grid gap-8 sm:grid-cols-3">
          <Stat k="Check-in" v={MOTEL.checkIn} />
          <Stat k="Check-out" v={MOTEL.checkOut} />
          <Stat k="Airport" v={`${MOTEL.airportKm} km to LAE`} />
        </dl>
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-4 sm:px-6 md:grid-cols-2">
        <img
          src="/images/dining.jpg"
          alt="Inn kitchen breakfast tables"
          className="aspect-[16/10] w-full rounded-xl object-cover"
        />
        <img
          src="/images/compound.jpg"
          alt="Night gate and floodlit compound"
          className="aspect-[16/10] w-full rounded-xl object-cover"
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-4xl">House systems</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {AMENITIES.map((item, i) => (
            <article
              key={item.id}
              className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]"
            >
              <p className="text-xs uppercase tracking-widest text-muted">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-2xl">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
        <Link
          to="/rooms"
          className={cn(buttonVariants(), "mt-10")}
        >
          See rooms
          <ArrowRight />
        </Link>
      </section>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-muted">{k}</dt>
      <dd className="mt-2 font-display text-3xl">{v}</dd>
    </div>
  );
}
