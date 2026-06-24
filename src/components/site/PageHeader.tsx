export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:py-28">
        <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-primary sm:text-xs">
          {eyebrow}
        </span>
        <h1 className="max-w-[18ch] text-4xl font-extrabold leading-[0.9] tracking-tighter sm:text-5xl lg:text-7xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 max-w-[55ch] text-base text-pretty text-muted-foreground sm:text-lg">{lead}</p>
        ) : null}
      </div>
    </header>
  );
}
