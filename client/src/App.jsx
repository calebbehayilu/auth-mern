import { useState, useEffect } from "react";
import { Route, Routes, Router } from "react-router-dom";
import Navbar from "./components/navbar";
import PrivateRoutes from "./components/protectedRoute";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Logout from "./pages/logout";
import Profile from "./pages/profile";
import NotFound from "./pages/notfound";
import { getCurrentUser } from "./utils/auth";
import CreatePost from "./pages/employer/create-post";
import HomePage from "./pages/home-page";
import WelcomePage from "./pages/welcome-page";
import Drawer from "./components/drawer";
import JobDetail from "./pages/job-seeker/job-detail";
import EditProfile from "./pages/edit-profile";

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
      <Navbar currentUser={currentUser} {...tab} setTab={setIsOpen} />
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <Routes>
        <Route element={<PrivateRoutes check={currentUser} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route
            path="/create-post"
            element={<CreatePost currentUser={currentUser} />}
          />
          <Route path="/jobdetail/:postId" element={<JobDetail />} />
        </Route>

        <Route path="/login" element={<Login currentUser={currentUser} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<WelcomePage />} exact />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
