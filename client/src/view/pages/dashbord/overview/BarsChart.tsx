import * as React from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Post } from "../../../../redux/postsSlice";
import { User } from "../../../../redux/authSlice";

export default function BarsChart({
  posts,
  users,
}: {
  posts: Post[];
  users: User[];
}) {
  interface GradesData {
    [key: string]: number[];
  }

  const gradesData: GradesData = {
    "כיתה ט": Array(posts.length).fill(0),
    "כיתה י": Array(posts.length).fill(0),
    "כיתה יא": Array(posts.length).fill(0),
    "כיתה יב": Array(posts.length).fill(0),
  };

  posts.forEach((post, index) => {
    post?.users?.forEach((student) => {
      const user = users.find((u) => u.user.uid === student);
      if (user && user.grade) {
        const grade = user.grade;
        console.log(gradesData[grade]);
        console.log(grade);
        gradesData[grade][index]++;
      }
    });
  });

  const xAxisData = posts.map((post) => post.title);

  const modifiedSeries = [
    { label: "כיתה ט", data: gradesData["כיתה ט"], stack: "total" },
    { label: "כיתה י", data: gradesData["כיתה י"], stack: "total" },
    { label: "כיתה יא", data: gradesData["כיתה יא"], stack: "total" },
    { label: "כיתה יב", data: gradesData["כיתה יב"], stack: "total" },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ overflow: "auto", py: 2 }}>
        <BarChart
          width={700}
          height={300}
          xAxis={[
            {
              label: "שם האירוע",
              scaleType: "band" as const,
              data: xAxisData,
            },
          
          ]}
          yAxis={[{ min: 0, max: 10 }]}
          series={modifiedSeries}
          margin={{ bottom: 70 }}
          sx={{
            [`.${axisClasses.bottom}`]: {
              [`.${axisClasses.tickLabel}`]: {
                fontSize:6,
                fontWeight:'100px',
                dominantBaseline: "hanging",
                textAnchor: "start",
              },
              [`.${axisClasses.label}`]: {
                transform: 'translateY(15px)'
              },
            },
            "--ChartsLegend-itemWidth": "110px",
          }}
        />
      </Box>
    </Box>
  );
}
