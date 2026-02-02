import { useEffect, useState } from "react";

function useFetch(url, method = "GET") {
  let [data, setData] = useState(null);
  let [postdata, setPostData] = useState(null);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let options = { signal, method };
    setLoading(true);
    let fetchData = () => {
      fetch(url, options)
        .then((res) => {
          if (!res.ok) {
            throw Error("There is something Wrong");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    };
    if (method === "POST" && postdata) {
      options = {
        ...options,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postdata),
      };
      fetchData();
    } else if (method === "GET") {
      fetchData();
    }
    return () => {
      abortController.abort();
    };
  }, [url, postdata]);

  return { setPostData, data, error, loading };
}

export default useFetch;
