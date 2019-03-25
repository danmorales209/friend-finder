var express = require('express');
var path = require('path');

var app = express();

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var htmlRoutes = require("./app/routing/htmlRoutes");
var apiRoutes = require("./app/routing/apiRoutes");

app.use(htmlRoutes);
app.use(apiRoutes);

app.listen(PORT, function () {
    console.clear();
    console.log("Listening on port " + PORT);

});

