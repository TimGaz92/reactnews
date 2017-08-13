var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title: {
    type: String
  },
  link: {
    type: String
  }
});

var News = mongoose.model("News", NewsSchema);

module.exports = News;
