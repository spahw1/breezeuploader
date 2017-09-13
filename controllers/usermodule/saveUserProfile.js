var request = require('request');
var config = require('config');


module.exports = function(email,password,firstName,lastName,company,street,zip,state,country,telephone) {
	
	var request = config.get('ws.baseurl') + config.get('ws.saveUserProfileEndpoint') + "?email=" + email + "&password=" + password + "&firstName=" + firstName + "&lastName=" + lastName + "&company" + company + "&street" + street + "&zip" + zip + "&state" + state + "&country" + country + "&telephone" + telephone;
	return request;
 };
