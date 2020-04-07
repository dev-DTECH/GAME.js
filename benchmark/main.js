let LastTime = 0;

	let output = document.getElementById("output");

canvas = document.getElementById("display");


function resize()
{
	GAME.renderer(canvas,res.value);
}
resize()
// GAME.renderer(canvas);
control = new GAME.controller("a", "d", "w", "s"); //left,right,up,down
GAME.camera.x=0
GAME.camera.y=100

let hero=[],n=1000,size=25;

for(i=0;i<n;i++)
{
	hero[i]=new GAME.object("animation/mario.png",size,3)

	hero[i].vx=Math.random()*0.1*Math.pow(-1,Math.floor(Math.random() * 2) + 1);
	hero[i].vy=Math.random()*0.1*Math.pow(-1,Math.floor(Math.random() * 2) + 1);
	hero[i].y=500
	hero[i].ay=-0.0001
}
wall=new GAME.object("square",1000)
wall.y=-1250;
wall.points[0].x=wall.points[3].x=1000
wall.points[1].x=wall.points[2].x=-1000
// console.log(hero);

// var stats = new Stats();
// stats.showPanel( 0); // 0: fps, 1: ms, 2: mb, 3+: custom

// document.body.appendChild( stats.dom );


function gameloop(TimeStamp) {
	// stats.begin();
	let dt = TimeStamp - LastTime;
	LastTime = TimeStamp;

	GAME.clear()

	for(let i=0;i<n;i++)
{
	if(GAME.collisionsBetween(hero[i],wall)){
	hero[i].vy=Math.abs(hero[i].vy);
		// console.log("Colision")
	}
	hero[i].animate(0,2,10,dt)
	

	GAME.render(hero[i],dt)
}
GAME.render(wall,dt)




// stats.end();
	window.requestAnimationFrame(gameloop)
}

window.requestAnimationFrame(gameloop);

// console.log(GAME);
// console.log(control);

