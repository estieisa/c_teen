import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { Post } from "./postsSlice";
import axios from 'axios';

export interface User {
  user: {
    uid: string;
    email: string;
    phoneNumber: string;
    displayName: string;
    photoURL: string;
    isAdmin:boolean;
  };
  gender: string;
  grade: string;
  events:Post[]
}

export interface AuthState {
  loggedIn: boolean;
  isAdmin: boolean;
  status: string;
  error: string | undefined;
  users: User[];
  user: User;
}

const initialAuthState: AuthState = {
  loggedIn: false,
  isAdmin: false,
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: "",
  users: [],
  user: {
    user: {
      uid: "",
      email: "",
      phoneNumber: "",
      displayName: "",
      photoURL: "",
      isAdmin:false
    },
    gender: "",
    grade: "",
    events:[]
  },
};

const fetchUser = createAsyncThunk("users/UserProfile", async () => {
  try {
    const response = await axiosInstance.get(
      "https://cteen-api.onrender.com/users/UserProfile",
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

const fetchUsers = createAsyncThunk("users/getAllUsers", async () => {
  try {
    const response = await axios.get(
      "https://cteen-api.onrender.com/users/getAllUsers",
      { withCredentials: true }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
});

const fetchUpdateUser = createAsyncThunk("users/updateUser", async (data: object | string) => {
  try {
    const response = await axiosInstance.put(
      "https://cteen-api.onrender.com/users/updateUser",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error
  }
});

const fetchUpdateEventsUser = createAsyncThunk("users/updateEventsUser", async (post:Post) => {
  try {
    const response = await axiosInstance.put(
      "https://cteen-api.onrender.com/users/updateEventsUser",
      {post},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error
  }
});

const fetchDeleteUser = createAsyncThunk("users/deleteUser", async (userId:string | number) => {
  try {
    const response = await axiosInstance.put(
      "https://cteen-api.onrender.com/users/deleteUser",
      {userId},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error
  }
});

const fetchDeleteEventUser = createAsyncThunk("users/deleteEventUser", async (post:Post) => {
  try {
    const response = await axiosInstance.put(
      "https://cteen-api.onrender.com/users/deleteEventUser",
      {post},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error
  }
});



const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = {
        user: {
          uid: '',
          email: '',
          phoneNumber: '',
          displayName: '',
          photoURL: '',
          isAdmin: false,
        },
        gender: '',
        grade: '',
        events: []
      }
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdateEventsUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateEventsUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.events = action.payload;
      })
      .addCase(fetchUpdateEventsUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeleteEventUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteEventUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.events = action.payload;
      })
      .addCase(fetchDeleteEventUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchDeleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
export { fetchUser, fetchUsers, fetchUpdateEventsUser, fetchDeleteEventUser, fetchUpdateUser, fetchDeleteUser };
export const { login, logout, setAdmin } = authSlice.actions;
