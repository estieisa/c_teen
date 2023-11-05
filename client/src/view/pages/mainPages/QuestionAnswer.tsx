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
      question: "מה זה CTeen?",
      answer:
        "הוא ארגון בינלאומי הפועל לחינוך הנוער היהודי, כזרוע של המרכז לעניני חינוך שבניו יורק. בארגון חברים למעלה מ-100,000 בני נוער ברחבי העולם, 630 מרכזים הפזורים ב-44 מדינות. הארגון נחשב לתנועת הנוער היהודי הצומחת והמגוונת ביותר בעולם.",
    },
    {
      question: "מה הפעילויות שיש בחבד לנוער?",
      answer:
        "מלבד הפעילויות סביב מעגל השנה, המופעלות על ידי כל סניף באופן פרטי, מפעיל הארגון מספר תכניות שנתיות המיועדות לכלל הסניפים, ביניהם: CTeen International Sabbaton - שבתון בני הנוער העולמי של ארגון הנוער היהודי, הינו סוף שבוע שנתי המאגד אלפי בני נוער מרחבי העולם המתקיים בשכונת קראון הייטס. CTeen XTREME - 'סי-טן אקסטרים', מחנה קיץ אתגרי בו החניכים מאתגרים את עצמם פיזית ורוחנית על ידי השתתפות בספורט אתגרי, שמירת שבת נטולת טכנולוגיה לחלוטין ושמירה על כשרות בדרכים.",
    },
    {
      question: "מי הרב והרבנית בסניף חדרה?",
      answer:
        "הרב אלי ומושקא לוין",
    },
    {
      question: "איך אני יכול/ה להרשם לסניף?",
      answer:
    "צור קשר עם הרב או הרבנית של הסניף שלך"
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
