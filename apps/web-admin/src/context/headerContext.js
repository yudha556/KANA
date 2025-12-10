"use client";
import { createContext, useState, useContext } from "react";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("")

  return (
    <HeaderContext.Provider value={{ title, setTitle, subTitle, setSubTitle }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);