const getFetch=(url)=> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        resolve(res);
      }) //
      .catch(e => {
        console.log(e);
        reject();
      });
  });
}

module.exports = {
  getFetch:getFetch
};
