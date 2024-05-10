import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home-page";
import UserLayout from "../layouts/UserLayout";
import Profile from "../pages/profile";
import EditProfile from "../pages/edit-profile";
import JobDetail from "../pages/job-seeker/job-detail";
import WelcomePage from "../pages/welcome-page";
import PrivateRoutes from "./protectedRoute";
import Login from "../pages/login";
import AdminRoutes from "../routes/protectedEmployer";
import AdminDashboard from "../pages/admin/admin-dashboard";
import NotFound from "./notfound";
import EmployerRoutes from "./protectedEmployer";
import CreatePost from "../pages/employer/create-post";
import Forbidden from "./forbidden";
import JobSeekerRoutes from "./protectedJobSeeker";
import ApplyPage from "../pages/job-seeker/apply-page";
import AppliedJobList from "../pages/job-seeker/applied-job-lists";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import GoogleRedirect from "../pages/google-redirect";
import PostsList from "../pages/employer/posts-list";
import AppledList from "../pages/employer/applied-list";
import ApplierAnswer from "../pages/employer/applier-answer";
import Notification from "../pages/notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "/account-update", element: <GoogleRedirect /> },

      { path: "/signup", element: <Signup /> },
      { path: "/forbidden", element: <Forbidden /> },
      { path: "/logout", element: <Logout /> },
      { path: "/login", element: <Login /> },
      { path: "/", element: <WelcomePage /> },
      { path: "*", element: <NotFound /> },
      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <AdminRoutes />,
            children: [
              {
                path: "/admin",
                element: <AdminDashboard />,
              },
            ],
          },
          {
            element: <JobSeekerRoutes />,
            children: [
              { path: "/apply-job/:postId", element: <ApplyPage /> },
              { path: "/applied-jobs", element: <AppliedJobList /> },
            ],
          },
          {
            element: <EmployerRoutes />,
            children: [
              {
                path: "/create-post",
                element: <CreatePost />,
              },
              { path: "/employer", element: <PostsList /> },
              { path: "/employer/:appliedId", element: <AppledList /> },
              {
                path: "/employer/answers/:applerId",
                element: <ApplierAnswer />,
              },
            ],
          },
          { path: "/home", element: <HomePage /> },
          { path: "/edit-account", element: <GoogleRedirect /> },
          { path: "/profile", element: <Profile /> },
          { path: "/profile/:userId", element: <Profile /> },
          { path: "/profile/notification", element: <Notification /> },
          { path: "/edit-profile", element: <EditProfile /> },
          { path: "/jobdetail/:postId", element: <JobDetail /> },
        ],
      },
    ],
  },
]);

export default router;
