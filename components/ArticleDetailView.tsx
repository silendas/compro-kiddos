"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { getArticleById, Article } from "@lib/articleService";

export default function ArticleDetailView({
  id,
  initialArticle,
}: {
  id: string;
  initialArticle?: Article | null;
}) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(initialArticle || null);
  const [loading, setLoading] = useState(!initialArticle);

  useEffect(() => {
    if (!id || initialArticle) return;
    getArticleById(id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil artikel:", err);
        setLoading(false);
      });
  }, [id, initialArticle]);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent mb-2"></div>
        <p className="text-gray-600">Memuat artikel...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 text-lg mb-4">Artikel tidak ditemukan.</p>
        <Link
          href="/artikel"
          className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Kembali ke Daftar Artikel
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 pt-6 md:pt-10 pb-16 min-h-[80vh]">
      <nav className="mb-4 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="list-reset flex flex-wrap gap-1">
          <li>
            <Link href="/" className="text-orange-600 hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/artikel" className="text-orange-600 hover:underline">
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
          className="flex items-center text-orange-600 hover:underline font-medium cursor-pointer"
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
