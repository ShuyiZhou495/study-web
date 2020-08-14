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
    comment: {
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

var setSchema = new Schema({
    setname: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    notes: [noteSchema],
    description: {
        type: String,
        default: ''
    },
    photo: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

var Sets = mongoose.model('Set', setSchema);

module.exports = Sets;