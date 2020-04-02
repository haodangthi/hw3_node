import React from "react";
import { SignUp } from "../pages/Registration";


let isAuthentficated = () => (localStorage.getItem("token") ? true : false);
export function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">
          Uber
        </a>

        {isAuthentficated ? (
          <LogOut />
        ) : (
          <ul id="nav-mobile" className="right ">
            <LogIn></LogIn> <SignUpBtn></SignUpBtn>
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

function LogOut() {
  return (
    <ul id="nav-mobile" className="right ">
      <li>
        <a href="/">
          <h4>Log Out</h4>
        </a>
      </li>
    </ul>
  );
}
