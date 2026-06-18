import { useEffect, useState } from "react"; 
import { Camera, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  DEFAULT_FEMALE_AVATAR,
  DEFAULT_MALE_AVATAR,
  getDisplayName,
  getStoredUser,
  getUserAvatar,
  saveStoredUser,
} from "../../utils/userStorage";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getStoredUser() || {});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");
        const me = res.data.data || res.data.user || res.data;
        if (me?.id) setUser(saveStoredUser({ ...getStoredUser(), ...me }));
      } catch {
        setUser(getStoredUser() || {});
      }
    };
    fetchMe();
  }, []);

  const handleChange = (key, value) => {
    const next = saveStoredUser({ [key]: value });
    setUser(next);
    setMessage("Data profil tersimpan di browser");
  };

  const handleAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => handleChange("avatar", reader.result);
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="grid grid-cols-[280px_1fr] gap-6 min-h-[calc(100vh-160px)]">
      <aside className="bg-white rounded-3xl p-6 shadow-sm h-fit">
        <button className="flex items-center gap-4 text-black text-lg font-medium py-3 px-2">
          <UserRound size={22} /> Pengaturan Akun
        </button>
        <button onClick={handleLogout} className="flex items-center gap-4 text-red-500 text-lg font-medium py-3 px-2">
          <LogOut size={22} /> Log out
        </button>
      </aside>

      <section className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] shadow-lg min-h-[760px] px-16 py-10">
        <div className="flex items-center gap-8">
          <div className="relative">
            <img
              src={getUserAvatar(user)}
              alt="Avatar user"
              className="w-[110px] h-[110px] rounded-full object-cover bg-slate-100"
            />
            <label className="absolute bottom-2 right-1 w-8 h-8 rounded-full bg-[#10BB89] text-white flex items-center justify-center cursor-pointer border-2 border-white">
              <Camera size={17} />
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarFile} />
            </label>
          </div>

          <label className="bg-[#10BB89] text-white px-7 py-4 rounded-xl text-lg font-semibold cursor-pointer">
            Upload New
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarFile} />
          </label>

          <button
            onClick={() => handleChange("avatar", user.gender === "female" ? DEFAULT_FEMALE_AVATAR : DEFAULT_MALE_AVATAR)}
            className="bg-[#c8c8c8] text-white px-7 py-4 rounded-xl text-lg font-semibold"
          >
            Delete Avatar
          </button>
        </div>

        {message && <p className="text-sm text-[#10BB89] font-semibold mt-5">{message}</p>}

        <div className="mt-10 max-w-[780px] space-y-10">
          <ProfileRow label="Username">
            <input
              value={user.username || ""}
              onChange={(e) => handleChange("username", e.target.value)}
              placeholder="Username"
              className="text-lg text-slate-400 outline-none border-b border-transparent focus:border-[#10BB89] w-full py-1"
            />
          </ProfileRow>

          <ProfileRow label="Nama">
            <input
              value={user.name || getDisplayName(user)}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nama lengkap"
              className="text-lg text-slate-400 outline-none border-b border-transparent focus:border-[#10BB89] w-full py-1"
            />
          </ProfileRow>

          <ProfileRow label="Email" action="Ganti Akun">
            <input
              value={user.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="email@example.com"
              className="text-lg text-slate-400 outline-none border-b border-transparent focus:border-[#10BB89] w-full py-1"
            />
          </ProfileRow>

          <ProfileRow label="Password" action="Ubah Password">
            <p className="text-lg text-slate-400">********************</p>
          </ProfileRow>

          <div className="pt-16 space-y-6">
            <SwitchRow label="In-App Notification" />
            <SwitchRow label="Email Notification Update" />
            <SwitchRow label="Update System" />
          </div>

          <ProfileRow label="Gender">
            <div className="flex gap-4">
              <button
                onClick={() => handleChange("gender", "male")}
                className={`px-6 py-3 rounded-xl font-semibold border ${user.gender !== "female" ? "bg-[#10BB89] text-white border-[#10BB89]" : "bg-white text-slate-500 border-slate-200"}`}
              >
                Laki-laki
              </button>
              <button
                onClick={() => handleChange("gender", "female")}
                className={`px-6 py-3 rounded-xl font-semibold border ${user.gender === "female" ? "bg-[#10BB89] text-white border-[#10BB89]" : "bg-white text-slate-500 border-slate-200"}`}
              >
                Perempuan
              </button>
            </div>
          </ProfileRow>
        </div>
      </section>
    </div>
  );
}

function ProfileRow({ label, children, action }) {
  return (
    <div className="grid grid-cols-[160px_1fr_160px] items-start gap-8">
      <p className="text-lg text-black">{label}</p>
      <div>{children}</div>
      {action ? <button className="text-lg text-slate-400 underline text-right">{action}</button> : <div />}
    </div>
  );
}

function SwitchRow({ label }) {
  return (
    <div className="grid grid-cols-[1fr_70px] items-center">
      <p className="text-lg text-black">{label}</p>
      <button className="w-[50px] h-[26px] rounded-full bg-slate-300 relative">
        <span className="absolute w-[22px] h-[22px] rounded-full bg-white left-[2px] top-[2px]" />
      </button>
    </div>
  );
}
