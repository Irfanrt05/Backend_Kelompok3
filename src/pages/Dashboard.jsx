import {
  Activity,
  HeartPulse,
  Flame,
  Target,
  ArrowUpRight,
  BookOpen,
  Utensils,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Aktivitas Hari Ini",
      value: "12",
      icon: Activity,
    },
    {
      title: "Kalori Masuk",
      value: "1850",
      suffix: "kcal",
      icon: Flame,
    },
    {
      title: "Skor Kesehatan",
      value: "82",
      suffix: "/100",
      icon: HeartPulse,
    },
    {
      title: "Target Mingguan",
      value: "85%",
      icon: Target,
    },
  ];

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#10BB89] to-[#0E9F75] p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black">Halo, User 👋</h1>

            <p className="mt-3 text-white/80 max-w-xl">
              Selamat datang kembali di PROBIT. Pantau kesehatan, produktivitas,
              dan pola hidup sehat Anda setiap hari.
            </p>
          </div>

          <div className="hidden lg:block backdrop-blur-xl bg-white/15 border border-white/20 rounded-3xl px-8 py-6">
            <p className="text-white/70 text-sm">Health Score</p>

            <h2 className="text-5xl font-black mt-2">82</h2>

            <p className="text-sm text-white/80">Sangat Baik</p>
          </div>
        </div>
      </div>

      {/* STATISTIC */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                relative overflow-hidden
                bg-white/70
                backdrop-blur-xl
                border border-white
                rounded-[28px]
                p-6
                shadow-lg
                hover:-translate-y-1
                hover:shadow-xl
                transition-all duration-300
              "
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#10BB89]/10 rounded-full blur-2xl" />

              <div className="relative flex justify-between">
                <div>
                  <p className="text-slate-500 text-sm">{item.title}</p>

                  <h2 className="text-3xl font-black mt-3 text-slate-800">
                    {item.value}
                    <span className="text-sm ml-1">{item.suffix}</span>
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#10BB89]/10 flex items-center justify-center">
                  <Icon size={28} className="text-[#10BB89]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* GRID */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* PROGRESS */}
        <div className="xl:col-span-2 bg-white/70 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-black text-xl text-slate-800">
              Progress Mingguan
            </h2>

            <ArrowUpRight size={18} className="text-slate-400" />
          </div>

          <div className="space-y-5">
            {[
              ["Senin", 75],
              ["Selasa", 90],
              ["Rabu", 60],
              ["Kamis", 95],
              ["Jumat", 80],
            ].map(([day, value]) => (
              <div key={day}>
                <div className="flex justify-between text-sm mb-2">
                  <span>{day}</span>
                  <span>{value}%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#10BB89] to-[#0E9F75]"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTION */}
        <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-lg">
          <h2 className="font-black text-xl mb-6">Quick Action</h2>

          <div className="space-y-4">
            <button className="w-full bg-[#10BB89] text-white p-4 rounded-2xl font-semibold hover:scale-[1.02] transition">
              Catat Kesehatan
            </button>

            <button className="w-full bg-slate-100 p-4 rounded-2xl font-semibold hover:bg-slate-200 transition">
              Tambah Aktivitas
            </button>

            <button className="w-full bg-slate-100 p-4 rounded-2xl font-semibold hover:bg-slate-200 transition">
              Lihat Blog
            </button>

            <button className="w-full bg-slate-100 p-4 rounded-2xl font-semibold hover:bg-slate-200 transition">
              Lihat Resep
            </button>
          </div>
        </div>
      </div>

      {/* BLOG TERBARU */}
      <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-black text-xl">Artikel Terbaru</h2>

          <BookOpen className="text-[#10BB89]" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-3xl overflow-hidden bg-slate-50 hover:shadow-lg transition"
            >
              <div className="h-40 bg-gradient-to-r from-[#10BB89] to-[#0E9F75]" />

              <div className="p-4">
                <h3 className="font-bold text-slate-800">
                  Pentingnya Pola Hidup Sehat
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  Pelajari cara menjaga tubuh tetap sehat dan produktif setiap
                  hari.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RESEP */}
      <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-black text-xl">Rekomendasi Resep</h2>

          <Utensils className="text-[#10BB89]" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {["Salad Protein", "Sup Sayur Sehat", "Avocado Toast"].map(
            (recipe) => (
              <div
                key={recipe}
                className="bg-slate-50 rounded-3xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-40 bg-gradient-to-r from-slate-200 to-slate-100" />

                <div className="p-4">
                  <h3 className="font-bold">{recipe}</h3>

                  <p className="text-sm text-slate-500 mt-2">
                    Kalori rendah dan nutrisi tinggi untuk menjaga kesehatan
                    tubuh.
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
