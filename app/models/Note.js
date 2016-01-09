var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: String,
    note_content: String,
    note_date: String,
    user:{
        id: String,
        name: String,
        age: String,
        profImage: String,
        gender: String
    }
});
module.exports = mongoose.model('Note', NoteSchema);
