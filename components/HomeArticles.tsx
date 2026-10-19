"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getArticles, Article } from "@lib/articleService";

const MAX_SNIPPET_LENGTH = 180;

export default function HomeArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles(3)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat artikel beranda:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-8 text-center text-gray-500">
        Memuat artikel terbaru...
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        Belum ada artikel terbaru saat ini.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
      {articles.map((article) => (
        <article
          key={article.id}
          className="bg-gray-100 rounded-xl shadow hover:shadow-lg transition duration-300 p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 baloo">
              {article.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {article.content.length > MAX_SNIPPET_LENGTH
                ? `${article.content.substring(0, MAX_SNIPPET_LENGTH)}...`
                : article.content}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-sm">
            <span className="text-gray-500">
              {new Date((article.createdAt?.seconds || Date.now() / 1000) * 1000).toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </span>
            <Link
              href={`/artikel/${article.id}`}
              className="text-green-700 hover:text-green-800 font-semibold"
            >
              Baca Selengkapnya &rarr;
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
