import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { adminLogin, requireAdminSession } from "@/lib/news/functions";

export const Route = createFileRoute("/admin/login")({
  loader: async () => {
    const session = await requireAdminSession();
    if (session.ok) throw redirect({ to: "/admin" });
    return null;
  },
  head: () => ({
    meta: [{ title: "Админ пријава — УЖКК Студент" }],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = Route.useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await adminLogin({ data: { password } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      await navigate({ to: "/admin" });
    } catch {
      setError("Пријава није успела.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border border-border bg-background p-8 shadow-sm"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          УЖКК Студент
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight">Админ пријава</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Унесите лозинку да уређујете вести.
        </p>
        <label className="mt-8 block space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Лозинка
          </span>
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border bg-background px-3 py-3 outline-none focus:border-primary"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-primary px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-60"
        >
          {loading ? "…" : "Пријави се"}
        </button>
      </form>
    </div>
  );
}
