function updateDB(url, bodyData) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(bodyData)
      })
        .then(response => {
          response.json();
          console.log("SUCCESS");
          resolve();
        })
  
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  }
  


module.exports ={
 updateDB:updateDB
}