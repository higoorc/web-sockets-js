const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 3000

// Events handlers
io.on('connection', (socket) => {
    console.log(socket);
    socket.on('message', (evt) => {
        console.log(evt);
        socket.broadcast.emit('message', evt)
    })
})

io.on('disconnect', (evt) => {
    console.log(evt);
})

// Server listening
http.listen(port)