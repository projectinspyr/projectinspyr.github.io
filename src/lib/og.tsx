import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const INK = "#0d0d0d";
const fontDir = join(process.cwd(), "node_modules/@fontsource");
const assets = Promise.all([
  readFile(join(fontDir, "bebas-neue/files/bebas-neue-latin-400-normal.woff")),
  readFile(join(fontDir, "plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff")),
  readFile(join(process.cwd(), "public/brand/logo.png"), "base64"),
]);

function segments(title: string) {
  return title
    .split(/(\[\[.+?\]\]|\{\{.+?\}\})/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("[[")
        ? { text: part.slice(2, -2), color: "#e51f3d" }
        : part.startsWith("{{")
          ? { text: part.slice(2, -2), color: "#a80e27" }
          : { text: part, color: INK },
    );
}

/** Share card: a note taped to the yellow halftone wall, like the top of the home page. */
export async function renderOg({ title, eyebrow }: { title: string; eyebrow: string }) {
  const [display, body, logo] = await assets;
  const segs = segments(title);
  // Each word is a list of coloured parts, so a full stop after a highlight stays attached to its word.
  const words: Array<Array<{ w: string; color: string }>> = [];
  segs.forEach((seg, s) => {
    const touchesPrev = s > 0 && !/^\s/.test(seg.text) && !/\s$/.test(segs[s - 1].text);
    seg.text
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w, i) => {
        const part = { w, color: seg.color };
        if (i === 0 && touchesPrev && words.length) words[words.length - 1].push(part);
        else words.push([part]);
      });
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffd100",
          backgroundImage: "radial-gradient(rgba(30,44,79,0.28) 2.6px, transparent 2.7px)",
          backgroundSize: "24px 24px",
          fontFamily: "Jakarta",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 1060,
            height: 500,
            padding: "40px 52px",
            backgroundColor: "#fffdf5",
            border: `7px solid ${INK}`,
            boxShadow: `14px 14px 0 0 ${INK}`,
            transform: "rotate(-1deg)",
            color: INK,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/png;base64,${logo}`} width={270} height={120} alt="" style={{ border: `5px solid ${INK}` }} />
            <div
              style={{
                display: "flex",
                fontFamily: "Bebas",
                fontSize: 38,
                letterSpacing: 2,
                padding: "6px 18px 2px",
                backgroundColor: "#ffd100",
                border: `5px solid ${INK}`,
              }}
            >
              {eyebrow}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: 24,
              fontFamily: "Bebas",
              fontSize: words.length > 6 ? 118 : 148,
              lineHeight: 0.95,
              letterSpacing: 1,
            }}
          >
            {words.map((parts, i) => (
              <div key={i} style={{ display: "flex" }}>
                {parts.map((part, j) => (
                  <span key={j} style={{ color: part.color }}>
                    {part.w}
                  </span>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bebas", data: display, weight: 400, style: "normal" },
        { name: "Jakarta", data: body, weight: 700, style: "normal" },
      ],
    },
  );
}
