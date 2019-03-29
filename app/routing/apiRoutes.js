/* ROUTES FOR API*/
// Data for application
var friends = require('./../data/friends');

// Routes
module.exports = function (app) {
    
    // GET REQUEST FOR MATCH INFO
    app.get("/api/get/match/:user", function (req, res) {

        // get the user from friends.users matching the requested user (name)
        let userIndex = friends.users.findIndex(friend => friend.name === req.params.user);

        // Send the data to client
        res.status(200).json({
            you: friends.users[userIndex],
            pair: friends.users[friends.users[userIndex].matchIndex],
            score: friends.users[userIndex].matchScore
        }).end();
    })

    // GET REQUEST FOR ALL USERS
    app.get("/api/get/users", function (req, res) {
        // Send an array of friends.users.name
        res.status(200).json(friends.users.map(x => x.name)).end();
    });

    // PUT REQUEST FOR UPDATING EXISTING USER
    app.put("/api/put/:user", function (req, res) {
        let userName = req.params.user;
        
        // Find the user in friends.users
        let index = friends.users.findIndex(x => x.name === userName);

        // update the user survey results
        friends.updateSurvey(req.body)
        // update the match information (matchIndex and matchScore)
        friends.updateMatch(friends.users[index], index);
        //end request
        res.status(200).end();
    })

    // POST REQUEST TO ADD NEW USER
    app.post("/api/post", function (req, res) {
        let newUser = req.body;

        // Find match and add user to the friends.users array
        friends.findMatch(newUser);
        //end request
        res.status(200).end();

    });

};