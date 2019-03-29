/*DATA FOR THE SERVER, as well as some helper functions*/

module.exports = {
    // Data for the survey application
    users: [{
            name: "Jackie",
            imgURL: "./img/brush.jpg",
            survey: [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
            matchIndex: -1,
            matchScore: 0
        },
        {
            name: "Ben",
            imgURL: "./img/ben.stock.jpg",
            survey: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            matchIndex: -1,
            matchScore: 0
        },
        {
            name: "Shane",
            imgURL: "./img/male-stock-photos-4.jpg",
            survey: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            matchIndex: -1,
            matchScore: 0
        },
        {
            name: "Kayla",
            imgURL: "./img/corn-lday.jpg",
            survey: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            matchIndex: -1,
            matchScore: 0
        },
        {
            name: "Carl",
            imgURL: "./img/tmg-article_default_mobile.jpg",
            survey: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            matchIndex: -1,
            matchScore: 0
        },
        {
            name: "Tami",
            imgURL: "./img/female-stock-photos-2.jpg",
            survey: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            matchIndex: -1,
            matchScore: 0
        }
    ],

    // Helper functions //

    /**
     * Function is called as a result of POST (ie New User)
     * Assumes inUSer is passed, which is an object with the following parameters:
     * {
     *  name: user name
     *  survey: array containing the survey results
     *  matchIndex: Index of existing user that most closely matched the survey results (defalut value is -1)
     *  matchScore: Percent match caluclated using this.calculatePercentMatch when the scores are compared (default value is 0)
     * }
     * 
     * This function compares the user survey scores against each existing users scores, and calculates the 
     * absolute difference between each score, and stores the sum of the differences in an element of the array
     * Differences.
     * ----
     * ex:
     *  newUser.survey: [a,b,c]
     *  this.users[i].survey: [A,B,C]
     * 
     *  difference[i] = sum( | a - A ] + | b - B | + | c - C | )
     *      where | x | = absoule value ( x )
     * 
     * ----
     * 
     * A score of zero is the lowest difference, and a score of 40 would be the highest differences based upon the current config
     * 
     * A low score indicates higher combatibility. 
     * 
     * The minimum difference and index of minimum difference are tracked during the loop, and updated when a smaller difference
     *  is found.
     * 
     * After findingthe minimum difference, the inUser object is updated, and added to this.users array of objects
     * 
     * Currently, this will only update the user match with the first instance of the hightest compatability
     * 
     * @param {Object} inUser 
     */
    findMatch: function (inUser) {
        // Setup differences array
        let difference = new Array(this.users.length);
        // Define users here so .reduce can access the user array
        let users = this.users;
        // Instatiate min here
        let min;

        // Build the differences array. Outer loop iterates over users
        for (let i = 0; i < difference.length; i++) {

            // .Reduce inner loop to return the total differences between inUser and users[i]
            difference[i] = inUser.survey
                // acc is the running sum
                // cur is the current value of inUser.survey
                // ind is the current index of inUser.survey
                // acc is set to 0 initially
                .reduce(function (acc, cur, ind) {
                    acc = Math.abs(cur - users[i].survey[ind]);
                    return acc;
                }, 0);

            // difference[i] is calculated at this point
            
            // initially set min and match index and skip, as differences with only have a single element at this point
            if (i == 0) {
                min = difference[i];
                inUser.matchIndex = i;
                continue;
            }

            // second and beyond elements of difference
            if (difference[i] < min) { // new valu of min found
                min = difference[i];
                inUser.matchIndex = i;
            }
        }

        // Calculate the match percent score
        inUser.matchScore = this.calculatePercentMatch(difference[inUser.matchIndex]);

        // Update add inUser to this.users array
        this.addFriend(inUser);
    },

    /**
     * Function is called after a PUT request to the server
     * Accepts inUser object.
     * Assumes inUser is already present in this.users array. Finds the index where inUser.name
     * matches an element of this.users, and updates the survey of this.users[match]
     *  
     * @param {{name: String, survey: Array, matchIndex: int, matchScore: float}} inUser 
     */
    updateSurvey: function (inUser) {
        let userIndex = this.users.findIndex(x => x.name === inUser.name);

        this.users[userIndex].survey = inUser.survey;
    },

    /**
     * Function is called after a PUT request to the server
     * Accpect user object.
     * Assumes that an existing object from this.users has been passed into the function.
     * Implenetations is identical to this.findMatch(), except there user is not added
     * this.users (becasue the user already exists)
     * 
     * @param {{name: String, survey: Array, matchIndex: int, matchScore: float}} user 
     */
    updateMatch: function (user) {
        let difference = new Array(this.users.length);
        let min;
        let users = this.users;

        for (let i = 0; i < difference.length; i++) {


            difference[i] = user.survey
                .reduce(function (acc, cur, ind) {
                    acc = Math.abs(cur - users[i].survey[ind]);
                    return acc;
                }, 0);

            if (i == 0) {
                min = difference[i];
                user.matchIndex = i;
                continue;
            }
            if (difference[i] < min) {
                min = difference[i];
                user.matchIndex = i;
            }
        }

        user.matchScore = this.calculatePercentMatch(difference[user.matchIndex]);

    },

    /**
     * Returns the percent match with user input.
     * a diffScore of 0 indicates 100% match
     * a diffScore of 40 indicates 0% match
     * 
     * @param {Integer} diffScore 
     */
    calculatePercentMatch: function (diffScore) {
        return (1 - (diffScore / 40)) * 100;
    },

    
    /**
     * 
     * Adds the inputted user to this.users object array
     * 
     * @param {{name: String, survey: Array, matchIndex: int, matchScore: float}*} newUser 
     */
    addFriend: function (newUser) {
        this.users.push(newUser);
    }

};