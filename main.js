let LastTime = 0;

	let output = document.getElementById("output");

canvas = document.getElementById("display");


res =document.getElementById("res");

// let res=100
function resize()
{
	GAME.renderer(canvas,res.value);
}
resize()
// GAME.renderer(canvas,res);
control = new GAME.controller("a", "d", "w", "s"); //left,right,up,down
hero = new GAME.object("square", 100);
hero1 = new GAME.object("square", 10);
hero2 = new GAME.object("square", 200);
hero3 = new GAME.object("square", 75);
hero.colour="#4768ff"

stylishhero =new GAME.object("animation/mario.png",100,3)


villain = new GAME.object("square", 5);


// console.log(hero);
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

function gameloop(TimeStamp) {
	stats.begin();
	let dt = TimeStamp - LastTime;
	LastTime = TimeStamp;

	GAME.clear()
	// GAME.ctx.clearRect(0, 0, 1000, 1000);

	if (hero.x > 500) hero.x = -500;

	if (hero1.x > 500) hero1.x = -500;

	if (hero2.y > 500) hero2.y = -500;

	if (hero3.x > 500) {hero3.x = -500;hero3.y = -500;}

	//console.log(control.upPressed);
	if (control.leftPressed) {
		GAME.camera.x -= 1 * dt;
		villain.x -= 1 * dt;
		stylishhero.x -= 1 * dt;

	}
	if (control.rightPressed) {
	stylishhero.animate(0,1,5,dt)
	stylishhero.x += 1 * dt;


		GAME.camera.x += 1 * dt;
		villain.x += 1 * dt;
	}
	if (control.upPressed) {
		GAME.camera.y += 1 * dt;
		villain.y += 1 * dt;
		stylishhero.y += 1 * dt;

	}

	if (control.downPressed) {
		GAME.camera.y -= 1 * dt;
		villain.y -= 1 * dt;
		stylishhero.y -= 1 * dt;

	}

	if(GAME.collisionsBetween(villain,hero))
	// output.innerHTML="i just got hit";
	hero.colour="#4768ff"
	
	else
	hero.colour=""

	// output.innerHTML="<br>";

	GAME.render(villain, dt);
	GAME.render(hero1, dt);
	GAME.render(hero2, dt);
	GAME.render(hero3, dt);
	GAME.render(hero, dt,);

	GAME.render(stylishhero, dt);


	// GAME.render(GAME.wall.left,dt)
	// console.log(event.clientX)
	// console.log(hero.points[0])
	stats.end();
	window.requestAnimationFrame(gameloop);
}

hero.x=100
window.requestAnimationFrame(gameloop);
// GAME.edit(stylishhero,"hero")
// console.log(GAME);
// console.log(control);

