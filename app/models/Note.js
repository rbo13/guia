var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
    notes: String
});
module.exports = mongoose.model('Note', NoteSchema);
