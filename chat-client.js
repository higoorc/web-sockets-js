var socket = require('socket.io-client')('http://localhost:3000');
const repl = require('repl'); // Terminal REPL
const chalk = require('chalk'); // Terminal Colors

var username = null;

socket.on('connect', () => {
    console.log(chalk.red('=== start chatting ==='))
    username = process.argv[2]
})

socket.on('disconnect', function() {
    socket.emit('disconnect')
});

socket.on('message', (data) => {
    const { cmd, username } = data
    console.log(chalk.green(username + ': ' + cmd.split('\n')[0]));
})

repl.start({
    prompt: '',
    eval: (cmd) => {
        socket.send({ cmd, username})
    }
})