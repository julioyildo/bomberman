'use strict';

// CLASS SET THE MAP
// bombe_plus_one, walk_fast, bombe_area_bonus, push_bombs
var map = function map(size, breakable_number, items, bombe_plus_one, bombe_area_bonus, push_bombs) {
    //PROPRIETIES :
    this.container = document.querySelector(".bomberman-map");
    this.table_size = size;
    this.breakable_bumber = breakable_number;
    this.items = items;
    this.bombe_plus_one = bombe_plus_one;
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

    // FUNCTION SET THE ITEMS
    this.element = function () {
        for (var i = 0; i < this.items; i++) {
            // relance:
            var random_item = Math.floor(Math.random() * this.is_breakable.length);

            if (!this.is_breakable[random_item].item) {
                this.is_breakable[random_item].item = true;
                this.is_item.push(this.is_breakable[random_item]);
            } else {
                i--;
            }
        }
    };

    console.log(this.is_item);

    // FUNCTION SET VALUE OF EACH ITEM
    this.element_value = function () {
        this.value_items = ["more_bombs", "bomb_area_bonus", "push_bombs"];

        //        relance_boucle:
        for (var j = 0; j < this.is_item.length; j++) {
            var random_item_value = Math.floor(Math.random() * this.value_items.length);

            if (this.value_items[random_item_value] === "more_bombs" && this.bombe_plus_one > 0) {
                this.is_item[j].value_item = this.value_items[random_item_value];
                this.bombe_plus_one--;
            } else if (this.value_items[random_item_value] === "bomb_area_bonus" && this.bombe_area_bonus > 0) {
                this.is_item[j].value_item = this.value_items[random_item_value];
                this.bombe_area_bonus--;
            } else if (this.value_items[random_item_value] === "push_bombs" && this.push_bombs > 0) {
                this.is_item[j].value_item = this.value_items[random_item_value];
                this.push_bombs--;
            } else {
                j--;
            }
        }
    };
};

// SET THE MAP
var create_map = new map(11, 200, 20, 8, 10, 2);
create_map.create_map();
create_map.unbreakable();
create_map.isEmpty();
create_map.breakable();
create_map.element();
create_map.element_value();

// CLASS SET THE PLAYER

