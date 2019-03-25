var express = require("../../node_modules/express");

var router = express.Router();

router.get("/l", function (req, res) {
    console.log(__filename + " called the get function");
    res.end("Hello!");
});

module.exports = router;