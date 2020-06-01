let canvas = document.getElementById("canvas");
GAME.init(canvas, 500, 1000, 100);
let lastTime = 0;

const GRAVITY = 0.0006,
	JUMP_VELOCITY = 0.35;
MIN_OB_GAP = 120;

let lastIndex = 4;

let gap = 200,
	OB_GAP = 300,
	OB_VELOCITY = 0.1;

let bird = new GAME.object("flying/frame.png", 10, 9);
bird.ay = -GRAVITY;
bird.colour = "blue";

let jumping = false;

let controller = new GAME.controller([" "]);
let obstacle = [];

for (let i = 0; i < 5; i++) {
	let dist = 100 * Math.random() * Math.pow(-1, Math.round(Math.random()));

	obstacle.push([]);
	obstacle[i][0] = new GAME.object("square", 1000);
	obstacle[i][0].colour = "green";
	obstacle[i][0].vx = -OB_VELOCITY;
	obstacle[i][0].points[0].x = 30;
	obstacle[i][0].points[1].x = -30;
	obstacle[i][0].points[2].x = -30;
	obstacle[i][0].points[3].x = +30;

	obstacle[i][0].y = 1000 + gap + dist;
	obstacle[i][0].x = 500 + i * OB_GAP;

	obstacle[i][1] = new GAME.object("square", 1000);
	obstacle[i][1].colour = "green";
	obstacle[i][1].vx = -OB_VELOCITY;
	obstacle[i][1].points[0].x = 30;
	obstacle[i][1].points[1].x = -30;
	obstacle[i][1].points[2].x = -30;
	obstacle[i][1].points[3].x = +30;

	obstacle[i][1].y = -(1000 + gap) + dist;
	obstacle[i][1].x = 500 + i * OB_GAP;
}
let game_over = false;
let score =0
function gameLoop(timeStamp) {
	let dt = timeStamp - lastTime;
	lastTime = timeStamp;

	GAME.clear();

	if (game_over) {
		// old_bird=bird
		// bird=new GAME.object("flying/frame.png",10,2)
		// bird.y=old_bird.y
	}
	bird.animate(0, 8, 10, dt);
	gap -= 0.0001 * dt;
	OB_GAP -= 0.001 * dt;

	if (OB_GAP > MIN_OB_GAP) OB_GAP -= 0.005 * dt;
	else OB_GAP = MIN_OB_GAP;
	if(!game_over){
		if (controller.key[0].pressed) {
			if (!jumping) {
				// bird.animate(0,8,1)
				jumping = true;
				bird.vy = JUMP_VELOCITY;
			}
		} else jumping = false;
	}


	GAME.render(bird, dt);
	for (let i = 0; i < 5; i++) {
		if (
			GAME.collisionsBetween(bird, obstacle[i][0]) ||
			GAME.collisionsBetween(bird, obstacle[i][1])
		) {
			if (!game_over) {
				console.log("GAME OVER");
				let old_bird = bird;
				bird = new GAME.object("got-hit/frame.png", 10, 2);
				bird.y = old_bird.y;
				game_over = true;
				for (let j = 0; j < 5; j++) {
					obstacle[j][0].update=false
					obstacle[j][1].update=false
				}
			}
		}
		if (obstacle[i][0].x <= -250) {
			score++
			obstacle[i][0].x = obstacle[lastIndex][0].x + OB_GAP;
			obstacle[i][1].x = obstacle[lastIndex][1].x + OB_GAP;

			let dist = 100 * Math.random() * Math.pow(-1, Math.round(Math.random()));

			obstacle[i][0].y = 1000 + gap + dist;
			obstacle[i][1].y = -(1000 + gap) + dist;

			lastIndex++;
			if (lastIndex >= 5) lastIndex = 0;
		}

		GAME.render(obstacle[i][0], dt);
		GAME.render(obstacle[i][1], dt);
		console.log("score : "+score)
	}

	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
