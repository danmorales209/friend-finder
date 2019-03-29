/* ROUTES TO SERVER HTML */
// get pathnames to serve up HTML files
var path = require("path");

module.exports = function (app) {
    
    // Homepage html page
    app.get("/", function (req, res) {
        res.status(200).sendFile(path.join(__dirname, "./../public/home.html"), function (error) {
            if (error) throw error;

            console.log('home file sent');
        });
    });

    // Survey html page
    app.get("/survey", function (req, res) {
        res.status(200).sendFile(path.join(__dirname, "./../public/survey.html"), function (error) {
            if (error) throw error;

            console.log('Survey file sent');
        });
    });

};