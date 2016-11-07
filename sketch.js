// Next, I need to loop through rows, columns, blocks and see if there is only one instance 
// of an integer per them.

var cells = [];
var number_drawer_cells = [];
var mouse_value = null;
var solved = false;

function setup() {

    // Scaling depending on screen width or height
    frameRate(5);
    createCanvas(windowWidth, windowHeight);
    var unit = floor(windowHeight / 11);
    if (windowWidth < windowHeight) {
        unit = floor(windowWidth / 13);
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

    // Draw number_drawer
    for (var i = 0; i < 9; i++) {
        number_x = unit*10+unit*1.5;
        number_y = unit*i+unit*1.5;
        number_drawer_cells.push(new NumberDrawer(number_x, number_y));
        rect(number_x, number_y, unit, unit);
        text(i+1, number_x, number_y + floor(windowWidth/98));
    }

    // Draw block outline
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
    
    // splicing possible values
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            // If cell has final remove it from everyone's possible_values
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

    //only one instance of an int per column
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var sum = 0;
            var sentinal = 0;
            for (var val = 0; val < cells[i][j].possible_values.length; val++) {
                sentinal = cells[i][j].possible_values[val];
                for (var jj = 0; jj < 9; jj++) {
                    if (cells[i][jj].has_value(sentinal)) {
                        sum += 1;
                    }
                    if (sum > 1) {
                        sum = 0;
                        break;
                    }
                }
                if (sum == 1) {
                    cells[i][j].possible_values = [sentinal];
                    sum = 0;
                }
            }
        }
    }

    // Rows Logic

    // If cell has final remove it from everyone's possible_values
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (cells[i][j].final_value) {
                for (var ii = 0; ii < 9; ii++) {
                    var index = cells[ii][j].possible_values.indexOf(cells[i][j].final_value);
                    if (!cells[ii][j].final_value && index > -1) {
                        cells[ii][j].possible_values.splice(index, 1);
                    }
                }
            }
        }
    }

    //only one instance of an int per row
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var sum = 0;
            var sentinal = 0;
            for (var val = 0; val < cells[i][j].possible_values.length; val++) {
                sentinal = cells[i][j].possible_values[val];
                for (var ii = 0; ii < 9; ii++) {
                    if (cells[ii][j].has_value(sentinal)) {
                        sum += 1;
                    }
                    if (sum > 1) {
                        sum = 0;
                        break;
                    }
                }
                if (sum == 1) {
                    cells[i][j].possible_values = [sentinal];
                    sum = 0;
                }
            }
        }
    }

    // Blocks Logic
    
    // If cell has final remove it from everyone's possible_values
    for (var i = 0; i < 9; i += 3) {
        for (var j = 0; j < 9; j += 3) {
            for (var k = 0; k < 3; k++) {
                for (var m = 0; m < 3; m++) {
                    if (cells[i + k][j + m].final_value) {
                        for (var kk = 0; kk < 3; kk++) {
                            for (var mm = 0; mm < 3; mm++) {
                                var index = cells[kk + i][mm + j].possible_values.indexOf(
                                        cells[i + k][j + m].final_value);
                                if (!cells[kk + i][mm + j].final_value && index > -1) {
                                    cells[kk + i][mm + j].possible_values.splice(index, 1);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // //only one instance of an int per block
    // //still buggy
    // //this is a goddamn mess
    // //I need to stop trying to put breaks all willy-nilly
    // //and think my way through the logic
    // for (var i = 0; i < 9; i += 3) {
    //     for (var j = 0; j < 9; j += 3) {
    //         var sum = 0;
    //         var sentinal = null;
    //         for (var k = 0; k < 3; k++) {
    //             if (sum > 1) {
    //                 break;
    //             }
    //             for (var m = 0; m < 3; m++) {
    //                 if (sum > 1) {
    //                     sum = 0;
    //                     break;
    //                 }
    //                 for (var val = 0; val < cells[i + k][j + m].possible_values.length; val++) {
    //                     sentinal = cells[i + k][j + m].possible_values[val];
    //                     for (var ii = 0; ii < 3; ii++) {
    //                         if (sum > 1) {
    //                             sum = 0;
    //                             break;
    //                         }
    //                         for (var jj = 0; jj < 3; jj++) {
    //                             if (cells[ii][jj].has_value(sentinal)) {
    //                                 sum += 1;
    //                             }
    //                             if (sum > 1) {
    //                                 break;
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //         if (sum == 1) {
    //             cells[i + k][j + m].possible_values = [sentinal];
    //             sum = 0;
    //         }
    //     }
    // }

    // Printing final values.
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (!cells[i][j].calculated) {
                if (cells[i][j].final_value) {
                    text(cells[i][j].final_value,cells[i][j].x,cells[i][j].y);
                }
                else if (cells[i][j].possible_values.length == 1) {
                    cells[i][j].produce_number();
                }
            }
        }
    }

}


function mousePressed() {
    for(var i = 0; i < 9; i++) {
        if (number_drawer_cells[i].hits(mouseX, mouseY)) {
            mouse_value = i + 1;
        }
    }
}


function mouseReleased() {
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            if(cells[i][j].hits(mouseX, mouseY)) {
                cells[i][j].possible_values = [mouse_value];
                cells[i][j].final_value = mouse_value;
            }
        }
    }
    mouse_value = null;
}
