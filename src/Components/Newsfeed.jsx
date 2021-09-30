/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./newsfeed.module.css";

export const Newsfeed = () => {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("random");
  const placeholder = [];

  const url = `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${query}&client_id=KnIdKmvxNCmKWEiC6BUzyQtUnIryKv1Cv53bbTc9ahU`;

  const getImage = () => {
      axios.get(url).then(({data: {results}}) => {
          console.log(results);
          setList(results);
      })
  }

  useEffect(() => {
    getImage();
  }, []);
console.log(list);
  return <div className={classes.newsfeed}>
      {list.map((e) => {
          return <img src={e.urls.thumb} alt="" />
      })}
  </div>;
};
