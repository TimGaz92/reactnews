// Here we will utilize the axios library to perform GET/POST requests
var axios = require("axios");

module.exports = {

  getNews: function() {
    return axios.get("/api/saved")
    .then(function(results){
    	console.log("axios results" + results);
    	return results;
    });
  },

  saveLikes: function(newsData) {
    return axios.post("/api", newsData);
  }
};
