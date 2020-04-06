import React from "react";
import { SignUp } from "../pages/Registration";
import { useContext } from "react";
import {UserContext} from "../hooks/UserContext"

export function Navbar() {
  let isAuthentficated = useContext(UserContext);
  let setAuth=useContext(UserContext);
  let logout=()=>{
    console.log("log out")
     localStorage.setItem("token",null)
     localStorage.setItem("isDriver",null)
     setAuth(false)
  }
  

  return (
    <nav>
      <div className="nav-wrapper  light-blue lighten-3">
        <a href="#" className="brand-logo">
          Uber
        </a>

        {isAuthentficated ? (
          <LogOut onClick={logout}/>
        ) : (
          <ul id="nav-mobile" className="right ">
            <LogIn/><SignUpBtn/>
          </ul>
        )}
      </div>
    </nav>
  );
}

function LogIn() {
  return (
    <li>
      <a href="/login">
        <h4>Log in</h4>
      </a>
    </li>
  );
}

function SignUpBtn() {
  return (
    <li>
      <a href="/signup">
        <h4>Sign up</h4>
      </a>
    </li>
  );
}

function LogOut(props) {
  return (
    <ul id="nav-mobile" className="right ">
      <li onClick={props.onClick}>
        <a href="/">
          <h4>Log Out</h4>
        </a>
      </li>
    </ul>
  );
}


