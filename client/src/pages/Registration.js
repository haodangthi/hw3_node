import React, { Component } from "react";
import { EmailInput, PasswordInput } from "../components/Form";
import { handleChangeEmail } from "../components/handlers/handleChangeEmail";
import { handleChangePassword } from "../components/handlers/handleChangePassword";
import { handleSwitch } from "../components/handlers/handleSwitch";
import { Button } from "../components/Button";
import { Switch } from "../components/Switch";
import { withRouter } from "react-router-dom";
let pf = require("./help/postFetch");

 class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      isDriver: false,
    };

    this.handleChangeEmail = handleChangeEmail.bind(this);
    this.handleChangePassword = handleChangePassword.bind(this);

    this.handleSwitch = handleSwitch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSurname = this.handleChangeSurname.bind(this);
  }
  handleChangeName(event) {
    this.setState({
      name: event.target.value,
    });
    console.log(this.state.name);
  }
  handleChangeSurname(event) {
    this.setState({
      surname: event.target.value,
    });
    console.log(this.state.surname);
  }
  handleSubmit(e) {
    e.preventDefault();
    const history = this.props.history;
    let url = "http://localhost:8081/api/users";
    let bodyData = {
      isDriver: this.state.isDriver,
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      password: this.state.password,
    };
    pf.postFetch(url, bodyData).then(res=>res.json()).then(res=>{
      console.log(res)
      history.push("/login");
    }).catch(e=>console.log(e))

  }

  render() {
    return (
      <div className="row">
        <form
          action="/api/users"
          method="POST"
          class="col s12"
          onSubmit={this.handleSubmit}
        >
          <div className="col s12 m8">
            <div className="card">
              <div className="card-content ">
                <h3 className="login">Create an account</h3>
                <div class="row">
                  <NameInput
                    email={this.state.name}
                    onChange={this.handleChangeName}
                  />
                  <SurnameInput
                    email={this.state.surname}
                    onChange={this.handleChangeSurname}
                  />
                </div>
                <Switch onChange={this.handleSwitch} />

                <EmailInput
                  email={this.state.email}
                  onChange={this.handleChangeEmail}
                />
                <PasswordInput
                  email={this.state.password}
                  onChange={this.handleChangePassword}
                />
              </div>
              <div className="card-action">
                <Button btnName="Create" />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function NameInput(props) {
  return (
    <div className="input-field col s5">
      <input
        id="first_name"
        type="text"
        class="validate"
        value={props.name}
        onChange={props.onChange}
      />
      <label for="first_name">First Name</label>
    </div>
  );
}

function SurnameInput(props) {
  return (
    <div className="input-field col s5">
      <input
        id="last_name"
        type="text"
        class="validate"
        value={props.surname}
        onChange={props.onChange}
      />
      <label for="last_name">Last Name</label>
    </div>
  );
}

export default withRouter(SignUp);
