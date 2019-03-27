$(document).ready(function () {

    $(".form-control-range").on("change", function () {
        let input = Number($(this).val());
        let response = "";

        switch (input) {
            case 1:
            response = "Strongly Agree"
            break;

            case 2:
            response = "Somewhat Agree"
            break;

            case 3:
            response = "Neither Agree or Disagree"
            break;

            case 4:
            response = "Somewhat Disagree"
            break;

            case 5:
            response = "Strongly Disagree"
            break;
        }

        $(this).parent().children(".value-display").text(response);
        
    });

    $(".form-control-range").each(function() {
        $(this).val(3).trigger("change");
    });

    $("#user-name").on("blur", function() {
        $(".initial-hidden:first").css({"display":"inherit"});
    });

    $(".initial-hidden").on("mouseleave", function() {
        $(this).next().css({"display":"inherit"});
        console.log("BLUR");
    });

});