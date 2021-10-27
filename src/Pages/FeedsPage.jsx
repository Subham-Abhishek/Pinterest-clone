import React, { useContext } from "react";
import { Header } from "../Components/Header";
import { Newsfeed } from "../Components/Newsfeed";
import { TokenContext } from "../context/TokenProvider";

export const FeedsPage = () => {
  const { query } = useContext(TokenContext);

  return (
    <div>
      <Header />
      <Newsfeed
        url={`https://pinterest-backend-server.herokuapp.com/posts/tags/${query}`}
        url1="https://pinterest-backend-server.herokuapp.com/posts"
      />
    </div>
  );
};
