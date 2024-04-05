import React, { useState, useEffect } from "react";
import _ from "lodash";
import { FaGoogle } from "react-icons/fa";
import { auth, provider } from "../utils/firebase";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import axios from "axios";

const GoogleSignup = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async (name, email, uid) => {
    const post = await axios.post(
      "http://localhost:3000/user/signUp-with-google",
      {
        name: name,
        email: email,
        uid: uid,
      }
    );

    return post;
  };
  useEffect(() => {
    setLoading(true);
    getRedirectResult(auth)
      .then(async (response) => {
        if (!response) return;

        const res = await signUp(
          response.user.displayName,
          response.user.email,
          response.user.uid
        );

        if (res.status == 200) {
          localStorage.setItem("token", res.headers["x-auth-token"]);
          window.location = "/home";
        }
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
