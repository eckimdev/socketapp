$(document).ready(function(){
  var socket = io();
  var messageForm = $('#message-form');
  var message = messageForm.find('input[name=message]');
  var messages = $('.messages');

  socket.on('connect', function(){
    console.log('Connected to socket.io server');
  });

  socket.on('message', function(message){
    console.log('New Message: ' + message.text + ' at ' + momentTime(message.time));
    messages.append('<p><strong>' + momentTime(message.time) + ': </strong>' + message.text + '</p>');
  });

  messageForm.on('submit',function(e){
    e.preventDefault();
    socket.emit('message', {
      text: message.val()
    });
    message.val('');
  });

  function momentTime(time){
    return moment.utc(time).local().format('h:mm:ss a')
  }

});
