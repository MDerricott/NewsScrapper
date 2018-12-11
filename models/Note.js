var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var NoteSchema = new Schema({
    // title: String,
    body: String,
    user: String
});


//Uses NoteSchema to create model
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;