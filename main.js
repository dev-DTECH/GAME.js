let LastTime = 0;

let output = document.getElementById("output");

canvas = document.getElementById("display");

res = document.getElementById("res");

// let res=100;
function resize() {
	GAME.init(canvas, 1600, 900, res.value);
}
resize();
// GAME.init(canvas,1600,900,100);
control = new GAME.controller(["a", "d", "w", "s", "4", "6"]); //left,right,up,down
hero = new GAME.object("square", 100);
// hero.rotation.omega=0.001
hero1 = new GAME.object("square", 10);
hero2 = new GAME.object("square", 200);
hero3 = new GAME.object("square", 75);
hero.colour = "#4768ff";

tank = new GAME.object("tank.png", 500, 1);
// tank.rotation.angle = (-90 * Math.PI) / 180;

stylishhero = new GAME.object("animation/mario.png", 100, 3);

villain = new GAME.object("square", 100);
// villain.rotation.omega = 0.1;

// console.log(hero);
// var stats = new Stats();
// stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom);
let mouse =new GAME.object("circle")
canvas.onmousemove=e=>{
	mouse.x=e.offsetX
	mouse.y=-e.offsetY
}


function gameloop(TimeStamp) {
	// stats.begin();
	let dt = TimeStamp - LastTime;
	LastTime = TimeStamp;

	GAME.clear();
	// GAME.ctx.clearRect(0, 0, 1000, 1000);

	if (hero.x > 500) hero.x = -500;

	if (hero1.x > 500) hero1.x = -500;

	if (hero2.y > 500) hero2.y = -500;

	if (hero3.x > 500) {
		hero3.x = -500;
		hero3.y = -500;
	}
	// tank.rotation.omega=0.01
	//console.log(control.upPressed);
	if (control.key[0].pressed) {
		// GAME.camera.move.x -= 1 * dt;

		// tank.move.x -= 1 * dt;
		// tank.vx=-1;
		// GAME.camera.rotation.omega = -0.01;
		// tank.rotation.omega = -0.01;
		GAME.camera.move(1,0,dt)
		tank.move(1,0,dt)
	} else if (control.key[1].pressed) {
		// GAME.camera.move.x += 1 * dt;

		// tank.move.x += 1 * dt;.		

		GAME.camera.move(-1,0,dt)
		tank.move(-1,0,dt)
		// GAME.camera.rotation.omega = 0.01;
		// tank.rotation.omega = 0.01;
	} else {

		// tank.rotation.omega = 0;
		// GAME.camera.rotation.omega = 0
	}
	if (control.key[2].pressed) {
		// GAME.camera.move.y += 1 * dt;
		// tank.move.y += 1 * dt;
		// tank.vx=-1;
		GAME.camera.move(0,1,dt)
		tank.move(0,1,dt)

		// tank.x += 1*Math.sin(tank.rotation.angle)*dt;
		// tank.y += 1*Math.cos(tank.rotation.angle)*dt;
	} else if (control.key[3].pressed) {
		// GAME.camera.move.y -= 1 * dt;
		// tank.move.y -= 1 * dt;
		// tank.vy = -1;
		tank.move(0,-1,dt)
		GAME.camera.move(0,-1,dt)
		// tank.x += -1*Math.sin(tank.rotation.angle)*dt;
		// tank.y += -1*Math.cos(tank.rotation.angle)*dt;
	}
	if (tank.vy != 0 && tank.vx != 0) {
		tank.vx /= Math.SQRT2;
		tank.vy /= Math.SQRT2;
	}
	if (control.key[4].pressed) {
		GAME.camera.rotation.angle -= 0.01 * dt;
		// tank.rotation.angle -= 0.01 * dt;
	}
	if (control.key[5].pressed) {
		GAME.camera.rotation.angle += 0.01 * dt;
		// tank.rotation.angle += 0.01 * dt;
	}
	// GAME.camera=tank
	// GAME.camera.rotation.angle=0
	if (GAME.collisionsBetween(hero, tank)) {
		hero.colour = "#4768ff";
	}
	// output.innerHTML="i just got hit";
	else hero.colour = "";

	// output.innerHTML="<br>";
	stylishhero.animate(0, 2, 30, dt);
	GAME.updateCamera(dt)
	// GAME.render(mouse,dt)
	GAME.render(villain, dt);
	// GAME.render(hero1, dt);
	// GAME.render(hero2, dt);
	// GAME.render(hero3, dt);
	GAME.render(hero, dt);
	GAME.render(stylishhero, dt);
	GAME.render(tank, dt);


	// console.log(hero.x)

	// GAME.render(GAME.wall.left,dt)
	// console.log(event.clientX)
	// console.log(hero.points[0])
	// stats.end();
	// console.log(GAME.collisionsBetween(villain, stylishhero));

	window.requestAnimationFrame(gameloop);
}
// stylishhero.vx=0.1
// stylishhero.y=stylishhero.height/2
// villain.y = villain.height/2
villain.x = 500;

window.requestAnimationFrame(gameloop);
GAME.edit=true
// GAME.edit(stylishhero,"hero")
// GAME.edit(hero,"hero")
// console.log(GAME);
// console.log(control);

// GAME.editor.open(["tank", "stylishhero"]);
