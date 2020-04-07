import React, { Component,useState } from "react";
import { ProfileTitle } from "../components/Form";
import { TrucksCard } from "./Trucks";
import { Button } from "../components/Button";
import UserContext from "../hooks/UserContext";
import { ChangePasswordForm } from "./Shipper/ChangePassword";
import { Load } from "./Loads";
import { sprinter, largeStraight, smallStraight } from "./Driver/truckTypes";
import { findTruckById, getLoad, getLoadId, showLoad } from "./Driver/viewLoad";
import { Select } from "./Driver/Select";
import { ProfileData } from "./Driver/ProfileData";
const pf = require("./help/updateDatabase");
const postf = require("./help/postFetch");
const gf = require("./help/getFetch");

export class DriverPage extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      name: "",
      surname: "",
      assignedTruck: null,
      isAssigned: false,
      selectValue: "Sprinter",
      truckCards: [],
      trucksShown: false,
      btnToggleTrucks: "View my trucks",
      passwordField: false,
      currentLoad: null,
      loadShown: false,
    };

    // When the page renders for the 1st time(retrieving data from database)
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getAllTrucks = this.getAllTrucks.bind(this);

    // The ability to CREATE a new truck
    this.chooseType = this.chooseType.bind(this);
    this.createTruck = this.createTruck.bind(this);
    this.defineTruckType = this.defineTruckType.bind(this);

    // The ability to SEE ALL DRIVER's trucks
    this.allTrucksOnPage = this.allTrucksOnPage.bind(this);
    this.showAlltrucks = this.showAlltrucks.bind(this);

    // Update after deleting
    this.updateShownCards = this.updateShownCards.bind(this);

    //The ability to assign only 1 truck to the driver
    this.changeAssignedStatus = this.changeAssignedStatus.bind(this);
    this.assignTruck = this.assignTruck.bind(this);
    this.cancelTruck = this.cancelTruck.bind(this);
    this.saveChangedStatus = this.saveChangedStatus.bind(this);

    //if we delete the assigned truck
    //this.resetStatus=this.resetStatus.bind(this)
    // this.getAssignedTrucks=getAssignedTrucks.bind(this)

    // VIEW LOAD
    this.findTruckById = findTruckById.bind(this);
    this.getLoadId = getLoadId.bind(this);
    this.getLoad = getLoad.bind(this);
    this.showLoad = showLoad.bind(this);
   
  }

  componentDidMount() {
    this.getUserInfo();
    this.getAllTrucks();
  }

  updateShownCards(id) {
    let updatedCards = this.state.truckCards.filter((card) => card.key != id);
    this.setState({
      truckCards: updatedCards,
      trucks: updatedCards,
    });
  }

  changeAssignedStatus(id) {
    return new Promise((resolve, reject) => {
      if (this.state.isAssigned) {
        if (this.state.assignedTruck === id) {
          this.cancelTruck(id).then(() => resolve());
        } else {
          console.log("Driver is already assigned");
          reject();
        }
      } else {
        this.assignTruck(id).then(() => resolve());
      }
    });
  }

  saveChangedStatus(isAssigned, assignedTruck) {
    const url = "http://localhost:8081/api/users/" + this.state.id;
    const body = {
      isAssigned: isAssigned,
      assignedTruck: assignedTruck,
    };

    // return fetch( {
    //   method: "PUT",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    //   body: JSON.stringify({
    //     isAssigned: isAssigned,
    //     assignedTruck: assignedTruck,
    //   }),
    // })
    //.then((response) => response.json())

    pf.updateDB(url, body)
      .then(() => {
        this.setState({
          isAssigned: isAssigned,
          assignedTruck: assignedTruck,
        });
      })
      .catch((err) => console.log(err));
  }

  assignTruck(id) {
    let isAssigned = true;
    let assignedTruckId = id;
    return this.saveChangedStatus(isAssigned, assignedTruckId);
  }

  cancelTruck() {
    let isAssigned = false;
    let assignedTruckId = "No assigned truck";
    return this.saveChangedStatus(isAssigned, assignedTruckId);
  }

  getUserInfo() {
    fetch("http://localhost:8081/api/users/" + localStorage.getItem("token"))
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          name: res.user.name,
          email: res.user.email,
          password: res.user.password,
          id: res.user._id,
          isAssigned: res.user.isAssigned,
          assignedTruck: res.user.assignedTruck,
        });
        if (res.isAssigned) {
          this.setState({
            assignBtn: "Cancel",
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getAllTrucks() {
    console.log("view trucks");

    fetch("http://localhost:8081/api/trucks/" + this.context.token)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.trucks);

        this.setState({
          trucks: res.trucks,
          truckCards: res.trucks.map((truck) => {
            return (
              <TrucksCard
                key={truck._id}
                truckData={truck}
                parent={this.state.id}
                action={this.updateShownCards}
                assignTruckForDriver={this.changeAssignedStatus}
                resetStatus={this.resetStatus}
                delete={this.deleteTruck}
              />
            );
          }),
        });
      });
  }

  createTruck() {
    const type = this.defineTruckType();
    console.log(type.payload);
    const url = "http://localhost:8081/api/trucks";
    const body = {
      token: localStorage.getItem("token"),
      payload: type.payload,
      dimension: type.dimension,
      type: this.state.selectValue,
      status: "IN SERVICE",
    };
    postf
      .postFetch(url, body)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.getAllTrucks();
      });
  }

  chooseType(e) {
    this.setState({
      selectValue: e.target.options[e.target.selectedIndex].value,
    });
  }

  defineTruckType() {
    return this.state.selectValue === "Sprinter"
      ? sprinter
      : this.state.selectValue === "Small Straight"
      ? smallStraight
      : this.state.selectValue === "Large Straight"
      ? largeStraight
      : false;
  }

  showAlltrucks() {
    if (this.state.trucksShown == false) {
      this.setState({
        btnToggleTrucks: "Hide my trucks",
      });
    } else {
      this.setState({
        btnToggleTrucks: "View my trucks",
      });
    }
    this.setState({
      trucksShown: !this.state.trucksShown,
    });
  }
  allTrucksOnPage() {
    return this.state.truckCards;
  }
  

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <div className="profile">
                <ProfileTitle
                  name={this.state.name}
                  surname={this.state.surname}
                />
                <ProfileData data={this.state} />
              </div>
              <div className="card-action">
                <Button
                  btnName="Change password"
                  onClick={() => {
                    console.log(this.state.passwordField);
                    this.setState({ passwordField: !this.state.passwordField });
                  }}
                />

                <Button
                  btnName={this.state.btnToggleTrucks}
                  onClick={this.showAlltrucks}
                />
                <Button btnName="View load" onClick={this.showLoad} />
                
              </div>
              {this.state.passwordField ? (
                <ChangePasswordForm
                  currentPass={this.state.password}
                  token={this.context.token}
                />
              ) : (
                ""
              )}
              {this.state.loadShown ? (
                <div>
                  <Load
                    key={this.state.currentLoad._id}
                    loadData={this.state.currentLoad}
                  />
                  <ChangeState load={this.state.currentLoad}/>
                </div>
              ) : (
                ""
              )}

              <Select onChange={this.chooseType} onClick={this.createTruck} />
            </div>
          </div>
        </div>
        {this.state.trucksShown ? this.allTrucksOnPage() : ""}
      </div>
    );
  }
}

function ChangeState(props) {
  const [loadState,setLoadState]=useState(props.load.state)
  const [id,setId]=useState(props.load._id)
  
  const chooseState=(e)=>setLoadState(e.target.options[e.target.selectedIndex].value)
  const saveState=()=>{
    changeStateInDB(id,loadState).then((res)=>{
      console.log(loadState)
      

    })
  }
  

  return (
    <div>
      <h4>Change State</h4>
      <div className="select">
        <select onChange={chooseState}>
          <option>En route to pick up</option>
          <option>Arrived to pick up</option>
          <option>On route to delivery</option>
          <option>Arrived to delivery</option>
        </select>
        <div className="select__arrow"></div>
      </div>
      <Button btnName="Save state" onClick={saveState} />{" "}
    </div>
  );
}

function changeStateInDB(loadId,state){
  let status="Assigned"
  if(state==="Arrived to delivery") {
     status= "Shipped"
  }
  const url="http://localhost:8081/api/load/state/"+loadId
  const body ={
    state: state,
    status: status,
  }
  return pf.updateDB(url,body)
}