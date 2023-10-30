import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  ButtonBase,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import {
  fetchDeleteEventUser,
  fetchUpdateEventsUser,
} from '../../../../redux/authSlice'
import { fetchUpdateUsersEvent } from "../../../../redux/postsSlice";
import { Post } from "../../../../redux/postsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { toast } from "react-toastify";
import { formatDate, formatTime } from "../../category/PostByCategory";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function AllPostsDasbbord() {
  const [hoveredPostId, setHoveredPostId] = useState<null | string>(null);
  const [redIconPosts, setRedIconPosts] = useState(() => {
    const savedState = localStorage.getItem("redIconPosts");
    return savedState ? JSON.parse(savedState) : [];
  }); // State to hold post IDs with red icons

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const posts = useAppSelector((state) => state.posts.posts);

  useEffect(() => {
    localStorage.setItem("redIconPosts", JSON.stringify(redIconPosts));
  }, [redIconPosts]);

  const isIconRed = (post: Post) => {
    // Check if post.id exists in the redIconPosts for the current user
    const userRedIconPosts = redIconPosts.find(
      (item: any) => item.user === auth.user.user?.uid
    );

    return userRedIconPosts ? userRedIconPosts.posts.includes(post.id) : false;
  };

  const handleFavoriteClick = async (post: Post) => {
    try {
      if (!auth.loggedIn) {
        toast.error("משתמש לא רשום");
        return;
      }
      if (isIconRed(post)) {
        const deleteRes = await dispatch(fetchDeleteEventUser(post));
        if (deleteRes.payload) {
          setRedIconPosts((prevRedIconPosts: any) => {
            return prevRedIconPosts.map((item: any) => {
              if (item.user === auth.user.user?.uid) {
                return {
                  user: item.user,
                  posts: item.posts.filter((postId: any) => postId !== post.id),
                };
              }
              return item;
            });
          });
        } else {
          toast.error("שגיאה במחיקת הפוסט");
        }
      } else {
        const updateUser = await dispatch(fetchUpdateEventsUser(post));
        await dispatch(fetchUpdateUsersEvent(post));
        if (updateUser.payload) {
          setRedIconPosts((prevRedIconPosts: any) => {
            const existingUserIndex = prevRedIconPosts.findIndex(
              (item: any) => item.user === auth.user.user?.uid
            );
            if (existingUserIndex !== -1) {
              const updatedPosts = [
                ...prevRedIconPosts[existingUserIndex].posts,
                post.id,
              ];

              const updatedUser = {
                ...prevRedIconPosts[existingUserIndex],
                posts: updatedPosts,
              };

              return [
                ...prevRedIconPosts.slice(0, existingUserIndex),
                updatedUser,
                ...prevRedIconPosts.slice(existingUserIndex + 1),
              ];
            }
            return [
              ...prevRedIconPosts,
              {
                user: auth.user.user?.uid,
                posts: [post.id],
              },
            ];
          });
        } else {
          toast.error("ארוע זה אינו מתאים עבורך");
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  const handleMouseEnter = (postId: string) => {
    setHoveredPostId(postId);
  };

  const handleMouseLeave = () => {
    setHoveredPostId(null);
  };


  return (
    <>
      <Grid>
        <Grid
          container
          marginTop={20}
          display={"flex"}
          justifyContent={"center"}
        >
          {posts.map((post: Post, index: any) => (
            <Grid
              item
              md={12}
              lg={4}
              key={index}
              display={"flex"}
              justifyContent={"space-around"}
              padding={4}
            >
              <Card
                style={{
                  height: 400,
                  width: 400,
                  borderRadius: 10,
                  boxShadow:
                    "0px 5px 22px rgba(0, 0, 0, 0.09), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)",
                }}
              >
                <ButtonBase
                  onMouseOver={() => handleMouseEnter(post.id)}
                  onMouseLeave={handleMouseLeave}
                  style={{ width: "100%", height: "85%" }}
                >
                  <img
                    src={post.image}
                    alt="Event"
                    style={{ width: "100%", height: "100%" }}
                  />
                  {hoveredPostId === post.id && (
                    <>
                      <CardContent
                        style={{
                          position: "absolute",
                          bottom: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0,0,0,0.8)",
                        }}
                      >
                        <Grid
                          container
                          spacing={1}
                          justifyContent={"center"}
                          color={"white"}
                        >
                          <Grid item xs={12} lg={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <EventIcon  />
                            <Typography variant="caption">
                            {formatDate(post.date)}
                            </Typography>
                            <Typography variant="caption">
                              {formatTime(post.date)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} lg={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>

                            <PlaceIcon />
                            <Typography variant="caption" textAlign="center">
                             הגיבורים 67, חדרה
                            </Typography>
                          </Grid>
                        <Grid item xs={12} lg={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <PersonIcon />
                            <Typography variant="caption" textAlign="center">
                              {Array.isArray(post.gender)
                                ? post.gender.join(" ")
                                : post.gender}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} lg={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <SchoolIcon />
                            <Typography variant="caption" textAlign="center">
                              {Array.isArray(post.grade)
                                ? post.grade.join(" ")
                                : post.grade}
                            </Typography>
                          </Grid>
                  
                          <Grid
                            container
                            spacing={3}
                            justifyContent={"center"}
                            marginTop={6}
                          >
                            <Grid item xs={12}>
                              <Typography variant="body2" textAlign="center">
                                {post.description}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                style={{
                                  marginTop: 5,
                                  width: 180,
                                  height: 40,
                                  border: "2px solid #f69e52",
                                  borderRadius: 30,
                                  boxShadow:
                                    "0px 5px 22px rgba(0, 0, 0, 0.09), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)",
                                  color: "#f69e52",
                                }}
                                onClick={() => handleFavoriteClick(post)}
                              >
                               
                                הרשמה לאירוע
                                <IconButton>
                                  <FavoriteIcon
                                    style={{
                                      marginLeft: 10,
                                      color: auth.loggedIn
                                        ? isIconRed(post)
                                          ?"#f69e52"
                                          : 'white'
                                        : "white",
                                    }}
                                    onClick={() => handleFavoriteClick(post)}
                                  />
                                </IconButton>
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </>
                  )}
                </ButtonBase>
                <Typography
                  variant="h5"
                  style={{
                    color: "black",
                    textAlign:'center',
                    padding:10
                  }}
                >
                  {post.title}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
