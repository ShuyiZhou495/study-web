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
    pronunce: {
        type: String,
        default:''
    },
    recording: {
        type: String,
        default:''
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

var pageSchema = new Schema({
    description: {
        type: String,
        default: ''
    },
    notes: [noteSchema]
}, {timestamps: true});

var setSchema = new Schema({
    setname: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    textbook: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Hard', 'Intermediate', 'Beginner']
    },
    fromLanguage: {
        type: String,
        required: true
    },
    toLanguage:{
        type: String,
        required: true
    },
    pages: [pageSchema],
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