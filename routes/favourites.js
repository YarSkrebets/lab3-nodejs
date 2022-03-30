var mysql = require('mysql2');
var express = require('express');
var router = express.Router();


router.get("/favourites", function(req, res) {
    res.send("[]");

    // res.send(JSON.stringify(favourites));
});

router.post("/favourites", function(req, res) {
    res.send("true");
});
router.delete("/favourites", function(req, res) {
    res.send("true");
});

module.exports = router;
