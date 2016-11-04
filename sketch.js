// Next, I need to loop through rows, columns, blocks and see if there is only one instance 
// of an integer per them.

var cells = [];
var number_drawer_cells = []
var solved = false;
var mouse_value = null;

function setup() {

    frameRate(5);

    // Scaling depending on screen width or height
    createCanvas(windowWidth, windowHeight);
    var unit = floor(windowHeight / 11);
    if (windowWidth < windowHeight) {
        unit = floor(windowWidth / 11);
    }

    rectMode(CENTER);
    textSize(unit / 1.75);
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
    // for (var i = 0; i < 9; i++) {
    //     number_drawer_cells[i].push(new NumberDrawer(unit*12, unit*i));
    // }
    

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

    // Columns Logic
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

    // Rows Logic
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (cells[i][j].final_value) {
                for (var jj = 0; jj < 9; jj++) {
                    var index = cells[jj][j].possible_values.indexOf(cells[i][j].final_value);
                    if (!cells[jj][j].final_value && index > -1) {
                        cells[jj][j].possible_values.splice(index, 1);
                     }
                }
            }
        }
    }
    
    // Blocks Logic
    for (var i = 0; i < 9; i += 3) {
        for (var j = 0; j < 9; j += 3) {
            for (var k = 0; k < 3; k++) {
                for (var m = 0; m < 3; m++) {
                    if (cells[i + k][j + m].final_value) {
                        for (var kk = 0; kk < 3; kk++) {
                            for (var mm = 0; mm < 3; mm++) {
                                var index = cells[kk+i][mm+j].possible_values.indexOf(cells[i + k][j + m].final_value);
                                if (!cells[kk+i][mm+j].final_value && index > -1) {
                                    cells[kk+i][mm+j].possible_values.splice(index, 1);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Printing final values.
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

// function mousePressed() {
//     if (NumberDrawer.hits(mouseX, mouseY)) {
//         mouse_value = NumberDrawer.grabbed_value;
//     }
// }

// function mouseReleased() {
//     //code this- cells[mouse position].final value = mouse_value
//     mouse_value = null;
// }
