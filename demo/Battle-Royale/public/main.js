const playerSize = 80,
	bulletWidth = 5,
	healthBarWidth = 10;

let canvas = document.getElementById("canvas");
GAME.init(canvas, 1600, 900, 50);

let socket = io();

let player = new GAME.object("square", playerSize);
player.colour = "#" + Math.floor(Math.random() * 16777215).toString(16);

player.health = 100;
player.healthBar = new GAME.object("square", 100);

player.healthBar.points[0].y = healthBarWidth;
player.healthBar.points[1].y = healthBarWidth;
player.healthBar.points[2].y = -healthBarWidth;
player.healthBar.points[3].y = -healthBarWidth;

player.healthBar.x = player.x + 2 * playerSize;
player.healthBar.y = player.y + 2 * playerSize;
socket.emit("new-player", player);

let control = new GAME.controller(["a", "d", "w", "s", " "]);

let Players = [];
let Index;
socket.on("new-player", (data) => {
	Players = data[0];
	Index = data[1];
	// player = Players[Index];
	console.log("receive player", data);
	window.requestAnimationFrame(gameloop);
});
socket.on("sync-player", (data) => {
	Players = data;
	// console.log(Players)
});
// socket.on("sync-health", (data) => {
// 	Players = data;
// 	// player=Players[Index]
// });

let LastTime = 0;
function gameloop(TimeStamp) {
	let dt = TimeStamp - LastTime;
	LastTime = TimeStamp;

	GAME.clear();
	// player=Players[Index]
	// console.log(Players);

	if (control.key[0].pressed) {
		player.x -= 1 * dt;
	}
	if (control.key[1].pressed) {
		player.x += 1 * dt;
	}
	if (control.key[2].pressed) {
		player.y += 1 * dt;
	}
	if (control.key[3].pressed) {
		player.y -= 1 * dt;
	}
	if (control.key[4].pressed) {
		player.bullet = new GAME.object("square", playerSize / 2);
		player.bullet.x = player.x;
		player.bullet.y = player.y;
		player.bullet.points[0].y = bulletWidth;
		player.bullet.points[1].y = bulletWidth;
		player.bullet.points[2].y = -bulletWidth;
		player.bullet.points[3].y = -bulletWidth;
		player.bullet.vx = 1;
	}
	// Players[Index]=player

	GAME.camera.x = player.x;
	GAME.camera.y = player.y;

	player.healthBar.x = player.x;
	player.healthBar.y = player.y + 2 * playerSize;
	// console.log(player)
	// player.colour="#" +Math.floor(Math.random()*16777215).toString(16);

	socket.emit("sync-position", [player, Index]);

	for (let i = 0; i < Players.length; i++) {
		if (Players[i] && i != Index && player.bullet) {
			if (GAME.collisionsBetween(player.bullet, Players[i])) {
				Players[i].health -= 25;
				socket.emit("sync-health", [Players[i].health, i]);
				console.log("bruh");
				player.bullet=null
				Players[Index]=player
			}
		}
	}
	for (let i = 0; i < Players.length; i++) {
		if (Players[i]) {
			Players[i].healthBar.points[0].x = Players[i].health;
			Players[i].healthBar.points[1].x = -Players[i].health;
			Players[i].healthBar.points[2].x = -Players[i].health;
			Players[i].healthBar.points[3].x = Players[i].health;

			Players[i].healthBar.x = Players[i].x;
			Players[i].healthBar.y = Players[i].y + 2 * playerSize;

			if(Players[i].health<=0)
			socket.emit("kill",i)
		}
	}
	player.healthBar.points=Players[Index].healthBar.points

	GAME.render(player, dt);
	if (player.bullet) GAME.render(player.bullet, dt);
	GAME.render(player.healthBar, dt);

	// console.log(Players)
	for (let i = 0; i < Players.length; i++) {
		// console.log(Players[i])
		if (Players[i] && i != Index) {
			GAME.render(Players[i], dt);
			if (Players[i].bullet) {
				Players[i].bullet.update = false;
				GAME.render(Players[i].bullet, dt);
				Players[i].bullet.update = false;
			}
			GAME.render(Players[i].healthBar, dt);
		}
	}
	window.requestAnimationFrame(gameloop);
}
