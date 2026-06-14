import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import api from "../../services/api";
import { getDisplayName, getStoredUser, getUserAvatar, saveStoredUser } from "../../utils/userStorage";

export default function UserHeader() {
  const [user, setUser] = useState(() => getStoredUser());
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const syncUser = () => setUser(getStoredUser());
    window.addEventListener("user-updated", syncUser);

    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");
        const me = res.data.data || res.data.user || res.data;
        if (me?.id) setUser(saveStoredUser(me));
      } catch {
        syncUser();
      }
    };

    fetchMe();
    return () => window.removeEventListener("user-updated", syncUser);
  }, []);

  const name = getDisplayName(user);
  const keyword = searchParams.get("q") || "";
  const searchLabel = location.pathname.includes("recipes")
    ? "Cari resep"
    : location.pathname.includes("articles")
      ? "Cari artikel"
      : location.pathname.includes("activity-logs")
        ? "Cari aktivitas"
        : "Search";

  const handleSearch = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  return (
    <header className="h-[130px] bg-[#f4f4f4] flex items-center gap-8 px-10">
      <div className="w-[220px] shrink-0">
        <h2 className="text-2xl font-black text-black">Selamat Pagi,</h2>
        <p className="text-2xl text-black mt-2">{name}</p>
      </div>

      <div className="relative flex-1 max-w-[650px]">
        <input
          value={keyword}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full h-[70px] rounded-[22px] border-[3px] border-[#10BB89] bg-white px-8 pr-16 text-2xl outline-none placeholder:text-slate-400"
          placeholder={searchLabel}
        />
        <Search className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-400" size={38} />
      </div>

      <div className="ml-auto flex items-center gap-10">
        <Link to="/" className="text-lg text-slate-600 underline underline-offset-4">About</Link>
        <Bell className="text-[#10BB89]" size={28} />
        <Link to="/dashboard/profile" className="flex items-center gap-3">
          <img
            src={getUserAvatar(user)}
            alt="Avatar user"
            className="w-[64px] h-[64px] rounded-full object-cover bg-white"
          />
        </Link>
      </div>
    </header>
  );
}
