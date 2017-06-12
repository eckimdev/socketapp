//io = io.listen(http.createServer(app));
module.exports = function (io) {
  // 'use strict';
  io.on('connection', function(){
    console.log('User connected via socket.io!');
  })
  io.on('connection', function (socket) {
    socket.on('message', function (from, msg) {

      console.log('recieved message from',
                  from, 'msg', JSON.stringify(msg));

      console.log('broadcasting message');
      console.log('payload is', msg);
      io.sockets.emit('broadcast', {
        payload: msg,
        source: from
      });
      console.log('broadcast complete');
    });
  });
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
