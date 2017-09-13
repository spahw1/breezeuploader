var express = require('express');
var async = require('async');
var request = require('request');
var router = express.Router();



router.get('/', function(req, res, next) {
	// var asyncTasks = [];
  
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
/*console.log(req.query);
if(req.query eq'{ rdr: 'uploadToken' }' ){
  console.log('hi');
}*/
    res.render('breezeupload');
}
);

module.exports = router;