import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
// import { googleMaps } from "./Controllers/FetchApi";
import { instagramPosts } from "./controllers/fetchApi";
require("dotenv").config();
const serviceAccount = require("./firebasecreds.json");


const app = express();
const port = process.env.PORT;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

export const db = admin.firestore();
export const bucket = admin.storage().bucket();

//middleWare
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: true,
    maxAge: 2592000,
  })
);


app.use("/users", require("./Router/usersRout"));
app.use("/posts", require("./Router/postsRout"));
// app.use('/serpapi-locations', googleMaps)
app.use('/instagram-posts', instagramPosts)


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
