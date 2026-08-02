import type { R2Like } from "./store";
import { createS3R2FromEnv } from "./s3-r2";

type WorkerEnv = {
  CONTENT?: R2Like;
  R2_ACCOUNT_ID?: string;
  R2_ACCESS_KEY_ID?: string;
  R2_SECRET_ACCESS_KEY?: string;
  R2_BUCKET?: string;
};

async function getWorkerEnv(): Promise<WorkerEnv | null> {
  try {
    const mod = await import("cloudflare:workers");
    return ((mod as { env?: WorkerEnv }).env ?? null) as WorkerEnv | null;
  } catch {
    return null;
  }
}

/**
 * Prefer R2 S3 API tokens from env (local / explicit credentials).
 * Fall back to Workers R2 binding (production deploy).
 */
export async function getR2(): Promise<R2Like | null> {
  const workerEnv = await getWorkerEnv();
  const fromToken = createS3R2FromEnv(workerEnv ?? undefined);
  if (fromToken) return fromToken;
  return workerEnv?.CONTENT ?? null;
}
