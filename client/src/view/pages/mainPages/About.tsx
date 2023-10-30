import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";

export default function About() {
  return (
    <>
      <Grid
        padding={2}
        style={{
          height: 700,
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "#53cefc",
            opacity: 0.1,
            width: "100%",
            height: "70%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></div>
        <Box textAlign={"center"}>
          <Typography
            padding={2}
            variant="h3"
            style={{
              borderBottom: "2px solid #000",
              display: "inline-block",
              fontFamily: "cursive",
            }}
          >
            אודות
          </Typography>
        </Box>

        <Grid container spacing={2} marginTop={3}>
          <Grid
            item
            display="flex"
            justifyContent="center"
            alignItems="center"
            xs={12}
          >
            <Typography
              variant="caption"
              textAlign="center"
              color="dark"
              width={650}
              fontSize={17}
              fontFamily="cursive"
            >
              היום, כולנו סומכים על הנוער שלנו. בני הנוער שלנו הם העתיד, הם
              ההבטחה הגדולה ולמעשה, הם כבר מקיימים היום... כאן בסניף חב"ד לנוער
              חדרה מתנדבים מדי שבוע עשרות בני נוער מסייעים לקשישים ולנזקקים,
              מקדמים בני נוער בסיכון וילדים עם צרכים מיוחדים ומובילים שינוי
              קהילתי. כולנו רוצים שהם יוכלו להמשיך בעשייה החשובה וזה בידיים
              שלנו! "בית חב"ד לנוער חדרה מקום חמים ונעים, מתקיימים בו שיעורי
              תורה ערכים ומסורת לבנים ולבנות. חלוקת מנות חמות לקשישים מידי יום
              חמישי ועוד מגוון פעילויות של חסד. שיעורים מיוחדים וסדנאות סביב חגי
              ישראל ומועדון בר מצווה מיוחד במינו. בני ובנות הנוער היקרים מוזמנים
              להצטרף."
            </Typography>
          </Grid>
        </Grid>
        <Box display={"flex"} justifyContent={"center"} marginTop={5}>
          <Card style={{ width: 500, height: 300, zIndex: 1 }}>
            <CardMedia
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${require("../../../images/c_teen/12.JPG")})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Card>
        </Box>
      </Grid>
    </>
  );
}
