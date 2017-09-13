var express = require('express');
var async = require('async');
var request = require('request');
var bodyParser = require("body-parser");
var restAPI =  require('../restAPI');
var router = express.Router();
var productDisplay = require('../productmodule/productDisplay')
var contentModule = require('../contentmodule')

//router.use(bodyParser.urlencoded({ extended: false }));

//router.use(express.bodyParser());

router.get('/', function(req, res, next) {
	var productId = req.query.productId;
	var asyncTasks = [];
	asyncTasks.push(function(callback) {
	    var url = productDisplay(productId);
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

		console.log("Error code: " + results[0].errorCode);
	    if (results[0].errorCode != undefined) {
			res.render('index',results);	
		}else{
			res.render('productDisplay',results);
		};
		
	    //res.render('customer_account',results);
	    //res.render('customer_orders', { title: 'Express' });
	});
});


module.exports = router;