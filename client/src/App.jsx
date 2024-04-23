import { useState, useEffect } from "react";
import { Route, Routes, Router } from "react-router-dom";
import Navbar from "./components/navbar";
import PrivateRoutes from "./components/protectedRoute";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Welcome from "./pages/welcome";
import Home from "./pages/home";
import Logout from "./pages/logout";
import Profile from "./pages/profile";
import NotFound from "./pages/notfound";
import { getCurrentUser } from "./utils/auth";
import CreatePost from "./pages/create-post";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);
  return (
    <>
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route element={<PrivateRoutes check={currentUser} />}>
          <Route path="/home" element={<Welcome />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/create-post"
            element={<CreatePost currentUser={currentUser} />}
          />
        </Route>
        <Route path="/login" element={<Login currentUser={currentUser} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} exact />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
