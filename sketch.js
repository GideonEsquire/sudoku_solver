var cells = [];
var solved = false;

function setup() {

    // Scaling depending on screen width or height
    createCanvas(windowWidth, windowHeight);
    var unit = floor(windowHeight / 11);
    if (windowWidth < windowHeight) {
        unit = floor(windowWidth / 11);
    }

    rectMode(CENTER);
    textSize(unit / 2);
    textAlign(CENTER);
    
    // Draw grid
    strokeWeight(2);
    for (var i = 0; i < 9; i++) {
        cells[i] = [];
        for (var j = 0; j < 9; j++) {
            cells[i].push(new Cell(unit*i+unit*1.5, unit*j+unit*1.5));
            rect(unit*i+unit*1.5, unit*j+unit*1.5,unit,unit);
        }
    }

    noFill();
    strokeWeight(4);
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            rect(unit*i*3 + unit*2.5, unit*j*3 + unit*2.5,unit*3,unit*3);
        }
    }
    fill(0);


}

function draw() {

    // logic for printing final values. Move out of here
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (cells[i][j].final_value) {
                text(cells[i][j].final_value, cells[i][j].x, cells[i][j].y);
            }
        
        }
    }


}
