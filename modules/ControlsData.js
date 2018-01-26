var express = require('express');
var fs = require('fs');
var app= express();
var qs = require('querystring');


//app.use(bodyParser.json());

exports.saveGrids = function(req, res, next){
    //var datax = req.body;
    //alert("ád")

    var body = '';   
    var post; 
    req.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            req.connection.destroy();
    });
    req.on('end', function () {
        post = qs.parse(body);
        // use post['blah'], etc.
    });
    return post;
};