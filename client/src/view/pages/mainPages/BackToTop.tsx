import {
  AppBar,
  Fab,
  Fade,
  useScrollTrigger,
  Box,
  Grid,
  Button,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

interface ScrollProps {
  children: React.ReactElement;
}

function ScrollToTop(props: ScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex:2 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const BackToTop = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid
        style={{
          backgroundColor: "#53cefc",
          display: "flex",
          color: "white",
          height: 25,
        }}
      >
        <Button
         sx={{
          flexGrow: 1,
          display: { xs: "none", lg: "flex", justifyContent: "flex-end" },
        }}
          onClick={() => navigate("contact-form")}
          color="inherit"
          style={{ marginLeft: 170 }}
          size="small"
        >
          צרו קשר
        </Button>
      </Grid>
      <AppBar
        position="sticky"
        color="inherit"
        sx={{ borderBottom: 1, borderColor: "#53cefc" }}
      >
        <Header />
      </AppBar>
      <div id="back-to-top-anchor" />
      <ScrollToTop>
        <Fab
          size="small"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 99999,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTop>
    </>
  );
};

export default BackToTop;
