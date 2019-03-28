var path = require('path');

var friends = require('./../data/friends');
var helper = require('./../data/helpers');

module.exports = function (app) {

    app.get("/api/get/match", function (req, res){
        res.status(200).json(friends.match).end();
    })
    
    app.post("/api/post", function (req, res) {
        
        let difference = new Array(friends.users.length);
        let newUser = req.body;
        let matchIndex = 0;


        for (let i = 0; i < difference.length; i++) {
            difference[i] = newUser.survey
                .reduce(function(acc, cur, ind) {
                    acc = Math.abs(cur - friends.users[i].survey[ind]);
                    return acc;
                },0);

                
                if (i == 0) {
                    continue;
                }
                if (difference)
                if (difference[i-1] < difference[i] ) {
                    matchIndex = i-1;
                }
                console.log(i, difference[i], matchIndex)
        }

        friends.users.push(newUser);
        friends.match = {
            you: newUser,
            pair: friends.users[matchIndex],
            score: helper.calculatePercentMatch(difference[matchIndex])
        }

        res.status(200).end();

    });

};