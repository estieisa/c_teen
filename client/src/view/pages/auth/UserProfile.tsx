import {  useRef, useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  Box,
  CardActions,
  Divider,
  Container,
  Stack,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchUpdateUser, fetchUser } from "../../../redux/authSlice";
import Calendar from "./Calendar";
import { UserProfileDetails } from "./UserProfileDetails";

export default function UserProfile() {
  // const [image, setImage] = useState<File | undefined>(undefined);
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const { email,
    //  phoneNumber,
      displayName, photoURL } = auth.user.user;
  const { events } = auth.user;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadPicture = async () => {
    (fileInputRef.current as any).click();
  };

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      console.error("לא נבחרה תמונה");
      return;
    }

    // setImage(selectedFile);

    const data = new FormData();
    data.append("image", selectedFile);

    try {
      await dispatch(fetchUpdateUser(data));
      await dispatch(fetchUser());
    } catch (error) {
      console.error("Error uploading picture:", error);
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">פרופיל</Typography>
            </div>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                md={6}
                lg={5}
                marginLeft={5}
                display={"flex"}
                flexDirection={"column"}
              >
                <Grid item xs={12} marginBottom={5}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Avatar
                          alt={displayName}
                          src={
                            auth.status === "succeeded" ? photoURL : undefined
                          }
                          sx={{
                            height: 80,
                            mb: 2,
                            width: 80,
                          }}
                        />

                        <Typography gutterBottom variant="h5">
                          {displayName}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {email}
                        </Typography>
                        {/* <Typography color="text.secondary" variant="body2">
                          {phoneNumber}
                        </Typography> */}
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileInputChange}
                      />
                      <Button fullWidth variant="text"  onClick={uploadPicture}>
                        עדכן תמונה
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                <UserProfileDetails />

                </Grid>
              </Grid>
              <Grid item xs={11} md={6} lg={6}>
              <Calendar events={events} />

              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
