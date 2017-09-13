var request = require('request');
var config = require('config');


module.exports = function(firstName,email,password) {
	
	var request = config.get('ws.baseurl') + config.get('ws.registerUserEndpoint') + "?firstName=" + firstName + "&email=" + email + "&password=" + password;
	return request;
 };
