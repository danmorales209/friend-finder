var path = require('path');

var friends = require('./../data/friends');
var helper = require('./../data/helpers');

module.exports = function (app) {

    app.get("/api/get/match", function (req, res){
        res.status(200).json(friends.match).end();
    });

    app.get("/api/get/users", function (req, res) {
        res.status(200).json(friends.users.map(x => x.name)).end();
    });

    app.put("/api/put/:user", function (req, res) {
        
    })
    
    app.post("/api/post", function (req, res) {
        let newUser = req.body;

        friends.findMatch(newUser);
        friends.addFriend(newUser);
        res.status(200).end();

    });

};