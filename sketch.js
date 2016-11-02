var cells = [];
var solved = false;

function setup() {

    frameRate(5);

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
    push();
    strokeWeight(2);
    for (var i = 0; i < 9; i++) {
        cells[i] = [];
        for (var j = 0; j < 9; j++) {
            cells[i].push(new Cell(unit*i+unit*1.5, unit*j+unit*1.5));
            rect(unit*i+unit*1.5, unit*j+unit*1.5,unit,unit);
        }
    }

    push();
    noFill();
    strokeWeight(4);
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            rect(unit*i*3 + unit*2.5, unit*j*3 + unit*2.5,unit*3,unit*3);
        }
    }
    pop();
    pop();


}


function draw() {

    // Columns
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (cells[i][j].final_value) {
                for (var jj = 0; jj < 9; jj++) {
                    var index = cells[i][jj].possible_values.indexOf(cells[i][j].final_value);
                    if (!cells[i][jj].final_value && index > -1) {
                        cells[i][jj].possible_values.splice(index, 1);
                    }
                }
            }
        }
    }

    // Rows
    // Need to work on all the logic
    // NOT WORKING JUST YET
    for (var j = 0; j < 9; j++) {
        for (var i = 0; i < 9; i++) {
            if (cells[i][j].final_value) {
                for (var jj = 0; jj < 9; jj++) {
                    var index = cells[j][jj].possible_values.indexOf(cells[i][j].final_value);
                    if (!cells[j][jj].final_value && index > -1) {
                        cells[j][jj].possible_values.splice(index, 1);
                     }
                }
            }
        }
    }

    // logic for printing final values.
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (cells[i][j].possible_values.length == 1) {
                cells[i][j].produce_number();
            }
            else if (cells[i][j].final_value) {
                text(cells[i][j].final_value,cells[i][j].x,cells[i][j].y);
            }
        }
    }


}
