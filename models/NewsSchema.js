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
  	type: Number, default: 0
  }
});



var News = mongoose.model("News", NewsSchema);

module.exports = News;
