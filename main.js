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

let touchGap=150

touch = new GAME.touchController(["a", "d", "w", "s"])
touch.key[0].x=-400-touchGap/2
touch.key[1].x=-400+touchGap/2
touch.key[2].x=-400
touch.key[3].x=-400
touch.key[2].y=touchGap/2
touch.key[3].y=-touchGap/2

let light =new GAME.light(500,"yellow")
// light.on=false

hero = new GAME.object("square", 100);
hero.rotation.omega=0.001
hero1 = new GAME.object("square", 10);
hero2 = new GAME.object("square", 200);
hero3 = new GAME.object("square", 75);
hero.colour = "#4768ff";

tank = new GAME.object("tank.png", 500, 1);
// tank.rotation.angle = (-90 * Math.PI) / 180;

stylishhero = new GAME.object("animation/mario.png", 100, 3);

villain = new GAME.object("square", 100);
villain.rotation.omega = 0.1;

// console.log(hero);
var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.getElementById("game").appendChild(stats.dom);

let mouse = new GAME.object("circle",5);
// canvas.onmousedown= (e) => {
// 	light.on=true
// }
canvas.onmousemove = (e) => {
	// mouse.x = (e.offsetX - GAME.canvasWidth / 2) * GAME.ratio*GAME.ratio;
	// mouse.y = -(e.offsetY - GAME.canvasHeight / 2) * GAME.ratio*GAME.ratio;
	mouse.x = (e.offsetX - GAME.canvasWidth / 2)/(GAME.canvasHeight/GAME.height)+GAME.camera.x
	mouse.y = -(e.offsetY - GAME.canvasHeight / 2)/(GAME.canvasHeight/GAME.height)+GAME.camera.y

};
// canvas.onmouseup= (e) => {
// 	light.on=false
// }
// light.obstacles.push(hero)
light.addObstacle([villain,hero])
GAME.loop = (dt) => {
	stats.begin();

	GAME.clear();
	light.x=tank.x
	light.y=tank.y
	light.on=true
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
	if (control.keyPressed("a")||touch.key[0].pressed) {
		// GAME.camera.move.x -= 1 * dt;

		// tank.move.x -= 1 * dt;
		// tank.vx=-1;
		GAME.camera.rotation.omega = -0.005;
		tank.rotation.omega = -0.005;
		// GAME.camera.move(1,0,dt)
		// tank.move(1,0,dt)
	} else if (control.key[1].pressed||touch.key[1].pressed) {
		// GAME.camera.move.x += 1 * dt;

		// tank.move.x += 1 * dt;.

		// GAME.camera.move(-1,0,dt)
		// tank.move(-1,0,dt)
		GAME.camera.rotation.omega = 0.005;
		tank.rotation.omega = 0.005;
	} else {
		tank.rotation.omega = 0;
		GAME.camera.rotation.omega = 0;
	}
	if (control.key[2].pressed||touch.key[2].pressed) {
		// GAME.camera.move.y += 1 * dt;
		// tank.move.y += 1 * dt;
		// tank.vx=-1;
		GAME.camera.move(0, 1, dt);
		tank.move(0, 1, dt);

		// tank.x += 1*Math.sin(tank.rotation.angle)*dt;
		// tank.y += 1*Math.cos(tank.rotation.angle)*dt;
	} else if (control.key[3].pressed||touch.key[3].pressed) {
		// GAME.camera.move.y -= 1 * dt;
		// tank.move.y -= 1 * dt;
		// tank.vy = -1;
		tank.move(0, -1, dt);
		GAME.camera.move(0, -1, dt);
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


	// mouse.x=touch.x
	// mouse.y=touch.y

	// output.innerHTML="<br>";
	stylishhero.animate(0, 2, 30, dt);
	GAME.updateCamera(dt);
	GAME.render(mouse, dt);
	GAME.render(villain, dt);
	// GAME.render(hero1, dt);
	// GAME.render(hero2, dt);
	// GAME.render(hero3, dt);
	GAME.render(hero, dt);
	GAME.render(stylishhero, dt);
	GAME.render(tank, dt);
	GAME.render(light,dt)
	// if(touch.key[0].pressed){
	// 	console.log("preeeeeeeeeeeesed")
	// }
	touch.render()
	stats.end();
};
window.onload = () => {
	// GAME.edit=true
	villain.x = 500;

	GAME.start();
};



