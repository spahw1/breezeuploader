var express = require('express');
var async = require('async');
var request = require('request');

var restAPI =  require('../restAPI');
var router = express.Router();
var contentModule = require('../contentmodule')


router.get('/', function(req, res, next) {
	var asyncTasks = [];
  
  asyncTasks.push(function(callback) {
    var url = contentModule('header');
    request(url, function(err, response, body) {
    // JSON body
    if(err) { console.log(err); callback(true); return; }
    obj = JSON.parse(body);
    callback(false,obj);
    });
    
  });

  asyncTasks.push(function(callback) {
    var url = contentModule('topnav');
    request(url, function(err, response, body) {
    // JSON body
    if(err) { console.log(err); callback(true); return; }
    obj = JSON.parse(body);
    callback(false,obj);
    });
  });

  async.parallel(asyncTasks, 
  /*
   * Collate results
   */
  function(err, results) {
    if(err) { console.log(err); return; }
        res.render('about-us',results);
  }
  );
}
);

module.exports = router;