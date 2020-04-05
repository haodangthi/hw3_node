import React, {  useState } from "react";
import {LoadInput} from './LoadInput'
import { Button } from "../../components/Button";

let cp=require('./password')

export function ChangePasswordForm(props) {
    let currentPass = props.currentPass;
    console.log(currentPass);
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    let checkOldPassword = () => (currentPass === oldPass ? true : false);
    let confirmPassword = () => (newPass === confirmPass ? true : false);
    let checkNewPassword = () =>
      checkOldPassword() && confirmPassword() ? true : false;
  
    let save = () =>
      checkNewPassword()
        ? cp.changePassword(newPass, props.token)
            .then(res => console.log(res))
            .catch(e => console.log(e))
        : console.log("error");
  
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card ">
            <div className="card-content">
              <span className="card-title black-text">Change</span>
              <div className="row">
                <LoadInput
                  id="oldPass"
                  label="Old password"
                  onChange={e => setOldPass(e.target.value)}
                />
              </div>
              <div className="row">
                <LoadInput
                  id="newPass"
                  label="New password"
                  onChange={e => setNewPass(e.target.value)}
                />
              </div>
              <div className="row">
                <LoadInput
                  id="confirmPass"
                  label="Confirm password"
                  onChange={e => setConfirmPass(e.target.value)}
                />
              </div>
              <div class="card-action">
                <Button btnName="Save changes" onClick={save} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }