$(document).ready(function(){

    socket.on('restaurant_data', function (restaurant_data) {
        restaurant_data = restaurant_data.split(':');
        tableNb = restaurant_data[0];
        nbFood = restaurant_data[1];
        food = restaurant_data[2];
        animate_table(tableNb);
    });

    function animate_table(tableNb){
        // On met en rouge et on anime
        $('#restaurant_' + tableNb).css({"borderColor" : "#12C200", color : "#12C200"});
        $('#restaurant_' + tableNb).animate({borderWidth : "4px", borderRadius : "10px"}, 100, function(){
            // On met remet en normal
            $(this).animate({borderWidth : "1px", borderRadius : "5px"}, 100, function(){
                $(this).css({borderColor : "#11A0E5", color : "#11A0E5"});
            });
        });
    }
});
