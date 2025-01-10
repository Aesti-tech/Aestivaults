// api/listUsers.js
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Fetch users
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
