$(document).ready(function(){
    socket.emit('restaurant_data', "1:1:carpaccio");
    //
    // $('.tchat_submit').click(function(){
    //     var message_content = $('.tchat_message').val();
    //     socket.emit('tchat_message', message_content);
    // });
    //
    // socket.on('tchat_message', function (message) {
    //     $('.messages').append("<p>" + message + "</p>");
    // });
    //
    // socket.on('inputreset', function (message) {
    //     $('.tchat_message').val("");
    // });
    //
    // socket.on('broadcast', function (message) {
    //     $('.messages').append("<p class=\"broadcast\">" + message + "</p>");
    // });
});
