/**
 * utils.ts - reusable module for my-js-webserver
 * Features:
 * 1. JSON and text response helpers
 * 2. Logging
 * 3. Public IP fetch
 */

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function textResponse(text: string, status = 200): Response {
  return new Response(text, {
    status,
    headers: { "Content-Type": "text/plain" },
  });
}

export function log(message: string, level = "INFO"): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

export async function getPublicIP(): Promise<{ ip?: string; error?: string }> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    if (!res.ok) throw new Error("Failed to fetch public IP");
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { error: err.message };
  }
}
  
