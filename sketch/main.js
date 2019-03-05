// Proyectil
var diameter = 26;
var position = [];
var velocity = 25;
var angle = 70;
var g = 9.81;
var t_max = 0;
var x_max = 0;
var y_max = 0;
// Canvas
var canvas;
var marginX;
var marginY;
var margin = 10 + diameter;
var width;
var height;
var velocity_slider;
var angle_slider;
var go_button;

function setup() {
  marginX = windowWidth * 0.20;
  marginY = windowHeight * 0.40;
  width = windowWidth - marginX;
  height = windowHeight - marginY;
  canvas = createCanvas(width, height);
  canvas.parent('sketch-holder');
  velocity_slider = createSlider(0, 100, 25);
  velocity_slider.parent('velocity-holder');
  angle_slider = createSlider(0, 90, 70);
  angle_slider.parent('angle-holder');
  go_button = createButton("Iniciar");

  // Proyectil
  position[0] = 0;
  position[1] = 0;
  angleMode(DEGREES);
  t_max = 2*velocity*sin(angle)/g;
  x_max = getX(t_max);;
  y_max = getY(t_max);
}

function draw() {
  background(200);
  fill(72);
  text("Velocidad: " + velocity + " m/s", margin, margin);
  text("Ángulo: " + angle + " °", margin, margin*2);
  text("Tiempo de vuelo: " + t_max.toFixed(2) + " s", margin, margin*3);
  text("X max: " + x_max.toFixed(2) + " m", margin, margin*4);
  text("Y max: " + y_max.toFixed(2) + " m", margin, margin*5);
  rect(0, height - margin + diameter/2, width, margin);
  translate(margin, height - margin);
  projectile(position[0], position[1], diameter);
}
function getX(t) {
  return velocity*cos(angle)*t;
}

function getY(t) {
  return ((velocity*sin(angle)*t) - (t*t*-g/2));
}

function projectile(x, y, d){
  velocity = velocity_slider.value();
  angle = angle_slider.value();
  t_max = 2*velocity*sin(angle)/g;
  x_max = getX(t_max);;
  y_max = getY(t_max);
  fill(126, 126, 126);
  ellipse(x, y, d, d);
  if (x == 0 && y == 0)
    line(x, y, velocity*cos(angle)*2, -velocity*sin(angle)*2);
}

function windowResized() {
  marginX = windowWidth * 0.20;
  marginY = windowHeight * 0.40;
  width = windowWidth - marginX;
  height = windowHeight - marginY;
  resizeCanvas(width, height);
}
