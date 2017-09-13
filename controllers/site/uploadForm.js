var express = require('express');
var async = require('async');
var request = require('request');
var router = express.Router();
var async = require('async');
var bodyParser = require("body-parser");


router.post('/', function(req, res, next) {
	 var asyncTasks = [];

	var company_name1=req.query['company_name'];
	var upload_token1=req.query['upload_token'];
  	var file_limit1=req.query['file_limit'];
  	var file_exts1=req.query['file_exts'];
  	//var filename1=req.files['filename'];

console.log('req.body.upload_token-------'+req.body.upload_token);
console.log('req.files------'+req.files);

asyncTasks.push(function(callback) {
    
											
    request.post({
url:'https://s7ugc3.scene7.com/ugc/image',
form:{
	op:'upload',
	company_name:company_name1,
	upload_token:upload_token1,
	file_limit:file_limit1,
	file_exts:file_exts1,
	preserve_colorprofile:'yes',
	preserve_filename:'Yes',
	use_corner:'ul',
	knockout_background:'false',
	fill_method:'ff'
}
    }, function(err, response, body) {
    // JSON body
    if(err) { console.log(err); callback(true); return; }
    console.log(body); 
    obj = body;

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
        res.send('uploadForm',results);
  }
  );
}
);
module.exports = router;