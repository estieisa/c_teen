import { useEffect, useState } from "react";
import { User } from "../../../../redux/authSlice";
import { PieChart, pieArcClasses } from "@mui/x-charts";

export default function Chart({ users }: { users: User[] }) {
  const [chartData, setChartData] = useState([
    { id: 0, value: 0, label: "כיתה ט" },
    { id: 1, value: 0, label: "כיתה י" },
    { id: 2, value: 0, label: "כיתה יא" },
    { id: 3, value: 0, label: "כיתה יב" },
  ]);

  useEffect(() => {
    // Count the number of users for each grade
    const gradeCounts: any = {
      "כיתה ט": 0,
      "כיתה י": 0,
      "כיתה יא": 0,
      "כיתה יב": 0,
    };

    users.forEach((user) => {
      const { grade } = user;
      if (grade in gradeCounts) {
        gradeCounts[grade]++;
      }
    });

    // Update the chart data
    const updatedChartData = chartData.map((dataItem) => {
      return {
        ...dataItem,
        value: gradeCounts[dataItem.label],
      };
    });

    setChartData(updatedChartData);
  }, [users,chartData]);

  return (
    <>
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30 },
          },
        ]}
        sx={{
          [`& .${pieArcClasses.faded}`]: {
            fill: "gray",
          },
        }}
        height={220}
      />
    </>
  );
}
