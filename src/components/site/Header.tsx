import { Link } from "@tanstack/react-router";
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
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={crest} alt="Грб УЖКК Студент" width={40} height={40} className="h-10 w-10" />
          <span className="text-base font-extrabold tracking-tighter text-primary md:text-lg">
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
          className="hidden bg-accent px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-accent-foreground md:inline-block"
        >
          Упис у школу
        </Link>
      </div>
    </nav>
  );
}
