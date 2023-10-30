import { useCallback, useState, FormEvent, } from "react";
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
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchUpdateUser, fetchUser } from "../../../redux/authSlice";

const genders = [
  { value: "נערות", label: "נערה" },
  { value: "נערים", label: "נער" },
];

const grades = ["כיתה ט", "כיתה י", "כיתה יא", "כיתה יב"];

export const UserProfileDetails = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);
  const { email, phoneNumber, displayName } = auth.user.user;
  const [firstName, lastName] = displayName.split(" ");
  const { gender, grade, events } = auth.user;
  const [phoneNumberChange] = useState(phoneNumber);

  const [values, setValues] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumberChange,
    gender: gender,
    grade: grade,
    events: events,
  });

  const handleChange = useCallback((event:any) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(fetchUpdateUser(values));
    await dispatch(fetchUser());
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card style={{textAlign:'center'}} >
        <CardHeader subheader="שינוי פרטי משתמש" title="פרופיל" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="שם פרטי"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="שם משפחה"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="מגדר"
                  name="gender"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.gender}
                >
                  {genders.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} >
                <TextField
                  fullWidth
                  label="כיתה"
                  name="grade"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.grade}
                >
                  {grades.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            style={{ backgroundColor: "#53cefc" }}
            type="submit"
            variant="contained"
          >
            שמור פרטים
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
