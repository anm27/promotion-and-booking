// AppContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const storedUser = await AsyncStorage.getItem("isLogin");

      if (storedUser) {
        setUserData(storedUser);
      }
    }

    fetchUser();
  }, []);

  const updateUser = (user) => {
    setUserData(user);
    AsyncStorage.setItem("isLogin", user);
  };

  const logOut = () => {
    setUserData(null);
    AsyncStorage.removeItem("isLogin");
  };

  return (
    <AppContext.Provider value={{ userData, updateUser, logOut }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
