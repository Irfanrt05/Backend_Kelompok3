import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Dumbbell, Flame, Plus, Trophy, Droplets, CalendarCheck, Heart, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { getDisplayName, getStoredUser, getUserAvatar } from "../utils/userStorage";
import { getHealthProfiles, getGeneratedPlans } from "../services/userHealthService";
import { getMyActivityLogs } from "../services/activityLogService";
import { getFavoriteRecipes } from "../services/favoriteService";
import { formatTimeIndonesia } from "../utils/dateTime";

const getPlanDetails = (plan) => plan?.plan_details || plan?.PlanDetails || plan?.planDetails || [];

export default function Dashboard() {
  const [user, setUser] = useState(() => getStoredUser() || {});
  const [profiles, setProfiles] = useState([]);
  const [plans, setPlans] = useState([]);
  const [logs, setLogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sync = () => setUser(getStoredUser() || {});
    window.addEventListener("user-updated", sync);
    return () => window.removeEventListener("user-updated", sync);
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const [profileRes, planRes, logRes, favoriteRes] = await Promise.all([
          getHealthProfiles().catch(() => ({ data: { data: [] } })),
          getGeneratedPlans().catch(() => ({ data: { data: [] } })),
          getMyActivityLogs().catch(() => ({ data: { data: [] } })),
          getFavoriteRecipes().catch(() => ({ data: { data: [] } })),
        ]);
        setProfiles(profileRes.data.data || []);
        setPlans(planRes.data.data || []);
        setLogs(logRes.data.data || []);
        setFavorites(favoriteRes.data.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const name = getDisplayName(user);
  const latestProfile = profiles[0];
  const activePlan = plans[0];
  const activePlanDetails = getPlanDetails(activePlan);
  const bmi = useMemo(() => {
    if (!latestProfile?.weight || !latestProfile?.height) return "-";
    const meter = Number(latestProfile.height) / 100;
    return (Number(latestProfile.weight) / (meter * meter)).toFixed(1);
  }, [latestProfile]);

  const todaySchedule = activePlanDetails[0];
  const upcoming = activePlanDetails.slice(1, 3);
  const lastLog = logs[0];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-12">
          <img src={getUserAvatar(user)} alt="Avatar" className="w-[92px] h-[92px] rounded-full object-cover bg-white" />
          <div>
            <h1 className="text-[28px] font-black text-black">Health Profile</h1>
            <p className="text-2xl mt-3 text-black">{name}</p>
          </div>
        </div>

        <Link to="/dashboard/generate-plan" className="bg-[#10BB89] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3">
          <Plus size={28} /> Buat Rencana
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card icon={<Dumbbell className="text-[#10BB89]" size={34} />} title="Total Aktivitas" value={loading ? "..." : `${logs.length} Aktivitas`} />
        <Card icon={<Heart className="text-rose-500" size={34} />} title="Favorite Resep" value={loading ? "..." : `${favorites.length} Resep`} />
        <div className="bg-white rounded-2xl h-[123px] px-5 py-5 flex items-center justify-between border border-slate-100 shadow-sm">
          <div>
            <p className="text-lg text-black">BMI Terbaru</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="w-[52px] h-[52px] rounded-full border-[5px] border-[#10BB89] flex items-center justify-center font-bold">{bmi}</div>
              <p className="font-semibold">{latestProfile ? `Goal: ${latestProfile.goal_type}` : "Belum ada profile"}</p>
            </div>
          </div>
          <ArrowUpRight className="text-slate-400" size={32} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
        <section>
          <h2 className="text-2xl font-black mb-3">Jadwal Hari ini</h2>
          <div className="bg-white rounded-2xl border-2 border-[#10BB89] p-8 min-h-[232px] shadow-sm">
            {todaySchedule ? (
              <>
                <div className="flex justify-between items-start gap-6">
                  <div>
                    <p className="text-[#10BB89] font-black text-lg uppercase">{todaySchedule.activity_type || "Aktivitas"}</p>
                    <h3 className="text-2xl font-black mt-4 uppercase">{todaySchedule.title}</h3>
                    <p className="text-sm mt-3 leading-relaxed">{todaySchedule.description}</p>
                  </div>
                  <p className="text-sm mt-12 whitespace-nowrap">{todaySchedule.day}</p>
                </div>
                <div className="flex justify-end mt-8">
                  <Link to="/dashboard/generate-plan" className="bg-[#10BB89] text-white text-xl font-black px-10 py-3 rounded-lg">Mulai</Link>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col justify-center">
                <p className="text-[#10BB89] font-black text-lg">BELUM ADA RENCANA</p>
                <h3 className="text-2xl font-black mt-4">Buat health plan pertama kamu</h3>
                <p className="text-sm mt-3">Isi health profile lalu generate rencana kesehatan dari backend.</p>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-2xl font-black">Rencana Aktif</h2>
            <Link to="/dashboard/generate-plan" className="text-sm underline">Lihat Semua</Link>
          </div>
          <div className="bg-white rounded-2xl p-8 min-h-[232px] shadow-sm border border-slate-100">
            {activePlan ? (
              <>
                <p className="text-[#10BB89] font-black text-lg uppercase">{activePlan.plan_period || "Weekly"}</p>
                <h3 className="text-2xl font-black mt-6">Target {activePlan.daily_calories_target || "-"} kcal/hari</h3>
                <p className="text-sm mt-3 leading-relaxed">{activePlan.summary}</p>
              </>
            ) : (
              <>
                <p className="text-[#10BB89] font-black text-lg">HEALTH PLAN</p>
                <h3 className="text-2xl font-black mt-6">Belum ada rencana aktif</h3>
                <p className="text-sm mt-3">Generate plan akan muncul di sini.</p>
              </>
            )}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
        <section>
          <h2 className="text-2xl font-black mb-3">Akan Datang</h2>
          <div className="space-y-4">
            {upcoming.length ? upcoming.map((item) => (
              <Upcoming key={item.id || item.day} icon={<CalendarCheck size={32} />} title={item.title} time={item.day} />
            )) : (
              <>
                <Upcoming icon={<Dumbbell size={32} />} title="Generate plan untuk melihat jadwal" time="-" />
                <Upcoming icon={<Droplets size={32} />} title="Tambahkan reminder dari menu habit" time="-" />
              </>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black mb-3">Aktivitas Terakhir</h2>
          <div className="bg-white rounded-2xl min-h-[220px] p-8 shadow-sm border border-slate-100">
            {lastLog ? (
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#10BB89] flex items-center justify-center">
                  <ClipboardList size={28} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Terakhir dilakukan pukul {formatTimeIndonesia(lastLog.createdAt || lastLog.created_at)} WIB</p>
                  <h3 className="text-2xl font-black mt-2">{String(lastLog.action_description || "Aktivitas").replaceAll("_", " ")}</h3>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[150px] text-slate-500">Belum ada aktivitas.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Card({ icon, title, value }) {
  return (
    <div className="bg-white rounded-2xl h-[123px] px-5 py-5 flex items-center gap-5 border border-slate-100 shadow-sm">
      {icon}
      <div>
        <p className="text-lg text-black">{title}</p>
        <h3 className="text-[28px] font-black mt-4 text-black">{value}</h3>
      </div>
    </div>
  );
}

function Upcoming({ icon, title, time }) {
  return (
    <div className="h-[60px] rounded-2xl bg-green-100 flex items-center justify-between px-4">
      <div className="flex items-center gap-4 text-[#10BB89]">
        {icon}
        <p className="text-black text-sm">{title}</p>
      </div>
      <p className="text-sm text-black">{time}</p>
    </div>
  );
}
