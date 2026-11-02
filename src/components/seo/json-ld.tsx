import { site } from "@content/site";
import { socialLinks } from "@content/social";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    url: siteUrl,
    logo: absoluteUrl("/icon.svg"),
    description: site.description,
    slogan: site.lockupLine,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    areaServed: [site.location.city, site.location.country],
    sameAs: socialLinks.map((l) => l.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
