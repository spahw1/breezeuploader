var request = require('request');
var async = require('async');

module.exports = function(info) {
  async.parallel([
    /*
     * First external endpoint
     */
    function(callback) {
      var url = "http://localhost:8080/user?name=Amol";
      request(url, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); callback(true); return; }
        obj = JSON.parse(body);
        callback(false, obj);
      });
    },
    /*
     * Second external endpoint
     */
    function(callback) {
      var url = "http://localhost:8080/user?name=Raghav";
      request(url, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); callback(true); return; }
        obj = JSON.parse(body);
        callback(false, obj);
      });
    },
  ],
  /*
   * Collate results
   */
  function(err, results) {
    if(err) { console.log(err); res.send(500,"Server Error"); return; }
  }
  );
};