var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.io = io;

app.use(express.static(__dirname + '/assets'))
app.get('/', function(req, res){
    res.render('index.ejs');
})
// Page pour ajouter des elements a la facture de la table x
.get('/restaurant/send/:table/:quantity/:content', function(req, res){

    var fileName = './assets/json/tables.json';
    var file = require(fileName);

    //On transforme les + en espace (du a la transformation en utf 8)
    var content = req.params.content.replace(/\+/g,' ');
    // On dit les modifs a faire
    for (var i = 0; i < file.length; i++) {

        if (file[i].tableNb == req.params.table){ //Si on trouve la table qu'on cherche
            // On regarde si le "content" existe déja
            var wasEdited = false;

            for (var j = 0; j < file[i].content.length; j++){

                if (file[i].content[j] == content) {

                    file[i].quantity[j] = parseInt(file[i].quantity[j]) + parseInt(req.params.quantity);
                    file[i].quantity[j] = file[i].quantity[j].toString();
                    wasEdited = true;

                }
            }

            if (!wasEdited){ //Si on a pas modifié la quantité dun produit alors on l'ajoute
                file[i].content.push(content);
                file[i].quantity.push(req.params.quantity);
                file[i].isTyped.push(false);
            }

            break;
        }
    }
    // On modifie le fichier json
    fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
        if (err) return console.log(err);

        console.log('added ' + req.params.quantity + " " + content + " in table " + req.params.table + " to " + fileName);

    });
    // On broadcast en socket.io pour lancer l'animation
    var food_data = req.params.table + ":" + req.params.quantity + ":" + content
    req.app.io.emit('restaurant_data', food_data);
    // On affiche que tout s'est passé sans problèmes
    // res.render('restaurant_send.ejs', {food_data : food_data});
    res.writeHead(200);
    res.end('SUCCESS')
});


io.sockets.on('connection', function(socket){

    socket.on('restaurant_data', function (restaurant_data) {
        console.log(restaurant_data);

        socket.broadcast.emit('restaurant_data', restaurant_data);
    });

    socket.on('food_data_ask', function (tableNb) {
        fs.readFile('assets/json/tables.json', 'utf8', function (err, data) {
          if (err) throw err;
          tables = JSON.parse(data);

          for(var i = 0; i < tables.length; i++){
            if (tables[i].tableNb == tableNb) {
                socket.emit('food_data', {content: tables[i].content, quantity: tables[i].quantity, isTyped : tables[i].isTyped});
                break;
              }
          }

        });
    });

});

console.log("server.js launched on port 8080");
server.listen(process.env.PORT || 8080);
