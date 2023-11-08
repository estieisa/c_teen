import { Routes, Route } from "react-router-dom";
import SignUp from "../view/pages/auth/SignUp";
import SignIn from "../view/pages/auth/SignIn";
import Home from "../view/pages/mainPages/Home";
import UserProfile from "../view/pages/auth/UserProfile";
import Dashboard from "../view/pages/dashbord/Dashboard";
import SignOut from "../view/pages/auth/SignOut";
import NewPost from "../view/pages/dashbord/posts/NewPost";
import NewPosts from "../view/pages/dashbord/posts/NewPosts";
import AllUsers from "../view/pages/dashbord/users/AllUsers";
import Layout from "../view/components/Layout";
import Missing from "../view/components/Missing";
import AuthProtectedRoute from "./AuthProtectedRoute";
import DashboardProtectedRoute from "./DashbordProtectedRoute";
import About from "../view/pages/mainPages/About";
import ResetPassword from "../view/pages/auth/ResetPassword";
import AllPostsDashboard from '../view/pages/dashbord/posts/AllPostsDasbbord';
import PostByCategory from "../view/pages/category/PostByCategory";
import Overview from "../view/pages/dashbord/overview/Overview";
import QuestionAnswer from "../view/pages/mainPages/QuestionAnswer";
import ContactForm from "../view/pages/mainPages/ContactForm";
import AllPostsTable from "../view/pages/dashbord/posts/AllPostsTable";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="question-answer" element={<QuestionAnswer />} />
          <Route path="contact-form" element={<ContactForm />} />
          <Route path="post" element={<PostByCategory />} />

          {/* Auth-protected routes */}
          <Route element={<AuthProtectedRoute />}>
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="sign-out" element={<SignOut />} />
          </Route>
        </Route>

        {/* Dashboard-protected routes */}
        <Route element={<DashboardProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="all-posts" element={<AllPostsDashboard />} />
            <Route path="all-posts-table" element={<AllPostsTable />} />
            <Route path="all-users" element={<AllUsers />} />
            <Route path="overview" element={<Overview />} />
            <Route path="new-posts" element={<NewPosts />}>
              <Route path="new-post" element={<NewPost />} />
            </Route>
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}
