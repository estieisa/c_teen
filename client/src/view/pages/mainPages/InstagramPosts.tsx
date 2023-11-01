import { useEffect, useState } from "react";
import { Box, Grid, Link, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";

export default function InstagramPosts() {
  interface InstagramPost {
    caption: string;
    id: string;
    media_url: string;
    permalink: string;
    timestamp: string;
  }
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [hoveredPostId, setHoveredPostId] = useState<null | string>(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`https://c-teen.vercel.app/api/instagram-posts`);
      console.log(response.data);
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Grid marginTop={20}>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Link
          href="https://www.instagram.com/c_teen_hadera/"
          underline="none"
          paddingBottom={10}
        >
          <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
            עקבו אחרינו C_TEEN_HADERA
          </Typography>
        </Link>
      </Box>

      <ImageList variant="masonry" cols={7} gap={5}>
        {posts.map((post) => (
          <ImageListItem
            key={post.media_url}
            style={{ position: "relative", overflow: "hidden", opacity: 1, zIndex:0 }}
            onMouseOver={() => setHoveredPostId(post.id)}
            onMouseLeave={() => setHoveredPostId(null)}
          >
            {post.media_url.includes("mp4") ? null : (
              <Link href={post.permalink}>
                {hoveredPostId === post.id && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      textAlign:'center',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center'
                    }}
                  >
                <Typography variant="caption" color={'white'}>
                      {`${post.caption.split(" ").slice(0, 10).join(" ")}...`}
                    </Typography>
                  </div>
                )}

                <img
                  srcSet={post.media_url}
                  src={post.media_url}
                  alt={post.caption.split(" ").slice(0, 4).join(" ")}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Link>
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  );
}
