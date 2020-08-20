const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');

const Sets = require('../models/set');

const setRouter = express.Router();

setRouter.use(bodyParser.json());

setRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, (req, res, next) => {
    Sets.find(req.query)
    .then((sets)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log(sets);
        return res.json(sets);
    })
})
.post(cors.cors, (req, res, next) => {
    Sets.create(req.body)
    .then((sets)=>{
        console.log('note created', sets);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(sets);
    })
})
.put(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /sets');
})
.delete(cors.cors, (req, res, next) => {
    Sets.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err));
});

setRouter.route('/:setID')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, (req, res, next) => {
    Sets.findById(req.params.setID)
    .then((sets) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(sets);
    }, (err) => next(err))
    .catch((err) => next(err)); 
})
.post(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /sets/'+ req.params.setID);
})
.put(cors.cors, (req, res, next) => {
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
.delete(cors.cors, (req, res, next) => {
    Sets.findByIdAndRemove(req.params.setID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

setRouter.route('/:setId/pages')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors,(req,res,next) => {
    Sets.findById(req.params.setId)
    .then((set) => {
        if (set != null) {
            res.Status = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(set.pages);
        }
        else {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));       
})
.post(cors.cors, (req,res,next) => {
    Sets.findById(req.params.setId)
    .then((set) => {
        if (set != null) {
            set.pages.push(req.body);
            set.save()
            .then((set) => {
                Sets.findById(set._id)
                    .then((set) => {
                        res.Status = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(set);
                    })
                }, (err) => next(err));
        }
        else {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.cors, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Sets/' + 
    req.params.setId + '/pages');
})
.delete(cors.cors,(req,res,next) => {
    Sets.findById(req.params.setId)
    .then((set) => {
        if(set!=null){
            for (var i = (set.pages.length - 1); i >= 0; i--) {
                set.pages.id(set.pages[i]._id).remove();
            }
            set.save()
            .then((set) => {
                res.Status = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(set);
            }, (err) => next(err));
        }
        else {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

setRouter.route('/:setId/pages/:pageId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors,(req,res,next) => {
    Sets.findById(req.params.setId)
    .then((set) => {
        if (set != null && set.pages.id(req.params.pageId) != null) {
            res.Status = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(set.pages.id(req.params.pageId));
        }
        else if (set == null) {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Page ' + req.params.pageId + " not exist");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));   
})
.post(cors.cors, (req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Sets/' + req.params.setId
    + '/pages/' + req.params.pageId);
})
.put(cors.cors, (req,res,next) => {
    Sets.findById(req.params.setId)
    .then((set) => {
        if (set != null && set.pages.id(req.params.pageId) != null) {
            if (req.body.description){
                set.pages.id(req.params.pageId).description = req.body.description;
            }
            set.save()
            .then((set) => {
                Sets.findById(set._id)
                .then((set) => {
                    res.Status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(set);
                })
            }, (err) => next(err));
        }
        else if (set == null) {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Page  ' + req.params.pageId + " not exist");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.cors, (req,res,next) => {
    Sets.findById(req.params.setId)
    .then((set) => {
        if (set != null && set.pages.id(req.params.pageId) != null) {
            set.pages.id(req.params.pageId).remove();
            set.save()
            .then((set) => {
                Sets.findById(set._id)
                .then((set) => {
                    res.Status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(set);
                })
            }, (err) => next(err));
        }
        else if (set == null) {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

setRouter.route('/:setId/pages/:pageId/notes')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors,(req,res,next) => {
    Sets.findById(req.params.setId)
    .then((set) => {
        if (set != null && set.pages.id(req.params.pageId) != null) {
            res.Status = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(set.pages.id(req.params.pageId).notes);
        }
        else if (set == null) {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Page ' + req.params.pageId + " not exist");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));   
})
.post(cors.cors, (req,res,next) => {
    Sets.findById(req.params.setId)
    .then((set) => {
        if (set != null && set.pages.id(req.params.pageId) != null) {
            set.pages.id(req.params.pageId).notes.push(req.body);
            set.save()
            .then((set) => {
                Sets.findById(set._id)
                    .then((set) => {
                        res.Status = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(set.pages.id(req.params.pageId));
                    })
                }, (err) => next(err));
        }
        else if (set == null) {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Page ' + req.params.pageId + " not exist");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err)); 
})
.put(cors.cors, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Sets/' + 
    req.params.setId + '/pages' + req.params.pageId + '/notes');
})
.delete(cors.cors, (req,res,next) => {
    Sets.findById(req.params.setId)
    .then((set) => {
        if (set != null && set.pages.id(req.params.pageId) != null) {
            for (var i = (set.pages.id(req.params.pageId).notes.length - 1); i >= 0; i--) {
            set.pages.id(req.params.pageId).notes.id(set.pages.id(req.params.pageId).notes[0]._id).remove()
            }
            set.save()
            .then((set) => {
                Sets.findById(set._id)
                .then((set) => {
                    res.Status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(set.pages.id(req.params.pageId));
                })
            }, (err) => next(err));
        }
        else if (set == null) {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Page ' + req.params.pageId + " not exist");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

setRouter.route('/:setId/pages/:pageId/notes/:noteId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors,(req,res,next) => {
    Sets.findById(req.params.setId)
    .then((set) => {
        if (set != null && set.pages.id(req.params.pageId) != null) {
            res.Status = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(set.pages.id(req.params.pageId).notes.id(req.params.noteId));
        }
        else if (set == null) {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Page ' + req.params.pageId + " not exist");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));   
})
.put(cors.cors, (req,res,next) => {
    Sets.findById(req.params.setId)
    .then((set) => {
        if (set != null && set.pages.id(req.params.pageId) != null) {
            if (req.body.word){
                set.pages.id(req.params.pageId).notes.id(req.params.noteId).word = req.body.word;
            }
            if (req.body.meaning){
                set.pages.id(req.params.pageId).notes.id(req.params.noteId).meaning= req.body.meaning;
            }
            if (req.body.comment){
                set.pages.id(req.params.pageId).notes.id(req.params.noteId).comment= req.body.comment;
            }
            set.save()
            .then((set) => {
                Sets.findById(set._id)
                    .then((set) => {
                        res.Status = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(set.pages.id(req.params.pageId).notes.id(req.params.noteId));
                    })
                }, (err) => next(err));
        }
        else if (set == null) {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Page ' + req.params.pageId + " not exist");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err)); 
})
.post(cors.cors, (req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Sets/' + 
    req.params.setId + '/pages/' + req.params.pageId + '/notes/' + req.params.noteId);
})
.delete(cors.cors, (req,res,next) => {
    Sets.findById(req.params.setId)
    .then((set) => {
        if (set != null && set.pages.id(req.params.pageId) != null) {
            set.pages.id(req.params.pageId).notes.id(req.params.noteId).remove();
            set.save()
            .then((set) => {
                Sets.findById(set._id)
                .then((set) => {
                    res.Status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(set.pages.id(req.params.pageId));
                })
            }, (err) => next(err));
        }
        else if (set == null) {
            err = new Error('Set ' + req.params.setId + " not exist");
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Page ' + req.params.pageId + " not exist");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = setRouter;
