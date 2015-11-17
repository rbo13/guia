var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
    note_tour_id: { type: Schema.Types.ObjectId, ref: 'Tour' },
    notes: String
});
module.exports = mongoose.model('Note', NoteSchema);
