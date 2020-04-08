import "materialize-css";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import UserContext from "./hooks/UserContext";
import { Routes } from "./routes";
import { TrucksPage } from "./pages/Trucks";
import { Navbar } from "./components/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isDriver, setIsDriver] = useState(localStorage.getItem("isDriver"));

  const [isAuthentficated, setAuth] = useState(!!token);

  return (
    <UserContext.Provider
      value={{
        isAuthentficated,
        setAuth,
        isDriver,
        setIsDriver,
        setToken,
        token,
      }}
    >
      <Router>
        <Navbar />

        <div className="container">
          <Routes />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
