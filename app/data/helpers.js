module.exports = {
    calculatePercentMatch: function (diffScore) {
        return (1 - (diffScore / 40)) * 100;
    }

}