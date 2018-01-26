var express = require('express');
var router = express.Router();

var clientsData = require('../db/controlsdb.json');
var Datastore = require('nedb');
var db = new Datastore();
db.insert(clientsData);

var getClientFilter = function(query) {
    var result = {
        IDControls: new RegExp(query.IDControls)
        //Controls: new RegExp(query.Controls)
    };
    if(query.Controls && query.Controls !== '0') {
        result.Controls = parseInt(query.Controls, 10);
    }
    return result;
};

var prepareItem = function(source) {
    var result = source;
    result.Controls = parseInt(source.Controls, 10);
    return result;
};

router.get('/', function(req, res, next) {
    db.find(getClientFilter(req.query), function(err, items) {
        res.json(items);
    });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    db.insert(prepareItem(req.body), function(err, item) {
        res.json(item);
    });
});

router.put('/', function(req, res, next) {
    var item = prepareItem(req.body);

    db.update({ _id: item._id }, item, {}, function(err) {
        res.json(item);
    });
});

router.delete('/', function(req, res, next) {
    var item = prepareItem(req.body);

    db.remove({ _id: item._id }, {}, function(err) {
        res.json(item);
    });
});
module.exports = router;