import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";

function ResetPassword() {
  const [email, setEmail] = useState<string>("");

  const handleSubmitEmail = async (event: FormEvent) => {
    event.preventDefault();

    await axiosInstance
      .post("https://c-teen-api.vercel.app/users/resetPassword", { email })
      .then((res) => {
        if (res.data) {
          toast.success(res.data);
        } else {
          toast.error("אירעה שגיאה. אנא נסה שוב");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("אירעה שגיאה. אנא נסה שוב");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          שיחזור סיסמא
        </Typography>

        <Typography variant="body2">
          אנו נשלח לך דוא"ל עם הוראות השחזור
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmitEmail}
          sx={{ mt: 1 }}
        >
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
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor:'black' }}
            size="small"
          >
            שיחזור סיסמא
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ResetPassword;
