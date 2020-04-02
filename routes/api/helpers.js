const jwt = require("jsonwebtoken");
const secret = require("../../config/auth.json").secret;
const Driver = require("../../models/driver");
const Shipper = require("../../models/shipper");

function getUserID(token) {
  let user = jwt.verify(token, secret);
  console.log(user._id);
  return user._id;
}

function userIsDriver(token) {
  let user = jwt.verify(token, secret);
  console.log(user._id);
  return user.isDriver;
}
function defineType(isDriver) {
  let userType;
  if (isDriver) {
    userType = Driver;
  } else {
    userType = Shipper;
  }
  return userType;
}

module.exports = {
  getUserID: getUserID,
  defineType:defineType,
  userIsDriver:userIsDriver
};
