// index.js


const PORT_SOCKET = 9876;
let app    = require('express')();
let server = app.listen(PORT_SOCKET);
let io     = require('socket.io')(server);


const PORT_EMIT_OSC = 8885;
const OscEmitter = require("osc-emitter");

let emitter = new OscEmitter();
emitter.add('localhost', PORT_EMIT_OSC);


io.on('connection', (socket)=>_onConnected(socket));

function _onConnected(socket) {
	console.log('A user is connected : ', socket.id);

	socket.on('disconnect', ()=>_onDisconnected() );

	socket.on('onLeft', ()=>_onLeft());
	socket.on('onRight', ()=>_onRight());
	socket.on('onForward', ()=>_onForward());
	socket.on('onBackward', ()=>_onBackward());
	socket.on('onStop', ()=>_onStop());
}


function _onLeft() {
	console.log('Turn Left');
	emitter.emit('/left', 1);
}

function _onRight() {
	console.log('Turn Right');
	emitter.emit('/right', 1);
}

function _onForward() {
	console.log('Move Forward');
	emitter.emit('/forward', 1);
}

function _onBackward() {
	console.log("Move Backward");
	emitter.emit('/backward', 1);
}

function _onStop() {
	console.log('Stop');
	emitter.emit('/stop', 1);
}


function _onDisconnected() {
	console.log(' A user has disconnected');
}