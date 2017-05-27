'use strict';

var bomb = function bomb(bomb_number, bomb_power, bomb_timer) {
    this.bomb_power = bomb_power;
    this.bomb_number = bomb_number;
    this.bomb_timer = bomb_timer;
    this.bomb_pusher = true;
    this.bombs = [];

    this.putBomb = function () {
        var that = this;
        window.addEventListener('keydown', function (e) {
            console.log(that.bomb_power);
            e.preventDefault;
            if (e.keyCode == 32 && that.bomb_number > 0) {
                console.log(that.bombs);
                this.bomb_PosX = set_player.playerPosX;
                this.bomb_PosY = set_player.playerPosY;
                this.bomb = document.createElement('div');
                this.bomb.style.top = create_map.general_table_game[this.bomb_PosX][this.bomb_PosY].element.offsetTop + "px";
                this.bomb.style.left = create_map.general_table_game[this.bomb_PosX][this.bomb_PosY].element.offsetLeft + 'px';
                this.bomb.classList.add("bomb");
                this.bomb.classList.add("bomb3");
                document.querySelector(".table").appendChild(this.bomb);
                that.bombs.push([this.bomb, this.bomb_PosX, this.bomb_PosY, that.bomb_timer]);
                that.bomb_number--;
                that.explodeBomb(that.bombs.length - 1);
            }
        });
    }, this.explodeBomb = function (i) {
        var that = this;
        this.unbreakableBlockUp = false;
        this.unbreakableBlockDown = false;
        this.unbreakableBlockLeft = false;
        this.unbreakableBlockRight = false;
        var interval = setInterval(function () {
            that.bombs[i][3]--;
            if (that.bombs[i][3] == 2) {
                that.bombs[i][0].classList.remove("bomb3");
                that.bombs[i][0].classList.add("bomb2");
            } else if (that.bombs[i][3] == 1) {
                that.bombs[i][0].classList.remove("bomb2");
                that.bombs[i][0].classList.add("bomb1");
            } else if (that.bombs[i][3] == 0) {
                that.bombs[i][0].classList.remove("bomb1");
                that.bombs[i][0].classList.add("bomb0");

                setTimeout(function () {
                    for (var j = 1; j < that.bomb_power; j++) {

                        if (that.bombs[i][1] + j < create_map.general_table_game.length && create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].breakable && !that.unbreakableBlockRight) {
                            create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].breakable = null;
                            create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].element.classList.remove("breakable");
                            if (create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].item) {
                                create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].element.classList.add(create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].value_item);
                            }
                        } else if (that.bombs[i][1] + j < create_map.general_table_game.length && create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].breakable == false) {
                            that.unbreakableBlockRight = true;
                        }

                        if (that.bombs[i][1] - j >= 0 && create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].breakable && !that.unbreakableBlockLeft) {
                            create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].breakable = null;
                            create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].element.classList.remove("breakable");
                            if (create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].item) {
                                create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].element.classList.add(create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].value_item);
                            }
                        } else if (that.bombs[i][1] - j >= 0 && create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].breakable == false) {
                            that.unbreakableBlockLeft = true;
                        }

                        if (that.bombs[i][2] + j < create_map.general_table_game.length && create_map.general_table_game[this.bomb_PosX][that.bombs[i][2] + j].breakable && !that.unbreakableBlockDown) {
                            create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].breakable = null;
                            create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].element.classList.remove("breakable");
                            if (create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].item) {
                                create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].element.classList.add(create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].value_item);
                            }
                        } else if (that.bombs[i][2] + j < create_map.general_table_game.length && create_map.general_table_game[this.bomb_PosX][that.bombs[i][2] + j].breakable == false) {
                            that.unbreakableBlockDown = true;
                        }

                        if (that.bombs[i][2] - j >= 0 && create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].breakable && !that.unbreakableBlockUp) {
                            create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].breakable = null;
                            create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].element.classList.remove("breakable");
                            if (create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].item) {
                                create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].element.classList.add(create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].value_item);
                            }
                        } else if (that.bombs[i][2] - j >= 0 && create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].breakable == false) {
                            that.unbreakableBlockUp = true;
                        }

                        if (that.bombs[i][1] + j == set_player.playerPosX && that.bombs[i][2] == set_player.playerPosY && !that.unbreakableBlockRight) {
                            window.alert("You lost !");
                            location.reload();
                        }
                        if (that.bombs[i][1] - j == set_player.playerPosX && that.bombs[i][2] == set_player.playerPosY && !that.unbreakableBlockLeft) {
                            window.alert("You lost !");
                            location.reload();
                        }
                        if (that.bombs[i][1] == set_player.playerPosX && that.bombs[i][2] + j == set_player.playerPosY && !that.unbreakableBlockDown) {
                            window.alert("You lost !");
                            location.reload();
                        }

                        if (that.bombs[i][1] == set_player.playerPosX && that.bombs[i][2] - j == set_player.playerPosY && !that.unbreakableBlockUp) {
                            window.alert("You lost !");
                            location.reload();
                        }
                    }
                    console.log(that.unbreakableBlockUp, that.unbreakableBlockDown, that.unbreakableBlockLeft, that.unbreakableBlockRight);

                    that.bomb_number++;
                    that.bombs[i][0].remove();
                    that.bombs[i] = [];
                }, 300);
                clearInterval(interval);
            }
        }, 1000);
    };
};

