let help = require("../help/updateDatabase");

function assignLoad(loadId, truckId) {
  let state = "En route to Pick Up";
  let status = "Assigned";

  changeLoadStatusinDB(loadId, truckId, state, status);
}

function getAssignedByShipper(loadId, truckId) {
  let updateTruckURL = "http://localhost:8081/api/trucks/assign/" + truckId;
  let body = {
    assigned_to: loadId
  };
  help.updateDB(updateTruckURL, body).then(res =>
    console.log("Load has been assigned to a driver")
  );
}

function changeLoadStatusinDB(loadId, truckId, state, status) {
  let updateLoadURL = "http://localhost:8081/api/loads/" + loadId;
  let body = {
    status: status,
    state: state,
    assigned_to: truckId
  };
  help.updateDB(updateLoadURL, body).then(() => console.log("Load status updated"));
}

module.exports={
    assignLoad:assignLoad,
    getAssignedByShipper:getAssignedByShipper
}
