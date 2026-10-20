import { SITE_CONFIG } from "@data/siteConfig";

export default function JsonLd() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: "Bimbel Kiddos Zone Bogor",
        alternateName: [
          "Bimbel Kiddos Zone",
          "Kiddos Zone Bogor",
          "Les Calistung Kiddos Zone Bogor",
        ],
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/assets/Logo_Kiddos.png`,
        image: `${SITE_CONFIG.url}/og-image.jpg`,
        description: SITE_CONFIG.description,
        telephone: "+6285156732275",
        priceRange: "$$",
        currenciesAccepted: "IDR",
        paymentAccepted: "Cash, Transfer Bank",
        hasMap: "https://maps.google.com/?q=Bimbel+Kiddos+Zone+Bogor",
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
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "08:00",
            closes: "17:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "08:00",
            closes: "15:00",
          },
        ],
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Kota Bogor",
          },
          {
            "@type": "AdministrativeArea",
            name: "Kabupaten Bogor",
          },
          {
            "@type": "Place",
            name: "Bogor Utara",
          },
          {
            "@type": "Place",
            name: "Cimahpar",
          },
          {
            "@type": "Place",
            name: "Ciluar",
          },
          {
            "@type": "Place",
            name: "Sukaraja",
          },
          {
            "@type": "Place",
            name: "Bantarjati",
          },
          {
            "@type": "Place",
            name: "Baranangsiang",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Program Bimbingan Belajar Bimbel Kiddos Zone Bogor",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Les Calistung Bogor (Baca, Tulis, Hitung)",
                description:
                  "Metode belajar membaca, menulis, dan berhitung yang ceria, ramah anak, dan tanpa tekanan untuk persiapan masuk SD di Bogor.",
                provider: {
                  "@type": "EducationalOrganization",
                  name: "Bimbel Kiddos Zone",
                  url: SITE_CONFIG.url,
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Program PraCalis Usia Dini Bogor",
                description:
                  "Program stimulasi motorik dan kognitif interaktif untuk anak usia 3 hingga 4,5 tahun.",
                provider: {
                  "@type": "EducationalOrganization",
                  name: "Bimbel Kiddos Zone",
                  url: SITE_CONFIG.url,
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Bimbel Mapel & Tematik SD di Bogor",
                description:
                  "Pendampingan belajar tuntas PR dan pemahaman konsep sekolah bagi siswa SD kelas 1 hingga 6.",
                provider: {
                  "@type": "EducationalOrganization",
                  name: "Bimbel Kiddos Zone",
                  url: SITE_CONFIG.url,
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Les Privat Datang ke Rumah di Bogor",
                description:
                  "Layanan eksklusif 1 guru 1 murid di mana tutor datang langsung ke rumah siswa di wilayah Kota & Kab. Bogor.",
                provider: {
                  "@type": "EducationalOrganization",
                  name: "Bimbel Kiddos Zone",
                  url: SITE_CONFIG.url,
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Les Matematika & Bahasa Inggris Anak Bogor",
                description:
                  "Pengembangan logika hitung cepat (Kalkulator Tangan Prisma) dan bahasa Inggris praktis untuk anak-anak.",
                provider: {
                  "@type": "EducationalOrganization",
                  name: "Bimbel Kiddos Zone",
                  url: SITE_CONFIG.url,
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Les Mengaji & BTQ Al-Qur'an Anak Bogor",
                description:
                  "Bimbingan Baca Tulis Al-Qur'an, tajwid, dan hafalan doa harian sejak dini.",
                provider: {
                  "@type": "EducationalOrganization",
                  name: "Bimbel Kiddos Zone",
                  url: SITE_CONFIG.url,
                },
              },
            },
          ],
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
          address: {
            "@type": "PostalAddress",
            streetAddress: branch.address,
            addressLocality: "Bogor",
            addressRegion: "Jawa Barat",
            addressCountry: "ID",
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_CONFIG.url}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Program bimbingan belajar apa saja yang tersedia di Bimbel Kiddos Zone Bogor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Bimbel Kiddos Zone Bogor menyediakan bimbingan belajar PraCalis (usia 3–4,5 tahun), Calistung (Baca, Tulis, Hitung untuk usia TK/SD), Bimbingan Tematik & PR Mapel SD/SMP, Les Matematika interaktif, Bahasa Inggris anak, BTQ Al-Qur'an, serta layanan les privat guru datang ke rumah di seluruh area Kota dan Kabupaten Bogor.",
            },
          },
          {
            "@type": "Question",
            name: "Di mana saja titik lokasi cabang Bimbel Kiddos Zone di wilayah Bogor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Kami memiliki cabang strategis di Bogor: Cabang Kenari Pusat (Cimahpar, Bogor Utara), Cabang Poren (Ciluar, Bogor Utara), Cabang Alamanda (Sukaraja, Kab. Bogor), dan Cabang Petir Cimahpar.",
            },
          },
          {
            "@type": "Question",
            name: "Apakah tersedia les privat guru datang langsung ke rumah di Bogor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ya, kami menyediakan program Les Privat di mana tutor berpengalaman datang langsung ke rumah siswa di wilayah Kota Bogor dan Kabupaten Bogor dengan jadwal yang fleksibel.",
            },
          },
          {
            "@type": "Question",
            name: "Berapa usia minimal anak untuk bisa mulai belajar di Kiddos Zone?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Anak dapat mulai belajar sejak usia 3 tahun melalui program PraCalis. Untuk program Calistung reguler dibuka untuk usia 4 hingga 7 tahun persiapan masuk SD.",
            },
          },
          {
            "@type": "Question",
            name: "Bagaimana metode belajar Calistung di Bimbel Kiddos Zone?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Metode belajar mengusung prinsip 'Cerdas, Ceria, Bertaqwa' yang ramah anak (fun learning), tanpa tekanan, menggunakan kartu bergambar, permainan edukatif, dan pendekatan personal.",
            },
          },
          {
            "@type": "Question",
            name: "Bagaimana cara pendaftaran dan apakah ada konsultasi gratis?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pendaftaran dan konsultasi gratis dapat dilakukan melalui WhatsApp resmi di 0851-5673-2275 atau dengan berkunjung langsung ke cabang terdekat di wilayah Bogor.",
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: "Bimbel Kiddos Zone Bogor",
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
