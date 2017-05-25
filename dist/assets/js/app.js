'use strict';

// CLASS SET THE MAP
// bombe_plus_one, walk_fast, bombe_area_bonus, push_bombs
var map = function map(size, breakable_number, items, bombe_plus_one, walk_fast, bombe_area_bonus, push_bombs) {
    //PROPRIETIES :
    this.container = document.querySelector(".bomberman-map");
    this.table_size = size;
    this.breakable_bumber = breakable_number;
    this.items = items;
    this.bombe_plus_one = bombe_plus_one;
    this.walk_fast = walk_fast;
    this.bombe_area_bonus = bombe_area_bonus;
    this.push_bombs = push_bombs;

    // TABLES :
    this.general_table_game = [];
    this.is_empty = [];
    this.is_breakable = [];
    this.is_item = [];

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
                    element: cell,
                    breakable: null,
                    item: null,
                    value_item: null
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

    // var value_items = ["bombe_plus_one", "walk_fast", "bombe_area_bonus", "push_bombs"];

    // FUNCTION SET THE ITEMS
    this.element = function () {
        for (var i = 0; i < this.items; i++) {
            // relance:
            var random_item = Math.floor(Math.random() * this.is_breakable.length);

            if (!this.is_breakable[random_item].item) {
                this.is_breakable[random_item].item = true;
                this.is_breakable[random_item].element.classList.add('item');
                this.is_item.push(this.is_breakable[random_item]);
            } else {
                i--;
            }
        }
    };

    console.log(this.is_item);

    // FUNCTION SET VALUE OF EACH ITEM
    this.element_value = function () {
        this.value_items = ["bombe_plus_one", "walk_fast", "bombe_area_bonus", "push_bombs"];

        relance_boucle: for (var j = 0; j < this.is_item.length; j++) {
            var random_item_value = Math.floor(Math.random() * this.value_items.length);

            if (this.value_items[random_item_value] === "bombe_plus_one" && this.bombe_plus_one > 0) {
                this.is_item[j].value_item = this.value_items[random_item_value];
                this.is_item[j].element.classList.add('bombe_plus_one');
                this.bombe_plus_one--;
            } else if (this.value_items[random_item_value] === "walk_fast" && this.walk_fast > 0) {
                this.is_item[j].value_item = this.value_items[random_item_value];
                this.is_item[j].element.classList.add('walk_fast');
                this.walk_fast--;
            } else if (this.value_items[random_item_value] === "bombe_area_bonus" && this.bombe_area_bonus > 0) {
                this.is_item[j].value_item = this.value_items[random_item_value];
                this.is_item[j].element.classList.add('bombe_area_bonus');
                this.bombe_area_bonus--;
            } else if (this.value_items[random_item_value] === "push_bombs" && this.push_bombs > 0) {
                this.is_item[j].value_item = this.value_items[random_item_value];
                // this.is_item[j].element.classList.add('push_bombs');
                this.push_bombs--;
            } else {
                j--;
            }
        }
    };
};

// SET THE MAP
var create_map = new map(11, 200, 40, 10, 10, 10, 10);
create_map.create_map();
create_map.unbreakable();
create_map.isEmpty();
create_map.breakable();
create_map.element();
create_map.element_value();

