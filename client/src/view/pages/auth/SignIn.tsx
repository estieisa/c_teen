import * as React from "react";
import {  useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword,  } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";
import SignInWithGoogle from "./SignInWithGoogle";
import { useAppDispatch } from "../../../redux/hooks";
import { login, setAdmin } from "../../../redux/authSlice";
import axiosInstance from "../../../axiosInstance";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    signInWithEmailAndPassword(auth, email as string, password as string)
      .then((userCredential) => {
        const user = userCredential.user;

        user.getIdToken().then((token) => {
          axiosInstance({
            method: "post",
            url: "/api/users/signIn",
            data: user,
            withCredentials: true,
            headers: { Authorization: "Bearer " + token },
          })
            .then((res) => {
              dispatch(login());
              toast.success(res.data.status);
              navigate('/');
              if (res.data.isAdmin) {
                 dispatch(setAdmin(true));
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          התחברות
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            type="text"
            id="email"
            label="אימייל"
            name="email"
            autoComplete="email"
            autoFocus
            size="small"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמא"
            type="password"
            id="password"
            autoComplete="current-password"
            size="small"
          />
          <Button
            type="submit"
            fullWidth
            size="small"
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
          >
            התחברות
          </Button>
        </Box>
        <SignInWithGoogle />
      </Box>
    </Container>
  );
}
