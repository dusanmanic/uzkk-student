import { Link, useNavigate } from "@tanstack/react-router";
import { adminLogout } from "@/lib/news/functions";

const nav = [
  { to: "/admin", label: "Вести", exact: true },
  { to: "/admin/tim", label: "Тим" },
  { to: "/admin/galerija", label: "Галерија" },
  { to: "/admin/klub", label: "Клуб" },
  { to: "/admin/mladje", label: "Млађе" },
  { to: "/admin/kontakt", label: "Контакт" },
  { to: "/admin/pocetna", label: "Почетна" },
  { to: "/admin/sajt", label: "Сајт / футер" },
] as const;

export function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const navigate = useNavigate();

  async function onLogout() {
    try {
      await adminLogout();
    } finally {
      await navigate({ to: "/admin/login" });
    }
  }

  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                УЖКК Студент · Админ
              </p>
              <h1 className="text-xl font-extrabold tracking-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-muted"
              >
                Сајт
              </Link>
              <button
                type="button"
                onClick={() => void onLogout()}
                className="cursor-pointer bg-foreground px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-background hover:opacity-90"
              >
                Одјава
              </button>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: "exact" in item ? item.exact : false }}
                activeProps={{ className: "bg-primary text-primary-foreground border-primary" }}
                className="border border-border px-3 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
