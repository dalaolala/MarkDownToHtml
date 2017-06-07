$(document).ready(function(){
    $.get("markdown/m1.md", function(result){
        console.log(result);
        $("#md").html(result);
        $.getScript("http://strapdownjs.com/v/0.2/strapdown.js");
    });
});