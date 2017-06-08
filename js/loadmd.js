$(document).ready(function() {
    $().maps();

    // $.get("markdown/m1.md", function(result){
    //     console.log(result);
    //     $("#md").html(result);
    //     $.getScript("http://strapdownjs.com/v/0.2/strapdown.js");
    // });

});

function getMardown(file) {
    $.get("markdown/"+file+".md", function(result){
        $("#content").remove();
        var xmp = $("<xmp id=\"md\" theme=\"united\" style=\"display:none;\"></xmp>");
        $("body").append(xmp);
        $("#md").html(result);
        $.getScript("js/strapdown.js");
    });
}