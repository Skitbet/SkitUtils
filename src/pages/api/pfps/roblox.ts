import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ error: "User ID or username is required" });
  }

  try {
    let userIdToFetch: string;

    // Check if the userId is a number (ID) or a string (username)
    if (/^\d+$/.test(userId)) {
      // If it's a number (ID), use it directly
      userIdToFetch = userId;
    } else {
      // If it's a string (username), search for the user using the Roblox search API
      const searchResponse = await fetch(`https://users.roblox.com/v1/users/search?keyword=${userId}`);
      if (!searchResponse.ok) {
        throw new Error("Failed to search for user");
      }

      const searchData = await searchResponse.json();

      // If no user is found, return an error
      if (searchData.data.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      // Get the first user from the search results
      userIdToFetch = searchData.data[0].id.toString();
    }

    // Fetch user details using the userId
    const userResponse = await fetch(`https://users.roblox.com/v1/users/${userIdToFetch}`);
    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();

    // Fetch avatar image using the Roblox Thumbnails API
    const avatarResponse = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userData.id}&size=420x420&format=Png&isCircular=false&thumbnailType=HeadShot`
    );
    
    if (!avatarResponse.ok) {
      throw new Error("Failed to fetch avatar thumbnail");
    }

    const avatarData = await avatarResponse.json();

    // Return the username and avatar image URL
    res.status(200).json({
      username: userData.name,
      avatarUrl: avatarData.data[0].imageUrl, // Extract the imageUrl from the response
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "An error occurred" });
  }
};

export default handler;
