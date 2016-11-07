function Cell(x, y) {
    this.magic_number = floor(windowWidth / 98);
    this.x = x;
    this.y = y + this.magic_number;
    this.final_value = null;
    this.possible_values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.calculated = false;

    this.produce_number = function() {
        this.final_value = this.possible_values[0];
        this.calculated = true;
        push();
        fill(255,0,0);
        text(this.final_value,this.x,this.y);
        pop();
    }

    this.hits = function(mouse_x, mouse_y) {
        var d = dist(mouse_x, mouse_y, this.x, this.y);
        return d < 40 //need to scale the 40
    }

    this.has_value = function(obj) {
        return (this.possible_values.indexOf(obj) != -1);
    }

}

