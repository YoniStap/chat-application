var express = require('express');

var app = express()

var connections = []
var users = []

app.use(express.static('./app'))

var server  = app.listen(8081);
io = require('socket.io').listen(server)

io.sockets.on('connection', function(socket){

	socket.once('disconnect', function(){

		for(var i = 0; i < users.length; i++){

			if(users[i].id == this.id){

				users.splice(i, 1)
			}

		}

		connections.splice(connections.indexOf(socket), 1)
		socket.disconnect()
		console.log("Disconnected: connections running: " + connections.length)
		io.emit('disconnect', users)

	})

	socket.on('userJoined', function(payload){

		var newUser = {

			id: this.id,
			name: payload.name

		}

		users.push(newUser)

		io.emit('userJoined', users)
		console.log("user joined: " + payload.name)
	})

	socket.on('messageAdded', function(payload){

		var newMessage = {

			timeStamp: payload.timeStamp,
			text: payload.text,
			user: payload.user

		}

		io.emit('messageAdded', newMessage)

	})

	connections.push(socket)
	console.log("Connected, Number of connections: " + connections.length)

})

console.log("Server running on port 8081")

// app.get('/chat', function (req, res) {

// 	res.sendFile('index.html', { root: './app' });

// })