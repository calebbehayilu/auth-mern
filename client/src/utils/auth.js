import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function login(user) {
  try {
    const post = await axios.post("http://localhost:3000/auth", {
      email: user.email,
      password: user.password,
    });

    if (post.status == 200) {
      localStorage.setItem("token", post.headers["x-auth-token"]);
      window.location = "/home";
    }
    return post;
  } catch (error) {
    return error;
  }
}

export function logout() {
  localStorage.removeItem("token");
  window.location = "/login";
}

export function getCurrentUser() {
  const token = localStorage.getItem("token");
  try {
    const user = jwtDecode(token);
    return user;
  } catch (error) {}
}

export default {
  login,
  logout,
  getCurrentUser,
};
