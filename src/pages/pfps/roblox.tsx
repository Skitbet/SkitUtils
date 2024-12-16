import { useState } from "react";

type UserAvatarProps = {};

const UserAvatar: React.FC<UserAvatarProps> = () => {
  const [userId, setUserId] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState<string | null>("Get Picture");


  const fetchAvatar = async () => {
    
    setUsername(null);  // Clear previous username
    setAvatarUrl(null);  // Clear previous avatar
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Roblox Profile Picture</h1>
        <input
          type="text"
          placeholder="Enter Roblox ID or Username"
          className="text-black w-full px-4 py-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={fetchAvatar}
        >
          {buttonText}
        </button>
        
        {username && <p className="text-xl mt-4 text-center text-gray-800">Username: <span className="font-bold">{username}</span></p>}

        {avatarUrl && (
          <div className="mt-6 flex justify-center">
            <img
              src={avatarUrl}
              alt="Roblox Avatar"
              className="rounded-full w-48 h-48 object-cover border-4 border-white shadow-xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAvatar;
