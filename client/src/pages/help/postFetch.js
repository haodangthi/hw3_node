const postFetch=(url,bodyData)=>{
    return new Promise((resolve,reject)=>{
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(bodyData)
      })
        .then(res => res.json())
        .then(res => {
          resolve(res)
        }).catch(e=>{console.log(e.message);reject()});
    })
}

exports.postFetch=postFetch