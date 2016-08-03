$(document).ready(function(){

    $('.main-button').mouseover(function(){
        $('.reset-button').css({"visibility" : "visible"});
        $('.main-button').css({"background" : "#FF8F7B", "color" : "#ffffff"});
    });

    $('.settings').mouseleave(function(){
        $('.reset-button').css({"visibility" : "hidden"});
        $('.main-button').css({"background" : "#ffffff", "color" : "#000000"});
    });
    
});
