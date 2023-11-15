import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { MuiTelInput } from "mui-tel-input";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../redux/hooks";
import { login } from "../../../redux/authSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";
import axiosInstance from "../../../axiosInstance";

export default function SignUp() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData();
    data.append("firstName", event.target.firstName.value);
    data.append("lastName", event.target.lastName.value);
    data.append("grade", grade);
    data.append("gender", gender);
    data.append("image", image);
    // data.append("phoneNumber", event.target.phoneNumber.value);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        data.append("userId", user.uid);
        user.getIdToken().then((token) => {
          axiosInstance({
            method: "post",
            url: "https://c-teen.vercel.app/api/users/signUp",
            data,
            withCredentials: true,
            headers: { Authorization: "Bearer " + token },
          })
            .then((res) => {
              dispatch(login());
              toast.success(res.data.status);
              navigate(from, { replace: true });
            })
            .catch((err) => {
              console.log("error", err.message);
            });
        });
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          הרשמה
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="שם פרטי"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="שם משפחה"
                name="lastName"
                autoComplete="family-name"
                size="small"
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <MuiTelInput
                id="phoneNumber"
                name="phoneNumber"
                label="פלאפון"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event)}
                size="small"
                required
                fullWidth
              />
            </Grid> */}
            <Grid item xs={12} sm={12}>
              <TextField
                type="file"
                required
                fullWidth
                id="תמונת פרופיל"
                // label="תמונת פרופיל"
                name="photoURL"
                autoComplete="photoURL"
                onChange={(event: any) => setImage(event.target.files[0])}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                id="grade"
                label="כיתה"
                name="grade"
                autoComplete="grade"
                onChange={(event) => setGrade(event.target.value)}
                value={grade}
                size="small"

              >
                <MenuItem key={"כיתה ט"} value={"כיתה ט"}>
                  כיתה ט
                </MenuItem>
                <MenuItem key={"כיתה י"} value={"כיתה י"}>
                  כיתה י
                </MenuItem>
                <MenuItem key={"כיתה יא"} value={"כיתה יא"}>
                  כיתה יא
                </MenuItem>
                <MenuItem key={"כיתה יב"} value={"כיתה יב"}>
                  כיתה יב
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                id="gender"
                label="מגדר"
                name="gender"
                autoComplete="gender"
                value={gender}
                size="small"
                onChange={(event) => setGender(event.target.value)}
              >
                <MenuItem key={"נערים"} value={"נערים"}>
                  נער
                </MenuItem>
                <MenuItem key={"נערות"} value={"נערות"}>
                  {" "}
                  נערה
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="אימייל"
                name="email"
                autoComplete="email"
                size="small"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="סיסמא"
                type="password"
                id="password"
                size="small"
                autoComplete="new-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="small"
            sx={{ mt: 3, mb: 2 , backgroundColor:'black'}}
          >
            הרשמה
          </Button>
 
        </Box>
      </Box>
    </Container>
  );
}