var player = function player(player_number, player_bomb_number, player_bomb_power) {
    this.player_number = player_number;
    this.player_bomb_number = player_bomb_number;
    this.player_bomb_power = player_bomb_power;
    this.player_bomb_pusher = true;
    this.players_positions = [{
        x: 0,
        y: 0
    }, {
        x: create_map.general_table_game.length - 1,
        y: create_map.general_table_game.length - 1
    }, {
        x: 0,
        y: create_map.general_table_game.length - 1
    }, {
        x: create_map.general_table_game.length - 1,
        y: 0
    }];

    // CREATE A PLAYER AND BOTS AND SET POSITION DEPENDING ON NUMBER OF PLAYERS:
    this.createPlayer = function () {
        for (var i = 0; i < this.player_number; i++) {
            this.player_element = document.createElement("div");
            document.querySelector(".table").appendChild(this.player_element);
            this.player_element.style.top = create_map.general_table_game[this.players_positions[i].x][this.players_positions[i].y].element.offsetTop + "px";
            this.player_element.style.left = create_map.general_table_game[this.players_positions[i].x][this.players_positions[i].y].element.offsetLeft + "px";
            if (i == 0) {
                this.player_element.classList.add("player");
                this.player_element.classList.add("down");
                this.real_player = this.player_element;
                this.playerPosX = this.players_positions[0].x;
                this.playerPosY = this.players_positions[0].y;
            } else {
                this.player_element.classList.add("bot");
                this.player_element.classList.add("bot");
                this.bot_player = this.player_element;
                this.botPosX = this.players_positions[i].x;
                this.botPosY = this.players_positions[i].y;
            }
        }
    },

    //MOVE PLAYER
    this.movePlayer = function () {
        var that = this;
        window.addEventListener("keydown", function (e) {
            e.preventDefault();
            if (e.keyCode == 37) {
                if (that.playerPosY - 1 >= 0 && create_map.general_table_game[that.playerPosX][that.playerPosY - 1].breakable == null) {

                    //COLLISION WITH BOMBS
                    if (bombs.length > 0) {
                        for (var i = 0; i < bombs.length; i++) {
                            if (that.playerPosY - 1 == bombs[i][2] && that.playerPosX == bombs[i][1]) {

                                //BOMBPUSHER ITEM
                                if (that.player_bomb_pusher) {
                                    var k = 0;
                                    while (k < create_map.general_table_game.length - (create_map.general_table_game.length - bombs[i][2] + 1) && create_map.general_table_game[bombs[i][1]][bombs[i][2] - k].breakable == null) {
                                        k++;
                                    }
                                    bombs[i][2] = bombs[i][2] - k - 1;
                                    bombs[i][0].style.left = create_map.general_table_game[bombs[i][1]][bombs[i][2]].element.offsetLeft + "px";
                                }
                                that.playerPosY += 1;
                            }
                        }
                    }

                    //SPRITE ANIMATION
                    that.real_player.className = "player";
                    that.real_player.classList.add("left");
                    setTimeout(function () {
                        that.real_player.classList.add("left1");
                    }, 25);
                    setTimeout(function () {
                        that.real_player.classList.remove("left1");
                        that.real_player.classList.add("left2");
                    }, 50);
                    setTimeout(function () {
                        that.real_player.classList.remove("left2");
                        that.real_player.classList.add("left3");
                    }, 75);
                    setTimeout(function () {
                        that.real_player.classList.remove("left3");
                    }, 100);
                    that.playerPosY -= 1;
                }
            } else if (e.keyCode == 38) {
                if (that.playerPosX - 1 >= 0 && create_map.general_table_game[that.playerPosX - 1][that.playerPosY].breakable == null) {

                    //COLLISION WITH BOMBS
                    if (bombs.length > 0) {
                        for (var _i = 0; _i < bombs.length; _i++) {
                            if (that.playerPosY == bombs[_i][2] && that.playerPosX - 1 == bombs[_i][1]) {

                                //BOMBPUSHER ITEM
                                if (that.player_bomb_pusher) {
                                    var _k = 0;
                                    while (_k < create_map.general_table_game.length - (create_map.general_table_game.length - bombs[_i][1] + 1) && create_map.general_table_game[bombs[_i][1] - _k][bombs[_i][2]].breakable == null) {
                                        _k++;
                                    }
                                    bombs[_i][1] = bombs[_i][1] - _k - 1;
                                    bombs[_i][0].style.top = create_map.general_table_game[bombs[_i][1]][bombs[_i][2]].element.offsetTop + "px";
                                }
                                that.playerPosX += 1;
                            }
                        }
                    }

                    //SPRITE ANIMATION
                    that.real_player.className = "player";
                    that.real_player.classList.add("up");
                    setTimeout(function () {
                        that.real_player.classList.add("up1");
                    }, 25);
                    setTimeout(function () {
                        that.real_player.classList.remove("up1");
                        that.real_player.classList.add("up2");
                    }, 50);
                    setTimeout(function () {
                        that.real_player.classList.remove("up2");
                        that.real_player.classList.add("up3");
                    }, 75);
                    setTimeout(function () {
                        that.real_player.classList.remove("up3");
                    }, 100);
                    that.playerPosX -= 1;
                }
            } else if (e.keyCode == 39) {
                if (that.playerPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[that.playerPosX][that.playerPosY + 1].breakable == null) {

                    //COLLISION WITH BOMBS
                    if (bombs.length > 0) {
                        for (var _i2 = 0; _i2 < bombs.length; _i2++) {
                            if (that.playerPosY + 1 == bombs[_i2][2] && that.playerPosX == bombs[_i2][1]) {

                                //BOMBPUSHER ITEM
                                if (that.player_bomb_pusher) {
                                    var _k2 = 0;
                                    while (create_map.general_table_game[bombs[_i2][1]][bombs[_i2][2] + _k2].breakable == null && _k2 < create_map.general_table_game.length - bombs[_i2][2] - 1) {
                                        _k2++;
                                    }
                                    bombs[_i2][2] = bombs[_i2][2] + _k2 - 1;
                                    bombs[_i2][0].style.left = create_map.general_table_game[bombs[_i2][1]][bombs[_i2][2]].element.offsetLeft + "px";
                                }
                                that.playerPosY -= 1;
                            }
                        }
                    }

                    //SPRITE ANIMATION
                    that.real_player.className = "player";
                    that.real_player.classList.add("right");
                    setTimeout(function () {
                        that.real_player.classList.add("right1");
                    }, 25);
                    setTimeout(function () {
                        that.real_player.classList.remove("right1");
                        that.real_player.classList.add("right2");
                    }, 50);
                    setTimeout(function () {
                        that.real_player.classList.remove("right2");
                        that.real_player.classList.add("right3");
                    }, 75);
                    setTimeout(function () {
                        that.real_player.classList.remove("right3");
                    }, 100);
                    that.playerPosY += 1;
                }
            } else if (e.keyCode == 40) {
                if (that.playerPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[that.playerPosX + 1][that.playerPosY].breakable == null) {

                    //COLLISION WITH BOMBS
                    if (bombs.length > 0) {
                        for (var _i3 = 0; _i3 < bombs.length; _i3++) {
                            if (that.playerPosY == bombs[_i3][2] && that.playerPosX + 1 == bombs[_i3][1]) {

                                //BOMBPUSHER ITEM
                                if (that.player_bomb_pusher) {
                                    var _k3 = 0;
                                    while (create_map.general_table_game[bombs[_i3][1] + _k3][bombs[_i3][2]].breakable == null && _k3 < create_map.general_table_game.length - bombs[_i3][1] - 1) {
                                        _k3++;
                                    }
                                    bombs[_i3][1] = bombs[_i3][1] + _k3 - 1;
                                    bombs[_i3][0].style.top = create_map.general_table_game[bombs[_i3][1]][bombs[_i3][2]].element.offsetTop + "px";
                                }
                                that.playerPosX -= 1;
                            }
                        }
                    }

                    //SPRITE ANIMATION
                    that.real_player.className = "player";
                    that.real_player.classList.add("down");
                    setTimeout(function () {
                        that.real_player.classList.add("down1");
                    }, 25);
                    setTimeout(function () {
                        that.real_player.classList.remove("down1");
                        that.real_player.classList.add("down2");
                    }, 50);
                    setTimeout(function () {
                        that.real_player.classList.remove("down2");
                        that.real_player.classList.add("down3");
                    }, 75);
                    setTimeout(function () {
                        that.real_player.classList.remove("down3");
                    }, 100);
                    that.playerPosX += 1;
                }
            }

            //ASSIGN NEW POSITION TO THE PLAYER
            that.real_player.style.top = create_map.general_table_game[that.playerPosX][that.playerPosY].element.offsetTop + "px";
            that.real_player.style.left = create_map.general_table_game[that.playerPosX][that.playerPosY].element.offsetLeft + "px";
        });
    },

    //DROP A BOMB BY USING THE BOMB OBJECT
    this.dropBomb = function () {
        var set_player_bomb = new bomb(set_player.playerPosX, set_player.playerPosY, set_player.player_bomb_number, set_player.player_bomb_power, 3);
        set_player_bomb.putBomb();
    };
};

