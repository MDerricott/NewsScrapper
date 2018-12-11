var mongoose = require("mongoose");


// Saves reference to the Schema constructor
var Schema = mongoose.Schema;

//Schema constructor for creating a new Article
var ArticleSchema = new Schema ({
    title: {
        type: String,
        // required: true,
    },
    blurb: {
        type: String,
        // required: true,  
    },
    articleUrl: {
        type: String,
        // required: true
    },
    byline:{
        type: String,
        // required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});


//Creates the model for the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;