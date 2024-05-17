import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import AboutPage from "../pages/additional-pages/about";
import ContactPage from "../pages/additional-pages/contact";
import HelpPage from "../pages/additional-pages/help";
import FileUpload from "../pages/additional-pages/test-upload";
import AdminContact from "../pages/admin/admin-contact";
import AdminDashboard from "../pages/admin/admin-dashboard";
import AdminPosts from "../pages/admin/admin-posts";
import AdminUsers from "../pages/admin/admin-users";
import EditProfile from "../pages/edit-profile";
import AppledList from "../pages/employer/applied-list";
import ApplierAnswer from "../pages/employer/applier-answer";
import CreatePost from "../pages/employer/create-post";
import PostsList from "../pages/employer/posts-list";
import FinishUp from "../pages/finish-up";
import GoogleRedirect from "../pages/google-redirect";
import HomePage from "../pages/home-page";
import AppliedJobList from "../pages/job-seeker/applied-job-lists";
import ApplyPage from "../pages/job-seeker/apply-page";
import JobDetail from "../pages/job-seeker/job-detail";
import Login from "../pages/login";
import Logout from "../pages/logout";
import Notification from "../pages/notification";
import Profile from "../pages/profile";
import Signup from "../pages/signup";
import WelcomePage from "../pages/welcome-page";
import Forbidden from "./forbidden";
import NotFound from "./notfound";
import EmployerRoutes from "./protectedEmployer";
import JobSeekerRoutes from "./protectedJobSeeker";
import PrivateRoutes from "./protectedRoute";

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
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/help", element: <HelpPage /> },
      { path: "/fileupload", element: <FileUpload /> },
      {
        element: <PrivateRoutes />,
        children: [
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
          { path: "/finish-up/:postId", element: <FinishUp /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/inbox", element: <AdminContact /> },
      { path: "/users", element: <AdminUsers /> },
      { path: "/Posts", element: <AdminPosts /> },
    ],
  },
]);

export default router;
