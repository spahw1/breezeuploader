var request = require('request');
var config = require('config');


module.exports = function(email,password) {
	
	var request = config.get('ws.baseurl') + config.get('ws.userLoginEndpoint') + "?email=" + email + "&password=" + password;
	return request;
 };
