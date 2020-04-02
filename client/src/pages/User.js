import React, { Component } from "react";
import { Button } from "../components/Form";
import { TrucksCard } from "./Trucks";

export class UserPage extends React.Component {
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
    this.resetStatus=this.resetStatus.bind(this)
  }

  componentDidMount() {
    this.getUserInfo();
  }

  updateShownCards(id) {
    let updatedCards = this.state.truckCards.filter(card => card.key != id);
    this.setState({
      truckCards: updatedCards
    });
  }

  changeAssignedStatus(id) {
    return new Promise((resolve,reject)=>{
      if (this.state.isAssigned) {
        if (this.state.assignedTruck === id) {
          this.cancelTruck(id).then(()=>resolve())
          
        } else {
          console.log("Driver is already assigned");
          reject()
        }
      } else {
        this.assignTruck(id).then(()=>resolve())
        
      }
    })
  }

 resetStatus(){
   return this.saveChangedStatus(false,"No assigned trucks")
 }

  saveChangedStatus(isAssigned, assignedTruck) {
    return new Promise((resolve,reject)=>{
      fetch("http://localhost:8081/api/users/" + this.state.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        isAssigned: isAssigned,
        assignedTruck: assignedTruck
      })
    })
      .then(response => response.json())
      .then(() => {
        this.setState({
          isAssigned: isAssigned,
          assignedTruck: assignedTruck
        });
        resolve()
      })
      .catch(err => console.log(err));

    })
  }

  assignTruck(id) {
    let isAssigned = true;
    let assignedTruckId = id;
    return this.saveChangedStatus(isAssigned, assignedTruckId)
  }

  cancelTruck() {
    let isAssigned = false;
    let assignedTruckId = "No assigned truck";
    return this.saveChangedStatus(isAssigned, assignedTruckId)
  }

  getUserInfo() {
    fetch("http://localhost:8081/api/users/" + localStorage.getItem("token"))
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          name: res.user.name,
          email: res.user.email,
          password: res.user.password,
          id: res.user._id,
          isAssigned: res.user.isAssigned,
          assignedTruck: res.user.assignedTruck
        });
        if (res.isAssigned) {
          this.setState({
            assignBtn: "Cancel"
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  getAllTrucks() {
    console.log("view trucks");

    fetch("http://localhost:8081/api/trucks/" + localStorage.getItem("token"))
      .then(res => res.json())
      .then(res => {
        console.log(res.trucks);

        this.setState({
          truckCards: res.trucks.map(truck => {
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
          })
        });
      });
  }

  createTruck() {
    let type = this.defineTruckType();
    console.log(type.payload);

    fetch("http://localhost:8081/api/trucks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        payload: type.payload,
        dimension: type.dimension,
        type: this.state.selectValue,
        status: "IN SERVICE"
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.getAllTrucks();
      });
  }

  chooseType(e) {
    this.setState({
      selectValue: e.target.options[e.target.selectedIndex].value
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
      this.getAllTrucks();
      this.setState({
        btnToggleTrucks: "Hide my trucks"
      });
    } else {
      this.setState({
        btnToggleTrucks: "View my trucks"
      });
    }
    this.setState({
      trucksShown: !this.state.trucksShown
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
                <Button btnName="Edit my profile" onClick={this.getUserInfo} />

                <Button
                  btnName={this.state.btnToggleTrucks}
                  onClick={this.showAlltrucks}
                />
              </div>

              <Select onChange={this.chooseType} onClick={this.createTruck} />
            </div>
          </div>
        </div>
        {this.state.trucksShown ? this.allTrucksOnPage() : ""}
      </div>
    );
  }
}
function Select(props) {
  return (
    <div className="card-action">
      <h4>Create a truck</h4>
      <div className="select">
        <select onChange={props.onChange}>
          <option>Sprinter</option>
          <option>Small Straight</option>
          <option>Large Straight</option>
        </select>
        <div className="select__arrow"></div>
      </div>
      <Button btnName="Create a truck" onClick={props.onClick} />{" "}
    </div>
  );
}

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

function ProfileData(props) {
  return (
    <div className="card-action">
      <h6>
        Email: <span className="data__container">{props.data.email} </span>
      </h6>

      <h6>
        Assigned truck:{" "}
        <span className="data__container">{props.data.assignedTruck} </span>
      </h6>
    </div>
  );
}

const sprinter = {
  payload: 1700,
  dimension: {
    width: 300,
    length: 250,
    height: 170
  }
};

const smallStraight = {
  payload: 2500,
  dimension: {
    width: 500,
    length: 250,
    height: 170
  }
};

const largeStraight = {
  payload: 4000,
  dimension: {
    width: 700,
    length: 350,
    height: 200
  }
};
