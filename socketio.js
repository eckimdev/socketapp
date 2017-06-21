var moment = require('moment');
//io = io.listen(http.createServer(app));
module.exports = function (io) {

  var clientInfo = {};

  io.on('connection', function(socket){//socket is an 'individual client'
    console.log('User connected via socket.io!');

    socket.on('joinRoom', function(req){
      clientInfo[socket.id] = req;
      console.log(clientInfo)
      socket.join(req.room);
      socket.broadcast.to(req.room).emit('message', sysMsg(req.name + ' has joined!'));
    });

    socket.on('message', function(message){
      console.log('Message recieved from client');

      if(message.text === '@currentUsers'){
        sendCurrentUsers(socket);
      }
      else{
        message.timestamp == moment().valueOf();
        //send to everybody including the sender
        io.to(clientInfo[socket.id].room).emit('message', message);
        //send to everybody except the sender
        // socket.broadcast.emit('message', message);
      }

    });

    socket.emit('message', sysMsg('Welcome to the chat application!'));

    socket.on('disconnect', function(){
      var userData = clientInfo[socket.id];
      if(typeof clientInfo[socket.id] !== 'undefined'){
        socket.leave(userData.room)
        io.to(userData.room).emit('message', sysMsg(userData.name + ' has left!'));
        delete clientInfo[socket.id];
      }
    });

  });

  function sysMsg(message){
      return {
        name: 'System',
        text: message,
        timestamp: moment().valueOf()
      }
  }

  function sendCurrentUsers(socket){
    var info = clientInfo[socket.id];
    users = [];
    if (typeof info === 'undefined'){
      return;
    }

    Object.keys(clientInfo)//get an array of 'keys' in the object
    .forEach(function(socketId, index){
      var userInfo = clientInfo[socketId];
      if(info.room === userInfo.room){
        users.push(userInfo.name);
      }
    });

    socket.emit('message', sysMsg('Current Users: ' + users.join(' ')));
  }

};

/*
boilerplate code
*/

// module.exports = function (io) {
//   // 'use strict';
//   io.on('connection', function(){
//     console.log('User connected via socket.io!');
//   })
//   io.on('connection', function (socket) {
//     socket.on('message', function (from, msg) {
//
//       console.log('recieved message from',
//                   from, 'msg', JSON.stringify(msg));
//
//       console.log('broadcasting message');
//       console.log('payload is', msg);
//       io.sockets.emit('broadcast', {
//         payload: msg,
//         source: from
//       });
//       console.log('broadcast complete');
//     });
//   });
// };


/*
tldr
when you have things in another
folder that you want to pass around
create an object and export it
*/
// var socketio = require('socket.io');
// var io = socketio();
//
// var socketApi = {};
//
// socketApi.io = io;
//
// io.on('connection', function(socket){
//     console.log('A user connected');
// });
//
// socketApi.sendNotification = function() {
//     io.sockets.emit('hello', {msg: 'Hello World!'});
// }
//
// module.exports = socketApi;
