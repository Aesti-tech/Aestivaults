import Cors from "cors";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Admin client
const supabaseAdmin = createClient(
  process.env.VITE_AESTI_URL,
  process.env.VITE_AESTI_SERVICE_KEY
);

// Initialize the CORS middleware
const cors = Cors({
  methods: ["PUT"], // Allow only PUT requests
  origin: [
    "http://localhost:5173", // Allow requests from localhost
    "https://aestivaults.vercel.app.", // Allow requests from your app's domain
  ],
});

// Helper method to wait for middleware to execute before continuing
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  const { id } = req.query; // Get user ID from query params

  try {
    // Run the CORS middleware
    await runMiddleware(req, res, cors);

    if (req.method === "PUT") {
      // Disable user
      const { error } = await supabaseAdmin.auth.admin.updateUserById(id, {
        ban: true,
      });
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(200).json({ message: "User disabled successfully" });
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
