import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
// import { googleMaps } from "./Controllers/FetchApi";
import { instagramPosts } from "./controllers/fetchApi";
import path from "path";
require("dotenv").config();
const serviceAccount = require("./firebasecreds.json");
// import Post from 


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
    origin: ['https://c-teen.vercel.app', 'http://localhost:3000'],
    maxAge: 2592000,
    allowedHeaders:"Access-Control-Allow-Origin"
  })
);


app.use("/api/users", require("./Router/usersRout"));
app.use("/api/posts", require("./Router/postsRout"));
// app.use('/serpapi-locations', googleMaps)
app.use('/api/instagram-posts', instagramPosts)


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
