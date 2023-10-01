// AppContext.js

import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const updateUser = (user) => {
    setUserData(user);
  };

  return (
    <AppContext.Provider value={{ userData, updateUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
