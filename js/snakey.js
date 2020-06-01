// Adapted from the following Processing example:
// http://processing.org/learning/topics/follow3.html

var apples = [];

var circle = new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), 15);
circle.fillColor = "green";

this.circleSpeed = 3 + 10 * Math.random();

// The amount of points in the path:
var points = 5;
// The distance between the points:
var length = 30;

var path = new Path({
	strokeColor: '#E4141B',
	strokeWidth: 20,
	strokeCap: 'round',
	strokeJoin: 'round'
});

this.start = view.center / [10, 1];
for (var i = 0; i < points; i++)
	path.add(this.start + new Point(i * length, 0));

function onMouseMove(event) {
	path.firstSegment.point = event.point;
	for (var i = 0; i < points - 1; i++) {
		var segment = path.segments[i];
		var nextSegment = segment.next;
		var vector = segment.point - nextSegment.point;
		vector.length = length;
		nextSegment.point = segment.point - vector;
	}
	path.smooth({ type: 'continuous' });
}

function onMouseDown(event) {
	path.fullySelected = true;
	path.strokeColor = '#e08285';
}

function onMouseUp(event) {
	path.fullySelected = false;
	path.strokeColor = '#e4141b';
}

function onFrame(event) {
	circle.translate(this.circleSpeed,0);

	if (circle.position.x > view.size.width) {
		circle.position.x = -10;
		circle.position.y = view.size.height * Math.random();
	}

	if (path.intersects(circle)) {
		var newPoint = path.add(this.start + new Point(i * length, 0));
		newPoint.style = { strokeColor: 'white'};
		points += 1;
		circle.position.x = -10;
		circle.position.y = view.size.height * Math.random();
		this.circleSpeed = 10 * Math.random();
	}

	if (path.intersects(path)) {
		path.removeSegments();
		points = 5;
		this.start = view.center / [10, 1];
		for (var i = 0; i < points; i++)
			path.add(this.start + new Point(i * length, 0));
	}
}
