function createLoad(width, lenght, height, payload) {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8081/api/loads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          payload: payload,
          dimension: { width, lenght, height }
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(e => {
          reject();
        });
    });
  }
  

  exports.createLoad=createLoad