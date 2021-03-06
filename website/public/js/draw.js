/* Adding a draw canvas wich save the image on the server
 * There is security issues, for example we could minify this
 * code but for the school project we lay it like this.
 */


var drawingWidth = 4; // width of lines (and other drawings)

window.onload = initContext; // We initiate the context on page loading

var canvas = null; // We define a variable for the canvas (drawing panel)
var exportButton = null; // We define a variable for the export button (used to export drawings as images)
var colorPicker = null; // We define a variable for the color picker

var c = null; // 2D context

var p1 = null; // last point (begining of a line)
var p2 = null; // current point (end of a line)

// We define a vector as an 'x'and a 'y' coordinates
function Vector(x, y){
this.x=x;
this.y=y;
}

// We inittiate the canvas context
function initContext() {    

// We get elements from html
canvas = document.getElementById("myCanvas");
exportButton = document.getElementById("exportButton");
colorPicker = document.getElementById("colorPicker");

// We get the canvas context
c = canvas.getContext('2d');
c.lineWidth = drawingWidth; // We set the line width

// We add actions for some events
exportButton.onclick = exportCanvasImage;
colorPicker.onchange = changeColor;
canvas.onmousedown = handleMouseDown;
canvas.onmousemove = handleMouseMove;
canvas.onmouseup = handleMouseUp;

return true;
}

// Function to update the pencil color from the color picker
function changeColor()
{
	c.strokeStyle = colorPicker.value;
}

// Function to draw a line from pointA to pointB (pointA and pointB are "Vector objects")
function drawLine(pointA, pointB) {
	c.moveTo(pointA.x, pointA.y);
	c.lineTo(pointB.x, pointB.y);
	c.stroke();
}

// Function to get the mouse current position as a "Vector object"
function getMousePosition(event)
{
	var mousePos = new Vector(0, 0);
	var rect = canvas.getBoundingClientRect();

	mousePos.x = event.clientX;
	mousePos.y = event.clientY;

	mousePos.x -= rect.left;
	mousePos.y -= rect.top;

	return mousePos;
}

// Function that handles mouse move
function handleMouseMove(event) {
	event = event || window.event; // compatibility trick
	if(event.which == 1) // left mouse button
	{
		p2 = getMousePosition(event);
		c.beginPath();
		drawLine(p1, p2);
		c.closePath();
		p1 = p2; 
	}
}

// Function that handles mouse pressed
function handleMouseDown(event) {
	event = event || window.event; // compatibility trick
	event.preventDefault();
	if(event.which == 1) // left mouse button
	{
		p1 = getMousePosition(event);
	}
}

// Function that handles mouse released
function handleMouseUp(event) {
	event = event || window.event; // compatibility trick
	if(event.which == 1) // left mouse button
	{
		p1 = null;
		p2 = null;
	}
}
