import {
  FaClipboardList,
  FaBookOpen,
  FaGamepad,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

interface StepItem {
  number: number;
  title: string;
  desc: string;
  highlight: string;
  icon: React.ReactNode;
}

const STEPS: StepItem[] = [
  {
    number: 1,
    title: "Assessment Awal",
    desc: "Kami mengenali kebutuhan, gaya belajar, dan kemampuan awal anak melalui evaluasi ramah dan menyenangkan tanpa tekanan.",
    highlight: "Kenali Potensi & Kebutuhan",
    icon: <FaClipboardList className="text-3xl text-orange-500" />,
  },
  {
    number: 2,
    title: "Penyesuaian Materi",
    desc: "Materi belajar dipersonalisasi sesuai kebutuhan unik anak serta target capaian akademik yang ingin diraih orang tua.",
    highlight: "Kurikulum Personal",
    icon: <FaBookOpen className="text-3xl text-amber-500" />,
  },
  {
    number: 3,
    title: "Sesi Belajar Interaktif",
    desc: "Metode belajar ceria dilengkapi game edukatif interaktif dan bank soal daring agar anak antusias dan tidak cepat bosan.",
    highlight: "Game & Soal Daring",
    icon: <FaGamepad className="text-3xl text-orange-500" />,
  },
  {
    number: 4,
    title: "Evaluasi & Laporan Real-Time",
    desc: "Evaluasi perkembangan anak dan laporan hasil belajar berkala yang dapat dipantau langsung oleh orang tua secara transparan.",
    highlight: "Pantauan Langsung Orang Tua",
    icon: <FaChartLine className="text-3xl text-amber-600" />,
  },
];

export default function LearningMethodSection() {
  return (
    <section
      id="metode-belajar"
      className="w-full py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-white text-gray-800 relative overflow-hidden scroll-mt-24 border-y border-amber-100"
      aria-label="Metode Belajar Terarah dan Terukur"
    >
      {/* Background Soft Yellow/Orange Glow */}
      <div className="absolute -top-20 left-1/4 w-80 h-80 bg-yellow-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-amber-100 text-orange-700 px-4 py-1.5 rounded-full mb-3 border border-amber-200">
            <FaCheckCircle className="text-orange-500 text-xs" /> Alur Belajar Terarah &amp; Terukur
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black baloo leading-tight text-gray-800">
            Metode Belajar yang <span className="text-orange-500">Terarah</span> &amp; <span className="text-amber-500">Terukur</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 font-sans leading-relaxed">
            Setiap anak memiliki keunikan dan ritme belajar sendiri. Kami menerapkan 4 tahapan belajar sistematis untuk memastikan perkembangan ananda tercapai maksimal.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Subtle Desktop Connecting Line between cards */}
          <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-1 bg-gradient-to-r from-orange-200 via-amber-200 to-orange-200 -z-0 rounded-full" />

          {STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white border-2 border-amber-100 hover:border-orange-300 rounded-3xl p-6 text-center flex flex-col items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group z-10"
            >
              <div className="flex flex-col items-center">
                {/* Circle Icon Container with Number Badge */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 sm:w-22 sm:h-22 bg-gradient-to-br from-amber-50 to-orange-100/70 rounded-full flex items-center justify-center border-2 border-amber-200 group-hover:scale-105 transition duration-300 shadow-sm">
                    {step.icon}
                  </div>
                  {/* Step Number Badge */}
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-7 h-7 bg-orange-500 text-white font-extrabold text-xs rounded-full flex items-center justify-center border-2 border-white shadow">
                    {step.number}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold baloo text-gray-800 mt-2 mb-1.5 leading-snug">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed mb-4">
                  {step.desc}
                </p>
              </div>

              {/* Tag Highlight Badge */}
              <div className="pt-3 border-t border-amber-50 w-full">
                <span className="inline-block text-[11px] font-bold text-orange-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  {step.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-10 text-center bg-white border border-amber-200 rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto shadow-sm">
          <p className="text-xs sm:text-sm text-gray-700 font-sans leading-relaxed">
            ✨ <strong>Pantauan Transparan:</strong> Perkembangan ananda selalu dievaluasi berkala dan dapat dikonsultasikan langsung bersama tim pengajar kami setiap saat.
          </p>
        </div>
      </div>
    </section>
  );
}
