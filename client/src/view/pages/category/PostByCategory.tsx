import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
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
} from "../../../redux/authSlice";
import { fetchPosts, fetchUpdateUsersEvent } from "../../../redux/postsSlice";
import { Post } from "../../../redux/postsSlice";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
interface CategoryData {
  url: string;
  category: string;
}

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function PostByCategory() {
  const [hoveredPostId, setHoveredPostId] = useState<null | string>(null);
  const [redIconPosts, setRedIconPosts] = useState(() => {
    const savedState = localStorage.getItem("redIconPosts");
    return savedState ? JSON.parse(savedState) : [];
  }); // State to hold post IDs with red icons

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { state } = useLocation();
  const filterPosts = state?.filterPosts || [];
  const category: CategoryData = state?.category;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [redIconPosts, dispatch]);


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

  // const sortAndFilterPosts = (
  //   posts: Post[],
  //   selectedSortCriteria: "grade" | "gender"
  // ): Post[] => {
  //   let filteredPosts: Post[] = [];

  //   // // Filter the posts based on the selected sort criteria
  //   // if (selectedSortCriteria === 'grade') {
  //   //   filteredPosts = posts.filter(post => post.grade.includes('כיתה ט'));
  //   // } else if (selectedSortCriteria === 'gender') {
  //   //   filteredPosts = posts.filter(post => post.gender.includes('נערים') );
  //   // }

  //   // Sort the filtered posts
  //   if (selectedSortCriteria === "grade") {
  //     filteredPosts.sort((a, b) => (a.grade > b.grade ? 1 : -1));
  //   } else if (selectedSortCriteria === "gender") {
  //     filteredPosts.sort((a, b) => (a.gender > b.gender ? 1 : -1));
  //   }

  //   return filteredPosts;
  // };

  return (
    <>
      <Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 200,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${category.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
            {category.category}
          </Typography>
        </Box>

        <Grid
          container
          marginTop={20}
          display={"flex"}
          justifyContent={"center"}
        >
          {filterPosts.map((post: Post, index: any) => (
            <Grid
              item
              md={12}
              lg={4}
              key={index}
              display={"flex"}
              justifyContent={"space-around"}
              paddingTop={4}
            >
              <Card
                style={{
                  height: 400,
                  width: 350,
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
                          <Grid item xs={6} lg={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <EventIcon  />
                            <Typography variant="caption" >
                            {formatDate(post.date)}
                            </Typography>
                            <Typography variant="caption">
                              {formatTime(post.date)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} lg={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>

                            <PlaceIcon />
                            <Typography variant="caption" textAlign="center" width={'50px'}>
                             הגיבורים 67, חדרה
                            </Typography>
                          </Grid>
                        <Grid item xs={6} lg={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <PersonIcon />
                            <Typography variant="caption" textAlign="center" width={'30px'}>
                              {Array.isArray(post.gender)
                                ? post.gender.join(" ")
                                : post.gender}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} lg={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <SchoolIcon />
                            <Typography variant="caption" textAlign="center" width={'50px'}>
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
