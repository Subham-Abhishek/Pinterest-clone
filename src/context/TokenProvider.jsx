import React, { useState, createContext } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [query, setQuery] = useState("");
  const [gUser, setGUser] = useState(
    JSON.parse(localStorage.getItem("gUser")) || null
  );
  console.log(
    `token: ${token}, ----query----${query}, -----gUser-----${gUser}`
  );

  return (
    <TokenContext.Provider
      value={{ token, setToken, query, setQuery, gUser, setGUser }}
    >
      {children}
    </TokenContext.Provider>
  );
};
