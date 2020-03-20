let GAME = {
	renderer: function(getcanvas,res) {
		this.canvas = getcanvas;
		this.canvas.width=window.innerWidth*(res/100)
		this.canvas.height=window.innerHeight*(res/100)
		let thiis=this
		window.onresize=function(){
			thiis.canvas.width=window.innerWidth*(res/100)
			thiis.canvas.height=window.innerHeight*(res/100)
		}
		this.ctx = getcanvas.getContext("2d");
		// this.last_scale=0;
	},
	edit: function(ob, ObjectName) {
		if (!this.editing) {
			this.editing = true;
			ob.editmode = true;
			ob.update = false;

			if (!ObjectName)
				this.EditingObjectName = prompt(
					"Enter name of the object that your are editing",
					"ObjectName"
				);
			else this.EditingObjectName = ObjectName;
			this.EditingCode = "";

			return "Your are now editing " + this.EditingObjectName;
		} else {
			alert(
				"You cannot edit two game object at once. Run GAME.stopediting(<ObjectName>) to stop editing the previous object."
			);
		}
	},
	stopediting: function(ob) {
		if (ob.editmode) {
			ob.editmode = false;
			ob.update = true;
			this.editing = false;

			this.canvas.onmousedown = {};
			this.canvas.onmousemove = {};
			this.canvas.oncontextmenu = {};
			this.canvas.onauxclick = {};

			return this.EditingCode;
		}
	},
	object: class {
		constructor(str, a, NoOfImage) {
			if (!a) a = 100;
			if (!str) str = "square";
			// this.name=this.constructor
			this.size = a;

			this.x = 0;
			this.y = 0;

			this.vx = 0;
			this.vy = 0;

			this.ax = 0;
			this.ay = 0;

			this.colour="#ff0000"

			this.update = true;

			this.editmode = false;

			this.type = str;

			if (str == "square")
				this.points = [
					{ x: a, y: a },
					{ x: -a, y: a },
					{ x: -a, y: -a },
					{ x: a, y: -a }
				];
			else if (str == "circle") {
				this.points = [
					{ x: a, y: a },
					{ x: -a, y: a },
					{ x: -a, y: -a },
					{ x: a, y: -a }
				];
			} else {
				this.points = [
					{ x: a, y: a },
					{ x: -a, y: a },
					{ x: -a, y: -a },
					{ x: a, y: -a }
				];
				this.image = new Image();
			

				this.animation = {
					frames: [],
					time: 0,
					count:0,
					fps: 1
				};
				let i = 0;
				while (i < NoOfImage) {
					try {
						this.animation.frames[i] = new Image();
						this.animation.frames[i].src =
							str.split(".")[str.split(".").length-2] + "-" + i + "." + str.split(".")[str.split(".").length-1];
						// console.log(this.animation.frames);
						i++;
					} catch {
						break;
					}
				}
				this.image=this.animation.frames[0]

			}
			this.polygon = new SAT.Polygon({ x: this.x, y: this.y }, this.points);
		}
		animate(start,stop,fps,dt){
			this.animation.time+=dt

			if(this.animation.time>1000/fps){
				this.animation.time=0;
				this.image=this.animation.frames[this.animation.count]

				this.animation.count++;

				if(this.animation.count>this.animation.frames.length-1){
				this.animation.count=0
					
				}

			}

		}

		addpoint(x, y) {
			let find_angle = function(x, y) {
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

			for (let i = 0; i < this.points.length - 1; i++) {
				angle1 = find_angle(this.points[i].x, this.points[i].y);
				angle2 = find_angle(this.points[i + 1].x, this.points[i + 1].y);
				// console.log(angle);
				// console.log(angle1);
				// console.log(angle2);

				if (angle >= angle1 && angle <= angle2) {
					angleChanged = true;
					for (let j = this.points.length - 1; j > i; j--) {
						this.points[j + 1] = this.points[j];
						// this.polygon.points[j+1]=this.polygon.points[j]
					}
					this.points[i + 1] = { x: x, y: y };
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
			if (!angleChanged) this.points.push({ x: x, y: y });
			angleChanged = false;

			this.polygon = new SAT.Polygon({ x: this.x, y: this.y }, this.points);
		}
		deletepoint(n) {
			for (let j = n; j < this.points.length - 1; j++)
				this.points[j] = this.points[j + 1];
			this.points[this.points.length] = {};
		}
	},

	collisionsBetween: function(ob1, ob2) {
		return SAT.testPolygonPolygon(ob1.polygon, ob2.polygon);
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
		ay: 0
	},
	render: function(ob, dt, uupdate) {
		// if (uupdate == null) update = true;
		// GAME.Response.clear();
		this.camera.vx += this.camera.ax * dt;
		this.camera.vy += this.camera.ay * dt;

		this.camera.x += this.camera.vx * dt;
		this.camera.y += this.camera.vy * dt;

		// this.scale = scale;
		// let scale_points = function(ob, scale) {
		// 	let ar = [];
		// 	for (i = 0; i < ob.points.length; i++) {
		// 		ar[i] = { x: ob.points[i].x  , y: ob.points[i].y  };
		// 	}
		// 	ob.polygon = new SAT.Polygon({ x: ob.x, y: ob.y }, ar);
		// };

		// let scalex = this.canvas.width / 1000;
		if(this.canvas.height<=this.canvas.width)
		scale = this.canvas.height / 1000;
		else
		scale = this.canvas.width / 1000;

		// console.log(this.canvas.height)

		// if(scale!=this.scale){
		// console.log("resizing")
		// scale_points(ob, scale);

		// }

		let kx = -this.camera.x * scale + ob.x * scale + this.canvas.width / 2;
		let ky = this.camera.y * scale - ob.y * scale + this.canvas.height / 2;

		if (ob.update) {
			ob.vx += ob.ax * dt;
			ob.vy += ob.ay * dt;

			ob.x += ob.vx * dt;
			ob.y += ob.vy * dt;

			// ob.polygon.translate(ob.vx * dt, ob.vy * dt)

			ob.polygon.pos.x = ob.x;
			ob.polygon.pos.y = ob.y;
		}

		// for(let i=0;i<ob.polygon.points.length;i++){
		// 	ob.polygon.points[i].x =ob.x+ob.points[i].x;
		// 	ob.polygon.points[i].y =ob.y+ob.points[i].y;
		// }
		if (ob.type == "square") {
			this.ctx.fillStyle = ob.colour;

			this.ctx.beginPath();
			this.ctx.moveTo(
				ob.points[0].x * scale + kx,
				-ob.points[0].y * scale + ky
			);
			// 			if(ob.editmode){
			// 		this.ctx.beginPath();
			// this.ctx.arc(ob.points[0].x * scale + kx, -ob.points[0].y * scale + ky, 10, 0, 2 * Math.PI);
			// this.ctx.fill();
			// this.ctx.beginPath();

			// }

			for (i = 1; i < ob.points.length; i++) {
				this.ctx.lineTo(
					ob.points[i].x * scale + kx,
					-ob.points[i].y * scale + ky
				);
				// 	if(ob.editmode){
				// 		this.ctx.beginPath();
				// this.ctx.arc(ob.points[0].x * scale + kx, -ob.points[0].y * scale + ky, 10, 0, 2 * Math.PI);
				// this.ctx.fill();
				// this.ctx.beginPath();	}
			}
			this.ctx.fill();
		} 
		else if (ob.type == "circle") {
		} else {
			// console.log(ob.animation.count)
			this.ctx.drawImage(
				ob.image,
				0,
				0,
				ob.image.width,
				ob.image.height,
				kx - (ob.image.width / 2) *ob.size*scale/100,
				ky - (ob.image.height / 2) * ob.size*scale/100,
				ob.image.width * ob.size*scale/100,
				ob.image.height *ob.size* scale/100
			);
			// console.log(ob.image.height * scale/100)
		}

		if (ob.editmode) {

			this.ctx.fillStyle = "#ab7def99";

			this.ctx.beginPath();
			this.ctx.moveTo(
				ob.points[0].x * scale + kx,
				-ob.points[0].y * scale + ky
			);
			// 			if(ob.editmode){
			// 		this.ctx.beginPath();
			// this.ctx.arc(ob.points[0].x * scale + kx, -ob.points[0].y * scale + ky, 10, 0, 2 * Math.PI);
			// this.ctx.fill();
			// this.ctx.beginPath();

			// }

			for (i = 1; i < ob.points.length; i++) {
				this.ctx.lineTo(
					ob.points[i].x * scale + kx,
					-ob.points[i].y * scale + ky
				);
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
				this.ctx.arc(
					ob.points[i].x * scale + kx,
					-ob.points[i].y * scale + ky,
					25 * scale,
					0,
					2 * Math.PI
				);
				// this.ctx.closePath()
				this.ctx.fill();
			}
			this.ctx.beginPath();

			this.ctx.fillStyle = "#00ff00";
			this.ctx.arc(kx, ky, 25 * scale, 0, 2 * Math.PI);
			this.ctx.fill();
			let canvas69 = this;
			// let p;

			// let EditAdd,EditMovePoint,EditMoveOrigin="",EditDelete

			this.canvas.onmousedown = function() {
				for (i = 0; i < ob.points.length; i++) {
					let x1 = ob.points[i].x * scale + kx;
					let y1 = -ob.points[i].y * scale + ky;
					let x2 = event.offsetX;
					let y2 = event.offsetY;
					if (
						Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <=
						25 * scale
					)
						p = i;
				}
				let x1 = kx;
				let y1 = ky;
				let x2 = event.offsetX;
				let y2 = event.offsetY;

				let px = ob.x * scale,
					py = ob.y * scale;

				if (
					Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <=
					25 * scale
				)
					p = -1;
				canvas69.canvas.onmousemove = function() {
					// console.log({x:(event.offsetX - kx) / scale,y:-(event.offsetY - ky) / scale})
					// console.log(event.offsetX)
					try {
						if (p >= 0) {
							ob.points[p] = {
								x: (event.offsetX - kx) / scale,
								y: -(event.offsetY - ky) / scale
							};
							EditMovePoint[p] =
								GAME.EditingObjectName +
								".points[" +
								p +
								"].x=" +
								(event.offsetX - kx) / scale +
								";\n" +
								GAME.EditingObjectName +
								".points[" +
								p +
								"].y=" +
								-(event.offsetY - ky) / scale +
								";\n";
							// 	+"<ObjectName>.points["+p+"].y="+-(event.offsetY - ky) / scale
							// 	console.log("<ObjectName>.points["+p+"].x="+(event.offsetX - kx) / scale+"\n"
							// 	+"<ObjectName>.points["+p+"].y="+-(event.offsetY - ky) / scale)
							// console.log("Change <ObjectName> to the name of the object that you edited and put the above code in your gamedesign.js")
						} else if (p == -1) {
							ob.x = (px + (event.offsetX - kx)) / scale;
							ob.y = (py - (event.offsetY - ky)) / scale;
							EditMoveOrigin =
								GAME.EditingObjectName +
								".x=" +
								(px + (event.offsetX - kx)) +
								";\n" +
								GAME.EditingObjectName +
								".y=" +
								-(py + (event.offsetY - ky)) +
								";\n";
						}
					} catch {}
					return false;
				};
			};

			this.canvas.oncontextmenu = function() {
				// console.log(event.offsetX)
				ob.addpoint(
					(event.offsetX - kx) / scale,
					-(event.offsetY - ky) / scale
				);
				GAME.EditingCode +=
					GAME.EditingObjectName +
					".addpoint(" +
					(event.offsetX - kx) / scale +
					"," +
					-(event.offsetY - ky) / scale +
					");\n";

				return false;
			};

			this.canvas.onauxclick = function() {
				if (event.button == 1) {
					for (i = 0; i < ob.points.length; i++) {
						let x1 = ob.points[i].x * scale + kx;
						let y1 = -ob.points[i].y * scale + ky;
						let x2 = event.offsetX;
						let y2 = event.offsetY;
						if (
							Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <=
							25 * scale
						) {
							ob.deletepoint(i);
							GAME.EditingCode +=
								GAME.EditingObjectName + ".deletepoint(" + i + ");\n";
						}
					}
					return false;
				}
			};
			this.canvas.onmouseup = function() {
				canvas69.canvas.onmousemove = {};
				try {
					GAME.EditingCode += EditMoveOrigin;
				} catch {}
				try {
					GAME.EditingCode += EditMovePoint;
				} catch {}
			};
		}
	},
	clear: function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	controller: class {
		constructor(left, right, up, down) {
			this.left = left;
			this.right = right;
			this.up = up;
			this.down = down;

			this.rightPressed = false;
			this.leftPressed = false;
			this.upPressed = false;
			this.downPressed = false;

			let ob = this;
			document.addEventListener("keydown", ControllerDown, false);
			document.addEventListener("keyup", ControllerUp, false);
			function ControllerDown(event) {
				if (event.key == ob.right) {
					ob.rightPressed = true;
				} else if (event.key == ob.left) {
					ob.leftPressed = true;
				}
				if (event.key == ob.down) {
					ob.downPressed = true;
				} else if (event.key == ob.up) {
					ob.upPressed = true;
				}
			}
			function ControllerUp(event) {
				if (event.key == ob.right) {
					ob.rightPressed = false;
				} else if (event.key == ob.left) {
					ob.leftPressed = false;
				}
				if (event.key == ob.down) {
					ob.downPressed = false;
				} else if (event.key == ob.up) {
					ob.upPressed = false;
				}
			}
		}
	}
};
