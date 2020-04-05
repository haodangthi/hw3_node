import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserPage } from "./pages/User";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Registration";
import { TrucksCard } from "./pages/Trucks";
import { ShipperPage } from "./pages/Shipper";



// let isAuthentficated=function(){
//   if(localStorage.getItem('token')){
//     return true
//   } else { return false}

// }

export const useRoutes = (isAuthentficated,token) => {
 

  if (isAuthentficated) {
    return (
      
      <Switch>
        <Route path="/">
          <ShipperPage/>
          {/* <UserPage /> */}
        </Route>
        {/* <Route path="/user">
          
        </Route> */}
        {/* <Redirect to="/"/> */}
      </Switch>
    )
  } else
    return (
      <Switch>
        {/* <Route path="/">
        
        
        
      </Route> */}

        <Route path="/login">
          <Login />
          {/* <TrucksCard/>  */}
          {/* <UserPage/> */}
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
     
    );
};
