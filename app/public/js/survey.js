$(document).ready(function () {

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

    $(".form-control-range").each(function () {
        $(this).val(3).trigger("change");
    });

    $("#user-name").on("click", function () {
        $(".initial-hidden:first").css({
            "display": "inherit"
        }).animate({
            opacity: 1
        }, 500);
    });

    $(".initial-hidden").on("mouseover", function () {
        $(this).next().css({
            "display": "inherit"
        });
        $(this).next().animate({
            opacity: 1
        }, 500);

    });

    $("#submit").on("click", function (event) {
        event.preventDefault();

        let userResponse = {
            name: $("#user-name").val().trim(),
            imgURL: "http://lorempixel.com/300/300/people/",
            survey: [],
            matchIndex: -1,
            matchScore: 0
        };

        $(".form-control-range").each(function () {
            userResponse.survey.push(Number($(this).val()));
        });

        $.get("/api/get/users").then(function (response) {
            let users = response;
            let knownUserIndex = users.findIndex(user => user === userResponse.name);

            if (knownUserIndex > 0) {
                $.ajax({
                    url: "/api/put/" + userResponse.name,
                    method: "PUT",
                    data: userResponse,
                    dataType: "text"

                }).done(function () {
                    console.log("PUT occurred");
                }).then(function () {
                    $.get("/api/get/match/" + userResponse.name).then(function (response) {
                        console.log(response);
                        $("#your-name").text(response.you.name);
                        $("#your-img").attr("src", response.you.imgURL);
                        $("#match-name").text(response.pair.name);
                        $("#match-img").attr("src", response.pair.imgURL);
                    });
                });
            } else {

                $.post("/api/post", userResponse, function (error) {

                    if (error) console.log(error);

                }).then(function () {
                    let name = $("#user-name").val().trim();

                    $.get("/api/get/match/" + name).then(function (response) {
                        console.log(response);
                        $("#your-name").text(response.you.name);
                        $("#your-img").attr("src", response.you.imgURL);
                        $("#match-name").text(response.pair.name);
                        $("#match-img").attr("src", response.pair.imgURL);
                    });
                });
            }
        })


    });


});