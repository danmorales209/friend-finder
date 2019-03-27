var path = require('path');

var friends = require('./../data/friends');

var percentMatch = function(input) {
    
}


module.exports = function (app) {
    app.post("/api/post", function (req, res) {
        console.log(__filename + " called the post function");
        let difference = new Array(friends.length);
        let newUser = req.body;
        let match = 0;


        for (let i = 0; i < difference.length; i++) {
            difference[i] = newUser.survey
                .reduce(function(acc, cur, ind) {
                    acc = Math.abs(cur - friends[i].survey[ind]);
                    return acc;
                },0);

                if (i == 0) {
                    continue;
                }
                if (difference[i-1] < difference[i] ) {
                    match = i-1;
                }

                console.log(i, difference[i], match)
        }

        console.log(difference, match);

        res.status(200).json({
            name: friends[match].name,
            img: friends[match].imgURL,

        })



    });

};