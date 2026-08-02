import { createHash, timingSafeEqual } from "node:crypto";
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";

const COOKIE_NAME = "uzkk_admin";

async function readWorkerVar(name: string): Promise<string | undefined> {
  try {
    const mod = await import("cloudflare:workers");
    const env = (mod as { env?: Record<string, string | undefined> }).env;
    return env?.[name];
  } catch {
    return undefined;
  }
}

async function adminPassword(): Promise<string> {
  return (
    (await readWorkerVar("ADMIN_PASSWORD")) ||
    process.env.ADMIN_PASSWORD ||
    "student"
  );
}

function tokenForPassword(password: string): string {
  return createHash("sha256").update(`uzkk-admin:${password}`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookie = getCookie(COOKIE_NAME);
  if (!cookie) return false;
  return safeEqual(cookie, tokenForPassword(await adminPassword()));
}

export async function assertAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

export async function loginAdmin(password: string): Promise<boolean> {
  if (!safeEqual(password, await adminPassword())) return false;
  setCookie(COOKIE_NAME, tokenForPassword(password), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return true;
}

export function logoutAdmin() {
  deleteCookie(COOKIE_NAME, {
    path: "/",
    sameSite: "lax",
  });
  // Extra clear for runtimes that ignore deleteCookie options
  setCookie(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
