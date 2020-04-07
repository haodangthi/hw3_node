import React, { useState } from "react";
import { Button } from "../../components/Button";
const pf = require("../help/updateDatabase");

export function ChangeState(props) {
  const [loadState, setLoadState] = useState(props.load.state);
  const [id, setId] = useState(props.load._id);
  const [truckId, setTruckId] = useState(props.load.assigned_to);

  const chooseState = (e) =>
    setLoadState(e.target.options[e.target.selectedIndex].value);
  const saveState = () => {
    changeStateInDB(id, loadState, props.action, truckId).then((res) => {
      console.log(res);
    });
  };

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

function changeStateInDB(loadId, state, resetStatus, truckId) {
  let status = "Assigned";
  if (state === "Arrived to delivery") {
    status = "Shipped";
    resetStatus(truckId);
    loadIsShipped(truckId);
  }
  const url = "http://localhost:8081/api/load/state/" + loadId;
  const body = {
    state: state,
    status: status,
  };
  return pf.updateDB(url, body);
}

function loadIsShipped(truckId) {
  const status = "IN SERVICE";
  const assigned_to = "nobody";
  const truckUrl = "http://localhost:8081/api/trucks/" + truckId;
  const truckAssignUrl = "http://localhost:8081/api/trucks/assign/" + truckId;

  pf.updateDB(truckUrl, { status: status });
  pf.updateDB(truckAssignUrl, { assigned_to: assigned_to });
}
