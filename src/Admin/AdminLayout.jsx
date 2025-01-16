import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../services/API/supabase";

function AdminLayout() {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || !user) return;

    if (user.id !== "ea12424c-a77f-470c-a55e-c75b0cba3c4f") {
      navigate("/", { replace: true });
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Add a spinner or skeleton loader if needed
  }

  return (
    <div className="h-screen relative overflow-x-hidden flex flex-col grid-rows-[5rem_1fr]">
      <Navbar />

      <main className="overflow-y-hidden h-screen flex flex-grow">
        <Outlet />
        <Sidebar />
      </main>
    </div>
  );
}

export default AdminLayout;

async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session || !session.session) return null;

  return session.session.user;
}

function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["Admin"],
    queryFn: getCurrentUser,
    onError: (err) => {
      console.error("Error fetching user:", err.message);
    },
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
