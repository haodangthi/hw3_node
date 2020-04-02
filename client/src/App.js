import "materialize-css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import { useRoutes } from "./routes";
import { TrucksPage } from "./pages/Trucks";
import { Navbar } from "./components/Navbar";

function App() {
  const routes = useRoutes(false);
  return (
    <Router>
      <Navbar/>
     

      <div className="container">
        
        {routes}

      </div>
    </Router>
  );
}

export default App;
