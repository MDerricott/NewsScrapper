var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var NoteSchema = new Schema({
    // title: String,
    noteBody: String,
    // user: String
});


//Uses NoteSchema to create model
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;