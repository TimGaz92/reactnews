var express = require('express');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var path = require("path");

mongoose.Promise = Promise;

var News = require("./models/news");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

//DB CONFIG 	MONGOOSE TO MONGODB
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect("mongodb://localhost/reactNewsDB");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successfully made");
});

//ROUTES 

//main landing route 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// find all route 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/all", function(req, res) {
  News.find({}).exec(function(err, doc) {

    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

//	news scraping route 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/find", function(req, res){
request("https://www.reddit.com/r/worldnews", function(error, response, html) {
  		var $ = cheerio.load(html);
  		var results = [];
  		$("p.title").each(function(i, element) {
    	var title = $(element).text();
    	var link = $(element).children().attr("href");
    		results.push({
      		title: title,
      		link: link
    		});
  		});
  	console.log(results);
    console.log("test log # 1- server side scraping");
  	db.scrapedData.insert(results)
});
});

//launching server
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

