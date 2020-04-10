const noOfPlanks = 50,
	sizeOfPlayer = 25,
	sizeOfPlank = 200,
	plankVelocity = 0.3,
	playerJumpVelcity = 1,
	gravity = 0.005;

let canvas = document.getElementById("canvas");
GAME.init(canvas, 500, 1000, 100);
let lastTime = 0;

let background = new GAME.object("resources/sky.png", 200, 1);

let test = new GAME.object("square", sizeOfPlayer);
let player = new GAME.object("square", sizeOfPlayer);
player.colour = "green";
player.y = player.height / 2;
player.ay = -gravity;

player.jumping = false;

let ground = new GAME.object("resources/2dplatform.png", 100, 1);
ground.y = -ground.height / 2;
// console.log(ground.image)

let plank_ar = [];
for (let i = 0; i < noOfPlanks; i++) {
	plank_ar[i] = new GAME.object("resources/plank.png", sizeOfPlank, 1);
	plank_ar[i].x = GAME.width / 2 + plank_ar[i].width / 2;
	plank_ar[i].y = plank_ar[i].height / 2;
	// plank_ar[i].points=[
	//     {x}
	// ]
}
plank_ar[0].vx = -plankVelocity;
let index = 0;
// console.log(GAME.collisionsBetween(player, plank_ar[index]));
// console.log(plank_ar[0]);

let controller = new GAME.controller([" "]);

function gameLoop(timeStamp) {
	let dt = timeStamp - lastTime;
	lastTime = timeStamp;

	// GAME.clear();

	GAME.render(background, dt);
	GAME.render(player, dt);
	GAME.render(ground, dt);
	for (let i = 0; i < plank_ar.length; i++) {
		GAME.render(plank_ar[i], dt);
	}

	if (plank_ar[index].x < -(GAME.width / 2 - plank_ar[index].width / 2))
		plank_ar[index].vx = +plankVelocity;
	if (plank_ar[index].x > GAME.width / 2 - plank_ar[index].width / 2)
		plank_ar[index].vx = -plankVelocity;

	if (controller.key[0].pressed) player.vy = playerJumpVelcity;

	// // player.y = player.height/2;
	if (player.y <= player.height / 2) {
		// player.vy=0;
		// player.update=false
		player.y = player.height / 2;

		if (player.jumping) {
			if (GAME.collisionsBetween(player, plank_ar[index])) {
				console.log("You hit the plank");
				plank_ar[index].vx = 0;

				for (let i = 0; i < plank_ar.length; i++) {
					plank_ar[i].y -= plank_ar[i].height;
				}
				ground.y -= plank_ar[i].height;

				index++;
				if (index == noOfPlanks) index = 0;
				plank_ar[index].y = plank_ar[i].height / 2;

				plank_ar[index].x = GAME.width / 2 + plank_ar[i].width / 2;
				plank_ar[index].vx = -plankVelocity;
			}
		} else if (GAME.collisionsBetween(player, plank_ar[index])) {
			console.log("You fall off the stack");
			return
		}

		player.jumping = false;
	} else {
		player.jumping = true;
	}

	window.requestAnimationFrame(gameLoop);
}
// plank_ar[index].vx=-plankVelocity
window.requestAnimationFrame(gameLoop);
// GAME.editor.open(["ground", "player", "plank_ar[0]", "test"]);
