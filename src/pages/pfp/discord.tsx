import { useState } from "react";
import Layout from "@/components/Layout";

type UserAvatarProps = {};

const UserAvatar: React.FC<UserAvatarProps> = () => {
  const [userId, setUserId] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState<string | null>("Get Picture");

  const fetchAvatar = async () => {
    setUsername(null);
    setAvatarUrl(null);
    try {
      setButtonText("Loading...");
      const response = await fetch(`/api/pfps/discord?userId=${userId}`);
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
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 sm:px-12">
        <div className="text-center max-w-3xl mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Discord Profile Picture (PFP)
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Enter a Discord user ID to retrieve their profile picture effortlessly.
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-lg text-center">
          <input
            type="text"
            placeholder="Enter Discord User ID"
            className="text-black w-full px-4 py-3 mb-6 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md transform transition-transform duration-200 hover:scale-105"
            onClick={fetchAvatar}
          >
            {buttonText}
          </button>

          {username && (
            <p className="text-xl mt-6 text-gray-300">
              Username: <span className="font-semibold text-white">{username}</span>
            </p>
          )}

          {avatarUrl && (
            <div className="mt-6 flex justify-center">
              <img
                src={avatarUrl}
                alt="Discord Avatar"
                className="w-64 h-64 object-cover rounded-lg border-4 border-blue-500 shadow-lg transition-transform transform hover:scale-105"
              />
            </div>
          )}

          {avatarUrl && (
            <div className="mt-6">
              <a
                href={avatarUrl}
                download={`${username || "avatar"}.png`}
                className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md transform transition-transform duration-200 hover:scale-105"
              >
                Download Avatar
              </a>
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/pfp"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105"
          >
            Go to PFP Page
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default UserAvatar;