import { useEffect, useState } from "react";
import axios from "axios";

let bool = true;

export default function useInfiniteScroller(query, pageNumber) {
    console.log('infinitescrolling');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lists, setList] = useState([]);

  useEffect(() => {
    setList([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "https://api.unsplash.com/search/photos",
      params: {
        page: pageNumber,
        // per_page: 15,
        query: query || "random",
        client_id: "KnIdKmvxNCmKWEiC6BUzyQtUnIryKv1Cv53bbTc9ahU",
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setList((prev) => {
          return [...prev, ...data.results];
        });
        setLoading(false);
      })
      .catch((e) => {
        console.log("error1");
        if (axios.isCancel(e)) return;
        console.log("cancelerror1");
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { loading, error, lists, bool };
}
