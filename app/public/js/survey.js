/*survey.html Logic*/

// run after page load has completed
$(document).ready(function () {

    // Add event listener to the slider. Updates the display according the the slider value
    $(".form-control-range").on("change", function () {
        let input = Number($(this).val());
        let response = "";

        switch (input) {
            case 1:
                response = "Strongly Disagree"
                break;

            case 2:
                response = "Somewhat Disagree"
                break;

            case 3:
                response = "Neither Agree or Disagree"
                break;

            case 4:
                response = "Somewhat Agree"
                break;

            case 5:
                response = "Strongly Agree"
                break;
        }

        $(this).parent().children(".value-display").text(response);
    });

    // On page load set the initial value of the <input range> to 3, and trigger the event listener to update the displays
    $(".form-control-range").each(function () {
        $(this).val(3).trigger("change");
    });

    // Listener for user name form input to display first slider question    
    $("#user-name").on("click", function () {
        $(".initial-hidden:first").css({
            "display": "inherit"
        }).animate({
            opacity: 1
        }, 500);
    });

    // All .initial-hidden elements will display the next element on mouseover
    $(".initial-hidden").on("mouseover", function () {
        $(this).next().css({
            "display": "inherit"
        });
        $(this).next().animate({
            opacity: 1
        }, 500);

    });

    // Submit button listener
    $("#submit").on("click", function (event) {
        event.preventDefault();

        // Initialize new user object
        let userResponse = {
            name: $("#user-name").val().trim(),
            imgURL: "http://lorempixel.com/300/300/people/", // randomly generated "people" picture
            survey: [],
            matchIndex: -1,
            matchScore: 0
        };

        // Push the form range values to userResponse.survey array
        $(".form-control-range").each(function () {
            userResponse.survey.push(Number($(this).val()));
        });

        // Check for existing users
        $.get("/api/get/users").then(function (response) {
            let users = response;
            let knownUserIndex = users.findIndex(user => user === userResponse.name);

            if (knownUserIndex >= 0) { // Username matches an existing user
                // PUT to update relevant user information from server
                $.ajax({
                    url: "/api/put/" + userResponse.name,
                    method: "PUT",
                    data: userResponse,
                    dataType: "text"

                // Call printmatch to display the match information from the server 
                }).then(printMatch);

            } else { // New user

                //POST to add new user to server data
                $.post("/api/post", userResponse, function (error) {

                    if (error) console.log(error);

                // Call printmatch to display the match information from the server 
                }).then(printMatch);
            }
        })
    });
});

// printMatch get the macth info from the server, and update the id's listed in the modal popup when
// the submit results button is pressed
var printMatch = function () {
    let name = $("#user-name").val().trim();

    $.get("/api/get/match/" + name).then(function (response) {
        // Update modal infor
        $("#your-name").text(response.you.name);
        $("#your-img").attr("src", response.you.imgURL);
        $("#match-name").text(response.pair.name);
        $("#match-img").attr("src", response.pair.imgURL);
        $("#match-score").text(response.score + "%");

        // Set survey to intial state
        $("#user-name").val("");
        $(".initial-hidden").animate({
            opacity: 0
        }, 500).css({
            display: "none"
        });
        $(".form-control-range").each(function () {
            $(this).val(3).trigger("change");
        });
    });
}