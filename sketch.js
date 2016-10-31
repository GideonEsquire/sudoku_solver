var cells = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    var unit = floor(windowHeight / 10 - 10);
    
    strokeWeight(2);
    for (var i = 0; i < 9; i++) {
        cells[i] = [];
        for (var j = 0; j < 9; j++) {
            cells[i].push(new Cell());
            rect(unit*i + unit, unit*j + unit,unit,unit);
        }
    }

    noFill();
    strokeWeight(4);
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            rect(unit*i*3 + unit, unit*j*3 + unit,unit*3,unit*3);
        }
    }


}

function draw() {


}

function check_row() {

}

function check_col() {

}

function check_block() {

}
