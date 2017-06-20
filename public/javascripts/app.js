$(document).ready(function(){
  var name = getQueryVariable("name") || 'Anon';
  var room = getQueryVariable("room");
  var socket = io();
  var messageForm = $('#message-form');
  var message = messageForm.find('input[name=message]');
  var messages = $('.messages');

  console.log(name + ' wants to join ' + room);

  $(".room-title").text(room);

  socket.on('connect', function(){
    console.log('Connected to socket.io server!');
    socket.emit('joinRoom', {
      name: name,
      room: room
    });
  });

  socket.on('message', function(message){
    messages.append('<p><strong>' + message.name + ' ' + momentTime(message.time) + '</strong></p>');
    messages.append('<p>' + message.text + '</p>')
  });

  messageForm.on('submit',function(e){
    e.preventDefault();
    socket.emit('message', {
      name: name,
      text: message.val()
    });
    message.val('');
  });

  function momentTime(time){
    return moment.utc(time).local().format('h:mm:ss a')
  }

});
