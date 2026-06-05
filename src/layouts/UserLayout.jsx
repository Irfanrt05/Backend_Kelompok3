import { Outlet } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";
import UserHeader from "../components/user/UserHeader";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <UserSidebar />

      <div className="flex-1">
        <UserHeader />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
