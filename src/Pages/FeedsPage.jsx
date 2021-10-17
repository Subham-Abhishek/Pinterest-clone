import React, { useContext } from "react";
import { Header } from "../Components/Header";
import { Newsfeed } from "../Components/Newsfeed";
import { TokenContext } from "../context/TokenProvider";

export const FeedsPage = () => {
  const { query } = useContext(TokenContext);

  return (
    <div>
      <Header />
      <Newsfeed url={`http://localhost:8000/posts/tags/${query}`} url1="http://localhost:8000/posts" />
    </div>
  );
};
