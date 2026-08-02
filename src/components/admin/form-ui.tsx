export async function fileToBase64(file: File) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  return {
    contentBase64: btoa(binary),
    contentType: file.type || "application/octet-stream",
    fileName: file.name,
  };
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full border border-border bg-background px-3 py-3 text-base outline-none focus:border-primary";

export const textareaClass =
  "w-full border border-border bg-background px-3 py-3 text-base leading-relaxed outline-none focus:border-primary";
