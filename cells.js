function Cell(x, y, val) {
    this.magic_number = floor(windowWidth / 98);
    this.x = x;
    this.y = y + this.magic_number;
    this.final_value = val;
    this.possible_values = [1, 2, 3, 4, 5, 6, 7, 8, 9];


    this.produce_number = function() {
        this.final_value = this.possible_values[0];
        push();
        fill(255,0,0);
        text(this.final_value,this.x,this.y);
        pop();
    }

}

