const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:3443', 'http://localhost:4200'];
var corsOptionsDelegate = (req, callback) => {
    var corsOption;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { option: false};
    }
    callback(null, corsOption);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
