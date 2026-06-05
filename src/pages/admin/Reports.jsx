import { Download, FileText, TrendingUp, Users, Package } from "lucide-react";

export default function Reports() {
  const stats = [
    {
      title: "Total Laporan",
      val: "1,284",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Pertumbuhan User",
      val: "+12.5%",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
    {
      title: "Blog Aktif",
      val: "842",
      icon: Package,
      color: "text-indigo-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Laporan */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            Analisis Laporan
          </h1>
          <p className="text-sm text-slate-500">
            Ringkasan performa sistem Probit bulan ini.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#10BB89] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#0ea58a] transition shadow-lg shadow-emerald-200">
          <Download size={16} /> Export PDF
        </button>
      </div>

      {/* Statistik Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4"
          >
            <div className={`p-4 rounded-2xl bg-slate-50 ${item.color}`}>
              <item.icon size={24} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {item.title}
              </p>
              <p className="text-2xl font-black text-slate-800">{item.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabel Detail Laporan */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-slate-800">
          Histori Laporan Terbaru
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-wider">
                <th className="pb-4">Nama Laporan</th>
                <th className="pb-4">Kategori</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <tr key={i} className="hover:bg-slate-50 transition">
                  <td className="py-4 font-bold text-slate-700">
                    Laporan Aktivitas User {i + 1}
                  </td>
                  <td className="py-4 text-sm text-slate-500">User Growth</td>
                  <td className="py-4 text-sm">
                    <span className="px-3 py-1 bg-emerald-50 text-[#10BB89] rounded-full text-[10px] font-bold uppercase">
                      Selesai
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-400">05 Jun 2026</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
