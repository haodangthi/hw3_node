const gf = require("../help/getFetch");


function findTruckById() {
    if (this.state.assignedTruck === "No assigned truck") {
      return false;
    } else {
      const truck = this.state.trucks.filter(
        (e) => e._id == this.state.assignedTruck
      )[0];
      if (truck.assigned_to === "nobody") {
        return false;
      }
      return truck;
    }
  }
  
  function getLoadId() {
    const truck = this.findTruckById();
    return !truck ? false : truck.assigned_to;
  }
  
  function getLoad(loadId) {
    const url = "http://localhost:8081/api/loads/assigned/" + loadId;
    return gf.getFetch(url).then((res) => {
      this.setState({
        currentLoad: res,
      });
      console.log(res);
    });
  }
  
  function showLoad() {
    const loadId = this.getLoadId();
    if (loadId) {
      this.getLoad(loadId)
        .then(() => {
          console.log(this.state.currentLoad._id);
          this.setState({ loadShown: !this.state.loadShown });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("No loads");
    }
  }

  
  export {findTruckById,getLoad,getLoadId,showLoad}