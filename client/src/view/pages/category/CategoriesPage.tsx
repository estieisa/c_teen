import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import {
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Post, fetchPosts } from "../../../redux/postsSlice";
import { useNavigate } from "react-router-dom";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 350,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 80,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.05,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const imagesrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.2,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

interface CategoryData {
  url: string;
  category: string;
}

export default function CategoriesPage() {
  const navigate = useNavigate();
  
  const categoriesData: CategoryData[] = [
    {
      url: `${require("../../../images/c_teen/3.JPG")}`,
      category: "מי אנחנו",
    },
    {
      url: `${require("../../../images/c_teen/2.JPG")}`,
      category: "פעילות שבועית",
    },
    {
      url: `${require("../../../images/c_teen/8.JPG")}`,
      category: "חלוקת מזון",
    },
    {
      url: `${require("../../../images/c_teen/5.JPG")}`,
      category: "ארועים מיוחדים",
    },
    {
      url: `${require("../../../images/c_teen/6.JPG")}`,
      category: "שאלות נפוצות",
    },
  ];
  const posts = useAppSelector((state) => state.posts);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const filteredPostsByCategoryAndDate = (category:CategoryData ) => {
    const currentDate = new Date();
    const filterPosts = posts.posts.filter((post: Post) => {
      return post.category === category.category && new Date(post.date) > currentDate;
    });
    navigate("/PostByCategory", { state: { filterPosts, category } });
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        marginTop={20}
        style={{ backgroundColor: "green" }}
      >
        {categoriesData.map((category:CategoryData, index) => (
          // <Grid item xs={4} key={index}>
          //   <Box
          //     sx={{
          //       display: "flex",
          //       justifyContent: "center",
          //       alignItems: "center",
          //     }}
          //   >
          //     <ImageButton
          //       focusRipple
          //       key={"post.title"}
          //       style={{
          //         width: "80%",
          //       }}
          //       onClick={() =>
          //         filteredPostsByCategoryAndDate(category.category)
          //       }
          //     >
          //       <imagesrc
          //         style={{
          //           backgroundImage: `url(${category.url})`,
          //         }}
          //       />
          //       <ImageBackdrop className="MuiImageBackdrop-root" />
          //       <Image>
          //         <Typography
          //           component="span"
          //           variant="subtitle1"
          //           color="inherit"
          //           sx={{
          //             position: "relative",
          //             p: 4,
          //             pt: 2,
          //             pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
          //           }}
          //         >
          //           {category.text}
          //           <ImageMarked className="MuiImageMarked-root" />
          //         </Typography>
          //       </Image>
          //     </ImageButton>
          //   </Box>
          // </Grid>

          <Grid item xs={2} key={index} style={{ backgroundColor: "red" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  textAlign: "center",
                  backgroundColor: "white",
                  borderRadius: 15,
                  boxShadow:
                    "0px 5px 22px rgba(0, 0, 0, 0.09), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  height: "200px",
                  width: "200px",
                }}
                onClick={() =>
                  filteredPostsByCategoryAndDate(category)
                }
              >
                <AdsClickIcon
                  style={{ fontSize: 100, marginBlock: 10, color: "#f69e52" }}
                />
                  <Typography style={{ color: "black" }}>
                    {category.category}
                  </Typography>

              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
