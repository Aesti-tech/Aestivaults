import Dashboard from "./Dashboard";

function Admin() {
  return <Dashboard />;
}

export default Admin;

// function UserManagement({ id }) {
//   const [users, setUsers] = useState(initialUsers);

//   const handlePromote = () => {
//     setUsers(
//       users.map((user) => (user.id === id ? { ...user, role: "Admin" } : user))
//     );
//   };

//   const handleDemote = () => {
//     setUsers(
//       users.map((user) => (user.id === id ? { ...user, role: "User" } : user))
//     );
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">User Management</h1>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {users.map((user) => (
//             <TableRow key={user.id}>
//               <TableCell>{user.name}</TableCell>
//               <TableCell>{user.email}</TableCell>
//               <TableCell>{user.role}</TableCell>
//               <TableCell>
//                 {user.role === "User" ? (
//                   <Button onClick={() => handlePromote(user.id)}>
//                     Promote to Admin
//                   </Button>
//                 ) : (
//                   <Button
//                     onClick={() => handleDemote(user.id)}
//                     variant="destructive"
//                   >
//                     Demote to User
//                   </Button>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

// const initialUsers = [
//   { id: "1", name: "John Doe", email: "john@example.com", role: "User" },
//   { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Admin" },
//   { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "User" },
// ];

// const initialRequests = [
//   {
//     id: "1",
//     user: "John Doe",
//     amount: 1000,
//     date: "2023-04-01",
//     status: "pending",
//   },
//   {
//     id: "2",
//     user: "Jane Smith",
//     amount: 1500,
//     date: "2023-04-02",
//     status: "pending",
//   },
//   {
//     id: "3",
//     user: "Bob Johnson",
//     amount: 2000,
//     date: "2023-04-03",
//     status: "pending",
//   },
// ];
