const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var exampleSchema = new Schema({
    sentence: {
        type: String,
        default: ''
    },
    comment: {
        type: String, 
        default: ''
    }
});

var noteSchema = new Schema({
    word: {
        type: String,
        default: ''
    },
    meaning: {
        type: String,
        default: ''
    },
    examples: [exampleSchema],
    practice: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

var Notes = mongoose.model('Note', noteSchema);

module.exports = Notes;