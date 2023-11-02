import { instagramPosts } from "../controllers/fetchApi";

const router = require('express').Router();


router
    .get('/instagram-posts',instagramPosts )


module.exports = router;