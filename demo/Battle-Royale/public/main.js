let canvas = document.getElementById("canvas");
GAME.init(canvas, 1600, 900, 100);

let socket = io();

let player = new GAME.object("square", 80);
socket.emit("new-player", player);

let control = new GAME.controller(["a", "d", "w", "s"]);

let OtherPlayers = [];
socket.on("other-players", (players) => {
	OtherPlayers = players;
});

let LastTime = 0;
function gameloop(TimeStamp) {
	let dt = LastTime - TimeStamp;
	LastTime = TimeStamp;

	GAME.clear();

	if (control.key[0].pressed) player.x -= 1 * dt;
	if (control.key[1].pressed) player.x += 1 * dt;
	if (control.key[2].pressed) player.y += 1 * dt;
	if (control.key[3].pressed) player.y -= 1 * dt;
	GAME.render(player, dt);

	OtherPlayers.forEach((player) => {
		GAME.render(player);
	});

	window.requestAnimationFrame(gameloop);
}
window.requestAnimationFrame(gameloop);
