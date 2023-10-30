import { Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export default function NewPosts() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Button onClick={() => navigate("new-post")}>הוספת ארוע חד פעמי</Button>
        {/* <Button>הוספת ארוע חד פעמי</Button> */}
      </div>

      <Outlet />
    </>
  );
}
