import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { news } from "@/data/news";

export const Route = createFileRoute("/vesti/$slug")({
  loader: ({ params }) => {
    const item = news.find((n) => n.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — УЖКК Студент` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:image", content: loaderData.img },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="text-4xl font-extrabold tracking-tighter">Вест није пронађена</h1>
      <Link to="/vesti" className="mt-6 inline-block border-b-2 border-accent pb-1 text-sm font-bold uppercase">
        Назад на све вести
      </Link>
    </div>
  ),
  component: VestPage,
});

function VestPage() {
  const item = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <Link to="/vesti" className="font-mono text-xs uppercase tracking-widest text-primary hover:underline">
        ← Све вести
      </Link>
      <span className="mt-8 block font-mono text-xs text-muted-foreground">{item.date}</span>
      <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tighter lg:text-6xl">
        {item.title}
      </h1>
      <img
        src={item.img}
        alt={item.title}
        width={1024}
        height={640}
        className="mt-10 aspect-video w-full object-cover"
      />
      <div className="prose prose-lg mt-10 space-y-6 text-pretty text-foreground">
        {item.body.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
