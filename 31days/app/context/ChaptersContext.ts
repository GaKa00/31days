import React, { createContext, useState, useContext } from "react";

const ChaptersContext = createContext();

export const ChaptersProvider = ({ children }) => {
  const [chapters, setChapters] = useState([]);

  return (
    <ChaptersContext.Provider value={{ chapters, setChapters }}>
      {children}
    </ChaptersContext.Provider>
  );
};

export const useChapters = () => useContext(ChaptersContext);
