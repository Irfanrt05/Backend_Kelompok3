import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, Utensils, Activity } from "lucide-react";

export default function UserSidebar() {
  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Artikel",
      icon: BookOpen,
      path: "/dashboard/articles",
    },
    {
      name: "Resep",
      icon: Utensils,
      path: "/dashboard/recipes",
    },
    {
      name: "Aktivitas",
      icon: Activity,
      path: "/dashboard/activity",
    },
  ];

  return (
    <aside className="w-[280px] bg-[#10BB89] text-white min-h-screen">
      <div className="p-6 border-b border-white/10">
        <h1 className="font-black text-2xl">PROBIT</h1>

        <p className="text-white/70 text-sm">User Dashboard</p>
      </div>

      <nav className="p-4 space-y-2">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl ${
                  isActive ? "bg-white text-[#10BB89]" : "hover:bg-white/10"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
