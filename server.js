// Database and Routing
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Scrapper tools
var cheerio = require("cheerio");
var axios = require("axios");


//Requires all model
var db = require("./models");

var PORT = 3000;

//Initialize Express
var app = express();

//Middlewares

//Logger
app.use(logger("dev"));

//Parse request body as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Make public static folder
app.use(express.static("public"));

//Connect to Mongo DB
mongoose.connect("mongodb://localhost/newsscrapper", { useNewUrlParser: true });

















var scrapper = function(){

// Scrapping - Axios to grab the body of the HTML and Cheerio to navigate tags to scrap
axios.get("https://www.washingtonpost.com/").then(function(response){
    var $ = cheerio.load(response.data);
    var results = [];

    $("div.pb-feature").each(function(i, element){
        var text = $(element).children("div.border-top-off").children("div.flex-stack").children("div.headline").text()
        var href = $(element).children("div.border-top-off").children("div.flex-stack").children("div.headline").children("a").attr("href")
        var blurb = $(element).children("div.border-top-off").children("div.flex-stack").children("div.blurb").text()
        var byline = $(element).children("div.border-top-off").children("div.flex-stack").children("ul.sigline").children("li.byline").text()
        
        // Artile information
        results.push({
            headline: text,
            blurb: blurb,
            byline: `By ${byline}`,
            href: href

        });
    })
    console.log(results);
});
};


app.listen(PORT, function(){
    console.log("App running on port " + PORT + "!");
});