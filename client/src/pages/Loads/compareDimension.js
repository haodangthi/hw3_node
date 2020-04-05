 let compareDimension = (truck, loadDim, loadPayload) => {
    
    return (
      truck.dimension.width > loadDim.width &&
      truck.dimension.lenght > loadDim.lenght &&
      truck.dimension.height > loadDim.height &&
      truck.payload > loadPayload
    );
  };

  exports.compareDimension=compareDimension;