// CLASS SET THE PLAYER
var player = function player(player_number, bomb_power, bomb_number) {
    this.player_number = player_number;
    this.players_positions = [{
        x: 0,
        y: 0
    }, {
        x: create_map.general_table_game.length - 1,
        y: create_map.general_table_game.length - 1
    }];

    this.bomb_power = bomb_power;
    this.bomb_number = bomb_number;
    this.bomb_pusher = true;
    this.bombs = [];
    //Pour faire affancer le player, il faut vérifier grâce au tableau générale si les celluls de la
    // direction souhaité sont des wall  ou de breakable.  Si ce n'est pas le cas alors il peut avancer.

    // SET THE PLAYER POSITION :
    this.createPlayer = function () {
        for (var i = 0; i < this.player_number; i++) {
            this.player_element = document.createElement("div");
            this.player_element.classList.add("player");
            document.querySelector(".table").appendChild(this.player_element);
            this.player_element.style.top = create_map.general_table_game[this.players_positions[i].x][this.players_positions[i].y].element.offsetTop + "px";
            this.player_element.style.left = create_map.general_table_game[this.players_positions[i].x][this.players_positions[i].y].element.offsetLeft + "px";
            if (i == 0) {
                this.real_player = this.player_element;
                this.playerPosX = this.players_positions[0].x;
                this.playerPosY = this.players_positions[0].y;
            } else {
                this.bot_player = this.player_element;
                this.botPosX = this.players_positions[i].x;
                this.botPosY = this.players_positions[i].y;
            }
        }
    }, this.movePlayer = function () {
        var that = this;
        window.addEventListener("keydown", function (e) {
            e.preventDefault();
            if (e.keyCode == 37) {
                if (that.playerPosY - 1 >= 0 && create_map.general_table_game[that.playerPosX][that.playerPosY - 1].breakable == null) {
                    if (that.bombs.length > 0) {
                        for (var i = 0; i < that.bombs.length; i++) {
                            if (that.playerPosY - 1 == that.bombs[i][2] && that.playerPosX == that.bombs[i][1]) {
                                //                                    if (that.bomb_pusher) {
                                //                                        let k = 0;
                                //                                        for (let j = 0; j < create_map.general_table_game.length; j++) {
                                //                                            if (create_map.general_table_game[(that.bombs[i][1])][(that.bombs[i][2]) - k].breakable == null) {
                                //                                                k++;
                                //                                            } else {
                                //                                                that.bombs[i][2] = that.bombs[i][2] - k - 1;
                                //                                                that.bombs[i][0].style.left = create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2]].element.offsetLeft + "px";
                                //
                                //                                            }
                                //                                        }
                                //                                    }
                                that.playerPosY += 1;
                            }
                        }
                    }
                    that.playerPosY -= 1;
                }
            } else if (e.keyCode == 38) {
                if (that.playerPosX - 1 >= 0 && create_map.general_table_game[that.playerPosX - 1][that.playerPosY].breakable == null) {
                    if (that.bombs.length > 0) {
                        for (var _i = 0; _i < that.bombs.length; _i++) {
                            if (that.playerPosY == that.bombs[_i][2] && that.playerPosX - 1 == that.bombs[_i][1]) {
                                //                                    if (that.bomb_pusher) {
                                //                                        let k = 0;
                                //                                        for (let j = 0; j < create_map.general_table_game.length; j++) {
                                //                                            if (create_map.general_table_game[(that.bombs[i][1]) - k][(that.bombs[i][2])].breakable == null) {
                                //                                                k++;
                                //                                            } else {
                                //                                                that.bombs[i][1] = that.bombs[i][1] - k - 1;
                                //                                                that.bombs[i][0].style.top = create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2]].element.offsetTop + "px";
                                //
                                //                                            }
                                //                                        }
                                //                                    }
                                that.playerPosX += 1;
                            }
                        }
                    }
                    that.playerPosX -= 1;
                }
            } else if (e.keyCode == 39) {
                if (that.playerPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[that.playerPosX][that.playerPosY + 1].breakable == null) {
                    if (that.bombs.length > 0) {
                        for (var _i2 = 0; _i2 < that.bombs.length; _i2++) {
                            if (that.playerPosY + 1 == that.bombs[_i2][2] && that.playerPosX == that.bombs[_i2][1]) {
                                //                                    if (that.bomb_pusher) {
                                //                                        let k = 0;
                                //                                        for (let j = 0; j < create_map.general_table_game.length; j++) {
                                //                                            if (create_map.general_table_game[(that.bombs[i][1])][(that.bombs[i][2]) + k].breakable == null) {
                                //                                                k++;
                                //                                            } else {
                                //                                                that.bombs[i][2] = that.bombs[i][2] + k - 1;
                                //                                                that.bombs[i][0].style.left = create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2]].element.offsetLeft + "px";
                                //
                                //                                            }
                                //                                        }
                                //                                    }
                                that.playerPosY -= 1;
                            }
                        }
                    }
                    that.playerPosY += 1;
                }
            } else if (e.keyCode == 40) {
                if (that.playerPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[that.playerPosX + 1][that.playerPosY].breakable == null) {
                    if (that.bombs.length > 0) {
                        for (var _i3 = 0; _i3 < that.bombs.length; _i3++) {
                            if (that.playerPosY == that.bombs[_i3][2] && that.playerPosX + 1 == that.bombs[_i3][1]) {
                                //                                    if (that.bomb_pusher) {
                                //                                        let k = 0;
                                //                                        for (let j = 0; j < create_map.general_table_game.length; j++) {
                                //                                            if (create_map.general_table_game[(that.bombs[i][1]) + k][(that.bombs[i][2])].breakable == null) {
                                //                                                k++;
                                //                                            } else {
                                //                                                that.bombs[i][1] = that.bombs[i][1] + k - 1;
                                //                                                that.bombs[i][0].style.top = create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2]].element.offsetTop + "px";
                                //
                                //                                            }
                                //                                        }
                                //                                    }
                                that.playerPosX -= 1;
                            }
                        }
                    }
                    that.playerPosX += 1;
                }
            }

            that.real_player.style.top = create_map.general_table_game[that.playerPosX][that.playerPosY].element.offsetTop + "px";
            that.real_player.style.left = create_map.general_table_game[that.playerPosX][that.playerPosY].element.offsetLeft + "px";
        });
    }, this.playerItems = function () {
        var that = this;
        window.addEventListener('keydown', function (e) {
            console.log(that.bomb_pusher, that.bomb_number, that.bomb_power);
            if (create_map.general_table_game[that.playerPosX][that.playerPosY].item) {
                if (create_map.general_table_game[that.playerPosX][that.playerPosY].value_item == "bombe_area_bonus") {
                    that.bomb_power++;
                } else if (create_map.general_table_game[that.playerPosX][that.playerPosY].value_item == "push_bombs") {
                    that.bomb_pusher = true;
                } else if (create_map.general_table_game[that.playerPosX][that.playerPosY].value_item == "bombe_plus_one") {
                    that.bomb_number++;
                }
                create_map.general_table_game[that.playerPosX][that.playerPosY].item = false;
                create_map.general_table_game[that.playerPosX][that.playerPosY].element.classList.remove("item");
            }
        });
    }, this.putBomb = function () {
        var that = this;
        window.addEventListener('keydown', function (e) {
            e.preventDefault;
            if (e.keyCode == 32 && that.bomb_number > 0) {
                console.log(that.bombs);
                this.bomb_PosX = that.playerPosX;
                this.bomb_PosY = that.playerPosY;
                this.bomb = document.createElement('div');
                this.bomb.style.top = create_map.general_table_game[this.bomb_PosX][this.bomb_PosY].element.offsetTop + "px";
                this.bomb.style.left = create_map.general_table_game[this.bomb_PosX][this.bomb_PosY].element.offsetLeft + 'px';
                this.bomb.classList.add("bomb");
                document.querySelector(".table").appendChild(this.bomb);
                that.bombs.push([this.bomb, this.bomb_PosX, this.bomb_PosY]);
                that.bomb_number--;
                setTimeout(function () {
                    for (var i = 0; i < that.bomb_power; i++) {
                        if (this.bomb_PosX + i == that.playerPosX && this.bomb_PosY == that.playerPosY || this.bomb_PosX - i == that.playerPosX && this.bomb_PosY == that.playerPosY || this.bomb_PosX == that.playerPosX && this.bomb_PosY + i == that.playerPosY || this.bomb_PosX == that.playerPosX && this.bomb_PosY - i == that.playerPosY) {
                            window.alert("You lost !");
                            location.reload();
                        }

                        if (this.bomb_PosX + i < create_map.general_table_game.length && create_map.general_table_game[this.bomb_PosX + i][this.bomb_PosY].breakable) {
                            create_map.general_table_game[this.bomb_PosX + i][this.bomb_PosY].breakable = null;
                            create_map.general_table_game[this.bomb_PosX + i][this.bomb_PosY].element.classList.remove("breakable");
                            create_map.general_table_game[this.bomb_PosX + i][this.bomb_PosY].element.style.backgroundColor = "pink";
                        }

                        if (this.bomb_PosX - i >= 0 && create_map.general_table_game[this.bomb_PosX - i][this.bomb_PosY].breakable) {
                            create_map.general_table_game[this.bomb_PosX - i][this.bomb_PosY].breakable = null;
                            create_map.general_table_game[this.bomb_PosX - i][this.bomb_PosY].element.classList.remove("breakable");
                            create_map.general_table_game[this.bomb_PosX - i][this.bomb_PosY].element.style.backgroundColor = "pink";
                        }

                        if (this.bomb_PosY + i < create_map.general_table_game.length && create_map.general_table_game[this.bomb_PosX][this.bomb_PosY + i].breakable) {

                            create_map.general_table_game[this.bomb_PosX][this.bomb_PosY + i].breakable = null;
                            create_map.general_table_game[this.bomb_PosX][this.bomb_PosY + i].element.classList.remove("breakable");
                            create_map.general_table_game[this.bomb_PosX][this.bomb_PosY + i].element.style.backgroundColor = "pink";
                        }

                        if (this.bomb_PosY - i >= 0 && create_map.general_table_game[this.bomb_PosX][this.bomb_PosY - i].breakable) {
                            create_map.general_table_game[this.bomb_PosX][this.bomb_PosY - i].breakable = null;
                            create_map.general_table_game[this.bomb_PosX][this.bomb_PosY - i].element.classList.remove("breakable");
                            create_map.general_table_game[this.bomb_PosX][this.bomb_PosY - i].element.style.backgroundColor = "pink";
                        }
                    }

                    that.bomb_number++;
                    this.bomb.remove();
                    that.bombs = [];
                }, 5000);
            }
        });
    }, this.botPlayerAction = function () {
        var that = this;
        setInterval(function () {
            if (that.bombs.length > 0) {
                for (var i = 0; i < that.bomb_power; i++) {
                    if (this.bomb_PosX + i == that.botPosX && this.bomb_PosY == that.botPosY || this.bomb_PosX - i == that.botPosX && this.bomb_PosY == that.botPosY || this.bomb_PosX == that.botPosX && this.bomb_PosY + i == that.botPosY || this.bomb_PosX == that.botPosX && this.bomb_PosY - i == that.botPosY) {
                        if (that.botPosY - 1 >= 0 && create_map.general_table_game[that.botPosX][that.botPosY - 1].breakable == null) {
                            for (var _i4 = 0; _i4 < that.bombs.length; _i4++) {
                                if (that.botPosY - 1 == that.bombs[_i4][1] && that.botPosX == that.bombs[_i4][0]) {
                                    that.botPosY += 1;
                                }
                            }
                            that.botPosY -= 1;
                        } else if (that.botPosX - 1 >= 0 && create_map.general_table_game[that.botPosX - 1][that.botPosY].breakable == null) {
                            for (var _i5 = 0; _i5 < that.bombs.length; _i5++) {
                                if (that.botPosY == that.bombs[_i5][1] && that.botPosX - 1 == that.bombs[_i5][0]) {
                                    that.botPosX += 1;
                                }
                            }
                            that.botPosX -= 1;
                        } else if (that.botPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[that.botPosX][that.botPosY + 1].breakable == null) {
                            for (var _i6 = 0; _i6 < that.bombs.length; _i6++) {
                                if (that.botPosY + 1 == that.bombs[_i6][1] && that.botPosX == that.bombs[_i6][0]) {
                                    that.botPosY -= 1;
                                }
                            }
                            that.botPosY += 1;
                        } else if (that.botPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[that.botPosX + 1][that.botPosY].breakable == null) {
                            for (var _i7 = 0; _i7 < that.bombs.length; _i7++) {
                                if (that.botPosY == that.bombs[_i7][1] && that.botPosX + 1 == that.bombs[_i7][0]) {
                                    that.botPosX -= 1;
                                }
                            }
                            that.botPosX += 1;
                        }
                    }
                }
            }
            that.bot_player.style.top = create_map.general_table_game[that.botPosX][that.botPosY].element.offsetTop + "px";
            that.bot_player.style.left = create_map.general_table_game[that.botPosX][that.botPosY].element.offsetLeft + "px";
        }, 50);
    };
};

var set_player = new player(2, 2, 1);
set_player.createPlayer();
set_player.movePlayer();
set_player.playerItems();
set_player.putBomb();
set_player.botPlayerAction();