//using axios to make life easier with get / post requests 
var axios = require("axios");

module.exports = {
  getNews: function() {
    return axios.get("/all");
  },

  saveNews: function(newsData) {
    return axios.post("/all", newsData);
  }
};
