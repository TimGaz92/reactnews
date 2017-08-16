var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  newsID:{
  	type: String
  },
  title: {
    type: []
  },
  link: {
    type: String
  }, 
  likes: {
  	type: Number
  }
});

var News = mongoose.model("scrapedInfo", NewsSchema);

module.exports = News;
