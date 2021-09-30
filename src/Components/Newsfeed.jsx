/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ImagePlaceholder } from "./ImagePlaceholder";
import classes from "./newsfeed.module.css";

let bool = true;

export const Newsfeed = () => {
  console.log("newsfeed");
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lists, setList] = useState([]);

  useEffect(() => {
    setList([]);
  }, [query]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      setError(false);
      let cancel;
      axios({
        method: "GET",
        url: "https://api.unsplash.com/search/photos",
        params: {
          page: pageNumber,
          per_page: 25,
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
          bool = true;
        })
        .catch((e) => {
          console.log("error1");
          if (axios.isCancel(e)) return;
          console.log("cancelerror1");
          setError(true);
        });
      return () => cancel();
    }, 500);
  }, [query, pageNumber]);

  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight && bool) {
      console.log("call again");
      bool = false;
      setPageNumber((prev) => prev + 1);
    }
  });

  return (
    <div className={classes.newsfeed}>
      {loading ? (
        <>
          <ImagePlaceholder height={Math.floor(Math.random() * 600 + 200)} />
          <ImagePlaceholder height={Math.floor(Math.random() * 600 + 200)} />
          <ImagePlaceholder height={Math.floor(Math.random() * 600 + 200)} />
          <ImagePlaceholder height={Math.floor(Math.random() * 600 + 200)} />
          <ImagePlaceholder height={Math.floor(Math.random() * 600 + 200)} />
          <ImagePlaceholder height={Math.floor(Math.random() * 600 + 200)} />
          <ImagePlaceholder height={Math.floor(Math.random() * 600 + 200)} />
          <ImagePlaceholder height={Math.floor(Math.random() * 600 + 200)} />
          <ImagePlaceholder height={Math.floor(Math.random() * 600 + 200)} />
        </>
      ) : (
        lists.map((list, index) => {
          if (list.length === index + 1) {
            return (
              <LazyLoadImage
                effect="blur"
                key={list.id}
                src={list.urls.regular}
                alt={list.alt_description}
                height={Math.floor(list.height / 15)}
                width="100%"
              />
            );
          } else {
            return (
              <LazyLoadImage
                effect="blur"
                key={list.id}
                src={list.urls.regular}
                alt={list.alt_description}
                height={Math.floor(list.height / 15)}
                width="100%"
              />
            );
          }
        })
      )}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};
