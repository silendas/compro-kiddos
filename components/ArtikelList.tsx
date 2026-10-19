"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: { seconds: number; nanoseconds: number };
};

const MAX_SNIPPET_LENGTH = 300;

export default function ArtikelList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/artikel")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data artikel:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-700 border-t-transparent mb-2"></div>
        <p className="text-gray-600">Memuat artikel...</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        Belum ada artikel yang dipublikasikan.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {articles.map((article) => (
        <article
          key={article.id}
          className="bg-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
        >
          <div className="p-6 flex flex-col flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 baloo">
              {article.title}
            </h2>
            <div className="text-gray-700 flex-grow">
              {article.content.length > MAX_SNIPPET_LENGTH ? (
                <>
                  <p>{article.content.substring(0, MAX_SNIPPET_LENGTH)}...</p>
                  <div className="mt-4">
                    <Link
                      href={`/artikel/${article.id}`}
                      className="text-green-700 hover:text-green-800 font-semibold"
                    >
                      Baca selengkapnya &rarr;
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p>{article.content}</p>
                  <div className="mt-4">
                    <Link
                      href={`/artikel/${article.id}`}
                      className="text-green-700 hover:text-green-800 font-semibold"
                    >
                      Baca selengkapnya &rarr;
                    </Link>
                  </div>
                </>
              )}
            </div>
            <small className="mt-6 text-gray-500 block">
              {new Date(article.createdAt.seconds * 1000).toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </small>
          </div>
        </article>
      ))}
    </div>
  );
}
