import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabaseAdmin } from "../services/API/supabase";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const fetchAuthUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://aestivaults.vercel.app/api/listUsers"
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
      if (error) throw error;
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error(`Error deleting user: ${err.message}`);
    }
  };

  const disableUser = async (id) => {
    try {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(id, {
        ban: true,
      });
      if (error) throw error;
      setUsers(
        users.map((user) => (user.id === id ? { ...user, ban: true } : user))
      );
      toast.success("User disabled successfully");
    } catch (err) {
      toast.error(`Error disabling user: ${err.message}`);
    }
  };

  const toggleDropdown = (id) => {
    setExpandedUser(expandedUser === id ? null : id);
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 flex-grow overflow-y-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        Auth Users Management
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm md:text-base">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm md:text-base">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm md:text-base">
                Last Sign-In
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <tr className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-sm">
                    <div className="flex items-center justify-between">
                      {user.email}
                      <button
                        onClick={() => toggleDropdown(user.id)}
                        className="text-xs text-blue-500 hover:underline focus:outline-none focus:ring"
                      >
                        More Info
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-sm">
                    <span
                      className={
                        user.ban
                          ? "bg-red-100 text-red-800 text-xs md:text-sm px-1 md:px-2 py-1 rounded"
                          : "bg-green-100 text-green-800 text-xs md:text-sm px-1 md:px-2 py-1 rounded"
                      }
                    >
                      {user.ban ? "Disabled" : "Active"}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-sm">
                    {new Date(user.last_sign_in_at).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 md:px-4 py-2 text-xs md:text-sm">
                    <button
                      onClick={() => disableUser(user.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs md:text-sm px-2 md:px-3 py-1 rounded mr-1 md:mr-2"
                    >
                      Disable
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs md:text-sm px-2 md:px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedUser === user.id && (
                  <tr className="bg-gray-50 animate-slide-down">
                    <td
                      colSpan={4}
                      className="border border-gray-300 px-2 md:px-4 py-2 md:py-4 text-xs md:text-sm"
                    >
                      <div className="space-y-2 md:space-y-4">
                        <p>
                          <strong>User ID:</strong> {user.id}
                        </p>
                        <p>
                          <strong>Email Confirmed At:</strong>{" "}
                          {user.email_confirmed_at
                            ? new Date(user.email_confirmed_at).toLocaleString()
                            : "Not Confirmed"}
                        </p>
                        <p>
                          <strong>Name:</strong>{" "}
                          {user.user_metadata?.name || "N/A"}
                        </p>
                        <p>
                          <strong>Avatar:</strong>
                        </p>
                        {user.user_metadata?.avatar ? (
                          <img
                            src={user.user_metadata.avatar}
                            alt="Avatar"
                            className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                          />
                        ) : (
                          <p>No Avatar</p>
                        )}
                        <div>
                          <label
                            htmlFor="verified-status"
                            className="block text-xs md:text-sm font-medium text-gray-700"
                          >
                            Verified Status
                          </label>
                          {user.user_metadata?.verified ? (
                            <p className="text-xs md:text-sm">Verified</p>
                          ) : (
                            <p className="text-xs md:text-sm">Not Verified</p>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
