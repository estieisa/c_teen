import { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";

export default function QuestionAnswer() {
  const QuestionAnswerData = [
    {
      question: "What are the best flowers for a wedding bouquet?",
      answer:
        "Popular choices for wedding bouquets include roses, peonies, lilies, and hydrangeas.",
    },
    {
      question: "How can I preserve the freshness of cut flowers?",
      answer:
        "To keep cut flowers fresh, trim stems, change water every few days, and avoid placing them in direct sunlight or near drafts.",
    },
    {
      question: "What flowers are suitable for a garden in full sunlight?",
      answer:
        "Sun-loving flowers include sunflowers, marigolds, petunias, and zinnias, among others.",
    },
    {
      question: "Which flowers are known for their fragrance?",
      answer:
        "Fragrant flowers include roses, jasmine, lavender, and gardenias, renowned for their delightful scents.",
    },
    {
      question: "What flowers are suitable for a garden in full sunlight?",
      answer:
        "Sun-loving flowers include sunflowers, marigolds, petunias, and zinnias, among others.",
    },
    {
      question: "Which flowers are known for their fragrance?",
      answer:
        "Fragrant flowers include roses, jasmine, lavender, and gardenias, renowned for their delightful scents.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpandClick = (index: any) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Grid>
      <Grid container marginTop={10}>
        {QuestionAnswerData.map((QuestionAnswer, index: any) => (
          <Grid
            item
            xs={12}
            margin={2}
            key={index}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              key={index}
              onClick={() => handleExpandClick(index)}
              sx={{ width: { xs: "100%", md: "50%" },}}
            >
              <Card style={{ border: "1px solid #f69e52", width: "100%" }}>
                <CardContent>
                  <Typography variant="h6">
                    {QuestionAnswer.question}
                  </Typography>
                  {expandedIndex === index && (
                    <Typography variant="body1">
                      {QuestionAnswer.answer}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