var set_player = new player(2, 2, 2);
set_player.createPlayer();
set_player.movePlayer();

window.addEventListener('keydown', function (e) {
    console.log(set_player.player_bomb_number);
    e.preventDefault;
    if (e.keyCode == 32 && set_player.player_bomb_number > 0) {
        set_player.player_bomb_number--;
        set_player.dropBomb();
        setTimeout(function () {
            set_player.player_bomb_number++;
        }, 3300);
    }
});

var bombs = [];

function bomb(positionX, positionY, bomb_number, bomb_power, bomb_timer) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.bomb_power = bomb_power;
    this.bomb_timer = bomb_timer;
    this.bomb_pusher = false;

    //CREATE A BOMB
    this.putBomb = function () {
        var that = this;
        this.bomb_PosX = this.positionX;
        this.bomb_PosY = this.positionY;
        this.bomb = document.createElement('div');
        this.bomb.style.top = create_map.general_table_game[this.bomb_PosX][this.bomb_PosY].element.offsetTop + "px";
        this.bomb.style.left = create_map.general_table_game[this.bomb_PosX][this.bomb_PosY].element.offsetLeft + 'px';
        this.bomb.classList.add("bomb");
        this.bomb.classList.add("bomb3");
        document.querySelector(".table").appendChild(this.bomb);

        //STOCK IT IN BOMBS ARRAY, FALSE ARE HERE TO TEST IF THERE ARE UNBREAKABLE OR BREAKABLE BLOCKS ON THE PATH OF THE BOMB RANGE
        bombs.push([this.bomb, this.bomb_PosX, this.bomb_PosY, this.bomb_timer, this.bomb_power, false, false, false, false, false, false, false, false]);
        that.explodeBomb(bombs.length - 1);
    }, this.explodeBomb = function (i) {

        //BOMB IS EXPLODING AFTER THE END OF THE SETINTERVAL
        var that = this;
        var interval = setInterval(function () {
            bombs[i][3]--;
            if (bombs[i][3] == 2) {
                bombs[i][0].classList.remove("bomb3");
                bombs[i][0].classList.add("bomb2");
            } else if (bombs[i][3] == 1) {
                bombs[i][0].classList.remove("bomb2");
                bombs[i][0].classList.add("bomb1");
            } else if (bombs[i][3] == 0) {
                bombs[i][0].classList.remove("bomb1");
                bombs[i][0].classList.add("bomb0");

                var _loop = function _loop(j) {

                    //TEST CELLS TOUCHED BY EXPLOSION

                    if (bombs[i][1] + j < create_map.general_table_game.length && !bombs[i][5] && !bombs[i][9]) {
                        if (j > 0) {
                            create_map.general_table_game[bombs[i][1] + j][bombs[i][2]].element.classList.add("verticalexp");
                        }
                        if (create_map.general_table_game[bombs[i][1] + j][bombs[i][2]].breakable) {
                            create_map.general_table_game[bombs[i][1] + j][bombs[i][2]].breakable = null;
                            create_map.general_table_game[bombs[i][1] + j][bombs[i][2]].element.classList.remove("breakable");
                            if (create_map.general_table_game[bombs[i][1] + j][bombs[i][2]].item) {
                                create_map.general_table_game[bombs[i][1] + j][bombs[i][2]].element.classList.add(create_map.general_table_game[bombs[i][1] + j][bombs[i][2]].value_item);
                            }
                            bombs[i][5] = true;
                        } else if (bombs[i][1] + j < create_map.general_table_game.length && create_map.general_table_game[bombs[i][1] + j][bombs[i][2]].breakable == false) {
                            bombs[i][9] = true;
                        }
                    }

                    //TEST CELLS TOUCHED BY EXPLOSION

                    if (bombs[i][1] - j >= 0 && !bombs[i][6] && !bombs[i][10]) {
                        if (j > 0) {
                            create_map.general_table_game[bombs[i][1] - j][bombs[i][2]].element.classList.add("verticalexp");
                        }
                        if (create_map.general_table_game[bombs[i][1] - j][bombs[i][2]].breakable) {
                            create_map.general_table_game[bombs[i][1] - j][bombs[i][2]].breakable = null;
                            create_map.general_table_game[bombs[i][1] - j][bombs[i][2]].element.classList.remove("breakable");

                            if (create_map.general_table_game[bombs[i][1] - j][bombs[i][2]].item) {
                                create_map.general_table_game[bombs[i][1] - j][bombs[i][2]].element.classList.add(create_map.general_table_game[bombs[i][1] - j][bombs[i][2]].value_item);
                            }
                            bombs[i][6] = true;
                        } else if (bombs[i][1] - j >= 0 && create_map.general_table_game[bombs[i][1] - j][bombs[i][2]].breakable == false) {
                            bombs[i][10] = true;
                        }
                    }

                    //TEST CELLS TOUCHED BY EXPLOSION

                    if (bombs[i][2] + j < create_map.general_table_game.length && !bombs[i][7] && !bombs[i][11]) {
                        if (j > 0) {
                            create_map.general_table_game[bombs[i][1]][bombs[i][2] + j].element.classList.add("horizontalexp");
                        }
                        if (create_map.general_table_game[bombs[i][1]][bombs[i][2] + j].breakable) {
                            create_map.general_table_game[bombs[i][1]][bombs[i][2] + j].breakable = null;
                            create_map.general_table_game[bombs[i][1]][bombs[i][2] + j].element.classList.remove("breakable");

                            if (create_map.general_table_game[bombs[i][1]][bombs[i][2] + j].item) {
                                create_map.general_table_game[bombs[i][1]][bombs[i][2] + j].element.classList.add(create_map.general_table_game[bombs[i][1]][bombs[i][2] + j].value_item);
                            }
                            bombs[i][7] = true;
                        } else if (bombs[i][2] + j < create_map.general_table_game.length && create_map.general_table_game[bombs[i][1]][bombs[i][2] + j].breakable == false) {
                            bombs[i][11] = true;
                        }
                    }

                    //TEST CELLS TOUCHED BY EXPLOSION

                    if (bombs[i][2] - j >= 0 && !bombs[i][8] && !bombs[i][12]) {
                        if (j > 0) {
                            create_map.general_table_game[bombs[i][1]][bombs[i][2] - j].element.classList.add("horizontalexp");
                        }
                        if (create_map.general_table_game[bombs[i][1]][bombs[i][2] - j].breakable) {
                            create_map.general_table_game[bombs[i][1]][bombs[i][2] - j].breakable = null;
                            create_map.general_table_game[bombs[i][1]][bombs[i][2] - j].element.classList.remove("breakable");
                            if (create_map.general_table_game[bombs[i][1]][bombs[i][2] - j].item) {
                                create_map.general_table_game[bombs[i][1]][bombs[i][2] - j].element.classList.add(create_map.general_table_game[bombs[i][1]][bombs[i][2] - j].value_item);
                            }
                            bombs[i][8] = true;
                        } else if (bombs[i][2] - j >= 0 && create_map.general_table_game[bombs[i][1]][bombs[i][2] - j].breakable == false) {
                            bombs[i][12] = true;
                        }
                    }

                    //TEST IF BOMBE RANGE IS TOUCHING PLAYER
                    if (bombs[i][1] + j == set_player.playerPosX && bombs[i][2] == set_player.playerPosY && !bombs[i][5] && !bombs[i][9]) {
                        window.alert("You lost !");
                        location.reload();
                    }
                    if (bombs[i][1] - j == set_player.playerPosX && bombs[i][2] == set_player.playerPosY && !bombs[i][6] && !bombs[i][10]) {
                        window.alert("You lost !");
                        location.reload();
                    }
                    if (bombs[i][1] == set_player.playerPosX && bombs[i][2] + j == set_player.playerPosY && !bombs[i][7] && !bombs[i][11]) {
                        window.alert("You lost !");
                        location.reload();
                    }

                    if (bombs[i][1] == set_player.playerPosX && bombs[i][2] - j == set_player.playerPosY && !bombs[i][8] && !bombs[i][12]) {
                        window.alert("You lost !");
                        location.reload();
                    }

                    //TEST IF BOMBE RANGE IS TOUCHING PLAYER
                    if (bombs[i][1] + j == set_player.botPosX && bombs[i][2] == set_player.botPosY && !bombs[i][5] && !bombs[i][9]) {
                        window.alert("You win !");
                        location.reload();
                    }
                    if (bombs[i][1] - j == set_player.botPosX && bombs[i][2] == set_player.botPosY && !bombs[i][6] && !bombs[i][10]) {
                        window.alert("You win !");
                        location.reload();
                    }
                    if (bombs[i][1] == set_player.botPosX && bombs[i][2] + j == set_player.botPosY && !bombs[i][7] && !bombs[i][11]) {
                        window.alert("You win !");
                        location.reload();
                    }

                    if (bombs[i][1] == set_player.botPosX && bombs[i][2] - j == set_player.botPosY && !bombs[i][8] && !bombs[i][12]) {
                        window.alert("You win !");
                        location.reload();
                    }

                    //REMOVE EXPLOSION CLASS AROUND THE BOMB
                    setTimeout(function () {
                        if (bombs[i][1] + j < create_map.general_table_game.length) {
                            create_map.general_table_game[bombs[i][1] + j][bombs[i][2]].element.classList.remove("verticalexp");
                        }
                        if (bombs[i][1] - j >= 0) {
                            create_map.general_table_game[bombs[i][1] - j][bombs[i][2]].element.classList.remove("verticalexp");
                        }
                        if (bombs[i][2] + j < create_map.general_table_game.length) {
                            create_map.general_table_game[bombs[i][1]][bombs[i][2] + j].element.classList.remove("horizontalexp");
                        }
                        if (bombs[i][2] - j >= 0) {
                            create_map.general_table_game[bombs[i][1]][bombs[i][2] - j].element.classList.remove("horizontalexp");
                        }
                    }, 300);
                };

                for (var j = 0; j < bombs[i][4]; j++) {
                    _loop(j);
                }

                //REMOVE BOMB FROM THE DOM AND CLEAR ARRAY
                setTimeout(function () {
                    bombs[i][0].remove();
                    bombs[i] = [];
                }, 300);

                clearInterval(interval);
            }
        }, bomb_timer / 3 * 1000);
    };
}

