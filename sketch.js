let points = [];
let ptColors = [];

let w = 200;
let h = 200;

function setup() {
	createCanvas(w, h);
	let p0 = new PointWithColor(
		createVector(randomInt(w), randomInt(h)),
		color(randomInt(255), randomInt(255), randomInt(255))
	);
	points.push(p0);

}

function draw() {
	background(0);
	// scale(2.0);
	for (let x = 0; x < w; x++) {
		for (let y = 0; y < h; y++) {
			let curr = createVector(x, y);
			let color = points[0].c;
			let closestDist = metric(points[0].p, curr);
			for (let pt of points) {
				let p = pt.p;
				let c = pt.c;
				let d = metric(p, curr);
				if (d < closestDist) {
					closestDist = d;
					color = c;
				}
			}
			stroke(color);
			strokeWeight(1);
			point(x, y);
		}
	}

	stroke(255);
	strokeWeight(10);
	for (let p of points) {
		point(p.p.x, p.p.y);
	}
}

function mousePressed() {
	let p = createVector(mouseX, mouseY);
	if (p.x < w && p.y < h) {
		points.push(new PointWithColor(
			p,
			color(randomInt(255), randomInt(255), randomInt(255))
		));
	}
}

class PointWithColor {
	constructor(pt, c) {
		this.p = pt;
		this.c = c;
	}
}

function randomInt(max) {
	return Math.floor(Math.random() * max);
}

function metric(p1, p2) {
	// Euclidean Metric
	// return Math.sqrt(
	// 	(p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
	// );
	// Taxicab
	return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
	// l-infinity
	// return Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
	// l-p
	// let p = 0.7;
	// return Math.pow(
	// 	Math.pow(Math.abs(p1.x - p2.x), p) + Math.pow(Math.abs(p1.y - p2.y), p),
	// 	p
	// );
}
