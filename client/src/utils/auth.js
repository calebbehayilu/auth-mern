import { jwtDecode } from "jwt-decode";
import apiClient from "../services/api-client";

export async function login(user) {
  try {
    const res = await apiClient
      .post(`/auth`, {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.statusText !== "OK") {
          return res;
        }

        return res;
      });
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
