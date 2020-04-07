const noOfPlanks = 50,
	sizeOfPlayer = 25,
	sizeOfPlank = 200,
	plankVelocity = 0.3,
	playerJumpVelcity = 1,
	gravity = 0.005;

let canvas = document.getElementById("canvas");
GAME.renderer(canvas, 100);
let lastTime = 0;

let background = new GAME.object("resources/sky.png", 200, 1);

let player = new GAME.object("square", sizeOfPlayer);
player.colour = "green";
player.y = player.height/2;
player.ay = -gravity;

player.jumping = false;

let ground = new GAME.object("resources/2dplatform.png", 100, 1);
ground.y = -ground.height/2
// console.log(ground.image)

let plank_ar = [];
for (let i = 0; i < noOfPlanks; i++) {
	plank_ar[i] = new GAME.object("resources/plank.png", sizeOfPlank, 1);
	plank_ar[i].x = canvas.clientWidth;
	plank_ar[i].y = plank_ar[i].height / 2;
	// plank_ar[i].points=[
	//     {x}
	// ]
}
plank_ar[0].vx = -plankVelocity;
let index = 0;
// console.log(plank_ar[0]);

let controller = new GAME.controller(["0"]);

function gameLoop(timeStamp) {
	let dt = timeStamp - lastTime;
	lastTime = timeStamp;

	// GAME.clear();

	// console.log(controller.key[0]);
	if (controller.key[0].pressed) player.vy = playerJumpVelcity;

// player.y = player.height/2;
	if (player.y<=player.height/2) {
        // player.update=false
		player.y = player.height/2;


		if (player.jumping) {
			if (GAME.collisionsBetween(player, plank_ar[index]))
			{
				console.log("you hit the plank");
				plank_ar[index].vx=0

				for (let i = 0; i < plank_ar.length; i++) {
					plank_ar[i].y-=plank_ar[i].height
					
				}
				ground.y-=plank_ar[i].height

				index++;
				if(index==noOfPlanks)
				index=0
				plank_ar[index].y=plank_ar[i].height / 2;
				plank_ar[index].x=canvas.clientWidth
				plank_ar[index].vx=-plankVelocity

				
			}	
		}
		player.jumping = false;
	} else {
        // player.update=true
		// if(GAME.collisionsBetween(player,plank_ar[index]))
		// return
		player.jumping = true;
    }
    

    // console.log(player.y)
	GAME.render(background, dt);

	GAME.render(player, dt);
	GAME.render(ground, dt);
	// GAME.render(plank_ar[0], dt);
	for (let i = 0; i < plank_ar.length; i++) {
		GAME.render(plank_ar[i], dt);
	}
	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
// GAME.editor.open(["ground", "player"]);
