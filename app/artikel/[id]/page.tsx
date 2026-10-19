import type { Metadata } from "next";
import ArticleDetailView from "@comp/ArticleDetailView";
import { getAllArticleIds, getArticleById } from "@lib/articleService";

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

      return {
        title,
        description: snippet,
        alternates: {
          canonical: `/artikel/${id}`,
        },
        openGraph: {
          title: `${title} | Bimbel Kiddos Zone`,
          description: snippet,
          type: "article",
          url: `https://www.bimbelkiddoszone.com/artikel/${id}`,
        },
        twitter: {
          card: "summary_large_image",
          title,
          description: snippet,
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
  return <ArticleDetailView id={id} />;
}
