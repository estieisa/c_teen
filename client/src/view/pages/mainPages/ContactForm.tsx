import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Grid
      padding={2}
      style={{
        height: 700,
        position: "relative",
      }}
    >
      <Box textAlign={"center"} marginTop={10}>
        <Typography
          padding={2}
          variant="h3"
          style={{
            borderBottom: "2px solid #000",
            display: "inline-block",
            fontFamily: "cursive",
          }}
        >
          צור קשר
        </Typography>
      </Box>

      <Box display={"flex"} justifyContent={"center"}>
        <form
          onSubmit={handleSubmit}
          style={{ width: 600, height: 300, position: "relative", zIndex: 1 }}
        >
          <Box>
            <TextField
              fullWidth
              label="שם מלא"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              size="small"
              color="primary"
              sx={{ backgroundColor: "white" }}
            />
            <TextField
              fullWidth
              label="פלאפון"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              size="small"
              sx={{ backgroundColor: "white" }}
            />
            <TextField
              fullWidth
              label="מייל"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              size="small"
              sx={{ backgroundColor: "white" }}
            />
            <TextField
              fullWidth
              label="הודעה"
              name="message"
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              size="small"
              sx={{ backgroundColor: "white" }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="small"
              sx={{ backgroundColor: "#f69e52" }}
            >
              צור קשר
            </Button>
          </Box>
        </form>
      </Box>
      <div
        style={{
          backgroundColor: "#53cefc",
          opacity: 0.1,
          width: "100%",
          height: "40%",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 0,
        }}
      ></div>
    </Grid>
  );
}
