var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  newsID:{
  	type: String
  },
  title: {
    type: String
  },
  link: {
    type: String
  }, 
  likes: {
  	type: Number
  }
});

var News = mongoose.model("News", NewsSchema);

module.exports = News;
