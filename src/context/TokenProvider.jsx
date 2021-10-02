import React, { useState, createContext } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [query, setQuery] = useState("");
  console.log(`token: ${token}, ---query----${query}`);

  return (
    <TokenContext.Provider value={{ token, setToken, query, setQuery }}>
      {children}
    </TokenContext.Provider>
  );
};
