/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import phgif from "../img/phgif.gif";
import { ImagePlaceholder } from "./ImagePlaceholder";
import classes from "./newsfeed.module.css";

export const Newsfeed = () => {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("random");
  const [load, setLoad] = useState(true);

  const url = `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${query}&client_id=KnIdKmvxNCmKWEiC6BUzyQtUnIryKv1Cv53bbTc9ahU`;

  const getImage = () => {
    axios.get(url).then(({ data }) => {
        console.log(data);
      setList(data.results);
      setLoad(false);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      getImage();
    }, 2000);
  }, [query]);

  return (
    <div className={classes.newsfeed}>
      {load ? (
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
        list.map((e) => {
          return (
            <LazyLoadImage
              effect="blur"
              src={e.urls.regular}
              alt={e.alt_description}
              key={e.id}
              height={Math.floor(e.height / 10)}
              width="100%"
            />
          );
        })
      )}
    </div>
  );
};
