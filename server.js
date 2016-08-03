var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/assets'))
app.get('/', function(req, res){
    res.render('index.ejs');
})
// Page pour ajouter des elements a la facture de la table x
.get('/restaurant/send/:table/:quantity/:content', function(req, res){

    var fileName = './assets/json/tables.json';
    var file = require(fileName);

    //On transforme les + en espace (du a la transformation en utf 8)
    req.params.content.replace(/\+/g,' ');
    // On dit les modifs a faire
    for(var i = 0; i < file.length; i++){
        if (file[i].tableNb == req.params.table){
            file[i].content.push(req.params.content);
            file[i].quantity.push(req.params.quantity);
            file[i].isTyped.push(false);
            break;
        }
    }
    // On modifie le fichier json
    fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
        if (err) return console.log(err);

        console.log(JSON.stringify(file));
        console.log('writing to ' + fileName);
    });

    // On affiche que tout s'est passé sans problèmes
    res.writeHead(200);
    res.end('SUCCESS');
});


io.sockets.on('connection', function(socket){
    // console.log("Someone has connected !");
    // socket.broadcast.emit('broadcast', "Someone has connected");


    socket.on('restaurant_data', function (restaurant_data) {
        console.log(restaurant_data);
        // socket.emit('tchat_message', message);
        // socket.emit('inputreset');
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
    //
    // socket.on('disconnect', function(){
    //     console.log("Someone has disconnected !");
    //     socket.broadcast.emit('broadcast', "Someone has disconnected");
    // });
});

console.log("server.js launched on port 8080");
server.listen(process.env.PORT || 8080);
