import type { Metadata } from "next";
import ArticleDetailView from "@comp/ArticleDetailView";
import { getAllArticleIds, getArticleById } from "@lib/articleService";
import { SITE_CONFIG } from "@data/siteConfig";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const ids = await getAllArticleIds();
    if (ids.length > 0) return ids;
  } catch (e) {
    console.warn("generateStaticParams offline:", e);
  }
  return [{ id: "default" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await getArticleById(id);

    if (data) {
      const title = data.title || "Artikel";
      const snippet = data.content
        ? data.content.substring(0, 160).replace(/\n/g, " ")
        : "Artikel edukatif Bimbel Kiddos Zone Bogor.";

      const canonicalIdentifier = data.slug || id;

      return {
        title,
        description: snippet,
        alternates: {
          canonical: `/artikel/${canonicalIdentifier}`,
        },
        openGraph: {
          title: `${title} | Bimbel Kiddos Zone`,
          description: snippet,
          type: "article",
          url: `${SITE_CONFIG.url}/artikel/${canonicalIdentifier}`,
          images: [
            {
              url: "/og-image.jpg",
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description: snippet,
          images: ["/og-image.jpg"],
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata for article:", error);
  }

  return {
    title: "Detail Artikel",
    description: "Baca artikel dan tips edukasi dari Bimbel Kiddos Zone Bogor.",
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params;
  let article = null;
  try {
    article = await getArticleById(id);
  } catch (error) {
    console.warn("Error fetching article server-side:", error);
  }

  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.content ? article.content.substring(0, 160).replace(/\n/g, " ") : "",
        author: {
          "@type": "Organization",
          name: "Bimbel Kiddos Zone",
          url: SITE_CONFIG.url,
        },
        publisher: {
          "@type": "Organization",
          name: "Bimbel Kiddos Zone",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_CONFIG.url}/assets/Logo_Kiddos.png`,
          },
        },
        datePublished: article.createdAt?.seconds
          ? new Date(article.createdAt.seconds * 1000).toISOString()
          : undefined,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_CONFIG.url}/artikel/${article.slug || id}`,
        },
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Artikel",
        item: `${SITE_CONFIG.url}/artikel`,
      },
      ...(article
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
              item: `${SITE_CONFIG.url}/artikel/${article.slug || id}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <ArticleDetailView id={id} initialArticle={article} />
    </>
  );
}
