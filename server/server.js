const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  //socket.emit from admin text: Welcome to the chat app
  //socket.broadcast.emit frtom Admin text new user joined

  socket.on('join', (params, cb) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return cb('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    //io.emit = everyone connected
    //socket.broadcast.emit = everyone except current user
    //io.to('room name').emit = Send to everyone in 'room name' room
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //socket.emit = a single user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    //socket.broadcast.to('room name').emit = Send to everyone in 'room name' room, except user
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));
    cb();
  });

  socket.on('createMessage', (message, cb) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    cb();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});



server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
