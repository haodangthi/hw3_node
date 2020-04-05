let df= require("../help/deleteFetch")



let deleteLoad=(status,loadId)=>{canDelete(status)?deleteLoadInDB(loadId):console.log("CANNOT BE DELETED")}
let canDelete=(status)=>status==="new"


function deleteLoadInDB(loadId) {  
  let url="http://localhost:8081/api/loads/" + loadId
  df.deleteFetch(url)

//   return new Promise((resolve, reject) => {
//     fetch(url, {
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
}

exports.deleteLoad=deleteLoad