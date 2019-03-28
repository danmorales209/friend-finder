module.exports = {
    users: [{
            name: "Jackie",
            imgURL: "./img/brush.jpg",
            survey: [1, 2, 3, 4, 5, 4, 3, 2, 1, 5]
        },
        {
            name: "Ben",
            imgURL: "./img/ben.stock.jpg",
            survey: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
        },
        {
            name: "Shane",
            imgURL: "./img/male-stock-photos-4.jpg",
            survey: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        },
        {
            name: "Kayla",
            imgURL: "./img/corn-lday.jpg",
            survey: [5, 1, 1, 1, 1, 1, 1, 1, 5, 5]
        },
        {
            name: "Carl",
            imgURL: "./img/tmg-article_default_mobile.jpg",
            survey: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
        },
        {
            name: "Tami",
            imgURL: "./img/brush.jpg",
            survey: [2, 4, 2, 4, 2, 4, 2, 4, 2, 4]
        }
    ],
    match: {},

    findMatch: function (newUser) {
        let difference = new Array(this.users.length);
        let matchIndex = 0;
        let users = this.users;


        for (let i = 0; i < difference.length; i++) {
            difference[i] = newUser.survey
                .reduce(function (acc, cur, ind) {
                    acc = Math.abs(cur - users[i].survey[ind]);
                    return acc;
                }, 0);


            if (i == 0) {
                continue;
            }
            if (difference)
                if (difference[i - 1] < difference[i]) {
                    matchIndex = i - 1;
                }
            // console.log(i, difference[i], matchIndex)
        }

        this.match = {
            you: newUser,
            pair: this.users[matchIndex],
            score: this.calculatePercentMatch(difference[matchIndex])
        }

    },

    calculatePercentMatch : function (diffScore) {
        return (1 - (diffScore / 40)) * 100;
    },

    addFriend : function (newUser) {
        this.users.push(newUser);
    }

};