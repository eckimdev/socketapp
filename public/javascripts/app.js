$(document).ready(function(){
  var socket = io();
  var messageForm = $('#message-form');
  var message = messageForm.find('input[name=message]');
  var messages = $('.messages');
  
  socket.on('connect', function(){
    console.log('Connected to socket.io server');
  });

  socket.on('message', function(message){
    console.log('New Message: ' + message.text);
    messages.append('<p>' + message.text + '</p>');
  });

  messageForm.on('submit',function(e){
    e.preventDefault();
    socket.emit('message', {
      text: message.val()
    });
    message.val('');
  });

});
