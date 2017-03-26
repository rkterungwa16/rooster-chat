
var socket = io.connect('/');

socket.on('message', function (data) {
	data = JSON.parse(data);
	$('#messages').append('<div class="' + data.type + '">' + data.message + 
		'</div>');
});

$(function () {
	$('#send').click(function () {
		var data = {
			message: $('#message').val(),
			type: 'userMessage'
		};

		socket.send(JSON.stringify(data));
		$('#message').val('');
	});

    /* On clicking setname emit/trigger a custom event 'set_name' and attach data
       {name: $('#nickname')} */

    /*Events emitted on a socket on one side (server) will be handled on the other
      side of the socket (client) 
      - In our code, we trigger the set_name event on the client, so we will handle
      it on the server.*/
	$('#setname').click(function () {
		socket.emit('set_name', {name: $('#nickname').val()});
	});
});

