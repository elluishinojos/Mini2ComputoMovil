let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

var hosts = [], clients = [], losers = [];

io.on('connection', (socket) => {

  socket.on('host', (hostObj) => {
    console.log(hostObj);
    hosts.push(hostObj);
  });

  socket.on('cliente', (clientObj)=>{
    console.log(clientObj);
    clients.push(clientObj);
  });

  socket.on('disconnect', function () {
    io.emit('users-changed', { user: socket.nickname, event: 'left' });
  });

  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', { user: nickname, event: 'joined' });
  });

  //socket.on('add-message', (message) => {
  //  io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
  //});

  socket.on('game-start', (nickname) => {
    socket.emit('start', nickname);
    socket.broadcast.emit('start', nickname);
  });

  socket.on('game-over', (playerObj) => {
    console.log(playerObj);
    losers.push(playerObj);
    socket.broadcast.emit('loosers', losers);
  })
});

var port = process.env.PORT || 3001;

http.listen(port, function () {
  console.log('listening in http://localhost:' + port);
});