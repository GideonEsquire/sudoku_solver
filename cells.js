function Cell(x, y, val) {
    this.x = x;
    this.y = y;
    this.final_value = val;
    this.possible_values = [1, 2, 3, 4, 5, 6, 7, 8, 9];


    this.produce_number = function() {
        this.final_value = this.possible_values[0];
        text(this.final_value,this.x,this.y);
    }

}

