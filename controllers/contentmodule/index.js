var request = require('request');
var config = require('config');


module.exports = function(contentID) {
	
	var request = config.get('ws.baseurl') + config.get('ws.contentEndpoint') + "?contentID=" +contentID; 
	return request;
 };