import React, { useState, useEffect } from "react";
import _ from "lodash";
import { FaGoogle } from "react-icons/fa";
import { auth, provider } from "../utils/firebase";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import axios from "axios";
const url = import.meta.env.VITE_APP_API_URL;
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { setUserInfo } from "../redux/userSlice";

const GoogleSignup = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = async (name, email, uid, photoURL) => {
    const post = await axios.post(`${url}/user/signUp-with-google`, {
      name: name,
      email: email,
      uid: uid,
      photoURL: photoURL,
    });

    return post;
  };
  useEffect(() => {
    setLoading(true);
    getRedirectResult(auth)
      .then(async (response) => {
        if (!response) return;

        await signUp(
          response.user.displayName,
          response.user.email,
          response.user.uid,
          response.user.photoURL
        ).then((res) => {
          if (res.status == 200) {
            console.log(res);
            localStorage.setItem("token", res.headers["x-auth-token"]);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            dispatch(setUserInfo(res.data));

            window.location = "/home";
          }
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const GoogleLogin = async () => {
    await signInWithRedirect(auth, provider).catch((error) => {
      console.error(error);
    });
  };
  return (
    <button
      className="btn btn-outline w-full"
      disabled={loading}
      onClick={GoogleLogin}
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <>
          <FaGoogle />
          Sign In With Google
        </>
      )}
    </button>
  );
};

export default GoogleSignup;
