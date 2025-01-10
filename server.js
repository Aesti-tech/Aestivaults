import fetch from "node-fetch";
import express from "express";
import { Buffer } from "buffer";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend to make requests
  })
);

app.get("/api/images", async (req, res) => {
  const cloudName = "diiqej9hw"; // Your Cloudinary cloud name
  const apiKey = "599785151798217"; // Your API key
  const apiSecret = "Q9hLSpAIWofaHSKyUCGxBgB20QQ"; // Your API secret

  const authHeader = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString(
    "base64"
  )}`;

  let allImages = []; // To store all the images
  let nextCursor = null; // For pagination

  try {
    // Continue fetching as long as there's a next_cursor
    do {
      const requestUrl = nextCursor
        ? `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?next_cursor=${nextCursor}`
        : `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`;

      // Fetch images from Cloudinary API
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: { Authorization: authHeader },
      });

      // Check if response is OK
      if (!response.ok) {
        throw new Error("Failed to fetch images from Cloudinary");
      }

      const data = await response.json();
      allImages = [...allImages, ...data.resources]; // Add fetched images to allImages array

      // Set the next_cursor for the next request if available
      nextCursor = data.next_cursor || null;
    } while (nextCursor); // Repeat the process if there's more data to fetch

    res.json(allImages); // Return all images to the client
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send("Error fetching images");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
