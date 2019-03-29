module.exports = {
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
    match: {},

    findMatch: function (inUser) {
        let difference = new Array(this.users.length);
        let users = this.users;
        let min


        for (let i = 0; i < difference.length; i++) {

            difference[i] = inUser.survey
                .reduce(function (acc, cur, ind) {
                    acc = Math.abs(cur - users[i].survey[ind]);
                    return acc;
                }, 0);

            if (i == 0) {
                min = difference[i];
                inUser.matchIndex = i;
                continue;
            }
            if (difference[i] < min) {
                min = difference[i];
                inUser.matchIndex = i;
            }
        }

        console.log("add diff:", difference);

        inUser.matchScore = this.calculatePercentMatch(difference[inUser.matchIndex]);

        this.addFriend(inUser);
    },

    updateSurvey: function (inUser) {
        let userIndex = this.users.findIndex(x => x.name === inUser.name);

        this.users[userIndex].survey = inUser.survey;
    },

    updateMatch: function (user) {
        let difference = new Array(this.users.length);
        // user.matchIndex = -1;
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

        console.log(user)

        user.matchScore = this.calculatePercentMatch(difference[user.matchIndex]);

    },

    calculatePercentMatch: function (diffScore) {
        return (1 - (diffScore / 40)) * 100;
    },

    addFriend: function (newUser) {
        this.users.push(newUser);
    }

};