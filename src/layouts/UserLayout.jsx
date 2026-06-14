import { Outlet } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";
import UserHeader from "../components/user/UserHeader";

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <UserSidebar />
      <div className="ml-[125px] min-h-screen">
        <UserHeader />
        <main className="px-9 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
