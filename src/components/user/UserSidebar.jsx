import { NavLink } from "react-router-dom";
import {
  Activity,
  BookOpenText,
  Heart,
  LayoutDashboard,
  Settings,
  Soup,
  ClipboardPlus,
  History,
  Menu,
} from "lucide-react";


export default function UserSidebar({ collapsed, setCollapsed }) {
  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      end: true,
    },
    {
      name: "Health Profile",
      icon: Activity,
      path: "/dashboard/health-profile",
    },
    {
      name: "Generate Plan",
      icon: ClipboardPlus,
      path: "/dashboard/generate-plan",
    },
    {
      name: "Resep",
      icon: Soup,
      path: "/dashboard/recipes",
    },
    {
      name: "Favorite",
      icon: Heart,
      path: "/dashboard/favorites",
    },
    {
      name: "Artikel",
      icon: BookOpenText,
      path: "/dashboard/articles",
    },
    {
      name: "Activity Log",
      icon: History,
      path: "/dashboard/activity-logs",
    },
  ];

  return (
    <aside
      className={`
        fixed left-0 top-0 bottom-0 z-50
        h-screen
        bg-[#10BB89]
        text-white
        flex flex-col
        transition-all duration-300
        ${collapsed ? "w-[90px]" : "w-[260px]"}
      `}
    >

      {/* LOGO + MENU BUTTON */}
      <div className="h-[100px] flex items-center justify-between px-5">
        {!collapsed && (
          <div className="flex items-center gap-3">

            <img
              src="/logo-probit_w.png"
              alt="PROBIT"
              className="w-12"
            />
            <div>
              <h1 className="font-black text-xl">
                PROBIT
              </h1>
            </div>

          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            p-2
            rounded-xl
            hover:bg-white/20
            transition
          "
        >
          <Menu size={25}/>
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 flex flex-col gap-4 px-4">
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              title={item.name}
              className={({isActive}) => `
                h-12
                flex
                items-center
                rounded-xl
                transition
                gap-4
                ${collapsed
                  ? "justify-center"
                  : "px-4"
                }
                ${
                  isActive
                  ? "bg-white text-[#10BB89]"
                  : "hover:bg-white/20"
                }
              `}
            >
              <Icon size={25}/>
              {!collapsed && (
                <span className="font-semibold">
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* SETTING */}
      <div className="p-4">
        <NavLink
          to="/dashboard/profile"
          className="
            h-12
            flex
            items-center
            gap-4
            px-4
            rounded-xl
            hover:bg-white/20
            transition
          "
        >
          <Settings size={25}/>
          {!collapsed && (
            <span className="font-semibold">
              Pengaturan
            </span>
          )}
        </NavLink>
      </div>
    </aside>
  );
}
