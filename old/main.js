let fpsTime = 0,
	c = 0,
	fps,
	avgfps,
	maxfps = 0,
	minfps = 1/0,
	frames = 0,
	Time = 0,
	LastTime = 0;

	let output = document.getElementById("output");

canvas = document.getElementById("display");
GAME.renderer(canvas);
control = new GAME.controller("a", "d", "w", "s"); //left,right,up,down
hero = new GAME.object("square", 100);
hero1 = new GAME.object("square", 10);
hero2 = new GAME.object("square", 200);
hero3 = new GAME.object("square", 75);

villain = new GAME.object("square", 5);

// console.log(hero);

function gameloop(TimeStamp) {
	let dt = TimeStamp - LastTime;
	LastTime = TimeStamp;
	Time += dt;

	frames++;
	fpsTime += dt;
	//console.log(fpsTime);
	//fps=1000/dt;

	if (fpsTime >= 1000) {
		c++;
		fps = frames;
		if (c <= 5) avgfps = fps;

		avgfps = Math.round((avgfps * c + fps) / (c + 1));
		if (maxfps < fps) maxfps = fps;
		if (minfps > fps && c >= 5) minfps = fps;
		//console.log(fps);
		document.getElementById("fps").innerHTML =
			"FPS : " +
			fps +
			"<br>" +
			"AVGFPS : " +
			avgfps +
			"<br>" +
			"MAXFPS : " +
			maxfps +
			"<br>" +
			"MINFPS : " +
			minfps;

		frames = 0;
		fpsTime = 0;
	}

	GAME.ctx.clearRect(0, 0, 1000, 1000);

	if (hero.x > 250) hero.x = -250;

	if (hero1.x > 250) hero1.x = -250;

	if (hero2.y > 250) hero2.y = -250;

	if (hero3.x > 250) {hero3.x = -250;hero3.y = -250;}

	//console.log(control.upPressed);
	if (control.leftPressed) {
		GAME.camera.x -= 0.1 * dt;
		villain.x -= 0.1 * dt;
	}
	if (control.rightPressed) {
		GAME.camera.x += 0.1 * dt;
		villain.x += 0.1 * dt;
	}
	if (control.upPressed) {
		GAME.camera.y += 0.1 * dt;
		villain.y += 0.1 * dt;
	}

	if (control.downPressed) {
		GAME.camera.y -= 0.1 * dt;
		villain.y -= 0.1 * dt;
	}

	if(GAME.collisionsBetween(villain,hero2))
	output.innerHTML="i just got hit";
	else
	output.innerHTML="<br>";


	GAME.render(villain, dt);
	GAME.render(hero, dt);
	GAME.render(hero1, dt);
	GAME.render(hero2, dt);
	GAME.render(hero3, dt);

	window.requestAnimationFrame(gameloop);
}

window.requestAnimationFrame(gameloop);

// console.log(GAME);
// console.log(control);

