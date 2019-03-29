var express = require('express');

var app = express();

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// path for the server to serve other files associated with the front-end
app.use(express.static("app/public"));

// Routes for requests
require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);

// Start the server listening @ the port
app.listen(PORT, function () {
    console.clear();
    console.log("Listening on port " + PORT);
});