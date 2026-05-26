import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardList,
  Dumbbell,
  Heart,
  FileText,
  Settings,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const MENU_ITEMS = [
  { name: "Dashboard", icon: LayoutGrid, route: "/dashboard" },
  { name: "Progress", icon: ClipboardList, route: "/progress" },
  { name: "Workout", icon: Dumbbell, route: "/workout" },
  { name: "Favorite", icon: Heart, route: "/favorite" },
  { name: "Blog", icon: FileText, route: "/blog" },
];

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex flex-col md:flex-row">
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col items-center pt-8 pb-8 w-[95px] bg-[#16C79A] h-screen sticky top-0">
        <img src="/logo.png" alt="Logo" className="w-10 mb-12 object-contain" />
        <div className="flex flex-col gap-5 w-full items-center">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveMenu(item.name);
                  navigate(item.route);
                }}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  activeMenu === item.name
                    ? "bg-white text-[#16C79A]"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <Icon size={20} />
              </button>
            );
          })}
        </div>
        <div className="mt-auto">
          <Settings className="text-white cursor-pointer hover:rotate-90 transition-transform" />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 pb-24 overflow-auto">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Selamat Pagi,</h1>
            <p className="text-gray-500">Andrew</p>
          </div>
          <div className="relative w-full md:w-[400px]">
            <input
              placeholder="Search..."
              className="w-full h-12 rounded-2xl border-2 border-[#16C79A] bg-white px-6 outline-none focus:ring-2 focus:ring-[#16C79A]/20"
            />
            <Search
              size={20}
              className="absolute right-4 top-3.5 text-gray-400"
            />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-gray-500 cursor-pointer">About</span>
            <Bell className="text-[#16C79A] cursor-pointer" size={20} />
            <img
              src="https://i.pravatar.cc/200?img=12"
              className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              alt="Profile"
            />
          </div>
        </header>

        {/* TOP SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* HEALTH PROFILE */}
          <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col min-h-[300px]">
            <h2 className="mb-6 font-bold text-lg">Health Profile</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center flex-1">
              <div className="text-center">
                <img
                  src="https://i.pravatar.cc/200?img=12"
                  className="w-24 h-24 rounded-full border-4 border-[#ECFAF5]"
                  alt="User"
                />
                <h3 className="font-bold mt-3">Andrew</h3>
                <p className="text-xs text-gray-400">Pekerja</p>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-1 w-full h-full">
                <Box title="Daily Habit">
                  <p className="text-[10px] text-gray-500">
                    Olahraga ringan 3x seminggu
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Makan sayur 2 porsi sehari
                  </p>
                </Box>
                <Box title="Activity">
                  <div className="w-16 h-16 rounded-full border-4 border-[#16C79A] flex items-center justify-center">
                    <span className="text-lg font-bold text-[#16C79A]">
                      70%
                    </span>
                  </div>
                </Box>
                <Box title="Progress">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#16C79A] h-2 rounded-full w-[80%]"></div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Langkah kaki: 8.000/10.000
                  </p>
                </Box>
                <Box title="Resep Makanan">
                  <p className="text-[10px] text-gray-500">Ayam Bakar Madu</p>
                  <p className="text-[10px] text-gray-500">Salad Buah Segar</p>
                </Box>
              </div>
            </div>
          </div>

          {/* FAVORITE */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="font-bold text-lg">Favorite</h2>
            <div className="flex gap-2 mt-4">
              <button className="bg-[#16C79A] text-white px-5 py-1.5 rounded-full text-xs font-semibold">
                Resep
              </button>
              <button className="border border-gray-200 px-5 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-50">
                Blog
              </button>
              <button className="border border-gray-200 px-5 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-50">
                Olahraga
              </button>
            </div>
            <div className="flex flex-col items-center justify-center h-40 mt-6 border-2 border-dashed border-gray-200 rounded-2xl">
              <Heart size={40} className="text-gray-300" />
              <p className="text-xs text-gray-400 mt-2">
                Belum ada item favorit.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <BottomCard
            title="Resep Makanan"
            content="Ayam Bakar Madu Pedas Manis"
            image="https://picsum.photos/300/200?random=1"
          />
          <BottomCard
            title="Blog"
            content="Manfaat Yoga untuk Kesehatan Mental"
            image="https://picsum.photos/300/200?random=2"
          />
        </section>
      </main>

      {/* MOBILE NAVBAR */}
      <div className="md:hidden fixed bottom-0 w-full bg-[#16C79A] flex justify-around p-4 text-white z-50 rounded-t-3xl shadow-lg">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.route)}
            className="p-2"
          >
            <item.icon size={24} />
          </button>
        ))}
      </div>
    </div>
  );
}

function Box({ title, children }) {
  return (
    <div className="bg-[#ECFAF5] rounded-2xl p-4 flex flex-col items-center justify-center font-bold text-xs text-[#16C79A] text-center border border-[#16C79A]/10 h-full">
      <span className="mb-2">{title}</span>
      {children}
    </div>
  );
}

function BottomCard({ title, content, image }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">{title}</h2>
        <button className="bg-[#16C79A] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide w-fit hover:opacity-90">
          Jelajahi
        </button>
      </div>
      <div className="flex flex-1 gap-6 items-center">
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm font-semibold">{content}</p>
          <p className="text-xs text-gray-500">
            Lihat detail resep/blog ini dan temukan inspirasi lainnya.
          </p>
        </div>
        <img
          src={image}
          className="rounded-2xl w-28 h-28 object-cover shadow-md"
          alt="Content"
        />
      </div>
      <div className="flex justify-between items-center mt-6">
        <ChevronLeft className="text-[#16C79A] cursor-pointer hover:scale-110 transition" />
        <div className="flex gap-1.5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 2 ? "bg-[#16C79A]" : "bg-gray-200"}`}
            ></div>
          ))}
        </div>
        <ChevronRight className="text-[#16C79A] cursor-pointer hover:scale-110 transition" />
      </div>
    </div>
  );
}
