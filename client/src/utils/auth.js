import axios from "axios";
import { jwtDecode } from "jwt-decode";

const url = import.meta.env.VITE_APP_API_URL;

export async function login(user) {
  try {
    const res = await axios.post(`${url}/auth`, {
      email: user.email,
      password: user.password,
    });
    if (res.statusText !== "OK") {
      console.log(res);
    }
    console.log(res);
    localStorage.setItem("token", res.headers["x-auth-token"]);

    return res;
  } catch (error) {
    return error;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
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
