import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import PrivateRoutes from "./routes/protectedRoute";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Logout from "./pages/logout";
import Profile from "./pages/profile";
import NotFound from "./routes/notfound";
import { getCurrentUser } from "./utils/auth";
import CreatePost from "./pages/employer/create-post";
import HomePage from "./pages/home-page";
import WelcomePage from "./pages/welcome-page";
import Drawer from "./components/drawer";
import JobDetail from "./pages/job-seeker/job-detail";
import EditProfile from "./pages/edit-profile";
import AdminRoutes from "./routes/protectedEmployer";
import JobSeekerRoutes from "./routes/protectedJobSeeker";
import AdminDashboard from "./pages/admin/admin-dashboard";
import Forbidden from "./routes/forbidden";
import EmployerRoutes from "./routes/protectedEmployer";
import ApplyPage from "./pages/job-seeker/apply-page";
import AppliedJobList from "./pages/job-seeker/applied-job-lists";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar currentUser={currentUser} {...tab} setTab={setIsOpen} />
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
        <Routes>
          <Route element={<PrivateRoutes check={currentUser} />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/jobdetail/:postId" element={<JobDetail />} />

            <Route element={<AdminRoutes />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            <Route element={<EmployerRoutes />}>
              <Route
                path="/create-post"
                element={<CreatePost currentUser={currentUser} />}
              />
            </Route>

            <Route element={<JobSeekerRoutes />}>
              <Route path="/apply-job/:postId" element={<ApplyPage />} />
              <Route path="/applied-jobs" element={<AppliedJobList />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login currentUser={currentUser} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/" element={<WelcomePage />} exact />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
