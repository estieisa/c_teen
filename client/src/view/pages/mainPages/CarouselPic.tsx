import Carousel from "react-material-ui-carousel";
import { Typography, Button, Grid } from "@mui/material";

export default function CarouselPic() {
  const carouselData = [
    {
      pic: `${require("../../../images/c_teen/13.JPG")}`,
      title: 'חב"ד לנוער חדרה',
      subTitle: "",
      button: "מי אנחנו",
    },
    {
    
      pic: `${require("../../../images/c_teen/waffles-7007465_1280.jpg")}`,
      title: "חלוקת מזון",
      subTitle: "",
      button: "פרטים נוספים",
    },
    {
      pic: `${require("../../../images/c_teen/17.jpg")}`,
      title: "מועדון הנוער",
      subTitle: "הגיבורים 67, חדרה",
      button: "פרטים נוספים",
    },
  ];

  return (
    <Carousel indicators={false} duration={1000}>
      {carouselData.map((data, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            backgroundImage: `url(${data.pic})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "85vh",
            position: "relative",
            top: 0,
            right: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            zIndex: 0,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            <Grid
              container
              display={"flex"}
              flexDirection={"column"}
              textAlign={"start"}
              marginBottom={20}
              marginRight={20}
            >
              <Grid item>
                <Typography variant="h1" style={{ fontSize: 60 }}>
                  {data.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" marginBottom={5}>
                  {data.subTitle}
                </Typography>
              </Grid>

              <Grid item>
                {" "}
                <Button
                  href="/about"
                  size="small"
                  variant="contained"
                  style={{
                    borderRadius: 30,
                    fontSize: 20,
                    height: 40,
                    width: 170,
                    backgroundColor: "#53cefc",
                    marginBottom: 5,
                  }}
                >
                  {data.button}
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
