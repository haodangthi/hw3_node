import React, { Component } from "react";
// function handleChangeEmail(event) {
//     this.setState({
//       email: event.target.value
//     });
//     console.log(this.state.email)
//   }


  // function handleChangePassword (event) {
  //   this.setState({
  //     password: event.target.value
  //   });
  //   console.log(this.state.password)
  // }


  // function handleSwitch(event){
  //   this.setState({
  //       isDriver: event.target.checked
  //     });
  //     console.log(this.state.isDriver)
  // }





  function ProfileTitle(props) {
    return (
      <div className=" card-action profileTitle">
        <h1>
          <span className="profileTitle__name">{props.name}</span>
          <span className="profileTitle__surname">{props.surname}</span>
        </h1>
      </div>
    );
  }






// function Button(props) {
//     return (
//       <button
//         className="btn waves-effect light-blue lighten-3 black-text"
//        type="submit"
//         name="action"
//         onClick={props.onClick}
      
//       >
//         {props.btnName}
//       </button>
//     );
//   }
  
 
  
  function EmailInput(props) {
    return (
      <div className="row">
        <div className="input-field col s8">
          <input
            id="email"
            type="email"
            class="validate"
            value={props.email}
            onChange={props.onChange}
          />
          <label for="email">Email</label>
        </div>
      </div>
    );
  }
  
  function PasswordInput(props) {
    return (
      <div className="row">
        <div className="input-field col s8">
          <input
            id="password"
            type="password"
            className="validate"
            value={props.password}
            onChange={props.onChange}
          />
          <label for="password">Password</label>
        </div>
      </div>
    );
  }
  
  export {ProfileTitle, EmailInput,PasswordInput}