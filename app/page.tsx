import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center text-center py-12 px-4 md:px-6">
      {/* Hero Section */}
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Bimbel Kiddos Zone - Bimbingan Belajar Terbaik di Bogor
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-700">
          Dapatkan pengalaman belajar terbaik untuk anak-anak dengan metode
          interaktif dan menyenangkan. Bergabunglah bersama kami sekarang!
        </p>
        <Link
          href="/daftar"
          className="mt-6 inline-block bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Daftar Sekarang
        </Link>
      </div>

      {/* Gambar Hero */}
      <div className="mt-6 w-full max-w-lg">
        <Image
          src="/images/hero-bimbel.jpg"
          alt="Bimbel Kiddos Zone Bogor"
          width={800}
          height={500}
          className="rounded-lg shadow-lg w-full h-auto"
          priority
        />
      </div>

      {/* Section Keunggulan */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {features.map((feature) => (
          <div key={feature.title} className="p-6 bg-white rounded-lg shadow-md text-center">
            <Image
              src={feature.icon}
              alt={feature.title}
              width={50}
              height={50}
              className="mx-auto"
            />
            <h2 className="mt-4 text-lg md:text-xl font-semibold text-gray-900">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-blue-600 text-white text-center py-8 px-4 md:px-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-xl md:text-2xl font-semibold">
          Siap Bergabung dengan Bimbel Kiddos Zone?
        </h2>
        <p className="mt-3 text-base md:text-lg">
          Daftar sekarang dan mulai perjalanan belajar yang menyenangkan!
        </p>
        <Link
          href="/daftar"
          className="mt-5 inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
        >
          Daftar Sekarang
        </Link>
      </div>
    </section>
  );
}

// Data Keunggulan
const features = [
  {
    title: "Tutor Berpengalaman",
    description:
      "Guru profesional dan berpengalaman yang siap membimbing anak-anak Anda.",
    icon: "/icons/tutor.png",
  },
  {
    title: "Metode Interaktif",
    description:
      "Belajar dengan metode menyenangkan dan interaktif agar anak lebih cepat memahami.",
    icon: "/icons/interactive.png",
  },
  {
    title: "Lingkungan Nyaman",
    description:
      "Suasana belajar yang nyaman dan kondusif untuk meningkatkan fokus dan semangat belajar.",
    icon: "/icons/classroom.png",
  },
];
