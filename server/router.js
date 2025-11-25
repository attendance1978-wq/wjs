import { serveFile } from "https://deno.land/std@0.201.0/http/file_server.ts";
import { jsonResponse, textResponse } from "./utils.js";

export async function routeRequest(req) {
  const url = new URL(req.url);

  // API routes
  if (url.pathname.startsWith("/api/hello")) {
    return jsonResponse({ message: "Hello from API!" });
  }

  if (url.pathname.startsWith("/api/ip")) {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const ip = await res.json();
      return jsonResponse(ip);
    } catch {
      return jsonResponse({ error: "Failed to get IP" }, 500);
    }
  }

  // Static files
  try {
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    return await serveFile(req, `public${path}`);
  } catch {
    return textResponse("404 Not Found", 404);
  }
}
