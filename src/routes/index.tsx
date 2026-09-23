import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Shield,
  Car,
  Wifi,
  Zap,
  Plane,
  MapPin,
} from "lucide-react";
import { AMENITIES, MOTEL, ROOMS, formatKina } from "@/lib/motel";
import { buttonVariants } from "@/components/ui/button";
import { BookingBar } from "@/components/booking-bar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div>
      <section className="relative min-h-dvh overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt="Value Inn compound on Huon Road at night, palms and warm porch light after rain"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/25" />

        <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-14">
          <Hud />
          <p className="mt-8 text-[0.6875rem] uppercase tracking-[0.22em] text-primary">
            Huon Road · Lae · Morobe
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            The smart stay
            <br />
            in Lae.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-fg/80 sm:text-lg">
            Gated compound. Air-conditioned rooms. A desk that answers. For
            crews, families, and anyone landing at Nadzab with work still to do.
          </p>
          <div className="mt-8 max-w-4xl">
            <BookingBar />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <Kicker index="01" label="The inn" />
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            A closed courtyard on Huon Road.
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted">
          Value Inn sits in the Eriku–Bugandi pocket of Lae, PNG’s industrial
          capital and the gateway to the Highlands. The compound is fenced, the
          rooms are cooled, and reception holds a direct line at{" "}
          <a href={MOTEL.phoneHref} className="text-fg underline-offset-4 hover:underline">
            {MOTEL.phone}
          </a>
          . Indicative nightly rates; your hold is confirmed by the desk.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-4 sm:px-6 md:grid-cols-2">
        <figure className="overflow-hidden rounded-xl">
          <img
            src="/images/courtyard.jpg"
            alt="Daytime courtyard with timber corridors and tropical planting"
            className="aspect-[16/10] w-full object-cover"
          />
        </figure>
        <figure className="overflow-hidden rounded-xl">
          <img
            src="/images/compound.jpg"
            alt="Secure compound gate at dusk"
            className="aspect-[16/10] w-full object-cover"
          />
        </figure>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Kicker index="02" label="Rooms" />
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Four ways to sleep.
            </h2>
          </div>
          <Link to="/rooms" className={cn(buttonVariants({ variant: "outline" }))}>
            All rooms
            <ArrowRight />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              to="/rooms/$slug"
              params={{ slug: room.slug }}
              className="group overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
            >
              <div className="overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                    {room.code} · {room.bestFor}
                  </p>
                  <h3 className="mt-1 font-display text-2xl">{room.name}</h3>
                  <p className="mt-1 text-sm text-muted">{room.tagline}</p>
                </div>
                <p className="shrink-0 text-right">
                  <span className="block font-display text-2xl tabular-nums">
                    {formatKina(room.rate)}
                  </span>
                  <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                    / night
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-fg/10 bg-surface">
        <div className="mx-auto grid max-w-6xl gap-px px-0 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.slice(0, 6).map((item) => (
            <div key={item.id} className="bg-bg px-6 py-8">
              <p className="font-display text-xl">{item.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <Kicker index="03" label="Position" />
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">
            Forty-two kilometres from Nadzab.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Allow 60–90 minutes from LAE, longer if the Markham is slow. Pre-book
            a transfer with reception. Huon Road is a short hop to Eriku shops,
            Unitech PMVs, and the botanic gardens.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <Fact icon={Plane} label="Nadzab (LAE)" value="42 km · 60–90 min" />
            <Fact icon={MapPin} label="Compound" value={MOTEL.coordLabel} />
            <Fact icon={Shield} label="Gate" value="Staffed compound, vehicles inside" />
          </ul>
          <Link
            to="/discover"
            className={cn(buttonVariants({ variant: "outline" }), "mt-8")}
          >
            Explore Lae
            <ArrowRight />
          </Link>
        </div>
        <figure className="overflow-hidden rounded-xl">
          <img
            src="/images/gulf.jpg"
            alt="Huon Gulf at dusk with Morobe ranges and port silhouettes"
            className="aspect-[16/11] w-full object-cover"
          />
        </figure>
      </section>

      <section className="relative overflow-hidden">
        <img
          src="/images/reception.jpg"
          alt="Value Inn reception at evening"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-bg/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-primary">
            Desk live
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl sm:text-5xl">
            Hold a room. We’ll confirm it.
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Send dates and a name. Reception calls back on the number you leave.
            No card is charged online.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" className={buttonVariants()}>
              Request a stay
              <ArrowRight />
            </Link>
            <a href={MOTEL.phoneHref} className={buttonVariants({ variant: "outline" })}>
              Call {MOTEL.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Hud() {
  const items = [
    { icon: Shield, label: "Compound", value: "Secure" },
    { icon: Zap, label: "Power", value: "Online" },
    { icon: Wifi, label: "Wi-Fi", value: "Up" },
    { icon: Car, label: "Parking", value: "Inside" },
  ];
  return (
    <ul className="grid max-w-xl grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center gap-2 rounded-md bg-bg/55 px-3 py-2 shadow-[var(--shadow-border)] backdrop-blur-sm"
        >
          <item.icon className="size-3.5 text-ok" aria-hidden />
          <span className="flex flex-col leading-none">
            <span className="text-[0.625rem] uppercase tracking-[0.14em] text-muted">
              {item.label}
            </span>
            <span className="mt-1 text-xs text-fg">{item.value}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Kicker({ index, label }: { index: string; label: string }) {
  return (
    <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
      <span className="text-fg">{index}</span>
      <span className="mx-2 text-fg/30">/</span>
      {label}
    </p>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Plane;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 text-muted" aria-hidden />
      <span>
        <span className="block text-muted">{label}</span>
        <span className="text-fg">{value}</span>
      </span>
    </li>
  );
}
