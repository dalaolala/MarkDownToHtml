$(document).ready(function() {
    $().maps();
    getMardown('home');
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