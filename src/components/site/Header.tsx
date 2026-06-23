import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import crest from "@/assets/crest.png";

const links = [
  { to: "/", label: "Почетна" },
  { to: "/vesti", label: "Вести" },
  { to: "/klub", label: "О клубу" },
  { to: "/tim", label: "Тим" },
  { to: "/mladje", label: "Млађе категорије" },
  { to: "/galerija", label: "Галерија" },
  { to: "/kontakt", label: "Контакт" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src={crest} alt="Грб УЖКК Студент" width={40} height={40} className="h-10 w-10 shrink-0" />
          <span className="truncate text-base font-extrabold tracking-tighter text-primary md:text-lg">
            УЖКК СТУДЕНТ
          </span>
        </Link>

        <div className="hidden gap-5 text-[11px] font-bold uppercase tracking-widest lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          to="/mladje"
          className="hidden bg-accent px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-accent-foreground lg:inline-block"
        >
          Упис у школу
        </Link>

        <button
          type="button"
          aria-label={open ? "Затвори мени" : "Отвори мени"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/mladje"
              onClick={() => setOpen(false)}
              className="mt-4 bg-accent px-3 py-3 text-center text-xs font-bold uppercase tracking-widest text-accent-foreground"
            >
              Упис у школу
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
