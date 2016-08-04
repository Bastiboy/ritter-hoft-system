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
        $('#restaurant_' + tableNb).css({"background" : "#FFB300"});
        // On met remet en normal
        setTimeout(function(){
            $('#restaurant_' + tableNb).css({"background" : "#03B0E9"});
        }, 500)
    }
});
