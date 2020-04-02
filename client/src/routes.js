import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserPage } from "./pages/User";
import {Login} from './pages/Login'
import {SignUp} from './pages/Registration' 
import { TrucksCard } from "./pages/Trucks";
import { ShipperPage } from "./pages/Shipper";

let isAuthentficated=()=>(localStorage.getItem('token'))?true:false
export const useRoutes = () => {
  if (isAuthentficated) {
    return (
    <Switch>
      <Route path='/'>
          <ShipperPage/>
      </Route>
      <Route path='/user'>
          <UserPage/>
      </Route>
      {/* <Redirect to="/"/> */}
    </Switch>
    
    )

  }

  return(<Switch>
      {/* <Route path="/">
        
        
        
      </Route> */}

      <Route path='/login'>
      <Login/>
      {/* <TrucksCard/>  */}
      {/* <UserPage/> */}
      </Route>
      <Route path='/signup'>
          <SignUp/>
      </Route>
      
      

  </Switch>)
  
};


