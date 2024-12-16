import { METHODS } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";

const TOKEN = process.env.NEXT_PUBLIC_BOT_TOKEN || process.env.BOT_TOKEN;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ error: "User ID or username is required" });
  }

  try {
    const userResponse = await fetch(`https://discord.com/api/v10/users/${userId}`, {
        headers: {
            'Authorization': `Bot ${TOKEN}`, // Add the Authorization header with the Bot token
            'Content-Type': 'application/json' // Ensure the content type is set to JSON
          }
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();
    
    if (!userData.avatar) {
      throw new Error("Failed to fetch avatar!");
    }

    const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${userData.avatar}?size=1024`;

    // Return the username and avatar image URL
    res.status(200).json({
      username: userData.username,
      avatarUrl: avatarUrl,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "An error occurred" });
  }
};

export default handler;
