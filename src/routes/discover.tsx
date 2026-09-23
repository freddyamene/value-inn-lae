import { createFileRoute } from "@tanstack/react-router";
import { MOTEL, PLACES } from "@/lib/motel";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/discover")({ component: DiscoverPage });

function DiscoverPage() {
  const maps = `https://www.google.com/maps?q=${MOTEL.coords.lat},${MOTEL.coords.lng}`;
  return (
    <div>
      <section className="relative min-h-[48vh] overflow-hidden">
        <img
          src="/images/gulf.jpg"
          alt="Huon Gulf at dusk from Lae"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/20" />
        <div className="relative mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6">
          <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-primary">
            03 / Lae
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-6xl">
            Gateway to the Highlands. Port to the gulf.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Lae is Papua New Guinea’s second city and its manufacturing heart —
          the busiest port in the country, a day’s drive from the Highlands,
          and 42 km from Nadzab. From Huon Road you are in Eriku, with Bugandi
          nearby and Holy Spirit Catholic Church a short hop away.
        </p>

        <div className="mt-12 rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
          <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            Compound fix
          </p>
          <p className="mt-2 font-display text-3xl">{MOTEL.address}</p>
          <p className="mt-2 text-sm text-muted">
            {MOTEL.coordLabel} · {MOTEL.plusCode}
          </p>
          <a
            href={maps}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm hover:text-primary"
          >
            <MapPin className="size-4" />
            Open in maps
          </a>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2">
          {PLACES.map((place, i) => (
            <li
              key={place.code}
              className="flex gap-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <span className="font-display text-2xl text-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display text-xl">{place.name}</p>
                <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  {place.distance} · {place.time}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {place.blurb}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
