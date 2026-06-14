import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle, CheckCircle2, Clock3, Loader2 } from "lucide-react";
import { getMyActivityLogs } from "../../services/activityLogService";
import { formatDateTimeIndonesia } from "../../utils/dateTime";
import { formatAction } from "../../utils/text";

export default function UserActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getMyActivityLogs();
        setLogs(res.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil activity log user:", err);
        setError("Activity log belum bisa dimuat. Pastikan backend berjalan dan token login masih valid.");
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return logs;
    return logs.filter((log) => String(log.action_description || "").toLowerCase().includes(q));
  }, [logs, keyword]);

  return (
    <section className="pt-3 w-full">
      <div className="grid lg:grid-cols-[minmax(0,720px)_1fr] gap-10 items-end mb-8">
        <div>
          <h1 className="text-[28px] font-black text-black mb-3">Activity Log</h1>
          <p className="text-[18px] leading-[1.45] text-black max-w-[720px]">
            Riwayat aktivitas akun kamu seperti membuat health profile, generate plan, membuka artikel, membuka resep, reminder, dan favorite resep.
          </p>
        </div>
        <div className="hidden lg:flex justify-end">
          <div className="bg-white rounded-3xl px-7 py-5 shadow-sm border border-slate-100 min-w-[260px]">
            <p className="text-sm text-slate-500">Total Aktivitas</p>
            <h2 className="text-4xl font-black text-[#10BB89] mt-1">{logs.length}</h2>
          </div>
        </div>
      </div>

      {keyword && <p className="text-sm text-slate-500 mb-5">Hasil pencarian: <b>{keyword}</b></p>}

      {loading ? (
        <div className="h-[300px] flex items-center justify-center text-slate-500 gap-3">
          <Loader2 className="animate-spin" /> Memuat activity log...
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-red-100 p-6 text-red-500 flex items-start gap-3">
          <AlertCircle /> <span>{error}</span>
        </div>
      ) : filteredLogs.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-slate-500">
          Belum ada activity log.
        </div>
      ) : (
        <div className="bg-white rounded-[24px] p-7 shadow-sm border border-slate-100 min-h-[520px]">
          <div className="space-y-5">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex gap-4 border-b border-slate-100 last:border-b-0 pb-5 last:pb-0">
                <div className="w-11 h-11 rounded-full bg-emerald-50 text-[#10BB89] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-black text-lg">{formatAction(log.action_description)}</h3>
                  <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
                    <Clock3 size={15} /> {formatDateTimeIndonesia(log.createdAt || log.created_at)} WIB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
