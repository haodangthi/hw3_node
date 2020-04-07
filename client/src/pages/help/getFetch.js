const getFetch = url => {
  return fetch(url).then(res => res.json())
    
};

module.exports = {
  getFetch: getFetch
};
