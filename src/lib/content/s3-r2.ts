import { AwsClient } from "aws4fetch";
import type { R2Like } from "./store";

type S3R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
};

function readConfigFromEnv(
  env: Record<string, string | undefined> = {},
): S3R2Config | null {
  const accountId = env.R2_ACCOUNT_ID || process.env.R2_ACCOUNT_ID;
  const accessKeyId = env.R2_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey =
    env.R2_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY;
  const bucket =
    env.R2_BUCKET || process.env.R2_BUCKET || "uzkk-content";

  if (!accountId || !accessKeyId || !secretAccessKey) return null;
  return { accountId, accessKeyId, secretAccessKey, bucket };
}

export function hasS3R2Config(env?: Record<string, string | undefined>) {
  return Boolean(readConfigFromEnv(env));
}

/** R2 via S3-compatible API (Access Key ID + Secret from R2 API token). */
export function createS3R2(config: S3R2Config): R2Like {
  const client = new AwsClient({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    service: "s3",
    region: "auto",
  });
  const endpoint = `https://${config.accountId}.r2.cloudflarestorage.com`;
  const bucketBase = `${endpoint}/${config.bucket}`;

  async function objectUrl(key: string) {
    return `${bucketBase}/${key.split("/").map(encodeURIComponent).join("/")}`;
  }

  return {
    async get(key) {
      const res = await client.fetch(await objectUrl(key), { method: "GET" });
      if (res.status === 404) return null;
      if (!res.ok) {
        throw new Error(`R2 get failed (${res.status}): ${key}`);
      }
      const contentType = res.headers.get("content-type") || undefined;
      const buf = await res.arrayBuffer();
      return {
        async text() {
          return new TextDecoder().decode(buf);
        },
        async arrayBuffer() {
          return buf;
        },
        httpMetadata: contentType ? { contentType } : undefined,
      };
    },

    async put(key, value, options) {
      const body =
        typeof value === "string"
          ? value
          : value instanceof Uint8Array
            ? value
            : new Uint8Array(value);
      const headers: Record<string, string> = {};
      const ct = options?.httpMetadata?.contentType;
      if (ct) headers["Content-Type"] = ct;

      const res = await client.fetch(await objectUrl(key), {
        method: "PUT",
        headers,
        body,
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`R2 put failed (${res.status}): ${key} ${errText}`);
      }
      return undefined;
    },

    async delete(key) {
      const res = await client.fetch(await objectUrl(key), { method: "DELETE" });
      if (!res.ok && res.status !== 404) {
        throw new Error(`R2 delete failed (${res.status}): ${key}`);
      }
      return undefined;
    },

    async list(options) {
      const params = new URLSearchParams({
        "list-type": "2",
        "max-keys": "1000",
      });
      if (options?.prefix) params.set("prefix", options.prefix);
      if (options?.cursor) params.set("continuation-token", options.cursor);

      const res = await client.fetch(`${bucketBase}?${params.toString()}`, {
        method: "GET",
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`R2 list failed (${res.status}): ${errText}`);
      }

      const xml = await res.text();
      const objects: { key: string }[] = [];
      for (const match of xml.matchAll(/<Key>([^<]+)<\/Key>/g)) {
        const key = match[1]?.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        if (key) objects.push({ key });
      }

      const truncated = /<IsTruncated>\s*true\s*<\/IsTruncated>/i.test(xml);
      const next =
        xml.match(/<NextContinuationToken>([^<]+)<\/NextContinuationToken>/)?.[1] ??
        undefined;

      return {
        objects,
        truncated,
        cursor: truncated ? next : undefined,
      };
    },
  };
}

export function createS3R2FromEnv(
  env?: Record<string, string | undefined>,
): R2Like | null {
  const config = readConfigFromEnv(env);
  return config ? createS3R2(config) : null;
}
