import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@mui/material";
import { auth } from "../../../firebase/firebase-config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { login } from "../../../redux/authSlice";
import axiosInstance from "../../../axiosInstance";

export default function SignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        result.user
          .getIdToken()
          .then((token) => {
            axiosInstance({
              method: "post",
              url: "/users/signIn",
              withCredentials: true,
              headers: { Authorization: "Bearer " + token },
            })
              .then((res) => {
                dispatch(login());
                toast.success(res.data.status);
                navigate('/');
              })
              .catch((err) => {
                if (err.response) {
                  toast.error(err.response.data);
                } else {
                  toast.error("Something went wrong");
                }
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        console.log(errorCode | errorMessage | email);
      });
  };

  return (
    <>
      <Button
        onClick={signInWithGoogle}
        fullWidth
        variant="outlined"
        sx={{ mt: 3, mb: 2, color: "black", border: "1px solid black" }}
      >
        Sign In With Google
      </Button>
    </>
  );
}
