import React, { Component, useContext } from "react";
import { withRouter } from "react-router-dom";
import { EmailInput, PasswordInput } from "../components/Form";
import { handleChangeEmail } from "../components/handlers/handleChangeEmail";
import { handleChangePassword } from "../components/handlers/handleChangePassword";
import { handleSwitch } from "../components/handlers/handleSwitch";
import { Button } from "../components/Button";
import { Switch } from "../components/Switch";
import UserContext from "../hooks/UserContext";

let pf = require("./help/postFetch");

class LoginPage extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isDriver: false,
    };

    this.handleChangeEmail = handleChangeEmail.bind(this);
    this.handleChangePassword = handleChangePassword.bind(this);
    this.handleSwitch = handleSwitch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  handleSubmit(e) {
    e.preventDefault();
    const history = this.props.history;
    const url = "http://localhost:8081/api/auth/login";
    const bodyData = {
      isDriver: this.state.isDriver,
      email: this.state.email,
      password: this.state.password,
    };
    pf.postFetch(url, bodyData)
      .then((res) => res.json())
      .then((res) => {
        if (res.jwt_token) {
          let token = res.jwt_token;
          localStorage.setItem("token", token);
          localStorage.setItem("isDriver", this.state.isDriver);

          this.context.setAuth(true);
          this.context.setIsDriver(this.state.isDriver);
          this.context.setToken(token);
          if (this.state.isDriver) {
            history.push("/driver");
          } else {
            history.push("/shipper");
          }
        } else {
          console.log("wrong email or password");
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  render() {
    return (
      <div className="row">
        <form class="col s12" onSubmit={this.handleSubmit}>
          <div className="col s12 m8">
            <div className="card">
              <div className="card-content ">
                <h3 className="login">Login</h3>

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
                <Button btnName="Log In" />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(LoginPage);