var set_bomb = new bomb(1, 2, 3);
set_bomb.putBomb();

var items = function items() {
    this.playerItems = function () {
        var that = this;
        window.addEventListener('keydown', function (e) {
            if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].item) {
                if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "bombe_area_bonus") {
                    set_bomb.bomb_power++;
                } else if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "push_bombs") {
                    set_bomb.bomb_pusher = true;
                } else if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "bombe_plus_one") {
                    set_bomb.bomb_number++;
                }
                create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].item = false;
                create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].element.className = "cell";
            }
        });
    };
};

var set_items = new items();
set_items.playerItems();

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
var create_map = new map(11, 200, 18, 6, 10, 2);
create_map.create_map();
create_map.unbreakable();
create_map.isEmpty();
create_map.breakable();
create_map.element();
create_map.element_value();

// CLASS SET THE PLAYER

var player = function player(player_number) {
    this.player_number = player_number;
    this.players_positions = [{
        x: 0,
        y: 0
    }, {
        x: create_map.general_table_game.length - 1,
        y: create_map.general_table_game.length - 1
    }];

    //Pour faire affancer le player, il faut vérifier grâce au tableau générale si les celluls de la
    // direction souhaité sont des wall  ou de breakable.  Si ce n'est pas le cas alors il peut avancer.

    // SET THE PLAYER POSITION :
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
                    if (set_bomb.bombs.length > 0) {
                        for (var i = 0; i < set_bomb.bombs.length; i++) {
                            if (that.playerPosY - 1 == set_bomb.bombs[i][2] && that.playerPosX == set_bomb.bombs[i][1]) {
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
                    if (set_bomb.bombs.length > 0) {
                        for (var _i = 0; _i < set_bomb.bombs.length; _i++) {
                            if (that.playerPosY == set_bomb.bombs[_i][2] && that.playerPosX - 1 == set_bomb.bombs[_i][1]) {
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
                    if (set_bomb.bombs.length > 0) {
                        for (var _i2 = 0; _i2 < set_bomb.bombs.length; _i2++) {
                            if (that.playerPosY + 1 == set_bomb.bombs[_i2][2] && that.playerPosX == set_bomb.bombs[_i2][1]) {
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
                    if (set_bomb.bombs.length > 0) {
                        for (var _i3 = 0; _i3 < set_bomb.bombs.length; _i3++) {
                            if (that.playerPosY == set_bomb.bombs[_i3][2] && that.playerPosX + 1 == set_bomb.bombs[_i3][1]) {
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

            that.real_player.style.top = create_map.general_table_game[that.playerPosX][that.playerPosY].element.offsetTop + "px";
            that.real_player.style.left = create_map.general_table_game[that.playerPosX][that.playerPosY].element.offsetLeft + "px";
        });
    };
};

var set_player = new player(2);
set_player.createPlayer();
set_player.movePlayer();