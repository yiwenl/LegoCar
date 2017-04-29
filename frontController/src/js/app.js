let TARGET_SERVER_IP = '192.168.1.116';
let socket = require('./libs/socket.io-client')(TARGET_SERVER_IP + ':9876');
let isLocked = false;

if(document.body) {
	_init();
} else {
	window.addEventListener('DOMContentLoaded', _init);
}


window.params = {
	gamma:2.2,
	exposure:5
};


let btnLeft, btnRight, btnForward, btnBackward;

function _init() {
	window.addEventListener('touchmove', (e)=>{
		e.preventDefault();
	});

	btnLeft = document.body.querySelector('.button-left');
	btnRight = document.body.querySelector('.button-right');
	btnForward = document.body.querySelector('.button-top');
	btnBackward = document.body.querySelector('.button-down');


	btnLeft.addEventListener('touchstart', onLeft);
	btnRight.addEventListener('touchstart', onRight);
	btnForward.addEventListener('touchstart', onForward);
	btnBackward.addEventListener('touchstart', onBackward);

	btnLeft.addEventListener('touchend', onUp);
	btnRight.addEventListener('touchend', onUp);
	btnForward.addEventListener('touchend', onUp);
	btnBackward.addEventListener('touchend', onUp);
}


function onLeft() {
	console.log('Left');
	socket.emit('onLeft');
}

function onRight() {
	console.log('Right');
	socket.emit('onRight');
}

function onForward() {
	console.log('Forward');
	socket.emit('onForward');
}

function onBackward() {
	console.log('Backward');
	socket.emit('onBackward');
}



function onUp() {
	console.log('Stop');
	socket.emit('onStop');
}