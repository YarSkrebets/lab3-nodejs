var https = require("https");
var express = require('express');
var router = express.Router();

var key = "d31eb6bba95554da0867103074d5bb27";

router.get('/coordinates', function(req, res) {
    var lat = req.query.lat;
    var lon = req.query.lon;

    https.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + key + "&units=metric", (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        resp.on('end', () => {
            
          res.send(JSON.parse(data));  
        });
    });
});

router.get('/city', function(req, res) {
    var city = req.query.q;
    city = encodeURIComponent(city);
    console.log(city);
    https.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key + "&units=metric", (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        resp.on('end', () => {
            
          res.send(JSON.parse(data));  
        });
    });
});

module.exports = router;
