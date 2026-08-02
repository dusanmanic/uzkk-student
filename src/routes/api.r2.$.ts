import { createFileRoute } from "@tanstack/react-router";
import { getR2 } from "@/lib/content/r2";

export const Route = createFileRoute("/api/r2/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const key = params._splat;
        if (!key) return new Response("Not found", { status: 404 });

        const bucket = await getR2();
        if (!bucket) return new Response("R2 not configured", { status: 503 });

        const obj = await bucket.get(key);
        if (!obj) return new Response("Not found", { status: 404 });

        const body = await obj.arrayBuffer();
        return new Response(body, {
          headers: {
            "Content-Type": obj.httpMetadata?.contentType || "application/octet-stream",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
