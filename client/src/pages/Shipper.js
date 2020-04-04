import React, { Component, useState, useEffect } from "react";
import { Button, ProfileTitle } from "../components/Form";
import { useContext } from "react";
import { UserContext } from "../hooks/UserContext";
import { Promise } from "mongoose";
import { Load } from "./Loads";

export function ShipperPage() {
  let token = useContext(UserContext);
  const [currentPassword, setCurrPass] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lenght, setLenght] = useState(0);
  const [payload, setPayload] = useState(0);
  const [loads, setLoads] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserInfo(token).then(res => {
      setUser(res);
    });
  }, []);

  useEffect(() => {
    setCurrPass(user.password);
  }, [user]);

  let createLoadFunc = () =>
    createLoad(+width, +lenght, +height, +payload, +token);

  useEffect(() => {
    viewCreatedLoads().then(res => {
      console.log(res)
    });
  }, []);

  const [passwordField, setField] = useState(false);

  return (
    <div>
      <h1>Shipper Page</h1>
      <div className="row">
        <div className="col s12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <div className="profile">
                <ProfileTitle name={user.name} surname={user.surname} />
                <ProfileData email={user.email} />
              </div>
              <div className="card-action">
                <Button
                  btnName="Change password"
                  onClick={() => {
                    setField(!passwordField);
                  }}
                />

                <Button btnName="View my loads" />
              </div>
              {passwordField ? (
                <ChangePasswordForm
                  currentPass={currentPassword}
                  token={token}
                />
              ) : (
                ""
              )}
              <CreateLoadForm
                width={e => {
                  setWidth(e.target.value);
                }}
                lenght={e => {
                  setLenght(e.target.value);
                }}
                height={e => {
                  setHeight(e.target.value);
                }}
                payload={e => {
                  setPayload(e.target.value);
                }}
                onClick={createLoadFunc}
              />
            </div>
          </div>
        </div>
      </div>
      {loads}
    </div>
  );
}

function getUserInfo(token) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8081/api/users/" + token)
      .then(res => res.json())
      .then(res => {
        console.log(res.user);
        resolve(res.user);
      }) //
      .catch(e => {
        console.log(e);
        reject();
      });
  });
}

function createLoad(width, lenght, height, payload, token) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8081/api/loads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        payload: payload,
        dimension: { width, lenght, height }
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(e => {
        reject();
      });
  });
}

function viewCreatedLoads() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8081/api/loads/" + localStorage.getItem("token"))
      .then(res => res.json())
      .then(res => {
        resolve(res.trucks);
      })
      .catch(e => {
        console.log(e);
        reject();
      });
  });
}

function LoadInput(props) {
  return (
    <div class="input-field col s8">
      <input id={props.id} type="text" onChange={props.onChange} />
      <label for={props.id}>{props.label}</label>
    </div>
  );
}

function CreateLoadForm(props) {
  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card ">
          <div className="card-content black-text">
            <h4>Create a Load</h4>

            <div className="row">
              <LoadInput id="width" label="Width" onChange={props.width} />
              <LoadInput id="length" label="Length" onChange={props.lenght} />
              <LoadInput id="height" label="Height" onChange={props.height} />
              <LoadInput
                id="payload"
                label="Payload"
                onChange={props.payload}
              />
            </div>
          </div>
          <div className="card-action">
            <Button btnName="Create a load" onClick={props.onClick} />
          </div>
        </div>
      </div>
      <Load />
    </div>
  );
}

function ChangePasswordForm(props) {
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
      ? changePassword(newPass, props.token)
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

function changePassword(password, token) {
  console.log(password);
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8081/api/users/pass/" + token, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        password: password
      })
    })
      .then(res => res.json())
      .then(res => {
        resolve(res);
      })
      .catch(e => reject(e));
  });
}
function ProfileData(props) {
  return (
    <div className="card-action">
      <ProfileDataItem dataTitle="Email:" data={props.email} />
      <ProfileDataItem dataTitle="Assigned truck:" data="" />
    </div>
  );
}

function ProfileDataItem(props) {
  return (
    <h6>
      {props.dataTitle} <span className="data__container">{props.data} </span>
    </h6>
  );
}
