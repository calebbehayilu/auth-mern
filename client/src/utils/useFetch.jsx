import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    apiClient
      .get(url)
      .then((res) => {
        if (res.status !== 200) {
          throw Error("could not fetch the data for that resource");
        }

        setIsPending(false);
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
