import React, { createContext, useEffect } from "react";

export let AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = React.useState([]);
  useEffect(() => {
    fetch("/addresses")
      .then((res) => res.json())
      .then((res) => {
        setAddress([...res]);
      });
  }, []);
  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
