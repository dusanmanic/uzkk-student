import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { getContent } from "@/lib/content/functions";
import type { KlubContent } from "@/lib/content/types";

export const Route = createFileRoute("/klub")({
  loader: () => getContent({ data: { key: "klub" } }) as Promise<KlubContent>,
  head: () => ({
    meta: [
      { title: "О клубу — УЖКК Студент Ниш" },
      { name: "description", content: "Историјат и постигнућа УЖКК Студент Ниш од 1953. године." },
    ],
  }),
  component: KlubPage,
});

function KlubPage() {
  const data = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow={data.eyebrow} title={data.title} lead={data.lead} />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:py-24">
        <div className="space-y-5 text-base text-pretty text-muted-foreground sm:space-y-6 sm:text-lg">
          {data.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h2 className="mt-14 mb-6 text-2xl font-extrabold tracking-tighter sm:mt-20 sm:mb-8 sm:text-3xl">Кључни моменти</h2>
        <ol className="space-y-px bg-border">
          {data.milestones.map((m) => (
            <li key={m.year} className="grid gap-2 bg-background p-5 sm:gap-4 sm:p-6 md:grid-cols-[140px_1fr] md:items-baseline">
              <span className="font-mono text-xl font-extrabold text-primary sm:text-2xl">{m.year}</span>
              <p className="text-pretty">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
