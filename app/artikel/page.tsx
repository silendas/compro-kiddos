"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: { seconds: number; nanoseconds: number };
};

const MAX_SNIPPET_LENGTH = 300;

export default function ArtikelPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/artikel")
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-[80vh] bg-white">
      <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="flex space-x-2">
          <li>
            <Link href="/" className="text-blue-500 hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-800 font-medium">Artikel</li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-8 text-gray-800">Artikel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
          >
            <div className="p-6 flex flex-col h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {article.title}
              </h2>
              <div className="text-gray-700 flex-grow">
                {article.content.length > MAX_SNIPPET_LENGTH ? (
                  <>
                    <p>
                      {article.content.substring(0, MAX_SNIPPET_LENGTH)}...
                    </p>
                    <div className="mt-4">
                      <Link
                        href={`/artikel/${article.id}`}
                        className="text-blue-500 hover:underline font-medium"
                      >
                        Lihat selengkapnya
                      </Link>
                    </div>
                  </>
                ) : (
                  <p>{article.content}</p>
                )}
              </div>
              <small className="mt-6 text-gray-500">
                {new Date(article.createdAt.seconds * 1000).toLocaleString()}
              </small>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
