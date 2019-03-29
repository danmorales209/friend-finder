var path = require('path');

var friends = require('./../data/friends');

module.exports = function (app) {

    app.get("/api/get/match", function (req, res) {
        res.status(200).json(friends.match).end();
    });

    app.get("/api/get/match/:user", function (req, res) {

        let userIndex = friends.users.findIndex(friend => friend.name === req.params.user);

        res.status(200).json({
            you: friends.users[userIndex],
            pair: friends.users[friends.users[userIndex].matchIndex],
            score: friends.users[userIndex].matchScore
        }).end();
    })

    app.get("/api/get/users", function (req, res) {
        res.status(200).json(friends.users.map(x => x.name)).end();
    });

    app.put("/api/put/:user", function (req, res) {
        let userName = req.params.user;
        let index = friends.users.findIndex(x => x.name === userName);

        friends.updateSurvey(req.body)
        friends.updateMatch(friends.users[index], index);
        res.status(200).end();
    })

    app.post("/api/post", function (req, res) {
        let newUser = req.body;

        friends.findMatch(newUser);
        
        res.status(200).end();

    });

};