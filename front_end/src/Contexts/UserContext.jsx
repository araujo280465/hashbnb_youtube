import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the logged-in user
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const axiosGet = async () => {
      const { data } = await axios.get("/users/profile");

      setUser(data); // Set the user state with the fetched data
      setReady(true);
    };

    axiosGet();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
