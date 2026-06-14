import { NavLink } from "react-router-dom";
import { Activity, BookOpenText, Heart, LayoutDashboard, Settings, Soup, ClipboardPlus, History } from "lucide-react";

export default function UserSidebar() {
  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard", end: true },
    { name: "Health Profile", icon: Activity, path: "/dashboard/health-profile" },
    { name: "Generate Plan", icon: ClipboardPlus, path: "/dashboard/generate-plan" },
    { name: "Resep", icon: Soup, path: "/dashboard/recipes" },
    { name: "Favorite", icon: Heart, path: "/dashboard/favorites" },
    { name: "Artikel", icon: BookOpenText, path: "/dashboard/articles" },
    { name: "Activity Log", icon: History, path: "/dashboard/activity-logs" },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-50 w-[125px] h-screen bg-[#10BB89] text-white flex flex-col items-center overflow-hidden">
      <NavLink to="/dashboard" className="h-[96px] flex items-center justify-center shrink-0">
        <img src="/logo-probit_w.png" alt="PROBIT" className="w-[58px] object-contain" />
      </NavLink>

      <nav className="flex-1 w-full overflow-hidden px-0 py-3 flex flex-col items-center justify-center gap-5">
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              title={item.name}
              className={({ isActive }) =>
                `w-12 h-12 rounded-2xl flex items-center justify-center transition shrink-0 ${
                  isActive ? "bg-white/20 ring-2 ring-white/30" : "hover:bg-white/10"
                }`
              }
            >
              <Icon size={29} strokeWidth={2.5} />
            </NavLink>
          );
        })}
      </nav>

      <NavLink
        to="/dashboard/profile"
        title="Pengaturan Akun"
        className={({ isActive }) =>
          `mb-8 mt-3 w-12 h-12 rounded-2xl flex items-center justify-center transition shrink-0 ${
            isActive ? "bg-white/20 ring-2 ring-white/30" : "hover:bg-white/10"
          }`
        }
      >
        <Settings size={29} strokeWidth={2.5} />
      </NavLink>
    </aside>
  );
}
