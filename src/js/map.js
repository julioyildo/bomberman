var power = 4;

var map = function (rows, columns) {
    this.rows = rows;
    console.log(rows);
    this.columns = columns;
    this.div = document.querySelector('.bomberman-map');
    this.cells = [rows];
    this.breakableWalls = 100;

    console.log(this.cells);
    this.generateMap = function () {
        for (var i = 0; i < this.rows; i++) {
            this.cells[i] = [this.columns];

            for (var j = 0; j < this.columns; j++) {
                //define the cell with status unbreakable depending on their place
                var status = 'empty';
                if (this.isUnbreakable(i, j)) {
                    status = 'unbreakable';
                }
                //define the cell with status breakable randomly
                var aCell = new cell(i, j, status);
                aCell.createDiv(this.div);
                this.cells[i][j] = aCell;
            }
        }
    }





    this.generateBreakableWall = function () {
        for (var k = 0; k < this.breakableWalls; k++) {
            //random x and y while the cell[x][y] is a corner or a unbreakableWall
            do {
                var x = random(1, this.rows);
                var y = random(1, this.columns);
            } while (this.isUnbreakable(x, y) || this.isCorner(x, y));
            this.cells[x][y].updateStatus('breakable');
        }
    }






    //test the cell[x][y] is unbreakable depending on their place
    this.isUnbreakable = function (x, y) {
        if (x == 0 || x == this.rows - 1 || y == 0 || y == this.columns - 1) { // all the cells around
            return true;
        } else if (y % 2 == 0 && x % 2 == 0) { // one cell / 2
            return true;
        }
        return false;
    }






    //test if the cells[x][y] is a corner case (corner case + or - number of powercase) or not
    this.isCorner = function (x, y) {
        //check if the random number gives a cell in the corner
        if (x == 1) {
            if (y >= 1 && y <= power)
            return true;
            else
            if (y <= this.columns && y >= this.columns - power - 1)
            return true;
        }
        if (x == this.rows - 2) {
            if (y >= 1 && y <= power)
            return true;
            else
            if (y <= this.columns && y >= this.columns - power - 1)
            return true;
        }
        if (y == 1) {
            if (x >= 1 && x <= power)
            return true;
            else
            if (x <= this.rows && x >= this.rows - power - 1)
            return true;
        }
        if (y == this.columns - 2) {
            if (x >= 1 && x <= power)
            return true;
            else
            if (x <= this.rows && y >= this.rows - power - 1)
            return true;
        }
        return false;
    }
}





var create_map = new map(15, 15);
create_map.generateMap();
create_map.generateBreakableWall();
