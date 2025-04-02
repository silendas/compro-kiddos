"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: { seconds: number; nanoseconds: number };
};

export default function ArticleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/artikel/${id}`)
      .then((res) => res.json())
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
    return <p className="text-center mt-10">Memuat artikel...</p>;
  }

  if (!article) {
    return (
      <p className="text-center mt-10 text-red-500">Artikel tidak ditemukan</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[80vh]">
      <div className="mb-4">
        <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="list-reset flex">
            <li>
              <Link href="/" className="text-blue-500 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href="/artikel" className="text-blue-500 hover:underline">
                Artikel
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>{article.title}</li>
          </ol>
        </nav>
      </div>

      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-500 hover:underline"
        >
          <FiArrowLeft className="mr-1" /> Kembali
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        {article.title}
      </h1>
      <p className="text-gray-500 mb-4">
        {new Date(article.createdAt.seconds * 1000).toLocaleString()}
      </p>
      <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
        {article.content}
      </div>
    </div>
  );
}
