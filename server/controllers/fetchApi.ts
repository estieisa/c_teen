import { Response, Request } from "express";
import axios from "axios";
require("dotenv").config();

export const googleMaps = async (req: Request, res: Response) => {
  const search = req.query.search;
  if (!search) {
    return res.status(400).json({ error: "Missing or empty search parameter" });
  }
  try {
    const response = await axios.get(
      `http://serpapi.com/locations.json?q=${search}&limit=-5`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const instagramPosts = async (req: Request, res: Response) => {
  try {
    const tokenInstagram = process.env.TOKEN_INSTAGRAM;

    // Check if the Instagram token is set
    if (!tokenInstagram) {
      return res.status(400).json({ error: "Instagram token not configured." });
    }

    const response = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,thumbnail_url,timestamp&access_token=${tokenInstagram}&limit=26`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
