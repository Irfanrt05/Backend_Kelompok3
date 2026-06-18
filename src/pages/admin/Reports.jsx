import { useEffect, useMemo, useState } from "react";
import { Activity, FileText, Loader2, Newspaper, Users, Utensils } from "lucide-react";
import { getAdminActivityLogs } from "../../services/activityLogService";
import { getBlogs } from "../../services/blogService";
import { getRecipes } from "../../services/recipeService";
import api from "../../services/api";
import { formatDateTimeIndonesia } from "../../utils/dateTime";
import { formatAction } from "../../utils/text";

export default function Reports() {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const [logRes, userRes, blogRes, recipeRes] = await Promise.all([
          getAdminActivityLogs().catch(() => ({ data: { data: [] } })),
          api.get("/admin/users").catch(() => ({ data: { data: [] } })),
          getBlogs().catch(() => ({ data: { data: [] } })),
          getRecipes().catch(() => ({ data: { data: [] } })),
        ]);
        setLogs(logRes.data.data || []);
        setUsers(userRes.data.data || []);
        setBlogs(blogRes.data.data || []);
        setRecipes(recipeRes.data.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const userActivities = useMemo(() => logs.filter((log) => log.User?.role === "user"), [logs]);
  const adminActivities = useMemo(() => logs.filter((log) => log.User?.role === "admin"), [logs]);
  const latest = logs.slice(0, 12);

  const stats = [
    { title: "Aktivitas User", val: userActivities.length, icon: Activity, color: "text-emerald-500" },
    { title: "Total User", val: users.length, icon: Users, color: "text-blue-500" },
    { title: "Artikel", val: blogs.length, icon: Newspaper, color: "text-indigo-500" },
    { title: "Resep", val: recipes.length, icon: Utensils, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Laporan Aktivitas</h1>
          <p className="text-sm text-slate-500">Laporan ini mengikuti data activity log yang tersimpan di backend.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.title} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-2xl bg-slate-50 ${item.color}`}><item.icon size={24} /></div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.title}</p>
              <p className="text-2xl font-black text-slate-800">{loading ? "..." : item.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2"><FileText size={20} /> Histori Aktivitas Terbaru</h3>
          {loading ? (
            <div className="h-[260px] flex items-center justify-center text-slate-500 gap-3"><Loader2 className="animate-spin" /> Memuat laporan...</div>
          ) : latest.length === 0 ? (
            <div className="p-10 text-center text-slate-500">Belum ada laporan aktivitas.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                    <th className="pb-4">Aktivitas</th>
                    <th className="pb-4">User</th>
                    <th className="pb-4">Role</th>
                    <th className="pb-4">Waktu Indonesia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {latest.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition">
                      <td className="py-4 font-bold text-slate-700">{formatAction(log.action_description)}</td>
                      <td className="py-4 text-sm text-slate-600">
                        <div className="font-bold text-slate-800">{log.User?.username || "User"}</div>
                        <div className="text-xs text-slate-400">{log.User?.email || "-"}</div>
                      </td>
                      <td className="py-4 text-sm"><span className="px-3 py-1 bg-emerald-50 text-[#10BB89] rounded-full text-[10px] font-bold uppercase">{log.User?.role || "-"}</span></td>
                      <td className="py-4 text-sm text-slate-500">{formatDateTimeIndonesia(log.createdAt || log.created_at)} WIB</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm h-fit">
          <h3 className="font-black text-slate-800 mb-5">Ringkasan Role</h3>
          <div className="space-y-4">
            <Summary label="User Activity" value={userActivities.length} />
            <Summary label="Admin Activity" value={adminActivities.length} />
            <Summary label="Total Activity" value={logs.length} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Summary({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
      <span className="text-sm font-bold text-slate-600">{label}</span>
      <span className="text-lg font-black text-[#10BB89]">{value}</span>
    </div>
  );
}
