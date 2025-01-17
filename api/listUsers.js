//api/listUsers.js;
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.VITE_AESTI_URL,
  process.env.VITE_AESTI_SERVICE_KEY
);

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      //Fetch users
      const { data, error } = await supabaseAdmin.auth.admin.listUsers();
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(200).json(data.users);
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
// }

// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedUser, setExpandedUser] = useState(null);

//   useEffect(() => {
//     const fetchAuthUsers = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch('/api/listUsers');
//         const data = await response.json();
//         if (!response.ok) throw new Error(data.error);
//         setUsers(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAuthUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     try {
//       const response = await fetch(`/api/deleteUser?id=${id}`, {
//         method: 'DELETE',
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error);
//       setUsers(users.filter((user) => user.id !== id));
//       toast.success("User deleted successfully");
//     } catch (err) {
//       toast.error(`Error deleting user: ${err.message}`);
//     }
//   };

//   const disableUser = async (id) => {
//     try {
//       const response = await fetch(`/api/disableUser?id=${id}`, {
//         method: 'PUT',
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error);
//       setUsers(
//         users.map((user) => (user.id === id ? { ...user, ban: true } : user))
//       );
//       toast.success("User disabled successfully");
//     } catch (err) {
//       toast.error(`Error disabling user: ${err.message}`);
//     }
//   };

//   const toggleDropdown = (id) => {
//     setExpandedUser(expandedUser === id ? null : id);
//   };

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             <span>{user.email}</span>
//             <button onClick={() => deleteUser(user.id)}>Delete</button>
//             <button onClick={() => disableUser(user.id)}>
//               Disable
//             </button>
//             {/* Add any other user admin tasks here */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;
