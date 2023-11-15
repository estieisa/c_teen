import { instagramPosts } from "../controllers/fetchApi";
import express from 'express';
const router = express.Router();

router
    .get('/instagram-posts',instagramPosts )


module.exports = router;