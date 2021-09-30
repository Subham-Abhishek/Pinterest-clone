/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ImagePlaceholder } from "./ImagePlaceholder";
import classes from "./newsfeed.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

export const Newsfeed = () => {
  const [lists, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchImages = () => {
    axios({
      method: "GET",
      url: "https://api.unsplash.com/search/photos",
      params: {
        page: pageNumber,
        per_page: 25,
        query: query || "random",
        client_id: "KnIdKmvxNCmKWEiC6BUzyQtUnIryKv1Cv53bbTc9ahU",
      },
    }).then(({ data }) => {
      setPageNumber(pageNumber+1);
      setList((prev) => {
        return [...prev, ...data.results];
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  console.log(lists);
  console.log(pageNumber);

  return (
    <div className={classes.newsfeed}>
      <InfiniteScroll
        dataLength={lists.length}
        next={fetchImages}
        hasMore={lists.length > 0}
      >
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
          lists.map((list) => {
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
          })
        )}
      </InfiniteScroll>
    </div>
  );
};