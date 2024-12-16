import { useState } from "react";
import Layout from "@/components/Layout";

type UserAvatarProps = {};

const UserAvatar: React.FC<UserAvatarProps> = () => {
  const [userId, setUserId] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState<string | null>("Get Picture");

  const fetchAvatar = async () => {
    setUsername(null); // Clear previous username
    setAvatarUrl(null); // Clear previous avatar
    try {
      setButtonText("Loading...");
      const response = await fetch(`/api/pfps/roblox?userId=${userId}`);
      if (!response.ok) throw new Error("User not found");

      const data = await response.json();
      setUsername(data.username);
      setAvatarUrl(data.avatarUrl);
      setButtonText("Get Picture");
    } catch (err: any) {
      setButtonText(err.message || "An error occurred");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 sm:px-12">

        <div className="text-center max-w-3xl mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Roblox Profile Picture (PFP)
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Enter a Roblox Username or ID to retrieve someone's profile picture!
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
          <input
            type="text"
            placeholder="Enter Roblox ID or Username"
            className="text-black w-full px-4 py-3 mb-4 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition duration-300"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg transition duration-300 transform hover:scale-105"
            onClick={fetchAvatar}
          >
            {buttonText}
          </button>

          {username && (
            <p className="text-xl mt-4 text-center text-gray-300">
              Username: <span className="font-semibold text-white">{username}</span>
            </p>
          )}

          {avatarUrl && (
            <div className="mt-6 flex justify-center">
              <img
                src={avatarUrl}
                alt="Roblox Avatar"
                className="rounded-full w-48 h-48 object-cover border-4 border-purple-500 shadow-xl transform transition-all hover:scale-110"
              />
            </div>
          )}

          {avatarUrl && (
            <div className="mt-4">
              <a
                href={avatarUrl}
                download={`${username || "avatar"}.png`} // Dynamically naming the file based on username or a fallback
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-8 rounded-lg shadow-md transform transition-all hover:scale-105"
              >
                Download Avatar
              </a>
            </div>
          )}

        </div>

        <div className="mt-8 text-center">
          <a
            href="/pfp"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition-all hover:scale-105"
          >
            Go to PFP Page
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default UserAvatar;
