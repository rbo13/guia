var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: String,
    note_content: String,
    note_date: String,
    note_guide_id: String
});
module.exports = mongoose.model('Note', NoteSchema);
