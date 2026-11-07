import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

/*
 * Created on first request rather than at build time: in GitHub mode Keystatic
 * throws when its credentials are missing, and that must not stop the rest of
 * the site from building and deploying before the editor is set up.
 */
let handler: ReturnType<typeof makeRouteHandler> | null = null;

function notConnected(error: unknown) {
  console.error("[keystatic]", error);
  return new Response(
    "The editor is not connected to GitHub yet. Add the Keystatic values in Vercel → Settings → Environment Variables, then redeploy.",
    { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}

export async function GET(request: Request) {
  try {
    handler ??= makeRouteHandler({ config });
  } catch (error) {
    return notConnected(error);
  }
  return handler.GET(request);
}

export async function POST(request: Request) {
  try {
    handler ??= makeRouteHandler({ config });
  } catch (error) {
    return notConnected(error);
  }
  return handler.POST(request);
}
