import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
// import { googleMaps } from "./Controllers/FetchApi";
import { instagramPosts } from "./controllers/fetchApi";
require("dotenv").config();


const app = express();
const port = process.env.PORT;

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT as string) 
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


app.use("/api/posts", require("./router/postsRout"));
app.use("/api/users", require("./router/usersRout"));
// app.use('/serpapi-locations', googleMaps)
app.use('/api/instagram-posts', instagramPosts)


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
