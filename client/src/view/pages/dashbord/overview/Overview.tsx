import { Box, Card, Container, Unstable_Grid2 as Grid } from "@mui/material";
import BarsChart from "./BarsChart";
import Chart from "./Chart";
import { StateBox } from "./StateBox";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchUsers } from "../../../../redux/authSlice";
import { fetchPosts } from "../../../../redux/postsSlice";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import CalendarDashboard from "./CalendarDashboard";
export default function Overview() {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.auth.users);
  const posts = useAppSelector((state) => state.posts.posts);
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, [dispatch]);
  console.log(users);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} md={6} lg={4}>
              <Card style={{height:330, display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Chart users={users} />
              </Card>
            </Grid>
            <Grid xs={12} lg={8}>
              <Card>
                <BarsChart posts={posts} users={users} />
              </Card>
            </Grid>
            <Grid xs={12} md={4} spacing={10}>
              <Grid>
                <StateBox
                  title={posts.length}
                  subtitle="כמות פוסטים"
                  difference={16}
                  positive={false}
                  sx={{ height: "100%" }}
                  icon={<EventIcon sx={{ fontSize: "26px" }} />}
                />
              </Grid>

              <Grid marginTop={3}>
                <StateBox
                  title={users.length}
                  subtitle="כמות משתמשים"
                  difference={16}
                  positive={false}
                  sx={{ height: "100%" }}
                  icon={<PeopleIcon sx={{ fontSize: "26px" }} />}
                />
              </Grid>
            </Grid>
            <Grid xs={12} md={8}>
              <Card>
                <CalendarDashboard events={posts} />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
