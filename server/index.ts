import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

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
    origin: ['https://cteen.vercel.app', 'http://localhost:3000', 'http://localhost:3001'],
    maxAge: 2592000,
    methods: 'GET,POST,PUT,DELETE', // Specify the allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Specify the allowed headers
  })
);


// Serve static files from the 'client/build' directory
app.use(express.static(path.join(__dirname, '../client/build')));

// API routes
const postsRout = require("./router/postsRout");
const usersRout = require("./router/usersRout");
const instagramRout = require("./router/instagramRout");
app.use('/api', postsRout, usersRout, instagramRout);

// Serve the React app for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
