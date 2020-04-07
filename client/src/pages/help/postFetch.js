const postFetch=(url,bodyData)=>{
    return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(bodyData)
      })
        
    
}

exports.postFetch=postFetch