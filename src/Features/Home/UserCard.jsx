import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function UserCard({
  verified,
  full_name,

  user_data,

  isDarkMode,
}) {
  return (
    <Link to={`/userprofile/${user_data[0].username}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className={`rounded-xl p-4 w-64 ${
          isDarkMode
            ? "bg-white/10 backdrop-blur-lg shadow-lg text-white"
            : "bg-gray-100 shadow-md text-gray-900"
        }`}
      >
        <div className="flex items-center space-x-4">
          <img
            src={user_data[0]?.avatar}
            alt={full_name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-1">
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {full_name}
              </h3>
              {verified && (
                <FaUserCircle
                  className={`${isDarkMode ? "text-white" : "text-gray-500"}`}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default UserCard;

// async function handleUpload() {
//   for (const item of images) {
//     try {
//       const { data, error } = await supabase
//         .from("gallery")
//         .insert([
//           {
//             likes: "0",
//             image: item.url,
//             name: item.display_name,
//             artist: full_name,
//             description: item.description,
//             collection: username,
//             price: Math.floor(Math.random() * 5),
//             bids: [],
//             listing_id: Math.floor(Math.random() * 100),
//             owner_user_id: user_id,
//             royalty: `${Math.floor(Math.random() * 7)}%`,
//             NFT_token,
//             owner_id,
//             artistInfo: [
//               {
//                 name: full_name,
//                 username: username,
//                 user_id,
//                 avatar: user_data[0]?.avatar,
//                 date: Date.now(),
//               },
//             ],
//           },
//         ])
//         .select();

//       if (error) {
//         console.error(`Error inserting ${item.url}:`, error.message);
//       } else {
//         console.log(`Successfully inserted ${item.url}:`, data);
//       }
//     } catch (error) {
//       console.error("Unexpected error:", error);
//     }
//   }
//   // }
// const images = image.map((image, index) => {
//   const nameAndDesc = names[index]; // Get corresponding name and description by index

//   return {
//     asset_id: image.asset_id,
//     public_id: image.public_id,
//     display_name: nameAndDesc.name,
//     url: image.url,
//     description: nameAndDesc.description,
//   };
// });
