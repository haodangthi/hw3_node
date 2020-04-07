import React, {useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { DriverPage } from "./pages/User";
import LoginPage from "./pages/Login";
import { SignUp } from "./pages/Registration";

import { ShipperPage } from "./pages/Shipper";
import UserContext from "./hooks/UserContext";

export function Routes() {
  const isAuthentficated = useContext(UserContext).isAuthentficated;
  

  if (isAuthentficated) {
    return (
      <Switch>
        <Route path="/shipper" component={ShipperPage} />
        <Route path="/driver" component={DriverPage} />
      </Switch>
    );
  } else
    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    );
}
