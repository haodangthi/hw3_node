import React, { Component, useState, useEffect } from "react";
import { ProfileTitle } from "../components/Form";
import { Button } from "../components/Button";
import { useContext } from "react";
import UserContext from "../hooks/UserContext";

import { Load } from "./Loads";
import { ChangePasswordForm } from "./Shipper/ChangePassword";
import { ProfileData } from "./Shipper/ProfileData";
import { CreateLoadForm } from "./Shipper/CreateLoadField";

let gf = require("./help/getFetch");
let cl = require("./Shipper/creatLoad");

export function ShipperPage() {
  let token = useContext(UserContext).token;
  const [currentPassword, setCurrPass] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lenght, setLenght] = useState(0);
  const [payload, setPayload] = useState(0);
  const [loads, setLoads] = useState([]);
  const [user, setUser] = useState({});
  const [passwordField, setField] = useState(false);
  const [shownLoads, setShownLoads] = useState(false);

  useEffect(() => {
    getUserInfo(token)
      .then((res) => {
        setUser(res.user);
        console.log(res);
      })

      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setCurrPass(user.password);
  }, [user]);

  let createLoadFunc = () =>
    cl.createLoad(+width, +lenght, +height, +payload, +token);

  let viewLoads = () => {
    viewCreatedLoads().then((res) => {
      let loads = res.trucks.map((e) => <Load key={e._id} loadData={e} />);
      setLoads(loads);
      setShownLoads(!shownLoads);
    });
  };

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

                <Button btnName="View my loads" onClick={viewLoads} />
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
                width={(e) => {
                  setWidth(e.target.value);
                }}
                lenght={(e) => {
                  setLenght(e.target.value);
                }}
                height={(e) => {
                  setHeight(e.target.value);
                }}
                payload={(e) => {
                  setPayload(e.target.value);
                }}
                onClick={createLoadFunc}
              />
            </div>
          </div>
        </div>
      </div>
      {shownLoads ? loads : ""}
    </div>
  );
}

function getUserInfo(token) {
  let url = "http://localhost:8081/api/users/" + token;
  return gf.getFetch(url);
}

function viewCreatedLoads() {
  let url = "http://localhost:8081/api/loads/" + localStorage.getItem("token");
  return gf.getFetch(url);
}
