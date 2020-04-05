import React, { useState } from "react";
import {LoadInfo} from "./Loads/LoadInfo"
const cd=require("./Loads/compareDimension")
const ls =require("./Loads/loadStatus")
const dl=require("./Loads/deleteLoad")
const help=require("./help/getFetch")

export function Load(props) {
  const [id, setId] = useState(props.loadData._id);
  const [loadState, setLoadState] = useState(props.loadData.state);
  const [status, setStatus] = useState(props.loadData.status);
  const [created_by, setCreatedBy] = useState(props.loadData.created_by);
  const [assigned_to, setAssignedTo] = useState(props.loadData.assigned_to);
  const [date, setDate] = useState(props.loadData.date);
  const [dimension, setDimension] = useState(props.loadData.dimension);
  const [payload, setPayload] = useState(props.loadData.payload);
  const [foundTruck, setFoundTruck] = useState([]);

 
  let postALoad =()=>{
    getAssignedTrucks().then(res => {
      let f = res.filter(e => {
        return cd.compareDimension(e, dimension, payload);
      });
      if (f[0]) {
        console.log(f[0]);
        ls.assignLoad(id, f[0]._id);
        ls.getAssignedByShipper(id, f[0]._id);
      } else{ console.log('no truck found')}
    });
  }

 

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card">
          <div className="card-content grey lighten-4 black-text">
            <h5>Load</h5>
          </div>

          <div className="card-content">
            <div className="truck-info">
              <LoadInfo
                info={{ status, loadState, payload, dimension, date }}
                onClick={{
                  post:postALoad,
                  delete: () => dl.deleteLoad(status,id)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAssignedTrucks() {

  let url="http://localhost:8081/api/trucks";
  return help.getFetch(url)


  // return new Promise((resolve, reject) => {
  //   fetch("http://localhost:8081/api/trucks")
  //     .then(res => res.json())
  //     .then(res => {
  //       resolve(res);
  //     }) //
  //     .catch(e => {
  //       console.log(e);
  //       reject();
  //     });
  // });
}



// let canDelete=(status)=>status==="new"

// let deleteLoad=(status,loadId)=>{canDelete(status)?deleteLoadInDB(loadId):console.log("CANNOT BE DELETED")}

// function deleteLoadInDB(loadId) {
//   return new Promise((resolve, reject) => {
//     fetch("http://localhost:8081/api/loads/" + loadId, {
//       method: "DELETE"
//     })
//       .then(res => res.json())
//       .then(res => {
//         console.log(res);
//         resolve(res);
//       })
//       .catch(e => {
//         console.log(e);
//         reject();
//       });
//   });
// }








// function assignLoad(loadId, truckId) {
//   let state = "En route to Pick Up";
//   let status = "Assigned";

//   changeLoadStatusinDB(loadId, truckId, state, status);
// }

// function getAssignedByShipper(loadId, truckId) {
//   let updateTruckURL = "http://localhost:8081/api/trucks/assign/" + truckId;
//   let body = {
//     assigned_to: loadId
//   };
//   updateDB(updateTruckURL, body).then(res =>
//     console.log("Load has been assigned to a driver")
//   );
// }

// function changeLoadStatusinDB(loadId, truckId, state, status) {
//   let updateLoadURL = "http://localhost:8081/api/loads/" + loadId;
//   let body = {
//     status: status,
//     state: state,
//     assigned_to: truckId
//   };
//   updateDB(updateLoadURL, body).then(() => console.log("Load status updated"));
// }

// function updateDB(url, bodyData) {
//   return new Promise((resolve, reject) => {
//     fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8"
//       },
//       body: JSON.stringify(bodyData)
//     })
//       .then(response => {
//         response.json();
//         console.log("SUCCESS");
//         resolve();
//       })

//       .catch(err => {
//         console.log(err);
//         reject();
//       });
//   });
// }
