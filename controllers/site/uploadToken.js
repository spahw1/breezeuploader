var express = require('express');
var async = require('async');
var request = require('request');
var router = express.Router();
var async = require('async');


router.get('/', function(req, res, next) {
	 var asyncTasks = [];
  
 //  asyncTasks.push(function(callback) {
 //    var url = contentModule('header');
 //    request(url, function(err, response, body) {
 //    // JSON body
 //    if(err) { console.log(err); callback(true); return; }
 //    obj = JSON.parse(body);
 //    callback(false,obj);
 //    });
    
 //  });

 //  asyncTasks.push(function(callback) {
 //    var url = contentModule('topnav');
 //    request(url, function(err, response, body) {
 //    // JSON body
 //    if(err) { console.log(err); callback(true); return; }
 //    obj = JSON.parse(body);
 //    callback(false,obj);
 //    });
 //  });

 //  async.parallel(asyncTasks, 
 //  /*
 //   * Collate results
 //   */
 //  function(err, results) {
 //    if(err) { console.log(err); return; }
 //        res.render('breezeupload',results);
 //  }
 //  );

/* asyncTasks.push(function(callback) {
 var url = 'https://s7ugc3.scene7.com/ugc/image?op=get_uploadtoken&shared_secret=ddc6c5c8-18f1-42ff-a311-0a32f819d446';
    request(url, function(err, response, body) {
     // JSON body
     if(err) { console.log(err); callback(true); return; }
     obj = JSON.parse(body);
     callback(false,obj);
     console.log(obj);
     });
  });

res.send('You sent the name "' + req.query.name + '".');*/
// var token;
// request('https://s7ugc3.scene7.com/ugc/image?op=get_uploadtoken&shared_secret=ddc6c5c8-18f1-42ff-a311-0a32f819d446', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//     	console.log(body);
//         console.log(body.slice(body.search("<uploadtoken>")+13,body.search("</uploadtoken>"))); 
//         token = body.slice(body.search("<uploadtoken>")+13,body.search("</uploadtoken>"));
//         // Show the HTML for the Modulus homepage.
//     }
// });
// console.log('-------------'+ token);    
//     res.render('uploadToken',token);

// console.log('hello');

asyncTasks.push(function(callback) {
    var url = 'https://s7ugc3.scene7.com/ugc/image?op=get_uploadtoken&shared_secret=ddc6c5c8-18f1-42ff-a311-0a32f819d446';
    request(url, function(err, response, body) {
    // JSON body
    if(err) { console.log(err); callback(true); return; }
    console.log(body.slice(body.search("<uploadtoken>")+13,body.search("</uploadtoken>"))); 
    obj = body.slice(body.search("<uploadtoken>")+13,body.search("</uploadtoken>"));

    callback(false,obj);
    });
  });

  async.parallel(asyncTasks, 
  /*
   * Collate results
   */
  function(err, results) {
    if(err) { console.log(err); return; }
        console.log(results+ '-------------');
        res.render('uploadToken',{
        	result:{
        		token:results[0]
        	}});
  }
  );
}
);

module.exports = router;