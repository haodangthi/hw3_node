import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserPage } from "./pages/User";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Registration";
import { TrucksCard } from "./pages/Trucks";
import { ShipperPage } from "./pages/Shipper";
import { UserContext } from "./hooks/UserContext";

// let isAuthentficated=function(){
//   if(localStorage.getItem('token')){
//     return true
//   } else { return false}

// }

export function Routes (){//isAuthentficated, token, isDriver
  let isAuthentficated = useContext(UserContext);
  let isDriver=useContext(UserContext)
  let test = useContext(UserContext);
  
  console.log(isAuthentficated)
  console.log(test)
  if (isAuthentficated) {
    return (
      <Switch>
        <Route path="/">{isDriver ? <UserPage /> :<ShipperPage />}</Route>
      </Switch>
    );
  } else
    return (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    );
};
