$(document).ready(function(){

    socket.on('restaurant_data', function (restaurant_data) {
        // On gere les données
        restaurant_data = restaurant_data.split(':');
        tableNb = restaurant_data[0];
        quantity = restaurant_data[1];
        content = restaurant_data[2];

        // On affiche des couleurs sur les bouttons
        animate_table(tableNb);

        //On affiche des couleurs sur les pop ups si elle est ouverte
        colorPopUp(tableNb);

        //On ajoute ce qui a été typé depuis l'app en direct
        popUpAdd(tableNb, quantity, content)
    });

    function animate_table(tableNb){
        // On met en rouge et on anime
        $('#restaurant_' + tableNb).css({"background" : "#FFB300"});
        // On met remet en normal
        setTimeout(function(){
            $('#restaurant_' + tableNb).css({"background" : "#03B0E9"});
        }, 500)
    }

    function colorPopUp(tableNb) {
        $('.dash_pop_title').children("p").filter(function(){return $(this).text() === "Table " + tableNb; }).parent().parent().css({"background" : "#FFB300"});
        setTimeout(function(){
            $('.dash_pop_title').children("p").filter(function(){return $(this).text() === "Table " + tableNb; }).parent().parent().css({"background" : "#03B0E9"});
        }, 500)
    }

    function popUpAdd(tableNb, quantity, content) {
        //On selectionne le tableau de la table qui vient d'être typé depuis l'app
        var htmlNewFood = ""
        htmlNewFood += "<tr class=\"food_column\" >";
        htmlNewFood +=     "<td class=\"food_quantity\">"+ quantity +"</td>";
        htmlNewFood +=     "<td class=\"food_content\">"+ content +"</td>";
        htmlNewFood +=     "<td class=\"food_typed\"><span class=\"glyphicon glyphicon-ok\"></span></td>";
        htmlNewFood += "</tr>";
        var $tableTableau = $('.dash_pop_title').children("p").filter(function(){return $(this).text() === "Table " + tableNb; }).parent().parent().parent().children('.content').children('.pop_food_table');
        console.log($tableTableau.children('.food_column').children(".food_content").filter(function(){ return $(this).text() === content; }).text())
        // Si une case avec le produit existe déja alors on incrémente la quantitée
        if ($tableTableau.children('.food_column').children(".food_content").filter(function(){ return $(this).text() === content; }).length){
            // On trouve l'ancienne quantitée du produit et on l'aditionne avec la nouvelle quantitée
            prevQuantity = $tableTableau.children('.food_column').children(".food_content").filter(function(){ return $(this).text() === content; }).parent().children(".food_quantity").html();

            newQuantity = parseInt(prevQuantity) + parseInt(quantity);
            // Et on la modifie
             $tableTableau.children('.food_column').children(".food_content").filter(function(){ return $(this).text() === content; }).parent().children(".food_quantity").text(newQuantity);

        } else { //Sinon on ajoute une nouvelle ligne
            $tableTableau.append(htmlNewFood);
        }
    }
});
