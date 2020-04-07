function updateDB(url, bodyData) {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => {
      
      console.log("SUCCESS");
      return response.json();
    })

    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  updateDB: updateDB,
};
