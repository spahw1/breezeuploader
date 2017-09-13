var express = require('express');
var async = require('async');
var request = require('request');
var bodyParser = require("body-parser");
var restAPI =  require('../restAPI');
var router = express.Router();
var userLogin = require('../usermodule/userLogin')
var contentModule = require('../contentmodule')

//router.use(bodyParser.urlencoded({ extended: false }));

//router.use(express.bodyParser());

router.post('/', function(req, res, next) {
  	var password=req.body.password;
  	var email=req.body.email;

	var asyncTasks = [];
	asyncTasks.push(function(callback) {
	    var url = userLogin(email, password);
	    request(url, function(err, response, body) {
	    // JSON body
	    if(err) { console.log(err); callback(true); return; }
	    obj = JSON.parse(body);
	    callback(false,obj);
	    });
    });
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
		if(err) { console.log(err); res.send(500,"Server Error"); return; }
	    
	    res.render('customer_orders', results);
	});
});


module.exports = router;