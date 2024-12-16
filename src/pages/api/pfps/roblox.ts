import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Fetch user details from Roblox
    const userResponse = await fetch(`https://users.roblox.com/v1/users/${userId}`);
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
