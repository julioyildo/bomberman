'use strict';

function random(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
}
var cell = function cell(posX, posY, status, div) {
    this.posX = posX;
    this.posY = posY;
    this.status = status;
    this.div = div;

    this.createDiv = function (map) {
        this.div = document.createElement('div');
        this.div.classList.add('cell');
        this.div.classList.add(this.status);
        map.appendChild(this.div);
    };

    this.updateStatus = function (newStatus) {
        this.div.classList.remove(status);
        this.status = newStatus;
        this.div.classList.add(newStatus);
    };
};

var power = 4;

var map = function map(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.div = document.querySelector('.bomberman-map');
    this.cells = [rows];
    this.breakableWalls = 100;

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
    };

    this.generateBreakableWall = function () {
        for (var k = 0; k < this.breakableWalls; k++) {
            //random x and y while the cell[x][y] is a corner or a unbreakableWall
            do {
                var x = random(1, this.rows);
                var y = random(1, this.columns);
            } while (this.isUnbreakable(x, y) || this.isCorner(x, y));
            this.cells[x][y].updateStatus('breakable');
        }
    };

    //test the cell[x][y] is unbreakable depending on their place
    this.isUnbreakable = function (x, y) {
        if (x == 0 || x == this.rows - 1 || y == 0 || y == this.columns - 1) {
            // all the cells around
            return true;
        } else if (y % 2 == 0 && x % 2 == 0) {
            // one cell / 2
            return true;
        }
        return false;
    };

    //test if the cells[x][y] is a corner case (corner case + or - number of powercase) or not
    this.isCorner = function (x, y) {
        //check if the random number gives a cell in the corner
        if (x == 1) {
            if (y >= 1 && y <= power) return true;else if (y <= this.columns && y >= this.columns - power - 1) return true;
        }
        if (x == this.rows - 2) {
            if (y >= 1 && y <= power) return true;else if (y <= this.columns && y >= this.columns - power - 1) return true;
        }
        if (y == 1) {
            if (x >= 1 && x <= power) return true;else if (x <= this.rows && x >= this.rows - power - 1) return true;
        }
        if (y == this.columns - 2) {
            if (x >= 1 && x <= power) return true;else if (x <= this.rows && y >= this.rows - power - 1) return true;
        }
        return false;
    };
};

var create_map = new map(15, 15);
create_map.generateMap();
create_map.generateBreakableWall();

var player = function player(playerPosX, playerPosY, div) {
    this.playerPosX = playerPosX;
    this.playerPosY = playerPosY;
    this.createPlayer = function () {
        this.div = document.createElement('div');
        this.div.style.top = this.playerPosY + 'px';
        this.div.style.left = this.playerPosX + 'px';
        this.div.classList.add("player");
        var map = document.querySelector('.bomberman-map');
        map.appendChild(this.div);
    }, this.movePlayer = function () {
        var that = this;
        that.playerPosX = playerPosX;
        that.playerPosY = playerPosY;
        window.addEventListener('keydown', function (e) {
            // Position calcul
            that.posX = Math.floor(that.playerPosX / 50); //
            that.posY = Math.floor(that.playerPosY / 50); //

            if (e.keyCode == 38) {
                //up
                //                    that.posX = Math.floor((that.playerPosX + 15) / 50); //
                //                    that.posY = Math.floor((that.playerPosY + 25) / 50); //
                if (create_map.isUnbreakable(that.posX, that.posY) === false) {
                    that.playerPosY -= 15;
                }
            } else if (e.keyCode == 39) {
                //right
                //                    that.posX = Math.floor((that.playerPosX + 35) / 50); //
                //                    that.posY = Math.floor((that.playerPosY + 30) / 50); //
                if (create_map.isUnbreakable(that.posX, that.posY) === false) {
                    that.playerPosX += 15;
                }
            } else if (e.keyCode == 40) {
                //down
                //                    that.posX = Math.floor((that.playerPosX + 15) / 50); //
                //                    that.posY = Math.floor((that.playerPosY + 35) / 50); //
                if (create_map.isUnbreakable(that.posX, that.posY) === false) {
                    that.playerPosY += 15;
                }
            } else if (e.keyCode == 37) {
                //left
                //                    that.posX = Math.floor((that.playerPosX - 5) / 50); //
                //                    that.posY = Math.floor((that.playerPosY + 30) / 50); //
                if (create_map.isUnbreakable(that.posX, that.posY) === false) {
                    that.playerPosX -= 15;
                }
            }
            that.div.style.top = that.playerPosY + "px";
            that.div.style.left = that.playerPosX + "px";
        });
    };
    this.putBomb = function () {
        var that = this;
        that.playerPosX = playerPosX;
        that.playerPosY = playerPosY;
        that.bombUsed = false;
        window.addEventListener('keydown', function (e) {
            e.preventDefault;
            that.posX = Math.floor(that.playerPosX / 50); //
            that.posY = Math.floor(that.playerPosY / 50); //
            if (e.keyCode == 32 && !that.bombUsed) {
                this.div = document.createElement('div');
                this.div.style.top = that.playerPosY + 'px';
                this.div.style.left = that.playerPosX + 'px';
                this.div.classList.add("bomb");
                var map = document.querySelector('.bomberman-map');
                map.appendChild(this.div);
                that.bombUsed = true;
                setTimeout(function () {
                    that.bombUsed = false;
                    this.div.remove();
                }, 3000);
            }
        });
    };
};

var bomber = new player(50, 50);
bomber.createPlayer();
bomber.movePlayer();
bomber.putBomb();