import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="180" height="180">
<rect width="64" height="64" fill="#14305a"/>
<path d="M8 44H56" stroke="#fbf8f2" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"/>
<path d="M11 44Q32 2 53 44" fill="none" stroke="#fbf8f2" stroke-width="4.5" stroke-linecap="round"/>
<circle cx="11" cy="44" r="4" fill="#f23a3a"/>
<circle cx="32" cy="23" r="7.5" fill="#f5c518" opacity=".3"/>
<circle cx="32" cy="23" r="4.2" fill="#f5c518"/>
</svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`} width={180} height={180} alt="" />
    ),
    size,
  );
}
