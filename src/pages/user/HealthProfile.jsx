import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Edit3,
  HeartPulse,
  Plus,
  Save,
  Trash2,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import {
  createHealthProfile,
  deleteHealthProfile,
  getHealthProfiles,
  updateHealthProfile,
} from "../../services/userHealthService";

const initialForm = {
  age: "",
  gender: "male",
  weight: "",
  height: "",
  activity_level: "medium",
  goal_type: "maintain",
  budget_limit: "",
};

const goalLabels = {
  maintain: "Menjaga Berat",
  bulking: "Menaikkan Massa",
  cutting: "Menurunkan Berat",
  diet: "Diet Sehat",
};

const activityLabels = {
  low: "Rendah",
  medium: "Sedang",
  high: "Tinggi",
};

export default function HealthProfile() {
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const selectedProfile = useMemo(() => profiles[0], [profiles]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await getHealthProfiles();
      setProfiles(res.data.data || []);
    } catch (error) {
      setMessage(error.response?.data?.message || "Gagal mengambil health profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      age: form.age ? Number(form.age) : null,
      gender: form.gender,
      weight: Number(form.weight),
      height: Number(form.height),
      activity_level: form.activity_level,
      goal_type: form.goal_type,
      budget_limit: form.budget_limit ? Number(form.budget_limit) : null,
    };

    if (!payload.weight || !payload.height || !payload.goal_type) {
      setMessage("Berat, tinggi, dan tujuan kesehatan wajib diisi");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await updateHealthProfile(editingId, payload);
        setMessage("Health profile berhasil diperbarui");
        setMessageType("success");
      } else {
        await createHealthProfile(payload);
        setMessage("Health profile berhasil dibuat");
        setMessageType("success");
      }
      resetForm();
      fetchProfiles();
    } catch (error) {
        console.log("ERROR DARI BACKEND:", error.response?.data);
        const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Gagal menyimpan health profile";
        
        setMessage(backendMessage);
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

  const handleEdit = (profile) => {
    setEditingId(profile.id);
    setForm({
      age: profile.age || "",
      gender: profile.gender || "male",
      weight: profile.weight || "",
      height: profile.height || "",
      activity_level: profile.activity_level || "medium",
      goal_type: profile.goal_type || "maintain",
      budget_limit: profile.budget_limit || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus health profile ini?")) return;

    try {
      setLoading(true);
      await deleteHealthProfile(id);
      setMessage("Health profile berhasil dihapus");
      fetchProfiles();
      setMessageType("success");
    } catch (error) {
      console.log("ERROR DARI BACKEND:", error.response?.data);
      const backendMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Gagal menyimpan health profile";
      
      setMessage(backendMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const calculateBmi = (profile) => {
    if (!profile?.weight || !profile?.height) return "-";
    const heightMeter = Number(profile.height) / 100;
    return (Number(profile.weight) / (heightMeter * heightMeter)).toFixed(1);
  };

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#10BB89] to-[#0E9F75] p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-white/70 font-semibold uppercase tracking-[0.3em] text-xs">
              User Profile
            </p>
            <h1 className="text-4xl font-black mt-2">Health Profile</h1>
            <p className="mt-3 text-white/80 max-w-2xl">
              Simpan data kesehatan pengguna sebagai dasar untuk membuat rencana makanan, olahraga,
              dan aktivitas harian secara otomatis.
            </p>
          </div>
          <div className="bg-white/15 border border-white/20 rounded-3xl px-8 py-6 backdrop-blur-xl">
            <p className="text-sm text-white/70">BMI Terbaru</p>
            <h2 className="text-5xl font-black mt-2">{calculateBmi(selectedProfile)}</h2>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <form
          onSubmit={handleSubmit}
          className="xl:col-span-1 bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-lg space-y-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-black text-xl text-slate-800">
              {editingId ? "Edit Profile" : "Buat Profile"}
            </h2>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X size={18} />
              </button>
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-[#10BB89]/10 flex items-center justify-center text-[#10BB89]">
                <Plus size={20} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Usia" name="age" type="number" value={form.age} onChange={handleChange} />
            <Select label="Gender" name="gender" value={form.gender} onChange={handleChange}>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Berat (kg)" name="weight" type="number" value={form.weight} onChange={handleChange} required />
            <Input label="Tinggi (cm)" name="height" type="number" value={form.height} onChange={handleChange} required />
          </div>

          <Select label="Level Aktivitas" name="activity_level" value={form.activity_level} onChange={handleChange}>
            <option value="low">Rendah</option>
            <option value="medium">Sedang</option>
            <option value="high">Tinggi</option>
          </Select>

          <Select label="Tujuan Kesehatan" name="goal_type" value={form.goal_type} onChange={handleChange}>
            <option value="maintain">Menjaga Berat</option>
            <option value="bulking">Menaikkan Massa</option>
            <option value="cutting">Menurunkan Berat</option>
            <option value="diet">Diet Sehat</option>
          </Select>

          <Input
            label="Budget Maksimal"
            name="budget_limit"
            type="number"
            value={form.budget_limit}
            onChange={handleChange}
            placeholder="Contoh: 350000"
          />
          
          {message && (
            <div
              className={`rounded-2xl px-5 py-4 text-sm font-semibold ${
                messageType === "success"
                  ? "border border-[#10BB89]/20 bg-[#10BB89]/10 text-[#0E9F75]"
                  : "border border-red-200 bg-red-50 text-red-600"
              }`}
            >
              {message}
            </div>
          )}
          <button
            disabled={loading}
            className="w-full bg-[#10BB89] text-white rounded-2xl py-4 font-black hover:bg-[#0E9F75] transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {editingId ? "Simpan Perubahan" : "Simpan Profile"}
          </button>
        </form>

        <div className="xl:col-span-2 space-y-6">
          <div className="grid md:grid-cols-3 gap-5">
            <StatCard icon={UserRound} title="Total Profile" value={profiles.length} />
            <StatCard icon={HeartPulse} title="Goal Terbaru" value={goalLabels[selectedProfile?.goal_type] || "-"} />
            <StatCard icon={Wallet} title="Budget" value={selectedProfile?.budget_limit ? `Rp ${Number(selectedProfile.budget_limit).toLocaleString("id-ID")}` : "-"} />
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-lg">
            <h2 className="font-black text-xl text-slate-800 mb-5">Daftar Health Profile</h2>

            {profiles.length === 0 ? (
              <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-500">
                Belum ada health profile. Isi form di samping untuk membuat profile pertama.
              </div>
            ) : (
              <div className="space-y-4">
                {profiles.map((profile, index) => (
                  <div key={profile.id} className="rounded-3xl bg-slate-50 border border-slate-100 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 flex-1">
                      <Info label="Profile." value={index + 1} />
                      <Info label="Usia" value={profile.age ? `${profile.age} tahun` : "-"} />
                      <Info label="Berat" value={`${profile.weight} kg`} />
                      <Info label="Tinggi" value={`${profile.height} cm`} />
                      <Info label="Aktivitas" value={activityLabels[profile.activity_level] || profile.activity_level} />
                      <Info label="Goal" value={goalLabels[profile.goal_type] || profile.goal_type} />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(profile)} className="w-11 h-11 rounded-2xl bg-white text-[#10BB89] flex items-center justify-center hover:shadow-md transition">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(profile.id)} className="w-11 h-11 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center hover:shadow-md transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-600">{label}</span>
      <input
        {...props}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#10BB89] focus:bg-white transition"
      />
    </label>
  );
}

function Select({ label, children, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-600">{label}</span>
      <select
        {...props}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#10BB89] focus:bg-white transition"
      >
        {children}
      </select>
    </label>
  );
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-5 shadow-lg">
      <div className="w-12 h-12 rounded-2xl bg-[#10BB89]/10 text-[#10BB89] flex items-center justify-center mb-4">
        <Icon size={24} />
      </div>
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="font-black text-xl text-slate-800 mt-1 truncate">{value}</h3>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{label}</p>
      <p className="font-bold text-slate-700 mt-1">{value}</p>
    </div>
  );
}