var bot = function bot(bot_bomb_number, bot_bomb_range) {

    this.bot_bomb_number = bot_bomb_number;
    this.bot_bomb_range = bot_bomb_range;

    this.safe = true;
    this.cellsToMove = [];
    this.path = [];
    this.visitedLeft = false;
    this.visitedUp = false;
    this.visitedRight = false;
    this.visitedDown = false;
    this.path.push([set_player.botPosX, set_player.botPosY]);

    //RANDOM FUNCTION
    this.random = function (max) {
        return Math.floor(Math.random() * max);
    },

    //TEST CELLS AROUND WHEN SAFE AND REGISTER POSITIONS BOT CAN GO TO
    this.testAroundCells = function () {
        if (set_player.botPosY - 1 >= 0 && create_map.general_table_game[set_player.botPosX][set_player.botPosY - 1].breakable == null) {
            for (var i = 0; i < this.path.length; i++) {
                if (set_player.botPosY - 1 == this.path[i][1] && set_player.botPosX == this.path[i][0]) {
                    this.visitedLeft = true;
                }
            }
            if (!this.visitedLeft) this.cellsToMove.push("left");
        }

        if (set_player.botPosX - 1 >= 0 && create_map.general_table_game[set_player.botPosX - 1][set_player.botPosY].breakable == null) {
            for (var _i4 = 0; _i4 < this.path.length; _i4++) {
                if (set_player.botPosY == this.path[_i4][1] && set_player.botPosX - 1 == this.path[_i4][0]) {
                    this.visitedUp = true;
                }
            }
            if (!this.visitedUp) this.cellsToMove.push("up");
        }

        if (set_player.botPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX][set_player.botPosY + 1].breakable == null) {

            for (var _i5 = 0; _i5 < this.path.length; _i5++) {
                if (set_player.botPosY + 1 == this.path[_i5][1] && set_player.botPosX == this.path[_i5][0]) {
                    this.visitedRight = true;
                }
            }
            if (!this.visitedRight) this.cellsToMove.push("right");
        }

        if (set_player.botPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX + 1][set_player.botPosY].breakable == null) {

            for (var _i6 = 0; _i6 < this.path.length; _i6++) {
                if (set_player.botPosY == this.path[_i6][1] && set_player.botPosX + 1 == this.path[_i6][0]) {
                    this.visitedDown = true;
                }
            }
            if (!this.visitedDown) this.cellsToMove.push("down");
        }

        this.moveToCell(this.cellsToMove);
    },

    //WHEN NOT SAFE, TEST CELLS AROUND AND REGISTER POSITIONS BOT CAN GO TO
    this.dodgeBombs = function () {
        if (bombs.length > 0) {
            this.path = [];
            this.path.push([set_player.botPosX, set_player.botPosY]);
            for (var k = 0; k < bombs.length; k++) {
                for (var l = 0; l < bombs[k][4]; l++) {
                    if (bombs[k][1] - l == set_player.botPosX && bombs[k][2] == set_player.botPosY) {
                        this.safe = false;
                        if (set_player.botPosY - 1 >= 0 && create_map.general_table_game[set_player.botPosX][set_player.botPosY - 1].breakable == null) {
                            this.cellsToMove.push("left");
                        }
                        if (set_player.botPosX - 1 >= 0 && create_map.general_table_game[set_player.botPosX - 1][set_player.botPosY].breakable == null) {
                            this.cellsToMove.push("up");
                        }
                        if (set_player.botPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX][set_player.botPosY + 1].breakable == null) {
                            this.cellsToMove.push("right");
                        }
                        if (set_player.botPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX + 1][set_player.botPosY].breakable == null) {
                            this.cellsToMove.push("down");
                        }
                    }
                    if (bombs[k][1] + l == set_player.botPosX && bombs[k][2] == set_player.botPosY) {
                        this.safe = false;
                        if (set_player.botPosY - 1 >= 0 && create_map.general_table_game[set_player.botPosX][set_player.botPosY - 1].breakable == null) {
                            this.cellsToMove.push("left");
                        }
                        if (set_player.botPosX - 1 >= 0 && create_map.general_table_game[set_player.botPosX - 1][set_player.botPosY].breakable == null) {
                            this.cellsToMove.push("up");
                        }
                        if (set_player.botPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX][set_player.botPosY + 1].breakable == null) {
                            this.cellsToMove.push("right");
                        }
                        if (set_player.botPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX + 1][set_player.botPosY].breakable == null) {
                            this.cellsToMove.push("down");
                        }
                    }
                    if (bombs[k][1] == set_player.botPosX && bombs[k][2] - l == set_player.botPosY) {
                        this.safe = false;
                        if (set_player.botPosY - 1 >= 0 && create_map.general_table_game[set_player.botPosX][set_player.botPosY - 1].breakable == null) {
                            this.cellsToMove.push("left");
                        }
                        if (set_player.botPosX - 1 >= 0 && create_map.general_table_game[set_player.botPosX - 1][set_player.botPosY].breakable == null) {
                            this.cellsToMove.push("up");
                        }
                        if (set_player.botPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX][set_player.botPosY + 1].breakable == null) {
                            this.cellsToMove.push("right");
                        }
                        if (set_player.botPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX + 1][set_player.botPosY].breakable == null) {
                            this.cellsToMove.push("down");
                        }
                    }
                    if (bombs[k][1] == set_player.botPosX && bombs[k][2] + l == set_player.botPosY) {
                        this.safe = false;
                        if (set_player.botPosY - 1 >= 0 && create_map.general_table_game[set_player.botPosX][set_player.botPosY - 1].breakable == null) {
                            this.cellsToMove.push("left");
                        }
                        if (set_player.botPosX - 1 >= 0 && create_map.general_table_game[set_player.botPosX - 1][set_player.botPosY].breakable == null) {
                            this.cellsToMove.push("up");
                        }
                        if (set_player.botPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX][set_player.botPosY + 1].breakable == null) {
                            this.cellsToMove.push("right");
                        }
                        if (set_player.botPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX + 1][set_player.botPosY].breakable == null) {
                            this.cellsToMove.push("down");
                        }
                    }
                }
            }
        }
        this.moveToCell(this.cellsToMove);
    },

    //MOVE BOT TO POSITION ACCORDING TO RANDOM FUNCTION
    this.moveToCell = function (directions) {
        var randomized_direction = directions[this.random(directions.length)];
        if (directions.length > 0) {
            if (randomized_direction == "left") {
                set_player.bot_player.className = "bot";
                set_player.bot_player.classList.add("left");
                setTimeout(function () {
                    set_player.bot_player.classList.add("left1");
                }, 25);
                setTimeout(function () {
                    set_player.bot_player.classList.remove("left1");
                    set_player.bot_player.classList.add("left2");
                }, 50);
                setTimeout(function () {
                    set_player.bot_player.classList.remove("left2");
                    set_player.bot_player.classList.add("left3");
                }, 75);
                setTimeout(function () {
                    set_player.bot_player.classList.remove("left3");
                }, 100);
                set_player.botPosY -= 1;
            } else if (randomized_direction == "right") {
                set_player.bot_player.className = "bot";
                set_player.bot_player.classList.add("right");
                setTimeout(function () {
                    set_player.bot_player.classList.add("right1");
                }, 25);
                setTimeout(function () {
                    set_player.bot_player.classList.remove("right1");
                    set_player.bot_player.classList.add("right2");
                }, 50);
                setTimeout(function () {
                    set_player.bot_player.classList.remove("right2");
                    set_player.bot_player.classList.add("right3");
                }, 75);
                setTimeout(function () {
                    set_player.bot_player.classList.remove("right3");
                }, 100);
                set_player.botPosY += 1;
            } else if (randomized_direction == "down") {
                set_player.bot_player.className = "bot";
                set_player.bot_player.classList.add("down");
                setTimeout(function () {
                    set_player.bot_player.classList.add("down1");
                }, 25);
                setTimeout(function () {
                    set_player.bot_player.classList.remove("down1");
                    set_player.bot_player.classList.add("down2");
                }, 50);
                setTimeout(function () {
                    set_player.bot_player.classList.remove("down2");
                    set_player.bot_player.classList.add("down3");
                }, 75);
                setTimeout(function () {
                    set_player.bot_player.classList.remove("down3");
                }, 100);
                set_player.botPosX += 1;
            } else if (randomized_direction == "up") {
                set_player.bot_player.className = "bot";
                set_player.bot_player.classList.add("up");
                setTimeout(function () {
                    set_player.bot_player.classList.add("up1");
                }, 25);
                setTimeout(function () {
                    set_player.bot_player.classList.remove("up1");
                    set_player.bot_player.classList.add("up2");
                }, 50);
                setTimeout(function () {
                    set_player.bot_player.classList.remove("up2");
                    set_player.bot_player.classList.add("up3");
                }, 75);
                setTimeout(function () {
                    set_player.bot_player.classList.remove("up3");
                }, 100);
                set_player.botPosX -= 1;
            }

            set_player.bot_player.style.top = create_map.general_table_game[set_player.botPosX][set_player.botPosY].element.offsetTop + "px";
            set_player.bot_player.style.left = create_map.general_table_game[set_player.botPosX][set_player.botPosY].element.offsetLeft + "px";

            this.cellsToMove = [];
            this.path.push([set_player.botPosX, set_player.botPosY]);
            this.visitedLeft = false;
            this.visitedUp = false;
            this.visitedRight = false;
            this.visitedDown = false;
        } else {
            var set_bot_bomb = new bomb(set_player.botPosX, set_player.botPosY, this.bot_bomb_number, this.bot_bomb_range, 3);
            if (this.bot_bomb_number) {
                this.bot_bomb_number--;
                set_bot_bomb.putBomb();
            }
            this.safe = false;
            this.dodgeBombs();
            var that = this;
            setTimeout(function () {
                that.bot_bomb_number++;
                that.safe = true;
            }, 3300);
        }
    };
};

