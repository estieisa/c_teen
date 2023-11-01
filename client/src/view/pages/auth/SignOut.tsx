import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase-config";
import { useAppDispatch } from "../../../redux/hooks";
import {logout, setAdmin } from "../../../redux/authSlice";
import axiosInstance from "../../../axiosInstance";


export default function SignOut() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        axiosInstance
          .post(
            "/api/users/signOutUser",
            {},
            { withCredentials: true }
          )
          .then((res) => {
            dispatch(logout())
            dispatch(setAdmin(false))
            navigate('/');
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    signOutUser();
  }, []);
  
  return <div></div>;
}
