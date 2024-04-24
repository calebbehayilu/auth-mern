import axios from "axios";

const url = import.meta.env.VITE_APP_API_URL;

export default axios.create({
  baseURL: `${url}`,
  headers: {
    "x-auth-token": localStorage.getItem("token"),
  },
});
