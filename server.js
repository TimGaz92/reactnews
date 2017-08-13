// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");

//call in ALL of the dependencies from the last scraper


// Require Click schema
var News = require("./models/click");


var app = express();

var PORT = process.env.PORT || 3000;


app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// MongoDB configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/reactNewsDB");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/api", function(req, res) {
  News.find({}).exec(function(err, doc) {

    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api", function(req, res) {

  var newsID = req.body.newsID;
  var likes = parseInt(req.body.likes);

  News.findOneAndUpdate({
    newsID: newsID
  }, {
    $set: {
      likes: likes
    }
  }, { upsert: true }).exec(function(err) {

    if (err) {
      console.log(err);
    }
    else {
      res.send("Updated likes Count!");
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/findred", function(req, res) {
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
    console.log("test log----------------------------------------------------");
    db.scrapedData.insert(results)
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////




app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
