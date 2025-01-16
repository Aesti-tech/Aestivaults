// // api/disableUser.js
// import { createClient } from "@supabase/supabase-js";

// const supabaseAdmin = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY
// );

// export default async function handler(req, res) {
//   const { id } = req.query; // Get user ID from query params

//   if (req.method === "PUT") {
//     try {
//       const { error } = await supabaseAdmin.auth.admin.updateUserById(id, {
//         ban: true,
//       });
//       if (error) {
//         return res.status(500).json({ error: error.message });
//       }
//       return res.status(200).json({ message: "User disabled successfully" });
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   } else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
