// const router = require("express").Router();
import express from 'express';
const router = express.Router();
import { getAllPosts, newPost, updatePostUsers, deletePost } from "../controllers/postController";
import { authorizationAdmin, authorizationUser } from "../middleWare/authorization";
import { upload } from "../middleWare/multerStorage";

router
  .post("/posts/newPost", authorizationAdmin, upload.single("image"), newPost)
  .get("/posts/getAllPosts",  getAllPosts)
  // .get("/getPost", authorizationAdmin, getPost)
  .put("/posts/updateUsersEvent", authorizationUser, updatePostUsers)
  .put("/posts/deletePost", authorizationUser, deletePost);

module.exports = router;
