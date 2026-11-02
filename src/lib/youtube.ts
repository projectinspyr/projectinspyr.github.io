export type ParsedReel =
  | { platform: "youtube"; id: string; vertical: boolean }
  | { platform: "instagram"; href: string }
  | { platform: "other"; href: string };

export function parseReelUrl(url: string): ParsedReel {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { platform: "other", href: url };
  }

  const host = parsed.hostname.replace(/^www\.|^m\./, "");

  if (host === "youtu.be") {
    const id = parsed.pathname.slice(1).split("/")[0];
    if (id) return { platform: "youtube", id, vertical: false };
  }

  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const [, first, second] = parsed.pathname.split("/");
    if (first === "shorts" && second) return { platform: "youtube", id: second, vertical: true };
    if (first === "embed" && second) return { platform: "youtube", id: second, vertical: false };
    const v = parsed.searchParams.get("v");
    if (v) return { platform: "youtube", id: v, vertical: false };
  }

  if (host === "instagram.com") return { platform: "instagram", href: url };

  return { platform: "other", href: url };
}
