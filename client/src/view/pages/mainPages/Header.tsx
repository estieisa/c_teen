import { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  Tooltip,
  Modal,
  Grid,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Post, fetchPosts } from "../../../redux/postsSlice";
import { fetchUser } from "../../../redux/authSlice";
import SignIn from "../auth/SignIn";
import ResetPassword from "../auth/ResetPassword";
import SignUp from "../auth/SignUp";

interface CategoryData {
  url: string;
  category: string;
}

const categoriesData: CategoryData[] = [
  {
    url: `${require("../../../images/c_teen/3.JPG")}`,
    category: "מי אנחנו",
  },
  {
    url: `${require("../../../images/c_teen/8.JPG")}`,
    category: "פעילות שבועית",
  },
  {
    url: `${require("../../../images/c_teen/waffles-7007465_1280.jpg")}`,
    category: "חלוקת מזון",
  },
  {
    url: `${require("../../../images/c_teen/13.JPG")}`,
    category: "ארועים מיוחדים",
  },
  {
    url: `${require("../../../images/c_teen/6.JPG")}`,
    category: "שאלות נפוצות",
  },
];

const settings = (isAdmin: boolean): string[] => {
  return isAdmin ? ["פרופיל", "דשבורד", "יציאה"] : ["פרופיל", "יציאה"];
};

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const posts = useAppSelector((state) => state.posts);
  // *check
  useEffect(() => {
    dispatch(fetchPosts());
    if (auth.loggedIn) {
      dispatch(fetchUser());
    }
  }, [auth.loggedIn, dispatch]);

  const [selectedComponent, setSelectedComponent] = useState<JSX.Element>(
    <SignIn/>
  );
  console.log(selectedComponent)
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigateSetting = (setting: string) => {
    const settingsMap: { [key: string]: string } = {
      פרופיל: "/user-profile",
      דשבורד: "/dashboard/overview",
      יציאה: "/sign-out",
    };

    navigate(settingsMap[setting]);
  };

  const navigatePages = (category: CategoryData) => {
    const currentDate = new Date();
    const filterPosts = posts.posts.filter((post: Post) => {
      return (
        post.category === category.category && new Date(post.date) > currentDate
      );
    });
    const categoryPagesMap: { [key: string]: string } = {
      "שאלות נפוצות": "/question-answer",
      "מי אנחנו": "/about",
    };
    navigate(categoryPagesMap[category.category] || "/post", {
      state: { filterPosts, category },
    });
  };

  const handleButtonClick = () => {
    setOpen(true);
    setSelectedComponent(<SignIn/>);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedComponent(<SignIn/>);
  };
  const handleComponentChange = (component: any) => {
    setSelectedComponent(component);
  };
  return (
    <>
      <Grid>
        <Container>
          <Toolbar disableGutters>
            <Link to="/">
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "fixed",
                  top: 5,
                }}
                alt="Logo"
                src={require("../../../images/logo/logo.jpg")}
              ></Avatar>
            </Link>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", justifyContent: "center" },
              }}
            >
              {categoriesData.map((category) => (
                <Button
                  key={category.category}
                  onClick={() => {
                    navigatePages(category);
                    setAnchorElNav(null);
                  }}
                  sx={{ my: 2, mx: 2, color: "black", display: "block" }}
                >
                  {category.category}
                </Button>
              ))}
            </Box>
            <Button
              size="small"
              variant="contained"
              href="https://www.shutaf.im/c18"
              sx={{
                display: { xs: "none", md: "flex" },
              }}
              style={{
                marginLeft: 20,
                backgroundColor: clicked ? "#53cefc" : "#f69e52",
                borderRadius: 20,
              }}
              onMouseEnter={() => setClicked(true)}
              onMouseLeave={() => setClicked(false)}
            >
              שותף
            </Button>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => setAnchorElNav(event.currentTarget)}
              >
                <MenuIcon
                  sx={{ width: "30px", height: "30px", color: "#53cefc" }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {categoriesData.map((category) => (
                  <MenuItem
                    key={category.category}
                    onClick={() => setAnchorElNav(null)}
                  >
                    <Typography
                      onClick={() => navigatePages(category)}
                      textAlign="center"
                      sx={{ color: "text.primary" }}
                    >
                      {category.category}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {auth.loggedIn ? (
              <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={(event) => setAnchorElUser(event.currentTarget)}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      alt={auth.user.user.displayName}
                      src={
                        auth.user.user.photoURL
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                >
                  {settings(auth.isAdmin).map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => setAnchorElUser(null)}
                    >
                      <Typography
                        onClick={() => navigateSetting(setting)}
                        textAlign="center"
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <>
                <Button
                  style={{ backgroundColor: "none", color: "black" }}
                  sx={{ display: { xs: "flex", md: "flex" } }}
                  onClick={handleButtonClick}
                >
                  <PersonOutlineIcon />
                </Button>
                <Modal
                  open={open}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      border: "2px solid #000",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    {selectedComponent}
                    <Grid container justifyContent="center">
                      <Grid item>
                        {(selectedComponent.type.name === "Xv" || selectedComponent.type.name ===  "SignIn") && (
                          <>
                            <Grid
                              container
                              spacing={15}
                              style={{ fontSize: 10 }}
                            >
                              <Grid item xs>
                                <Link
                                  style={{ color: "black" }}
                                  to="#"
                                  onClick={() =>
                                    handleComponentChange(<ResetPassword/>)
                                  }
                                >
                                  שכחת סיסמא?
                                </Link>
                              </Grid>
                              <Grid item>
                                <Link
                                  style={{ color: "black" }}
                                  to="#"
                                  onClick={() =>
                                    handleComponentChange(<SignUp/>)
                                  }
                                >
                                  אין לך חשבון? הרשם כאן
                                </Link>
                              </Grid>
                            </Grid>
                          </>
                        )}
                        {(selectedComponent.type.name === "By" || selectedComponent.type.name === "SignUp")  && (
                          <Link
                            style={{ fontSize: 13, color: "black" }}
                            to="#"
                            onClick={() => handleComponentChange(<SignIn />)}
                          >
                            כבר יש לך חשבון? התחבר
                          </Link>
                        )}
                        {(selectedComponent.type.name === "XL" || selectedComponent.type.name === "ResetPassword")  && (
                          <Link
                            style={{ fontSize: 13, color: "black" }}
                            to="#"
                            onClick={() => handleComponentChange(<SignIn />)}
                          >
                            כבר יש לך חשבון? התחבר
                          </Link>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Modal>
              </>
            )}
          </Toolbar>
        </Container>
      </Grid>
    </>
  );
}
