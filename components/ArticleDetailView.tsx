"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

type Article = {
  id: string;
  title: string;
  content: string;
  createdAt?: { seconds: number; nanoseconds: number };
};

export default function ArticleDetailView({ id }: { id: string }) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/artikel/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil artikel");
        return res.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-700 border-t-transparent mb-2"></div>
        <p className="text-gray-600">Memuat artikel...</p>
      </div>
    );
  }

  if (!article || (article as { error?: string }).error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 text-lg mb-4">Artikel tidak ditemukan.</p>
        <Link
          href="/artikel"
          className="inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Kembali ke Daftar Artikel
        </Link>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.content.substring(0, 160),
    author: {
      "@type": "Organization",
      name: "Bimbel Kiddos Zone",
    },
    publisher: {
      "@type": "Organization",
      name: "Bimbel Kiddos Zone",
      logo: {
        "@type": "ImageObject",
        url: "https://www.bimbelkiddoszone.com/assets/Logo_Kiddos.png",
      },
    },
    datePublished: article.createdAt?.seconds
      ? new Date(article.createdAt.seconds * 1000).toISOString()
      : undefined,
  };

  return (
    <article className="max-w-4xl mx-auto px-4 pt-6 md:pt-10 pb-16 min-h-[80vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <nav className="mb-4 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="list-reset flex flex-wrap gap-1">
          <li>
            <Link href="/" className="text-green-700 hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/artikel" className="text-green-700 hover:underline">
              Artikel
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-800 font-semibold truncate max-w-xs md:max-w-md">
            {article.title}
          </li>
        </ol>
      </nav>

      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-green-700 hover:underline font-medium cursor-pointer"
        >
          <FiArrowLeft className="mr-1" /> Kembali
        </button>
      </div>

      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 baloo">
          {article.title}
        </h1>
        {article.createdAt?.seconds && (
          <p className="text-gray-500 text-sm">
            Dipublikasikan pada:{" "}
            {new Date(article.createdAt.seconds * 1000).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>
        )}
      </header>

      <div className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base md:text-lg">
        {article.content}
      </div>
    </article>
  );
}
