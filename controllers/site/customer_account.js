var express = require('express');
var async = require('async');
var request = require('request');
var bodyParser = require("body-parser");
var restAPI =  require('../restAPI');
var router = express.Router();
var userRegister = require('../usermodule/userRegister')
var contentModule = require('../contentmodule')

//router.use(bodyParser.urlencoded({ extended: false }));

//router.use(express.bodyParser());

router.post('/', function(req, res, next) {
	var user_name=req.body.firstName;
	var password=req.body.password;
  	var email=req.body.email;
	var asyncTasks = [];
	asyncTasks.push(function(callback) {
	    var url = userRegister(user_name, email, password);
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

	console.log("just before the one hit");
  	async.parallel(asyncTasks, 
	/*
	 * Collate results
	 */
	function(err, results) {
		if(err) { console.log(err); res.send(500,"Server Error"); return; }

	    if (results[0].errorCode != undefined) {
			res.render('register',results);	
		}else{
			res.render('customer_account',results);
		};
		
	    //res.render('customer_account',results);
	    //res.render('customer_orders', { title: 'Express' });
	});
});


module.exports = router;