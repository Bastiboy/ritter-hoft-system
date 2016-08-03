$(document).ready(function(){
    food_quantity = ["3", "1", "1", "2", "2"];
    food_content = ["Carpacio", "Hamburger", "Eau", "Fantas", "Bières"];

    $('.dash_button').click(function(){

        var tableNb = $(this).text()

        socket.emit('food_data_ask', tableNb);

        dashboard_popup =  "<div class=\"dash_popup\">";
        dashboard_popup += "    <div class=\"dash_popup_header\">";
        dashboard_popup +=          "<div class=\"dash_pop_title\">";
        dashboard_popup +=              "<p>Table " + tableNb; + "</p>";
        dashboard_popup +=              "<p class=\"dash_popup_close\"><a href=\"#\">⨉</a></p>";
        dashboard_popup +=          "</div>";
        dashboard_popup += "    </div>";
        dashboard_popup += "    <div class=\"content\">";
        dashboard_popup +=      "<table class=\"pop_food_table\">";
        dashboard_popup +=      "</table>"
        dashboard_popup += "    </div>";
        dashboard_popup += "</div>";

        $('body').prepend(dashboard_popup);
        $('body').append("<div class=\"popup-mask\"></div>")
    });

    // Si on clique sur la croix, on ferme la popup
    $(document).on('click', '.dash_popup_close', function(){
        $(".dash_popup").remove();
        $(".popup-mask").remove();
    });
    // Si on clique sur l'exterieur de la popup alors on ferme aussi l'application.
    $(document).on('click', '.popup-mask', function(){
        $(".dash_popup").remove();
        $(".popup-mask").remove();
    });

    // Quand on get les datas, on les affiche !
    socket.on('food_data', function (data) {
        console.log(data)
        var htmlData = "";
        for(var i = 0; i < data.content.length; i++){
            htmlData += "<tr class=\"food_column ";
            if (data.isTyped[i] == true) {
                htmlData += "food_isTyped"
            }
            htmlData +=                             "\">";
            htmlData +=     "<td class=\"food_quantity\">"+ data.quantity[i] +"</td>";
            htmlData +=     "<td class=\"food_content\">"+ data.content[i] +"</td>";
            htmlData +=     "<td class=\"food_typed\"><span class=\"glyphicon glyphicon-ok\"></span></td>";
            htmlData += "</tr>";

        }
       $('.pop_food_table').html(htmlData);
   });
});
