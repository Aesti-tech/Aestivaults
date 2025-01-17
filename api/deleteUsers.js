// api/deleteUser.js
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.VITE_AESTI_URL,
  process.env.VITE_AESTI_SERVICE_KEY
);

export default async function handler(req, res) {
  const { id } = req.query; // Get user ID from query params

  if (req.method === "DELETE") {
    try {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
