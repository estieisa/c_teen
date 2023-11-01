import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axiosInstance from "../../../../axiosInstance";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function NewPost() {
  //options
  const gradeOptions = ["כיתה ט", "כיתה י", "כיתה יא", "כיתה יב"];
  const genderOptions = ["נערים", "נערות"];

  //state
  const [category, setCategory] = useState("");
  const [grades, setGrades] = useState([gradeOptions[0]]);
  const [genders, setGenders] = useState([genderOptions[0]]);
  const [image, setImage] = useState("");
  const [date, setDate] = useState<Dayjs | null | string>(dayjs().utc());

  const handleChangeCategory = (event: any) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData();
    data.append("image", image);
    data.append("title", event.target.title.value);
    data.append("description", event.target.description.value);
    data.append("category", category);
    data.append("date", date as string);
    for (const grade of grades) {
      data.append("grade", grade);
    }
    for (const gender of genders) {
      data.append("gender", gender as string);
    }

    axiosInstance
      .post("posts/newPost", data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.status === 200) {
          setImage("");
          setCategory("");
          setGrades([gradeOptions[0]]);
          setGenders([genderOptions[0]]);
          setDate(dayjs().utc());
          event.target.reset();
          return toast.success("אירוע נוסף בהצלחה");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container spacing={3} justifyContent={"center"} marginTop={10}>
      <Box width={500}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Card>
            <CardHeader title="הוספת אירוע" />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }}>
                <Grid
                  container
                  spacing={3}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Grid xs={12} >
                    <TextField
                      name="title"
                      label="כותרת"
                      required
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid xs={12} >
                    <TextField
                      name="description"
                      label="תיאור"
                      required
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      id="categorys"
                      required
                      label="קטגוריה"
                      name="categorys"
                      select
                      fullWidth
                      size="small"
                      autoComplete="grade"
                      onChange={handleChangeCategory}
                      value={category}
                    >
                      <MenuItem key={"פעילות שבועית"} value={"פעילות שבועית"}>
                        שיעור שבועי
                      </MenuItem>
                      <MenuItem key={"חלוקת מזון"} value={"חלוקת מזון"}>
                        חלוקת מזון
                      </MenuItem>
                      <MenuItem key={"ארועים מיוחדים"} value={"ארועים מיוחדים"}>
                        ארועים מיוחדים
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid xs={12} >
                    <Autocomplete
                      id="gender"
                      aria-required
                      multiple
                      fullWidth
                      size="small"
                      value={genders}
                      onChange={(event, newValue) => {
                        setGenders([...newValue.filter((option) => option)]);
                      }}
                      options={genderOptions}
                      renderInput={(params) => (
                        <TextField {...params} label="נערים/נערות" />
                      )}
                    />
                  </Grid>
                  <Grid xs={12} >
                    <Autocomplete
                      id="grade"
                      multiple
                      fullWidth
                      size="small"
                      value={grades}
                      onChange={(event, newValue) => {
                        setGrades([...newValue.filter((option) => option)]);
                      }}
                      options={gradeOptions}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField {...params} label="כיתה" />
                      )}
                    />
                  </Grid>
                  <Grid xs={12} >
                    <TextField
                      name="image"
                      required
                      id="image"
                      label="תמונה"
                      type="file"
                      fullWidth
                      size="small"
                      onChange={(event: any) => setImage(event.target.files[0])}
                    />
                  </Grid>
                  <Grid xs={12} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        timezone={"Asia/Jerusalem"}
                        value={date}
                        onChange={setDate}
                        sx={{ width: "100%", height: 47 }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                type="submit"
                size="small"
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
              >
                הוסף אירוע
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Grid>
  );
}
