let upd = require('../help/updateDatabase');

function changePassword(password, token) {
    let url = "http://localhost:8081/api/users/pass/" + token;
    let body = {
      token: localStorage.getItem("token"),
      password: password
    };
    return upd.updateDB(url, body);
  }
  

  exports.changePassword=changePassword