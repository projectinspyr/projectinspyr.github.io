import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/@fontsource");
const fonts = Promise.all([
  readFile(join(fontDir, "bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff")),
  readFile(join(fontDir, "instrument-sans/files/instrument-sans-latin-600-normal.woff")),
  readFile(join(fontDir, "fredoka/files/fredoka-latin-700-normal.woff")),
]);

function segments(title: string) {
  return title
    .split(/(\[\[.+?\]\]|\{\{.+?\}\})/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("[[")
        ? { text: part.slice(2, -2), color: "#f5c518" }
        : part.startsWith("{{")
          ? { text: part.slice(2, -2), color: "#f23a3a" }
          : { text: part, color: "#ffffff" },
    );
}


// The bridge, drawn for the share card.
const bridge = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" width="1200" height="340">
<path d="M0 270H200L176 340H0Z" fill="#16305a"/><path d="M1200 270H1000L1024 340H1200Z" fill="#16305a"/>
<path d="M130 270H1070" stroke="rgba(255,255,255,0.7)" stroke-width="5" stroke-linecap="round"/>
${Array.from({ length: 19 }, (_, i) => {
  const x = 222 + i * (756 / 18);
  const t = (x - 170) / 860;
  const y = 270 - 640 * t * (1 - t);
  return `<line x1="${x}" x2="${x}" y1="${y}" y2="270" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>`;
}).join("")}
<path d="M170 270Q600 -50 1030 270" fill="none" stroke="#fbf8f2" stroke-width="6" stroke-linecap="round"/>
<circle cx="170" cy="270" r="10" fill="#f23a3a"/><circle cx="1030" cy="270" r="10" fill="#fbf8f2"/>
<circle cx="600" cy="110" r="30" fill="#f5c518" opacity="0.25"/><circle cx="600" cy="110" r="11" fill="#ffe27a"/>
</svg>`;

export async function renderOg({ title, eyebrow }: { title: string; eyebrow: string }) {
  const [display, body, rounded] = await fonts;
  const words = segments(title).flatMap((seg) =>
    seg.text.split(/(\s+)/).filter((w) => w.trim()).map((w) => ({ w, color: seg.color })),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0e2241",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(245,197,24,0.18), transparent 45%), radial-gradient(circle at 0% 100%, rgba(242,58,58,0.14), transparent 45%)",
          color: "#fff",
          fontFamily: "Instrument Sans",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "56px 72px 0" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
            <span style={{ fontFamily: "Bricolage", fontSize: 20, letterSpacing: "0.08em", color: "#f5c518" }}>PROJECT</span>
            <span style={{ fontFamily: "Fredoka", fontSize: 52, color: "#f23a3a", marginTop: -2 }}>INSPYR</span>
            <span style={{ fontSize: 15, color: "#ffffff", marginTop: 2 }}>{site.lockupLine}</span>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#bccbe2", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            padding: "40px 72px 0",
            fontFamily: "Bricolage",
            fontSize: words.length > 6 ? 84 : 104,
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            maxWidth: 1100,
          }}
        >
          {words.map((word, i) => (
            <span key={i} style={{ color: word.color, marginRight: 24 }}>
              {word.w}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", position: "absolute", left: 0, right: 0, bottom: -34 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;base64,${Buffer.from(bridge).toString("base64")}`} width={1200} height={340} alt="" />
        </div>

        <div style={{ display: "flex", position: "absolute", right: 72, bottom: 36, fontSize: 22, color: "#bccbe2" }}>
          {site.location.city}, {site.location.country}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: display, weight: 800, style: "normal" },
        { name: "Instrument Sans", data: body, weight: 600, style: "normal" },
        { name: "Fredoka", data: rounded, weight: 700, style: "normal" },
      ],
    },
  );
}
