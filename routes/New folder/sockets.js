var io = require('socket.io');

/*serverMessage: sent by chat system when user is connected, when others connect, or when 
users disconnect*/

/*user messages: sent by the client to the server. Carries the user's message content in the 
  payload.
  1. messages we send: myMessage
  2. messages other users send userMessage.
*/

exports.initialize = function (server) {
	io = io.listen(server);
	// Connect to the chat system
	io.sockets.on('connection', function (socket) {

		/* When a user connects for the first time, the server will send a
		   welcome message to the user as a serverMessage message.
		*/
		// On connection with a client, send serverMessage
		socket.send(JSON.stringify(
			{type: 'serverMessage',
		     message: 'Welcome to the most interesting chat room on earth!'}));

        /* User types in a message and presses the send button,
         we will send a userMessage from the browser to the server.
        */

        /* On recieving a client message, the server will broadcast this message to all
           the other users
        */

        /* It will also send back the same message as myMessage to the user who 
           originally sent the message
        */

        /* On recieving any message from the server, the browser will display the contents of
           the message in the message area
        */

		socket.on('message', function (message) {
			message = JSON.parse(message);
			if (message.type == 'userMessage') {
				// Get the value set on the socket
				/* Get username from the socket and append it to the previous 
				   message*/ 
				socket.get('nickname', function (err, nickname) {
					message.username = nickname;
					socket.broadcast.send(JSON.stringify(message));
					message.type = 'myMessage';
					socket.send(JSON.stringify(message));
				});			
			}
		});

		socket.on('set_name', function (data) {
			// Attaching additional information to the socket for the session
			socket.set('nickname', data.name, function () {
				socket.emit('name_set', data);

				socket.send(JSON.stringify({type: 'serverMessage', 
		    	message: 'Welcome to the most interesting chat room on earth!'}));
			});

			
		});
	});

}