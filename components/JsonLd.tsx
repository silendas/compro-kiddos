import { SITE_CONFIG } from "@data/siteConfig";

export default function JsonLd() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        alternateName: ["Bimbel Kiddos Zone Bogor", "Kiddos Zone"],
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/assets/Logo_Kiddos.png`,
        image: `${SITE_CONFIG.url}/og-image.jpg`,
        description: SITE_CONFIG.description,
        telephone: "+6285156732275",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE_CONFIG.contact.address.street,
          addressLocality: SITE_CONFIG.contact.address.village,
          addressRegion: SITE_CONFIG.contact.address.city,
          postalCode: SITE_CONFIG.contact.address.postalCode,
          addressCountry: SITE_CONFIG.contact.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -6.582,
          longitude: 106.815,
        },
        sameAs: [
          SITE_CONFIG.social.instagram,
          SITE_CONFIG.social.facebook,
          SITE_CONFIG.social.tiktok,
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "6",
          bestRating: "5",
          worstRating: "1",
        },
        department: SITE_CONFIG.branches.map((branch) => ({
          "@type": "EducationalOrganization",
          name: branch.title,
          address: branch.address,
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        publisher: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
        inLanguage: "id-ID",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
