'use strict';

// CLASS SET THE MAP
var map = function map(size, breakable_number, items) {
    //PROPRIETIES :
    this.container = document.querySelector(".bomberman-map");
    this.table_size = size;
    this.breakable_bumber = breakable_number;
    this.items = items;

    // TABLE :
    this.general_table_game = [];
    this.is_empty = [];
    this.is_breakable = [];

    //CREATE THE GENERAL TABLE WHICH SET THE IDENTITY OF EACH CELLS :
    this.create_map = function () {
        // create the table
        var tab = document.createElement('div');
        tab.className = 'table';

        for (var i = 0; i < this.table_size; i++) {
            this.general_table_game.push([]);

            // create each rows
            var row = document.createElement('div');
            row.className = 'row';

            for (var j = 0; j < this.table_size; j++) {
                var cell = document.createElement('div');
                cell.className = 'cell';
                row.appendChild(cell);

                // for each cell create object identity
                this.general_table_game[i].push({
                    x: i,
                    y: j,
                    breakable: null,
                    element: cell,
                    item: null
                });
            }

            tab.appendChild(row);
        }

        this.container.appendChild(tab);
    };

    console.log(this.general_table_game);

    // FUNCTION SET UNBREAKABLE CELLS
    this.unbreakable = function () {
        for (var i = 1; i < this.general_table_game.length - 1; i += 2) {

            for (var j = 1; j < this.general_table_game[i].length - 1; j += 2) {
                this.general_table_game[i][j].breakable = false;
                this.general_table_game[i][j].element.classList.add('unbreakable');
            }
        }
    };

    // FUNCTION SET THE EMPTY CELLS IN NEW TABLE
    this.isEmpty = function () {
        for (var i = 0; i < this.general_table_game.length; i++) {
            for (var j = 0; j < this.general_table_game[i].length; j++) {
                if (this.general_table_game[i][j].breakable == null) {
                    this.is_empty.push(this.general_table_game[i][j]);
                }
            }
        }
    };

    // FUNCTION SET THE BREAKABLE BLOK

    this.breakable = function () {
        for (var i = 0; i < this.breakable_bumber; i++) {
            var slice_null_table = this.is_empty.slice(3, this.is_empty.length - 3);
            var random_cell = Math.floor(Math.random() * slice_null_table.length);

            slice_null_table[random_cell].breakable = true;
            slice_null_table[random_cell].element.classList.add('breakable');

            this.is_breakable.push(slice_null_table[random_cell]);
        }
        // console.log(this.is_breakable );
    };

    // FUNCTION SET THE ITEMS
    this.element = function () {
        for (var i = 0; i < this.items; i++) {

            var random_item = Math.floor(Math.random() * this.is_breakable.length);
            this.is_breakable[random_item].item = true;
            this.is_breakable[random_item].element.classList.add('item');
        }
    };
};

// SET THE MAP
var create_map = new map(11, 200, 30);
create_map.create_map();
create_map.unbreakable();
create_map.isEmpty();
create_map.breakable();
create_map.element();

