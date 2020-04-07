let df = require("../help/deleteFetch");

let deleteLoad = (status, loadId) => {
  canDelete(status) ? deleteLoadInDB(loadId) : console.log("CANNOT BE DELETED");
};
let canDelete = (status) => status === "new";

function deleteLoadInDB(loadId) {
  let url = "http://localhost:8081/api/loads/" + loadId;
  return df.deleteFetch(url);
}

exports.deleteLoad = deleteLoad;
