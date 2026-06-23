export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
        <h1 className="max-w-[18ch] text-5xl font-extrabold leading-[0.9] tracking-tighter lg:text-7xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-[55ch] text-lg text-pretty text-muted-foreground">{lead}</p>
        ) : null}
      </div>
    </header>
  );
}
