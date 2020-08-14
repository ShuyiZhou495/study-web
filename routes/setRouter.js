const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Sets = require('../models/set');

const setRouter = express.Router();

setRouter.use(bodyParser.json());

setRouter.route('/')
.get((req, res, next) => {
    Sets.find({})
    .then((sets)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(sets);
    })
})
.post((req, res, next) => {
    Sets.create(req.body)
    .then((sets)=>{
        console.log('note created', sets);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(sets);
    })
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /sets');
})
.delete((req, res, next) => {
    Sets.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err));
});

setRouter.route('/:setID')
.get((req, res, next) => {
    Sets.findById(req.params.setID)
    .then((sets) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(sets);
    }, (err) => next(err))
    .catch((err) => next(err)); 
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /sets/'+ req.params.setID);
})
.put((req, res, next) => {
    Sets.findByIdAndUpdate(req.params.setID, {
        $set: req.body
    }, { new: true }).exec()
    .then((set) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(set);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Sets.findByIdAndRemove(req.params.setID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = setRouter;
