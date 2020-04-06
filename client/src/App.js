import "materialize-css";
import React, { useState, useEffect ,useContext} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { UserContext } from "./hooks/UserContext";
import {Routes} from "./routes"
import { TrucksPage } from "./pages/Trucks";
import { Navbar } from "./components/Navbar";



function App() {
  let [token, setToken] = useState(localStorage.getItem("token"));
  let [isDriver,setIsDriver]=useState(localStorage.getItem("isDriver"))
  let [isAuthentficated,setAuth]=useState(!!token)
 console.log(isAuthentficated)
 

  let [test,setTest]=useState(1)
  useEffect(() => {
    console.log(isAuthentficated)
    console.log(token)
    setAuth(!!token)
    console.log(isAuthentficated)
  }, [token]);
  

  //const routes = useRoutes();//isAuthentficated,token,isDriver
  return (
    <UserContext.Provider value={isAuthentficated,setAuth,isDriver,setIsDriver,setToken,token}>
      <Router>
        <Navbar />

        <div className="container">
          <Routes/>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