// CLASS SET THE PLAYER
var player = function player(player_posX, player_posY, player_number, bomb_power) {
    this.playerPosX = player_posX;
    this.playerPosY = player_posY;
    this.player_number = player_number;
    this.bomb_power = bomb_power;
    //Pour faire affancer le player, il faut vérifier grâce au tableau générale si les celluls de la
    // direction souhaité sont des wall  ou de breakable.  Si ce n'est pas le cas alors il peut avancer.

    // SET THE PLAYER POSITION :
    this.createPlayer = function () {
        for (var i = 0; i < this.player_number; i++) {
            this.player_element = document.createElement("div");
            this.player_element.classList.add("player");
            document.querySelector(".table").appendChild(this.player_element);
            this.player_element.style.top = create_map.general_table_game[this.playerPosX][this.playerPosY].element.offsetTop + "px";
            this.player_element.style.left = create_map.general_table_game[this.playerPosX][this.playerPosY].element.offsetLeft + "px";
        }
    }, this.movePlayer = function () {
        var that = this;
        window.addEventListener("keydown", function (e) {
            e.preventDefault();
            if (e.keyCode == 37) {
                if (that.playerPosY - 1 >= 0 && create_map.general_table_game[that.playerPosX][that.playerPosY - 1].breakable == null) that.playerPosY -= 1;
            } else if (e.keyCode == 38) {
                if (that.playerPosX - 1 >= 0 && create_map.general_table_game[that.playerPosX - 1][that.playerPosY].breakable == null) that.playerPosX -= 1;
            } else if (e.keyCode == 39) {
                if (that.playerPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[that.playerPosX][that.playerPosY + 1].breakable == null) that.playerPosY += 1;
            } else if (e.keyCode == 40) {
                if (that.playerPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[that.playerPosX + 1][that.playerPosY].breakable == null) that.playerPosX += 1;
            }
            that.player_element.style.top = create_map.general_table_game[that.playerPosX][that.playerPosY].element.offsetTop + "px";
            that.player_element.style.left = create_map.general_table_game[that.playerPosX][that.playerPosY].element.offsetLeft + "px";
        });
    }, this.putBomb = function () {
        var that = this;
        that.bombUsed = false;
        window.addEventListener('keydown', function (e) {
            e.preventDefault;
            if (e.keyCode == 32 && !that.bombUsed) {
                this.bomb_PosX = that.playerPosX;
                this.bomb_PosY = that.playerPosY;
                this.bomb = document.createElement('div');
                this.bomb.style.top = create_map.general_table_game[this.bomb_PosX][this.bomb_PosY].element.offsetTop + "px";
                this.bomb.style.left = create_map.general_table_game[this.bomb_PosX][this.bomb_PosY].element.offsetLeft + 'px';
                this.bomb.classList.add("bomb");
                document.querySelector(".table").appendChild(this.bomb);
                that.bombUsed = true;
                setTimeout(function () {
                    for (var i = 0; i < that.bomb_power; i++) {
                        if (this.bomb_PosX + i < create_map.general_table_game.length && create_map.general_table_game[this.bomb_PosX + i][this.bomb_PosY].breakable) {
                            create_map.general_table_game[this.bomb_PosX + i][this.bomb_PosY].breakable = null;
                            create_map.general_table_game[this.bomb_PosX + i][this.bomb_PosY].element.classList.remove("breakable");
                            console.log("casser en bas");
                        }
                        if (this.bomb_PosX - i >= 0 && create_map.general_table_game[this.bomb_PosX - i][this.bomb_PosY].breakable) {
                            create_map.general_table_game[this.bomb_PosX - i][this.bomb_PosY].breakable = null;
                            create_map.general_table_game[this.bomb_PosX - i][this.bomb_PosY].element.classList.remove("breakable");
                            console.log("casser en haut");
                        }
                        if (this.bomb_PosY + i < create_map.general_table_game.length && create_map.general_table_game[this.bomb_PosX][this.bomb_PosY + i].breakable) {

                            create_map.general_table_game[this.bomb_PosX][this.bomb_PosY + i].breakable = null;
                            create_map.general_table_game[this.bomb_PosX][this.bomb_PosY + i].element.classList.remove("breakable");
                            console.log("casser à droite");
                        }
                        if (this.bomb_PosY - i >= 0 && create_map.general_table_game[this.bomb_PosX][this.bomb_PosY - i].breakable) {
                            create_map.general_table_game[this.bomb_PosX][this.bomb_PosY - i].breakable = null;
                            create_map.general_table_game[this.bomb_PosX][this.bomb_PosY - i].element.classList.remove("breakable");
                            console.log("casser à gauche");
                        }
                    }

                    that.bombUsed = false;
                    this.bomb.remove();
                }, 3000);
            }
        });
    };
};

var set_player = new player(0, 0, 1, 2);
set_player.createPlayer();
set_player.movePlayer();
set_player.putBomb();