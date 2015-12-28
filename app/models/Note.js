var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
    notes: String,
    note_guide_id: String,
    note_date: Date
});
module.exports = mongoose.model('Note', NoteSchema);
