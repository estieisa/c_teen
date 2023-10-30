import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import {
  Typography,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";

export default function Footer() {
  return (
    <footer style={{ marginTop: "150px", position: "relative", height: 180 }}>
      <div
        style={{
          backgroundColor: "#53cefc",
          opacity: 0.2,
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        ></div>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} padding={3}>

            <Box>
              <IconButton href="https://www.instagram.com/c_teen_hadera/">
                <InstagramIcon
                  fontSize="large"
                  sx={{
                    color: "#f69e52",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                />
              </IconButton>
              <IconButton href="https://www.facebook.com/chabadhadera/posts/5115557191834856/?paipv=0&eav=AfYiwHYSTVvwBIr5hoNaUkvsyFg35tywuqLHd1hTMaK8dGn_8MaWcVXcPC8PgRuFlGI&_rdr">
                <FacebookIcon
                  fontSize="large"
                  sx={{
                    color: "#f69e52",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                />
              </IconButton>
              <IconButton href="https://www.tiktok.com/@arav_eli_levin">
                <MusicNoteIcon
                  fontSize="large"
                  sx={{
                    color: "#f69e52",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                />
              </IconButton>
            </Box>

            <Typography variant='overline' fontSize={13}>
              חב"ד לנוער חדרה | הגיבורים 67, 38380 | חדרה,ישראל
              <br />
            </Typography>

            <Avatar
              sx={{
                width: 50,
                height: 50,
              }}
              alt="Logo"
              src={require("../../../images/logo/logo.jpg")}
            />
      </Box>
    </footer>
  );
}
