const WALL_WIDTH = 20,
	BRICK_WIDTH = 50,
	BRICK_HEIGHT = 25,
	TOP = 20,
	SIDE = 20,
	PADDLE_WIDTH =125,
	PADDLE_HEIGHT = 10,
	PADDLE_VELOCITY = 0.5,
	PADDLE_ACCELERATION = 0.01,
	BALL_RADIUS = 10,
	BALL_VELOCITY = 0.25;
	BALL_ACCELERATION = 0.2;

let canvas = document.getElementById("canvas");

GAME.init(canvas, 1000, 500, 100);
let LastTime = 0;
let wall = [
	new GAME.object("square", 500),
	new GAME.object("square", 500),
	new GAME.object("square", 1000),
];

wall[0].x = -1000 + WALL_WIDTH;
wall[1].x = -(-1000 + WALL_WIDTH);
wall[2].y = 1250 - WALL_WIDTH;

let bricks = [],
	n = 10;

let paddle = new GAME.object("square", PADDLE_WIDTH);
paddle.points[0].y = PADDLE_HEIGHT;
paddle.points[1].y = PADDLE_HEIGHT;
paddle.points[2].y = -PADDLE_HEIGHT;
paddle.points[3].y = -PADDLE_HEIGHT;

paddle.y = -250 + TOP + PADDLE_HEIGHT;

let controller = new GAME.controller(["a", "d",' ']);

// canvas.onmousemove=(e)=>{
//     paddle.x=e.offsetX-500+PADDLE_WIDTH/2
// }

let ball = new GAME.object("circle", BALL_RADIUS);
ball.colour = "blue";
ball.vy = -BALL_VELOCITY;
ball.y = paddle.y

for (let i = 0; i < n; i++) {
	bricks[i] = new GAME.object("square", BRICK_WIDTH);
	bricks[i].points[0].y = BRICK_HEIGHT;
	bricks[i].points[1].y = BRICK_HEIGHT;
	bricks[i].points[2].y = -BRICK_HEIGHT;
	bricks[i].points[3].y = -BRICK_HEIGHT;

	bricks[i].colour = "#" + Math.floor(Math.random() * 16777215).toString(16);
    let gap=(1000-4*WALL_WIDTH-8*2*BRICK_WIDTH)/11
	bricks[i].x = -500 + SIDE + WALL_WIDTH + BRICK_WIDTH + i * (BRICK_WIDTH* 2 +gap) 

	bricks[i].y = +250 - TOP - BRICK_HEIGHT - WALL_WIDTH;
}
let score=0,pause=true
function gameloop(TimeStamp) {
	let dt = TimeStamp - LastTime;
	console.log(dt)
    LastTime = TimeStamp;
    if(controller.key[2].pressed)
    pause=false

    GAME.clear();
    if(!pause){
        if (controller.key[0].pressed) paddle.vx = -PADDLE_VELOCITY;
        else if (controller.key[1].pressed) paddle.vx = PADDLE_VELOCITY;
        else paddle.vx = 0;
    
        if (
            // ball.y < paddle.y + PADDLE_HEIGHT + BALL_RADIUS ||
            GAME.collisionsBetween(paddle, ball)
        ) {
            ball.vy = Math.abs(ball.vy);
            if (paddle.vx == 0) {}
            else ball.vx += paddle.vx/2;
        }
        if (GAME.collisionsBetween(wall[0], ball)) {
            ball.vx = Math.abs(ball.vx);
        }
        if (GAME.collisionsBetween(wall[1], ball)) {
            ball.vx = -Math.abs(ball.vx);
        }
        if (GAME.collisionsBetween(wall[2], ball)) {
            ball.vy = -Math.abs(ball.vy);
        }
    }


    
	for (let i = 0; i < n; i++) {
		if (bricks[i] != null) {
            GAME.render(bricks[i], dt);
            if (GAME.collisionsBetween(ball, bricks[i])){
                bricks[i] = null;
                ball.vy=-Math.abs(ball.vy)
                score++
                console.log("score : "+score)
            } 
		} else {}
	}

	GAME.render(paddle, dt);

	GAME.render(ball, dt);

	GAME.render(wall[0], dt);
	GAME.render(wall[1], dt);
	GAME.render(wall[2], dt);

	window.requestAnimationFrame(gameloop);
}
window.requestAnimationFrame(gameloop);
