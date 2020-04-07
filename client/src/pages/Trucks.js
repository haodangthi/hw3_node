import React, { Component } from "react";
import ReactDOM from "react-dom";

import { TruckInfo } from "./Truck/TruckInfo";

export class TrucksCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.truckData._id,
      truckType: props.truckData.truckType,
      payload: props.truckData.payload,
      dimension: props.truckData.dimension,
      date: props.truckData.date,

      status: props.truckData.status, //"inService","on LOAD "
      created_by: props.truckData.created_by, //driverId
      assigned_to: props.truckData.assigned_to, //driverId OR nobody,
    };
    //Delete the truck
    this.deleteTruck = this.deleteTruck.bind(this);
    this.deleteTruckInDB = this.deleteTruckInDB.bind(this);

    //The ability to assign only 1 truck to the driver
    this.changeTruckStatus = this.changeTruckStatus.bind(this);
    this.saveTruckStatus = this.saveTruckStatus.bind(this);
    this.assignTruck = this.assignTruck.bind(this);
    this.cancelTruck = this.cancelTruck.bind(this);
  }

  componentDidMount() {
    if (this.state.assigned_to === "nobody" || !this.state.assigned_to) {
      this.setState({
        IS: true,
        assignBtn: "Assign the Truck",
      });
    } else {
      this.setState({
        IS: false,
        assignBtn: "Cancel",
      });
    }
  }

  saveTruckStatus(status, IS, assignBtn) {
    fetch("http://localhost:8081/api/trucks/" + this.state.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        status: status,
      }),
    })
      .then((response) => {
        response.json();
        this.setState({
          IS: IS,
          status: status,
          assignBtn: assignBtn,
        });
      })
      .then((data) => {
        console.log("SUCCESS");
      })
      .catch((err) => console.log(err));
  }

  changeTruckStatus() {
    if (this.state.assigned_to === "nobody") {
      this.props
        .assignTruckForDriver(this.state.id)
        .then(() => {
          console.log(this.state.IS);
          if (this.state.IS) {
            //assign
            this.assignTruck();
          } else {
            //cancel
            this.cancelTruck();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("CANNOT BE CANCELED");
    }
  }

  assignTruck() {
    let IS = false;
    let status = "ON LOAD";
    let assignBtn = "Cancel";

    this.saveTruckStatus(status, IS, assignBtn);
  }

  cancelTruck() {
    let IS = true;
    let status = "IN SERVICE";
    let assignBtn = "Assign the truck";

    this.saveTruckStatus(status, IS, assignBtn);
  }

  deleteTruckInDB() {
    fetch("http://localhost:8081/api/trucks/" + this.state.id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.trucks);
        this.props.action(this.state.id);
      });
  }

  deleteTruck() {
    if (this.state.IS && this.state.assigned_to === "nobody") {
      this.deleteTruckInDB();
    } else {
      console.log("CANNOT BE DELETED");
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col s6 offset-s3">
          <div className="card">
            <div className="card-content grey lighten-4">
              <h5>Truck</h5>
            </div>

            <div className="card-content">
              <div className="truck-info">
                <TruckInfo
                  info={this.state}
                  assignBtn={this.state.assignBtn}
                  onClick={{
                    changeStatus: this.changeTruckStatus,
                    deleteTruck: this.deleteTruck,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
