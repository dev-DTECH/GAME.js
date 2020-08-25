let GAME = {
	init: function (canvas, width, height, res) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		this.width = width;
		this.height = height;
		this.canvasWidth = width;
		this.canvasHeight = height;
		this.ratio = width / height;

		this.canvasWidth = (window.innerWidth - 10) * (res / 100);
		this.canvasHeight = (window.innerHeight - 10) * (res / 100);

		if (this.canvasHeight < this.canvasWidth / this.ratio)
			this.canvasWidth = this.canvasHeight * this.ratio;
		else this.canvasHeight = this.canvasWidth / this.ratio;

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		// this.ctx.imageSmoothingEnabled = false;
		this.ctx.translate(this.width / 2, this.height / 2);

		this.canvas.style.width = this.canvasWidth + "px";
		this.canvas.style.height = this.canvasHeight + "px";

		function resize() {
			this.canvasWidth = (window.innerWidth - 10) * (res / 100);
			this.canvasHeight = (window.innerHeight - 10) * (res / 100);

			if (this.canvasHeight < this.canvasWidth / this.ratio)
				this.canvasWidth = this.canvasHeight * this.ratio;
			else this.canvasHeight = this.canvasWidth / this.ratio;

			this.canvas.width = this.width;
			this.canvas.height = this.height;
			this.ctx.imageSmoothingEnabled = false;
			this.ctx.translate(this.width / 2, this.height / 2);

			this.canvas.style.width = this.canvasWidth + "px";
			this.canvas.style.height = this.canvasHeight + "px";
		}
		resize.bind(this);
		window.addEventListener("resize", resize.bind(this));
		this.camera.points=[
			{
				x:GAME.width/2,
				y:GAME.height/2
			},
			{
				x:-GAME.width/2,
				y:GAME.height/2
			},
			{
				x:-GAME.width/2,
				y:-GAME.height/2
			},
			{
				x:GAME.width/2,
				y:-GAME.height/2
			},
		]
	},
	editor: {
		edit: function (ob, ObjectName) {
			if (this.object) this.stopEditing();
			this.editing = true;
			ob.editmode = true;
			ob.update = false;
			this.object = ob;

			if (!ObjectName)
				this.objectName = prompt(
					"Enter name of the object that your are editing",
					"ObjectName"
				);
			else this.objectName = ObjectName;
			this.EditingCode = "";

			return "Your are now editing " + this.objectName;
		},
		stopEditing: function () {
			if (this.object.editmode) {
				this.object.editmode = false;
				this.object.update = true;
				this.editing = false;

				GAME.canvas.onmousedown = {};
				GAME.canvas.onmousemove = {};
				GAME.canvas.oncontextmenu = {};
				GAME.canvas.onauxclick = {};

				return this.EditingCode;
			}
		},
		addPoint(x, y) {
			let find_angle = function (x, y) {
				if (x > 0 && y > 0) return (Math.atan2(y, x) * 180) / Math.PI;
				if (x < 0 && y > 0) return (Math.atan2(y, x) * 180) / Math.PI;
				if (x > 0 && y < 0)
					return ((Math.PI * 2 + Math.atan2(y, x)) * 180) / Math.PI;
				if (x < 0 && y < 0)
					return ((Math.PI * 2 + Math.atan2(y, x)) * 180) / Math.PI;
				if (x == 0) {
					if (y > 0) return 90;
					else return 270;
				}
				if (y == 0) {
					if (x > 0) return 0;
					else return 180;
				}
				// return  (y >= 0&&x>=0 ? Math.atan2(y,x) : Math.abs(Math.atan2(y,x)))* 180 / Math.PI;
			};

			let angle, angle1, angle2;
			let angleChanged = false;

			angle = find_angle(x, y);

			for (let i = 0; i < this.object.points.length - 1; i++) {
				angle1 = find_angle(this.object.points[i].x, this.object.points[i].y);
				angle2 = find_angle(
					this.object.points[i + 1].x,
					this.object.points[i + 1].y
				);
				// console.log(angle);
				// console.log(angle1);
				// console.log(angle2);

				if (angle >= angle1 && angle <= angle2) {
					angleChanged = true;
					for (let j = this.object.points.length - 1; j > i; j--) {
						this.object.points[j + 1] = this.object.points[j];
						// this.polygon.points[j+1]=this.polygon.points[j]
					}
					this.object.points[i + 1] = { x: x, y: y };
					// this.polygon.points[i+1] = {x:x, y:y};

					break;
				}
				// angle1 = find_angle(this.points[0].x, this.points[0][1]);
				// angle2 = find_angle(
				// 	this.points[this.points.length - 1][0],
				// 	this.points[this.points.length - 1][1]
				// );

				// if (angle <= angle1 && angle >= angle2) {
				// 	this.points[this.points.length] = [x, y];
				// 	break;
				// }
				// console.log(angleChanged)
			}
			if (!angleChanged) this.object.points.push({ x: x, y: y });
			angleChanged = false;

			// this.object.polygon = new SAT.Polygon(
			// 	{ x: this.object.x, y: this.object.y },
			// 	this.object.points
			// );
		},
		deletePoint(n) {
			for (let j = n; j < this.object.points.length - 1; j++)
				this.object.points[j] = this.object.points[j + 1];
			this.object.points[this.object.points.length] = {};
		},
		open: (ar) => {
			let editor = document.createElement("div");
			editor.id = "editor";

			editor.innerHTML = `
			<style>
			#editor{
				display: block;
				position: fixed;
				top: 0;
				left: 0;
				width: 200px;
				height: 200px;
				background-color: white;
				border-radius: calc(29px / 2);
				margin: calc(29px / 2);
				
			}
			#editor > nav{
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: darkorange;
				border-radius: calc(29px / 2);
			}
			#editor > nav > button{
				border-radius: 50%;
				padding: 5px;
				text-align: center;
				width: 29px;
			}
			#editor > button{
				padding: 5px;
				border-radius: 5px;
			}
			#editor > #stop{
				position: absolute;
				margin: calc(29px / 2);
				bottom: 0;
				right: 0;
			}
			</style>
			<nav>
				<div id="tittle">GAME.editor</div>
				<button id="close" onclick="GAME.editor.close()">X</button>
			</nav>
			<label>Edit: 
			`;
			for (let i = 0; i < ar.length; i++) {
				editor.innerHTML += `
				<button onclick="GAME.editor.edit(${ar[i]},'${ar[i]}')">${ar[i]}</button>
				`;
			}
			editor.innerHTML += `
			</label>
			<div id="code"></div>
			<button id="stop" onclick="GAME.editor.stopEditing()">Stop Editing</button>
			`;
			editor.onmousedown = (e) => {
				let initialX = e.offsetX;
				let initialY = e.offsetY;
				editor.onmousemove = (e) => {
					// console.log(e.clientX,e.clientY)
					editor.style.left = -initialX + e.pageX + "px";
					editor.style.top = -initialY + e.pageY + "px";
				};
			};
			editor.onmouseup = () => {
				editor.onmousemove = {};
			};
			editor.onmouseleave = () => {
				editor.onmousemove = {};
			};
			document.body.append(editor);
		},
		close: () => {
			document.getElementById("editor").style.display = "none";
		},
	},
	objects: [],
	object: class {
		constructor(str, a, NoOfImage) {
			if (!a) a = 100;
			if (!str) str = "square";
			// this.name=this.constructor
			this.size = a;

			this.x = 0;
			this.y = 0;

			this.virtualX = 0;
			this.virtualY = 0;

			this.vx = 0;
			this.vy = 0;

			this.ax = 0;
			this.ay = 0;

			this.rotation = {
				angle: 0,
				omega: 0,
			};
			// this.move = {
			// 	x: 0,
			// 	y: 0,
			// };

			this.colour = "#ff0000";

			this.update = true;

			this.editmode = false;

			this.type = str;

			if (str == "square") {
				this.points = [
					{ x: a, y: a },
					{ x: -a, y: a },
					{ x: -a, y: -a },
					{ x: a, y: -a },
				];
				this.width = 2 * a;
				this.height = 2 * a;
			} else if (str == "circle") {
				this.points = [
					{ x: a, y: 0 },
					{ x: 0, y: a },
					{ x: -a, y: 0 },
					{ x: 0, y: -a },
				];
				this.radius = a;
			} else {
				this.image = new Image();

				this.animation = {
					frames: [],
					time: 0,
					count: 0,
					fps: 1,
				};
				let i = 0;
				while (i < NoOfImage) {
					try {
						this.animation.frames[i] = new Image();
						this.animation.frames[i].src =
							str.split(".")[str.split(".").length - 2] +
							"-" +
							i +
							"." +
							str.split(".")[str.split(".").length - 1];

						// console.log(this.animation.frames);
						i++;
					} catch {
						break;
					}
				}
				this.image = this.animation.frames[0];

				// console.log(this.image.height);
				this.image.onload = () => {
					// while (this.image.height != 0) {
					// console.log(this.image.height);

					this.points = [
						{
							x: ((this.image.width / 2) * a) / 100,
							y: ((this.image.height / 2) * a) / 100,
						},
						{
							x: ((-this.image.width / 2) * a) / 100,
							y: ((this.image.height / 2) * a) / 100,
						},
						{
							x: ((-this.image.width / 2) * a) / 100,
							y: ((-this.image.height / 2) * a) / 100,
						},
						{
							x: ((this.image.width / 2) * a) / 100,
							y: ((-this.image.height / 2) * a) / 100,
						},
					];
					// this.points = [
					// 	{ x: a, y: a },
					// 	{ x: -a, y: a },
					// 	{ x: -a, y: -a },
					// 	{ x: a, y: -a },
					// ];
					this.width = (this.image.width * a) / 100;
					this.height = (this.image.height * a) / 100;
				};
			}
			// GAME.objects.push(this)

			// this.polygon = new SAT.Polygon({ x: this.x, y: this.y }, this.points);
		}
		move(vx, vy, dt) {
			if (this.update && !GAME.paused) {
				// console.log(vx,vy,dt)
				this.x +=
					(-vx * Math.cos(this.rotation.angle) +
						vy * Math.sin(this.rotation.angle)) *
					dt;
				this.y +=
					(vx * Math.sin(this.rotation.angle) +
						vy * Math.cos(this.rotation.angle)) *
					dt;
			}
		}
		animate(start, stop, fps, dt) {
			if (this.update && !GAME.paused) {
				this.animation.time += dt;

				if (this.animation.time > 1000 / fps) {
					this.animation.time = 0;
					this.image = this.animation.frames[this.animation.count];

					this.animation.count++;

					if (this.animation.count > this.animation.frames.length - 1) {
						this.animation.count = 0;
					}
				}
			}
		}
	},
	light: class {
		constructor(radius, color) {
			this.x = 0;
			this.y = 0;
			this.rotation = {
				angle: 0,
				omega: 0,
			};

			this.points = [];

			this.ob_points = [];
			this.ob_lines = [];

			this.obstacles = [];

			this.type = "light";

			this.color = color;

			this.radius = radius;

			this.on = true;
		}
		addObstacle(ob) {
			if (Array.isArray(ob)) this.obstacles = this.obstacles.concat(ob);
			else this.obstacles.push(ob);
		}
		cal() {
			this.ob_points = [];
			this.ob_lines = [];

			this.obstacles.forEach((ob, i) => {
				ob.points.forEach((point, j) => {
					let poly = new GAME.polygon(ob);

					this.ob_points.push({
						x: poly.points[j].x,
						// point.x * Math.cos(-ob.rotation.angle) -
						// point.y * Math.sin(-ob.rotation.angle) +
						// ob.x,
						y: poly.points[j].y,
						// point.x * Math.sin(-ob.rotation.angle) +
						// point.y * Math.cos(-ob.rotation.angle) +
						// ob.y,
					});

					this.ob_lines[i * 4 + j] = { a: {}, b: {} };
					if (j < 3) {
						this.ob_lines[i * 4 + j].a.x = poly.points[j].x;
						this.ob_lines[i * 4 + j].a.y = poly.points[j].y;
						// console.log(j+1)
						this.ob_lines[i * 4 + j].b.x = poly.points[j + 1].x;
						this.ob_lines[i * 4 + j].b.y = poly.points[j + 1].y;
					} else {
						this.ob_lines[i * 4 + j].a.x = poly.points[j].x;
						this.ob_lines[i * 4 + j].a.y = poly.points[j].y;
						// console.log(j+1)
						this.ob_lines[i * 4 + j].b.x = poly.points[0].x;
						this.ob_lines[i * 4 + j].b.y = poly.points[0].y;
					}
				});
			});
			let cam =new GAME.polygon(GAME.camera)

			let wx=(GAME.width / 2)+ (GAME.width / 2)* Math.cos(-GAME.camera.rotation.angle) -
			(GAME.height / 2) * Math.sin(-GAME.camera.rotation.angle) +GAME.camera.x
			
			let wy=(GAME.height/ 2)+ (GAME.width / 2)* Math.sin(-GAME.camera.rotation.angle) +
			(GAME.height / 2) * Math.cos(-GAME.camera.rotation.angle) +GAME.camera.x
			

			this.ob_lines = this.ob_lines.concat([
				{
					a: cam.points[0],
					b: cam.points[1],
				},
				{
					a: cam.points[0],
					b: cam.points[3],
				},
				{
					a: cam.points[2],
					b: cam.points[1],
				},
				{
					a: cam.points[2],
					b: cam.points[3],
				},
			]);

			this.ob_points = this.ob_points.concat(cam.points);
			var uniqueAngles = [];
			for (var j = 0; j < this.ob_points.length; j++) {
				var uniquePoint = this.ob_points[j];
				var angle = Math.atan2(uniquePoint.y - this.y, uniquePoint.x - this.x);
				uniquePoint.angle = angle;
				uniqueAngles.push(angle - 0.00001, angle, angle + 0.00001);
			}
			// console.log(uniqueAngles.length)
			// RAYS IN ALL DIRECTIONS
			var intersects = [];
			for (var j = 0; j < uniqueAngles.length; j++) {
				var angle = uniqueAngles[j];

				// Calculate dx & dy from angle
				var dx = Math.cos(angle);
				var dy = Math.sin(angle);

				// Ray from center of screen tolight
				var ray = {
					a: { x: light.x, y: light.y },
					b: { x: light.x + dx, y: light.y + dy },
				};

				// Find CLOSEST intersection
				var closestIntersect = null;
				for (var i = 0; i < this.ob_lines.length; i++) {
					var intersect = this.getIntersection(ray, this.ob_lines[i]);
					if (!intersect) continue;
					if (!closestIntersect || intersect.param < closestIntersect.param) {
						closestIntersect = intersect;
					}
				}

				// Intersect angle
				if (!closestIntersect) continue;
				closestIntersect.angle = angle;

				// Add to list of intersects
				intersects.push(closestIntersect);
			}

			// Sort intersects by angle
			intersects = intersects.sort(function (a, b) {
				return a.angle - b.angle;
			});
			// DRAW AS A GIANT POLYGON
			let grd = GAME.ctx.createRadialGradient(
				this.x,
				-this.y,
				0,
				this.x,
				-this.y,
				this.radius
			);
			grd.addColorStop(0, this.color);
			grd.addColorStop(1, "#00000000");
			this.colour = grd;
			// light.colour = "white";
			this.points = intersects;
		}
		getIntersection(ray, segment) {
			// RAY in parametric: Point + Delta*T1
			var r_px = ray.a.x;
			var r_py = ray.a.y;
			var r_dx = ray.b.x - ray.a.x;
			var r_dy = ray.b.y - ray.a.y;

			// SEGMENT in parametric: Point + Delta*T2
			var s_px = segment.a.x;
			var s_py = segment.a.y;
			var s_dx = segment.b.x - segment.a.x;
			var s_dy = segment.b.y - segment.a.y;

			// Are they parallel? If so, no intersect
			var r_mag = Math.sqrt(r_dx * r_dx + r_dy * r_dy);
			var s_mag = Math.sqrt(s_dx * s_dx + s_dy * s_dy);
			if (r_dx / r_mag == s_dx / s_mag && r_dy / r_mag == s_dy / s_mag) {
				// Unit vectors are the same.
				return null;
			}

			// SOLVE FOR T1 & T2
			// r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
			// ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
			// ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
			// ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
			var T2 =
				(r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) /
				(s_dx * r_dy - s_dy * r_dx);
			var T1 = (s_px + s_dx * T2 - r_px) / r_dx;

			// Must be within parametic whatevers for RAY/SEGMENT
			if (T1 < 0) return null;
			if (T2 < 0 || T2 > 1) return null;

			// Return the POINT OF INTERSECTION
			return {
				x: r_px + r_dx * T1,
				y: r_py + r_dy * T1,
				param: T1,
			};
		}
	},
	polygon: class {
		constructor(ob) {
			// this.x = { max: 0, min: 0 };
			// this.y = { max: 0, min: 0 };
			this.points = [];
			this.angle = ob.rotation.angle;
			//offsetting the points of polygon
			ob.points.forEach((point, i) => {
				this.points[i] = {
					x:
						point.x * Math.cos(-ob.rotation.angle) -
						point.y * Math.sin(-ob.rotation.angle) +
						ob.x,
					y:
						point.x * Math.sin(-ob.rotation.angle) +
						point.y * Math.cos(-ob.rotation.angle) +
						ob.y,
					// y: point.y + ob.y,
				};
			});
		}
	},
	collisionsBetween: function (ob1, ob2, static) {
		let poly1 = new GAME.polygon(ob1);
		let poly2 = new GAME.polygon(ob2);

		let overlap = Infinity;
		for (let i = 0; i < 2; i++) {
			if (i == 1) {
				poly1 = new GAME.polygon(ob2);
				poly2 = new GAME.polygon(ob1);
			}
			for (let a = 0; a < poly1.points.length; a++) {
				let b = (a + 1) % poly1.points.length;

				let axisProj = {
					x: -(poly1.points[b].y - poly1.points[a].y),
					y: poly1.points[b].x - poly1.points[a].x,
				};
				let min_r1 = Infinity,
					max_r1 = -Infinity;
				for (let p = 0; p < poly1.points.length; p++) {
					let q =
						poly1.points[p].x * axisProj.x + poly1.points[p].y * axisProj.y;
					min_r1 = Math.min(min_r1, q);
					max_r1 = Math.max(max_r1, q);
				}
				let min_r2 = Infinity,
					max_r2 = -Infinity;
				for (let p = 0; p < poly2.points.length; p++) {
					let q =
						poly2.points[p].x * axisProj.x + poly2.points[p].y * axisProj.y;
					min_r2 = Math.min(min_r2, q);
					max_r2 = Math.max(max_r2, q);
				}
				overlap = Math.min(
					Math.min(max_r1, max_r2) - Math.max(min_r1, min_r2),
					overlap
				);

				if (!(max_r2 >= min_r1 && max_r1 >= min_r2)) return false;
			}
		}
		// let d = { x:ob2.x - ob1.x, y:ob2.y - ob1.y };
		// let s = Math.sqrt(d.x*d.x + d.y*d.y);
		// ob1.x -= overlap*d.x/s
		// ob1.y -= overlap*d.y/s
		return true;
		// poly1.findMinMax();
		// poly2.findMinMax();

		// // console.log(poly1.x,poly1.y,poly2.x,poly2.y)

		// if (
		// 	(poly1.x.max > poly2.x.min && poly1.x.min < poly2.x.max) &&
		// 	(poly1.y.max > poly2.y.min && poly1.y.min < poly2.y.max)
		// )
		// 	return true;
		// else return false;
	},

	/////////////
	///concept///
	/////////////

	// wall: function(width,height)
	// {
	// 	this.wall.left=new GAME.object("square",100);
	// 	this.wall.left.x=width;

	// 	this.wall.right=new GAME.object("square",100);
	// 	this.wall.left.x=-width;

	// 	this.wall.up=new GAME.object("square",100);
	// 	this.wall.left.y=height;

	// 	this.wall.down=new GAME.object("square",100);
	// 	this.wall.left.y=-height;

	// },
	camera: {
		x: 0,
		y: 0,

		vx: 0,
		vy: 0,

		ax: 0,
		ay: 0,
		rotation: {
			angle: 0,
			omega: 0,
		},

		move(vx, vy, dt) {
			if (!GAME.paused) {
				// console.log(vx,vy,dt)
				this.x +=
					(-vx * Math.cos(this.rotation.angle) +
						vy * Math.sin(this.rotation.angle)) *
					dt;
				this.y +=
					(vx * Math.sin(this.rotation.angle) +
						vy * Math.cos(this.rotation.angle)) *
					dt;
			}
		},
	},
	updateCamera: function (dt) {
		if (!GAME.paused) {
			this.camera.vx += this.camera.ax * dt;
			this.camera.vy += this.camera.ay * dt;

			this.camera.x += this.camera.vx * dt;
			this.camera.y += this.camera.vy * dt;

			this.camera.rotation.angle += this.camera.rotation.omega * dt;
		}
	},
	// loop() {},
	// design(){},
	lastTime: 0,
	gameLoop(TimeStamp) {
		let dt = TimeStamp - GAME.lastTime;
		GAME.lastTime = TimeStamp;
		GAME.loop(dt);
		window.requestAnimationFrame(GAME.gameLoop);
	},
	start() {
		window.requestAnimationFrame(this.gameLoop);
	},
	play() {
		GAME.paused = false;
		// this.loop()
	},
	pause() {
		GAME.paused = true;
	},
	// bruh: function (ob){
	// 	ob.
	// },
	render: function (ob, dt) {
		// if (uupdate == null) update = true;
		// GAME.Response.clear();

		// function distanceBetween(x1,y1,x2,y2){
		// 	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))
		// }
		// let r = distanceBetween(0,0,ob.move.x,ob.move.y)
		// // let kx = -this.camera.x + r*Math.cos(ob.rotation.angle);
		// // let ky = this.camera.y - r*Math.sin(ob.rotation.angle);
		// if(bool)
		// {
		// 	ob.virtualX= r*Math.cos(ob.rotation.angle)
		// 	ob.virtualY= r*Math.sin(ob.rotation.angle)

		// }
		// else
		// {
		// 	ob.virtualX=ob.x
		// 	ob.virtualY=ob.y
		// }
		// let sin = Math.sin(this.camera.rotation.angle);
		// let cos = Math.cos(this.camera.rotation.angle);

		// let kx =
		// 	this.camera.x +
		// 	(-this.camera.move.x * cos - this.camera.move.y * sin) +
		// 	(ob.x + (ob.move.x * cos + ob.move.y * sin));
		// let ky =
		// 	this.camera.y +
		// 	(-this.camera.move.x * sin + this.camera.move.y * cos) +
		// 	(-ob.y + (ob.move.x * sin - ob.move.y * cos));

		// this.scale = scale;
		// let scale_points = function (ob) {
		// 	let ar = [];
		// 	for (i = 0; i < ob.points.length; i++) {
		// 		ar[i] = { x: ob.points[i].x, y: ob.points[i].y };
		// 	}
		// 	ob.polygon = new SAT.Polygon({ x: ob.x, y: ob.y }, ar);
		// };

		// let scalex = this.canvas.width / 1000;
		// if (this.canvas.height <= this.canvas.width)
		// 	scale = this.canvas.height / 100;
		// else scale = this.canvas.width / 100;

		// console.log(this.canvas.height)

		// if(scale!=this.scale){
		// // console.log("resizing")

		// }

		// scale_points(ob);

		if (ob.update && !GAME.paused) {
			ob.vx += ob.ax * dt;
			ob.vy += ob.ay * dt;

			ob.x += ob.vx * dt;
			ob.y += ob.vy * dt;

			ob.rotation.angle += ob.rotation.omega * dt;

			// ob.polygon.translate(ob.vx * dt, ob.vy * dt)
			// console.log(ob.y)

			// ob.polygon.pos.x = ob.x;
			// ob.polygon.pos.y = ob.y;

			// console.log(ob.polygon.pos)
			// console.log(ob.x,ob.y)
		}

		// for(let i=0;i<ob.polygon.points.length;i++){
		// 	ob.polygon.points[i].x =ob.x+ob.points[i].x;
		// 	ob.polygon.points[i].y =ob.y+ob.points[i].y;
		// }

		let kx = -this.camera.x + ob.x;
		let ky = this.camera.y - ob.y;
		this.ctx.save();

		this.ctx.fillStyle = ob.colour;

		if (!ob.fixed) {
			this.ctx.rotate(-this.camera.rotation.angle);
			this.ctx.translate(-this.camera.x, this.camera.y);
		}
		if (ob.type != "light") this.ctx.translate(ob.x, -ob.y);
		this.ctx.rotate(ob.rotation.angle);

		if (ob.type == "light") {
			if (ob.on) {
				ob.cal();
				this.ctx.beginPath();
				this.ctx.moveTo(ob.points[0].x, -ob.points[0].y);
				// 			if(ob.editmode){
				// 		this.ctx.beginPath();
				// this.ctx.arc(ob.points[0].x * scale + kx, -ob.points[0].y * scale + ky, 10, 0, 2 * Math.PI);
				// this.ctx.fill();
				// this.ctx.beginPath();

				// }

				for (i = 1; i < ob.points.length; i++) {
					this.ctx.lineTo(ob.points[i].x, -ob.points[i].y);
					// 	if(ob.editmode){
					// 		this.ctx.beginPath();
					// this.ctx.arc(ob.points[0].x * scale + kx, -ob.points[0].y * scale + ky, 10, 0, 2 * Math.PI);
					// this.ctx.fill();
					// this.ctx.beginPath();	}
				}
				this.ctx.fill();
			}
		} else if (ob.type == "square") {
			this.ctx.beginPath();
			this.ctx.moveTo(ob.points[0].x, -ob.points[0].y);
			// 			if(ob.editmode){
			// 		this.ctx.beginPath();
			// this.ctx.arc(ob.points[0].x * scale + kx, -ob.points[0].y * scale + ky, 10, 0, 2 * Math.PI);
			// this.ctx.fill();
			// this.ctx.beginPath();

			// }

			for (i = 1; i < ob.points.length; i++) {
				this.ctx.lineTo(ob.points[i].x, -ob.points[i].y);
				// 	if(ob.editmode){
				// 		this.ctx.beginPath();
				// this.ctx.arc(ob.points[0].x * scale + kx, -ob.points[0].y * scale + ky, 10, 0, 2 * Math.PI);
				// this.ctx.fill();
				// this.ctx.beginPath();	}
			}
			this.ctx.fill();
		} else if (ob.type == "circle") {
			this.ctx.beginPath();
			this.ctx.arc(0, 0, ob.radius, 0, 2 * Math.PI);
			this.ctx.fill();
		} else {
			// console.log(ob.animation.count)
			this.ctx.drawImage(
				ob.image,
				0,
				0,
				ob.image.width,
				ob.image.height,
				-((ob.image.width / 2) * ob.size) / 100,
				-((ob.image.height / 2) * ob.size) / 100,
				(ob.image.width * ob.size) / 100,
				(ob.image.height * ob.size) / 100
			);
			// console.log(ob.image.height * scale/100)
		}

		if (ob.editmode || GAME.edit) {
			this.ctx.fillStyle = "#ab7def99";

			this.ctx.beginPath();
			this.ctx.moveTo(ob.points[0].x, -ob.points[0].y);
			// 			if(ob.editmode){
			// 		this.ctx.beginPath();
			// this.ctx.arc(ob.points[0].x * scale + kx, -ob.points[0].y * scale + ky, 10, 0, 2 * Math.PI);
			// this.ctx.fill();
			// this.ctx.beginPath();

			// }

			for (i = 1; i < ob.points.length; i++) {
				this.ctx.lineTo(ob.points[i].x, -ob.points[i].y);
				// 	if(ob.editmode){
				// 		this.ctx.beginPath();
				// this.ctx.arc(ob.points[0].x * scale + kx, -ob.points[0].y * scale + ky, 10, 0, 2 * Math.PI);
				// this.ctx.fill();
				// this.ctx.beginPath();	}
			}
			this.ctx.fill();

			this.ctx.fillStyle = "#ff0000";
			for (i = 0; i < ob.points.length; i++) {
				// console.log(i+this.ctx.fillStyle)
				this.ctx.beginPath();
				this.ctx.arc(ob.points[i].x, -ob.points[i].y, 25, 0, 2 * Math.PI);
				// this.ctx.closePath()
				this.ctx.fill();
			}
			this.ctx.beginPath();

			this.ctx.fillStyle = "#00ff00";
			this.ctx.arc(0, 0, 25, 0, 2 * Math.PI);
			this.ctx.fill();
			let p;

			// let EditAdd,EditMovePoint,EditMoveOrigin="",EditDelete

			this.canvas.onmousedown = function () {
				let x2 = (event.offsetX - GAME.canvasWidth / 2) / (GAME.canvasHeight / GAME.height) + GAME.camera.x;
				let y2 = -(event.offsetY - GAME.canvasHeight / 2) / (GAME.canvasHeight / GAME.height) + GAME.camera.y;
				for (i = 0; i < ob.points.length; i++) {
					let x1 = ob.points[i].x+kx;
					let y1 = ob.points[i].y-ky ;

					if (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= 25)
						p = i;
				}
				let x1 = kx;
				let y1 = -ky;

				let px = ob.x,
					py = ob.y;

				if (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= 25)
					p = -1;
				console.log(p)
				
				canvas69.canvas.onmousemove = function () {
					// console.log({x:(event.offsetX - kx) / scale,y:-(event.offsetY - ky) / scale})
					// console.log(event.offsetX)
					try {
						if (p >= 0) {
							ob.points[p] = {
								x: (event.offsetX - GAME.canvasWidth / 2) / (GAME.canvasHeight / GAME.height) + GAME.camera.x-ob.x,
								y:(-(event.offsetY - GAME.canvasHeight / 2) / (GAME.canvasHeight / GAME.height) + GAME.camera.y-ob.y ),
							};
							EditMovePoint[p] =
								GAME.editor.objectName +
								".points[" +
								p +
								"].x=" +
								(event.offsetX - kx) +
								";\n" +
								GAME.editor.objectName +
								".points[" +
								p +
								"].y=" +
								-(event.offsetY - ky) +
								";\n";
							// 	+"<ObjectName>.points["+p+"].y="+-(event.offsetY - ky) / scale
							// 	console.log("<ObjectName>.points["+p+"].x="+(event.offsetX - kx) / scale+"\n"
							// 	+"<ObjectName>.points["+p+"].y="+-(event.offsetY - ky) / scale)
							// console.log("Change <ObjectName> to the name of the object that you edited and put the above code in your gamedesign.js")
						} else if (p == -1) {
				console.log(p)
							ob.x = px + (event.offsetX - GAME.canvasWidth / 2) / (GAME.canvasHeight / GAME.height) + GAME.camera.x;
							ob.y = py -(event.offsetY - GAME.canvasHeight / 2) / (GAME.canvasHeight / GAME.height) + GAME.camera.y ;
							mouse.x = px + (event.offsetX - GAME.canvasWidth / 2) / (GAME.canvasHeight / GAME.height) + GAME.camera.x;
							mouse.y = py -(event.offsetY - GAME.canvasHeight / 2) / (GAME.canvasHeight / GAME.height) + GAME.camera.y ;
							// console.log(ob.x,",",ob.y)
							EditMoveOrigin =
								GAME.objectName +
								".x=" +
								(px + (event.offsetX - kx)) +
								";\n" +
								GAME.objectName +
								".y=" +
								-(py + (event.offsetY - ky)) +
								";\n";
						}
					} catch { }
					return false;
				};
			};

			this.canvas.oncontextmenu = function () {
				// console.log(event.offsetX)
				GAME.editor.addPoint(
					(event.offsetX - GAME.canvasWidth / 2) / (GAME.canvasHeight / GAME.height) + GAME.camera.x-ob.x ,

					(-(event.offsetY - GAME.canvasHeight / 2) / (GAME.canvasHeight / GAME.height) + GAME.camera.y )-ob.y
				);
				GAME.editor.EditingCode +=
					GAME.editor.objectName +
					".addPoint(" +
					(event.offsetX - kx) +
					"," +
					-(event.offsetY - ky) +
					");\n";

				return false;
			};

			this.canvas.onauxclick = function () {
				if (event.button == 1) {
					for (i = 0; i < ob.points.length; i++) {
						let x1 = ob.points[i].x + kx;
						let y1 = -ob.points[i].y + ky;
						let x2 = event.offsetX;
						let y2 = event.offsetY;
						if (
							Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= 25
						) {
							GAME.editor.deletePoint(i);
							GAME.EditingCode +=
								GAME.objectName + ".deletePoint(" + i + ");\n";
						}
					}
					return false;
				}
			};
			let canvas69 = this;

			this.canvas.onmouseup = function () {
				canvas69.canvas.onmousemove = {};
				// canvas69.canvas.onmousedown = {};
				try {
					GAME.EditingCode += EditMoveOrigin;
				} catch { }
				try {
					GAME.EditingCode += EditMovePoint;
				} catch { }
			};
		}
		this.ctx.restore();
		// this.ctx.translate(-ob.move.x,-ob.move.y)

		// this.ctx.rotate(-ob.rotation.angle);
		// this.ctx.translate(-kx, -ky);
		// // this.ctx.translate(this.camera.move.x,this.camera.move.y)

		// this.ctx.rotate(this.camera.rotation.angle)

		// this.ctx.rotate(-ob.angle)
		// this.ctx.translate(-ob.x,-ob.y)
	},
	clear: function () {
		this.ctx.clearRect(
			-this.width / 2,
			-this.height / 2,
			this.width,
			this.height
		);
	},
	controller: class {
		constructor(keys) {
			this.key = [];
			this.keys = keys;
			let thiis = this;
			for (let i = 0; i < keys.length; i++) {
				this.key[i] = {
					name: keys[i],
					pressed: false,
				};
			}
			document.addEventListener("keydown", ControllerDown, false);
			document.addEventListener("keyup", ControllerUp, false);
			function ControllerDown(event) {
				event.preventDefault();
				for (let i = 0; i < keys.length; i++) {
					if (event.key == keys[i]) thiis.key[i].pressed = true;
				}
			}
			function ControllerUp(event) {
				event.preventDefault();

				for (let i = 0; i < keys.length; i++) {
					if (event.key == keys[i]) thiis.key[i].pressed = false;
				}
			}
		}
		keyPressed(key) {
			return this.key[this.keys.indexOf(key)].pressed;
		}
	},
	touchController: class {
		constructor(keys) {
			this.key = [];
			this.pressed = false;

			for (let i = 0; i < keys.length; i++) {
				this.key[i] = new GAME.object("circle", 50);
				this.key[i].pressed = false;
				this.key[i].colour = "#00000099";
				this.key[i].fixed = true;
			}
			GAME.canvas.addEventListener("touchstart", touchStart.bind(this), false);
			GAME.canvas.addEventListener("touchmove", touchMove.bind(this), false);
			GAME.canvas.addEventListener("touchend", touchEnd.bind(this), false);
			function touchStart(event) {
				event.preventDefault();

				this.x =
					(event.touches[0].clientX -
						GAME.canvas.getBoundingClientRect().x -
						GAME.canvasWidth / 2) /
					(GAME.canvasHeight / GAME.height) +
					GAME.camera.x;
				this.y =
					-(
						event.touches[0].clientY -
						GAME.canvas.getBoundingClientRect().y -
						GAME.canvasHeight / 2
					) /
					(GAME.canvasHeight / GAME.height) +
					GAME.camera.y;
				this.pressed = true;
				for (let i = 0; i < keys.length; i++) {
					// const element = array[i];
					for (let j = 0; j < event.touches.length; j++) {
						// const element = array[j];
						let x1 =
							(event.touches[j].clientX -
								GAME.canvas.getBoundingClientRect().x -
								GAME.canvasWidth / 2) /
							(GAME.canvasHeight / GAME.height) +
							GAME.camera.x;
						let y1 =
							-(
								event.touches[j].clientY -
								GAME.canvas.getBoundingClientRect().y -
								GAME.canvasHeight / 2
							) /
							(GAME.canvasHeight / GAME.height) +
							GAME.camera.y;
						let x2 = this.key[i].x + GAME.camera.x;
						let y2 = this.key[i].y + GAME.camera.y;
						if (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) <= 50)
							this.key[i].pressed = true;
						else this.key[i].pressed = false;

						// let dist=Math.sqrt()
					}
				}
			}
			function touchMove(event) {
				event.preventDefault();

				this.x =
					(event.touches[0].clientX -
						GAME.canvas.getBoundingClientRect().x -
						GAME.canvasWidth / 2) /
					(GAME.canvasHeight / GAME.height) +
					GAME.camera.x;
				this.y =
					-(
						event.touches[0].clientY -
						GAME.canvas.getBoundingClientRect().y -
						GAME.canvasHeight / 2
					) /
					(GAME.canvasHeight / GAME.height) +
					GAME.camera.y;
				for (let i = 0; i < keys.length; i++) {
					// const element = array[i];
					for (let j = 0; j < event.touches.length; j++) {
						// const element = array[j];
						let x1 =
							(event.touches[j].clientX -
								GAME.canvas.getBoundingClientRect().x -
								GAME.canvasWidth / 2) /
							(GAME.canvasHeight / GAME.height) +
							GAME.camera.x;
						let y1 =
							-(
								event.touches[j].clientY -
								GAME.canvas.getBoundingClientRect().y -
								GAME.canvasHeight / 2
							) /
							(GAME.canvasHeight / GAME.height) +
							GAME.camera.y;
						let x2 = this.key[i].x + GAME.camera.x;
						let y2 = this.key[i].y + GAME.camera.y;
						if (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) <= 50)
							this.key[i].pressed = true;
						else this.key[i].pressed = false;

						// let dist=Math.sqrt()
					}
				}
				// console.log(this.x,this.y)
			}
			function touchEnd(event) {
				this.x = null;
				this.y = null;
				this.pressed = false;
				for (let i = 0; i < keys.length; i++) {
					// const element = array[i];
					this.key[i].pressed = false;
				}
			}
		}
		render() {
			for (let i = 0; i < this.key.length; i++) {
				// const element = array[i];
				GAME.render(this.key[i], 0);
			}
		}
	},
};
