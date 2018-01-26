'use strict';
var Nightmare = require('nightmare');

var express = require('express');
var app     = express();

var AutoFill = function(link, arrControls, arrControlType, arrValues){
  var nightmare = new Nightmare({show:true})
  nightmare
  /* .withFrame('formIframe', function (nightmare) {
    nightmare
      //.goto(link)
      .wait(3000)
      .wait('form#login')
      .type('#username', 'rclai')
      .type('#password', 'password')
      .click('#submit')
  }) */
  .goto(link)
  .wait(3000)
  for (var i = 0; i < arrControls.length; i++) {
    console.log(arrControls[i]);
    console.log(arrValues[i]);
    if (arrControlType[i]==1){
      nightmare
      //.goto(link)
      .wait(5000)
      .insert('[' + arrControls[i] + ']', arrValues[i])
    }      
    else if (arrControlType[i]==2){
      nightmare
      //.goto(link)
      .wait(5000)
      .click(arrControls[i])//'.quantumWizTogglePaperradioEl[aria-label="OK!"]')
    }
    else if (arrControlType[i]==3){
        nightmare
        //.goto(link)
        .wait(5000)
        .click(arrControls[i])//'.quantumWizTogglePaperradioEl[aria-label="OK!"]')
        .wait(10000)
    };    
  };
  nightmare 
 
    
   /*  .wait(10000)
    .click('form[action*="/https://docs.google.com/forms/d/e/1FAIpQLSfuDI_BwXT07uzhlqWUthY5OwEKqdESS3J9X4Z5bqozMx-qaA/formResponse] div[class*="/quantumWizTogglePaperradioEl docssharedWizToggleLabeledControl freebirdThemedRadio freebirdThemedRadioDarkerDisabled freebirdFormviewerViewItemsRadioControl isCheckedNext"]')
 */ .wait(10000)
    .evaluate(function () {
      return document.body.innerHTML.href;
      //return $('#url').text();
    })
    //.end()
    .then(function (result) {
      return "ketqua";
    })
    .catch(function (error) {
      //console.error('Search failed:', error);
      return "loi roi";
    });
  nightmare.end();
};

exports.initMyFunction = function(site, Controls, ControlType, Values){
  var arrValues = [];
  var arrControls =[];
  var arrControlType =[];
  for(var x in Controls){
    arrControls.push(Controls[x]);
  }
  for(var x in ControlType){
    arrControlType.push(ControlType[x]);
  }
  for(var y in Values){
    arrValues.push(Values[y]);
  }

  AutoFill(site, arrControls, arrControlType, arrValues);
  return 'OK';
};

