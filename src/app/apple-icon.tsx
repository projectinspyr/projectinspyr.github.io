import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="180" height="180">
<rect width="64" height="64" fill="#ffd100"/>
<path d="M7 46H57" stroke="#0d0d0d" stroke-width="5"/>
<path d="M12 46Q32 4 52 46" fill="none" stroke="#0d0d0d" stroke-width="5"/>
<circle cx="12" cy="46" r="5" fill="#ff2e4c" stroke="#0d0d0d" stroke-width="2.5"/>
<polygon points="32,12 34.8,20.5 43,17 39.5,25 48,28 39.5,31 43,39 34.8,35.5 32,44 29.2,35.5 21,39 24.5,31 16,28 24.5,25 21,17 29.2,20.5" fill="#ff2e4c" stroke="#0d0d0d" stroke-width="2.5"/>
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
