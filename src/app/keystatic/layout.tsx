import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

// The editor loads its data in the browser, so instant-navigation validation doesn't apply to it.
export const instant = false;

// The content editor has its own page frame, without the site's header, footer or styles.
export const metadata: Metadata = {
  title: "Edit · Project INSPYR",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
