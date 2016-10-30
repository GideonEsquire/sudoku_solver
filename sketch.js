var PI = 3.1415
var r = 150;
var a = PI/2;
var aVel = 0.0;
var aAcc = 0.0;
// var amp = 180;
// var per = 100;

function setup() {
    background(0);

}

function draw() {
    var x = r * sin(a);
    var y = r * cos(a);

    createCanvas(640, 480);
    translate(width/2, height/2);
    fill(255);

    stroke(255);
    line(0,0,x,y);

    ellipse(x,y,50,50);

    aAcc = -0.009 * sin(a);

    a += aVel;
    aVel += aAcc;

    aVel *= .99;
}
