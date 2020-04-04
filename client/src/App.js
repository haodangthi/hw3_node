import "materialize-css";
import React, { useState, useEffect ,useContext} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { UserContext } from "./hooks/UserContext";
import { useRoutes } from "./routes";
import { TrucksPage } from "./pages/Trucks";
import { Navbar } from "./components/Navbar";

function App() {
  let [token, setToken] = useState(localStorage.getItem("token"));
  let [isAuthentficated,setAuth]=useState(!!token)
  console.log(!!token)

  useEffect(() => {
    setAuth(!!token)
  }, [token]);

  const routes = useRoutes(isAuthentficated);
  return (
    <UserContext.Provider value={isAuthentficated,token}>
      <Router>
        <Navbar />

        <div className="container">{routes}</div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
