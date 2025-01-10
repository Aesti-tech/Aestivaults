import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="h-screen grid grid-cols-[18rem_1fr] grid-rows-[5rem_1fr]">
      <Navbar />
      <Sidebar />
      <main className="overflow-y-auto p-2">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
