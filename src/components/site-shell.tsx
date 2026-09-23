import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { MOTEL } from "@/lib/motel";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { LiveClock } from "@/components/live-clock";

const NAV = [
  { to: "/stay", label: "Stay" },
  { to: "/rooms", label: "Rooms" },
  { to: "/discover", label: "Lae" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header
        className={cn(
          "sticky top-0 z-40 transition-[background-color,box-shadow] duration-200",
          scrolled || !isHome || open
            ? "bg-bg/92 shadow-[var(--shadow-border)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:h-[4.5rem] sm:px-6">
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label="Value Inn home"
          >
            <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-fg">
              <LogoMark />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-tight">
                Value Inn
              </span>
              <span className="mt-0.5 text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                Lae · Morobe
              </span>
            </span>
          </Link>

          <nav className="ml-8 hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-sm tracking-wide text-muted transition-colors duration-150 hover:text-fg",
                  pathname === item.to && "text-fg",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <LiveClock className="hidden lg:flex" />
            <a
              href={MOTEL.phoneHref}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "hidden sm:inline-flex",
              )}
              aria-label="Call reception"
            >
              <Phone />
            </a>
            <Link
              to="/book"
              className={buttonVariants({ size: "sm" })}
            >
              Reserve
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out md:hidden",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0">
            <nav className="flex flex-col gap-1 border-t border-fg/10 px-4 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex min-h-11 items-center text-base text-fg"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={MOTEL.phoneHref}
                className="flex min-h-11 items-center text-muted"
              >
                {MOTEL.phone}
              </a>
              <LiveClock className="py-2" />
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-auto border-t border-fg/10 bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">Value Inn</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              A secure motel on Huon Road, Lae — built for the people who keep
              Morobe moving.
            </p>
          </div>
          <div className="text-sm leading-relaxed">
            <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
              Desk
            </p>
            <p className="mt-2">{MOTEL.address}</p>
            <p>{MOTEL.poBox}</p>
            <p>
              {MOTEL.city}, {MOTEL.province}
            </p>
            <p className="mt-3">
              <a className="hover:text-primary" href={MOTEL.phoneHref}>
                {MOTEL.phone}
              </a>
            </p>
            <p className="text-muted">Fax {MOTEL.fax}</p>
          </div>
          <div className="text-sm">
            <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
              Hours
            </p>
            <p className="mt-2">Check-in {MOTEL.checkIn}</p>
            <p>Check-out {MOTEL.checkOut}</p>
            <p className="mt-3 text-muted">
              {MOTEL.coordLabel}
              <br />
              {MOTEL.plusCode}
            </p>
          </div>
        </div>
        <div className="border-t border-fg/10 px-4 py-4 text-center text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
          Value Inn · Lae · Papua New Guinea
        </div>
      </footer>
    </div>
  );
}

function LogoMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 8.5 12 19 20 8.5" />
      <path d="M7 8.5h10" />
    </svg>
  );
}
