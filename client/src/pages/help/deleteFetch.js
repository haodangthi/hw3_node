const deleteFetch=(url) =>{  
   
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(e => {
          console.log(e);
          reject();
        });
    });
  }

  exports.deleteFetch=deleteFetch