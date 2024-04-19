import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function login(user) {
  try {
    const res = await axios.post("http://localhost:3000/auth", {
      email: user.email,
      password: user.password,
    });
    if (res.statusText !== "OK") {
      console.log(res);
    }

    localStorage.setItem("token", res.headers["x-auth-token"]);

    return res;
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
