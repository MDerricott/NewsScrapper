// Database and Routing
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Scrapper tools
var cheerio = require("cheerio");
var axios = require("axios");


//Requires all model
var db = require("./models");

var PORT = process.env.PORT || 3000;


//Initialize Express
var app = express();

//Middlewares

//Logger
app.use(logger("dev"));

//Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//Make public static folder
app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsscrapper";

mongoose.connect(MONGODB_URI);

//Connect to Mongo DB
// mongoose.connect("mongodb://localhost/newsscrapper", { useNewUrlParser: true });

// Routes


// Get route for scrapping
app.get("/api/washingtonpost/scrape", function (req, res) {

    axios.get("https://www.washingtonpost.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        var results = [];

        $("div.pb-feature").each(function (i, element) {
            var text = $(element)
                .children("div.border-top-off")
                .children("div.flex-stack")
                .children("div.headline")
                .text()
            var href = $(element)
                .children("div.border-top-off")
                .children("div.flex-stack")
                .children("div.headline")
                .children("a")
                .attr("href")
            var blurb = $(element)
                .children("div.border-top-off")
                .children("div.flex-stack")
                .children("div.blurb")
                .text()
            var byline = $(element)
                .children("div.border-top-off")
                .children("div.flex-stack")
                .children("ul.sigline")
                .children("li.byline")
                .text()

            // Artile information
            results.push({
                headline: text,
                blurb: blurb,
                byline: byline.trim(),
                href: href
            });
        })
        res.json(results);
    });

});

app.get("/api/articles", function (req,res){
    db.Article.find({})
        .then(function(dbArticle){
            res.json(dbArticle)
        })
        .catch(function(err){
            res.json(err);
        });
});

app.post("/api/article/save", function (req, res) {
    db.Article.create({
            title: req.body.title,
            articleUrl: req.body.articleUrl,
            blurb: req.body.blurb,
            byline: req.body.byline,
        })
        .then(function (dbArticle) {
            console.log(dbArticle);
            res.json(res)
        })
        .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
        });
});
















app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});