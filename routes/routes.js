var express = require('express');
var fs = require('fs');
const path = require('path');
var bodyParser = require('body-parser');

var homeController = require('../controllers/home');
var aboutController = require('../controllers/about');
var autofill = require('../modules/AutoFill');
var control = require('../modules/ControlsData');

var router = express();
var xlsxj = require("xlsx-to-json");

var mkdirp = require('mkdirp');
var fs = require('fs');
var getDirName = require('path').dirname;
var http = require('http');
var request = require('request');

router.use(bodyParser.urlencoded({extended:false}));
//router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, "public")));

router.get('/', homeController.index);
router.get('/about', aboutController.index);

function writeFile(path, contents, cb) {
    mkdirp(getDirName(path), function (err) {
      if (err) return cb(err);
  
      fs.writeFile(path, contents, cb);
    });
  }

router.post('/filldata', function( req, res, next){
    //console.log(req.body.data.site);
    var arControls = req.body.data.Controls;
    var arValues = req.body.data.Data; 
    var site = req.body.data.site;
    //console.log((arControls[0]));
    //console.log(req.body.data.Data);
    var iValues=[];
    var iControls=[];
    var iConType=[];
    //arValues.length;
    for(var i=0; i<arControls.length; i++){
        //console.log(i);
        iControls[i]=arControls[i].IDControls;        
    } 
    for(var i=0; i<arControls.length; i++){
        //console.log(i);
        iConType[i]=arControls[i].Controls;        
    }  
    for(var i=0; i<arValues.length; i++){
        //console.log(i);
        iValues[i]=arValues[i];
        autofill.initMyFunction(site, iControls, iConType,iValues[i]);
    }   
});

router.post('/upfile', function( req, res, next){
    console.log(req.body.filename);
    res.end('<script> $(function () {alert($(\'input[type=file]\').val());} </script>')  ;
});

router.post('/savegrids', function(req, res, next){
    var arControls = req.body;
    //console.log(JSON.stringify(arControls.Controls)); 
    //writeFileAsync(JSON.stringify(arControls.Controls));
    var currdatetime = new Date();
    var df = require('date-format');     
   
    var fileName = "gridJson_" + df('yyyyMMddhhmmss', new Date()) + ".txt";

    let absPath = path.join(__dirname, '/', fileName);
    let relPath = path.join('./', fileName); // path relative to server root

    console.log(absPath)
    console.log(relPath)
    fs.writeFile(absPath, JSON.stringify(arControls.Controls), (err) => {
        if (err) {
        console.log(err);
        }
        res.download(absPath, (err) => {
        if (err) {
            console.log(err);
        }
        fs.unlink(absPath, (err) => {
            if (err) {
            console.log(err);
            }
            console.log('FILE [' + fileName + '] REMOVED!');
        });
        });
    });
   /*  writeFile(__dirname + "/" + fileName, JSON.stringify(arControls.Controls), function (err) {
        if (err) throw err;
          console.log('File Saved');
        });
    
        var pathFile="/";
        console.log(path.join(__dirname, "/gridJson_20180124145535.txt"));
        res.sendFile(path.join(__dirname, "/gridJson_20180124145535.txt"));
    res.download(path.join(__dirname, "/gridJson_20180124144643.txt"));
    //download("http://localhost:8080/",pathFile,""); */
    res.send('ok');
});
router.get('/getFile', function(req, res, next){
            console.log(path.join(__dirname, "/gridJson_20180124145535.txt"));
        //res.sendFile("http://localhost:8080/routes/gridJson_20180124145535.txt");
        var file = __dirname + '/gridJson_20180124145535.txt"';
        res.download(file);
    res.send('ok');
});
/* var download = function(url, dest, cb) {
    console.log(dest);
   
    var file = fs.createWriteStream(dest);
    var sendReq = request.get(url);
    
    // verify response code
    sendReq.on('response', function(response) {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }
    });
    console.log("vao day roi");
    // check for request errors
    sendReq.on('error', function (err) {
        fs.unlink(dest);
        console.log("xxx");
    });
    
    sendReq.pipe(file);
    console.log("datoi day");
    file.on('finish', function() {
        file.close(cb);  // close() is async, call cb after close completes.
    });

    /* file.on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        return cb(err.message);
    }); 
}; */



/* 
function writeFileSync() {
  var fileContent = fs.writeFileSync(filename, data);
  return fileContent;
};

function writeFileAsync(text) {
   fs.writeFile('message.txt', text, function (err) {
   if (err) throw err;
     console.log('File Saved');
   });
}; */

module.exports = router;