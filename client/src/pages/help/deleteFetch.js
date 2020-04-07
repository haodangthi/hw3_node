const deleteFetch = (url) => {
  return fetch(url, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("Successfully deleted", res);
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.deleteFetch = deleteFetch;
