'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    album_name: String,
    description: { type: String, default: "" },
    created: { type: Date, default: Date.now },
    images: { type: Array, default: [] },
    album_tour_id: String,
    user: {
        id: String,
        facebook_id: { type: String, select: false },
        name: String,
        profImage: String
    }
});
//end creating booking schema.
module.exports = mongoose.model('Album', AlbumSchema);
