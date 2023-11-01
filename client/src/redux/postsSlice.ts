import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export interface Post {
  id: string;
  title: string;
  description: string;
  gender: string[];
  grade: string[];
  image: string;
  category: string;
  date: string;
  users:string[]
}

interface PostsState {
  posts: Post[];
  status: string;
  error: string | undefined;
}

const initialState: PostsState = {
  posts: [],
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: "",
};

const fetchPosts = createAsyncThunk("/posts/getAllPosts", async () => {
  try {
    const response = await axiosInstance.get(
      "/posts/getAllPosts",
      { withCredentials: true }
    );
    console.log(response)
    return response.data.postsArr;
  } catch (error) {
    throw error;
  }
});

const fetchUpdateUsersEvent = createAsyncThunk("/posts/updateUsersEvent", async (post:Post) => {
  try {
    const response = await axiosInstance.put(
      "/posts/updateUsersEvent",
      {post},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error
  }
});

const fetchDeletePost = createAsyncThunk("/posts/deletePost", async (postId:string | number) => {
  try {
    const response = await axiosInstance.put(
      "/posts/deletePost",
      {postId},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error
  }
});


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdateUsersEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateUsersEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchUpdateUsersEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchDeletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
export { fetchPosts, fetchUpdateUsersEvent, fetchDeletePost };