var set_bot = new bot(1, 2);
setInterval(function () {
    if (set_bot.safe) {
        set_bot.testAroundCells();
    } else if (!set_bot.safe) {
        set_bot.dodgeBombs();
    }
}, 500);

var items = function items() {

    //ITEMS ARE ACTIVATED WHEN PLAYER AND BOT ARE OVER THEM
    this.itemsActivation = function () {
        var that = this;
        window.addEventListener('keydown', function (e) {
            if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].item) {
                if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "bomb_area_bonus") {
                    set_player.player_bomb_power++;
                } else if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "push_bombs") {
                    set_player.player_bomb_pusher = true;
                } else if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "more_bombs") {
                    set_player.player_bomb_number++;
                }
                create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].item = false;
                create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].element.className = "cell";
            }
        });

        setInterval(function () {
            if (create_map.general_table_game[set_player.botPosX][set_player.botPosY].item) {
                if (create_map.general_table_game[set_player.botPosX][set_player.botPosY].value_item == "bomb_area_bonus") {
                    set_bot.bot_bomb_power++;
                } else if (create_map.general_table_game[set_player.botPosX][set_player.botPosY].value_item == "push_bombs") {
                    set_bot.bot_bomb_pusher = true;
                } else if (create_map.general_table_game[set_player.botPosX][set_player.botPosY].value_item == "more_bombs") {
                    set_bot.bot_bomb_number++;
                }
                create_map.general_table_game[set_player.botPosX][set_player.botPosY].item = false;
                create_map.general_table_game[set_player.botPosX][set_player.botPosY].element.className = "cell";
            }
        }, 50);
    };
};

var set_items = new items();
set_items.itemsActivation();