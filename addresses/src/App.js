import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { AddressProvider } from "./Context/AddressProvider";
import { Router } from "./Router";

function App() {
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/addresses");
    }
  }, []);
  return (
    <div className="App">
      <AddressProvider>
        <Router />
      </AddressProvider>
    </div>
  );
}

export default App;
