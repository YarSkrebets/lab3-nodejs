var mysql = require('mysql2');
var express = require('express');
var router = express.Router();

var connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "test",
});

router.get("/favourites", function(req, res) {
    connection.query("select city from favourites order by favourites.id asc;", function(err, results, fields) {
        var array = [];
        for (var i = 0; i < results.length; i++) {
            array.push(results[i].city);
        }
        res.send(JSON.stringify(array));
    });

    // res.send(JSON.stringify(favourites));
});

router.post("/favourites", function(req, res) {
    var body = decodeURIComponent(req.body.toString());

    connection.execute("insert into favourites(city) values (?);",
    [body],
    function(err, results, fields) {
        console.log(JSON.stringify(err));
        if ((err !== null)) {
            res.send("false");
        } else {
            res.send("true");
        }
    });
});
router.delete("/favourites", function(req, res) {
    var value = decodeURIComponent(req.body);
    
    connection.execute("delete from favourites where city=?;",
    [value],
    function(err, results, fields) {
        if (err !== null) {
            res.send("false");
        } else {
            res.send("true");
        }
    })
});

module.exports = router;
