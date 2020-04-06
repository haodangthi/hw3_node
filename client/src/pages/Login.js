import React, { Component, useContext } from "react";
import {EmailInput,PasswordInput }from '../components/Form'
import {handleChangeEmail} from "../components/handlers/handleChangeEmail"
import {handleChangePassword} from "../components/handlers/handleChangePassword"
import {handleSwitch} from "../components/handlers/handleSwitch"
import {Button} from "../components/Button"
import {Switch} from "../components/Switch"
import { UserContext } from "../hooks/UserContext";

let pf=require('./help/postFetch')

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isDriver:false
    };
    this.handleChangeEmail = handleChangeEmail.bind(this);
    this.handleChangePassword = handleChangePassword.bind(this);
    this.handleSwitch=handleSwitch.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    let setAuth = useContext(UserContext)
    let setIsDriver = useContext(UserContext)
    let setToken=useContext(UserContext)

    let url="http://localhost:8081/api/login"
    let bodyData={
      isDriver: this.state.isDriver,
      email: this.state.email,
      password: this.state.password
    }
    pf.postFetch(url,bodyData).then(res=>{
      let token = res.jwt_token;
         localStorage.setItem("token", token);
         localStorage.setItem("isDriver",this.state.isDriver)
         //setAuth(true)
         setIsDriver(this.state.isDriver)
         setToken(token)
         
         
    })
    // fetch("http://localhost:8081/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json;charset=utf-8"
    //     },
    //     body: JSON.stringify({
    //       isDriver: this.state.isDriver,
    //       email: this.state.email,
    //       password: this.state.password
    //     })
    //   })
    //     .then(res => res.json())
    //     .then(res => {
    //       let token = res.jwt_token;
    //       localStorage.setItem("token", token);
    //     });
  }

  render() {
    return (
      <div className="row">
        <form class="col s12" onSubmit={this.handleSubmit}>
          <div className="col s12 m8">
            <div className="card">
              <div className="card-content ">
                <h3 className="login">Login</h3>

                <Switch onChange={this.handleSwitch}/>

                <EmailInput email={this.state.email} onChange={this.handleChangeEmail}/>
                <PasswordInput email={this.state.password} onChange={this.handleChangePassword}/>


              </div>
              <div className="card-action">

                <Button btnName="Log In" />


              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// function Button(props) {
//   return (
//     <button
//       className="btn waves-effect waves-light"
//      type="submit"
//       name="action"
    
//     >
//       {props.btnName}
//     </button>
//   );
// }

// function Switch(props) {
//   return (
//     <div class="switch  isDriver">
//       <label for="isDriver">
//         I am a shipper
//         <input id="isDriver" type="checkbox" onChange={props.onChange}/>
//         <span class="lever"></span>I am a driver
//       </label>
//     </div>
//   );
// }

// function EmailInput(props) {
//   return (
//     <div className="row">
//       <div className="input-field col s8">
//         <input
//           id="email"
//           type="email"
//           class="validate"
//           value={props.email}
//           onChange={props.onChange}
//         />
//         <label for="email">Email</label>
//       </div>
//     </div>
//   );
// }

// function PasswordInput(props) {
//   return (
//     <div className="row">
//       <div className="input-field col s8">
//         <input
//           id="password"
//           type="password"
//           className="validate"
//           value={props.password}
//           onChange={props.onChange}
//         />
//         <label for="password">Password</label>
//       </div>
//     </div>
//   );
// }
