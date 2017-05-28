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
                                if (set_bomb.bomb_pusher) {
                                    var k = 0;
                                    while (k < create_map.general_table_game.length - (create_map.general_table_game.length - set_bomb.bombs[i][2] + 1) && create_map.general_table_game[set_bomb.bombs[i][1]][set_bomb.bombs[i][2] - k].breakable == null) {
                                        k++;
                                    }
                                    set_bomb.bombs[i][2] = set_bomb.bombs[i][2] - k - 1;
                                    set_bomb.bombs[i][0].style.left = create_map.general_table_game[set_bomb.bombs[i][1]][set_bomb.bombs[i][2]].element.offsetLeft + "px";
                                }
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
                                if (set_bomb.bomb_pusher) {
                                    var _k = 0;
                                    while (_k < create_map.general_table_game.length - (create_map.general_table_game.length - set_bomb.bombs[_i][1] + 1) && create_map.general_table_game[set_bomb.bombs[_i][1] - _k][set_bomb.bombs[_i][2]].breakable == null) {
                                        _k++;
                                    }
                                    set_bomb.bombs[_i][1] = set_bomb.bombs[_i][1] - _k - 1;
                                    set_bomb.bombs[_i][0].style.top = create_map.general_table_game[set_bomb.bombs[_i][1]][set_bomb.bombs[_i][2]].element.offsetTop + "px";
                                }
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
                                if (set_bomb.bomb_pusher) {
                                    var _k2 = 0;
                                    while (create_map.general_table_game[set_bomb.bombs[_i2][1]][set_bomb.bombs[_i2][2] + _k2].breakable == null && _k2 < create_map.general_table_game.length - set_bomb.bombs[_i2][2] - 1) {
                                        _k2++;
                                    }
                                    set_bomb.bombs[_i2][2] = set_bomb.bombs[_i2][2] + _k2 - 1;
                                    set_bomb.bombs[_i2][0].style.left = create_map.general_table_game[set_bomb.bombs[_i2][1]][set_bomb.bombs[_i2][2]].element.offsetLeft + "px";
                                }
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
                                if (set_bomb.bomb_pusher) {
                                    var _k3 = 0;
                                    while (create_map.general_table_game[set_bomb.bombs[_i3][1] + _k3][set_bomb.bombs[_i3][2]].breakable == null && _k3 < create_map.general_table_game.length - set_bomb.bombs[_i3][1] - 1) {
                                        _k3++;
                                    }
                                    set_bomb.bombs[_i3][1] = set_bomb.bombs[_i3][1] + _k3 - 1;
                                    set_bomb.bombs[_i3][0].style.top = create_map.general_table_game[set_bomb.bombs[_i3][1]][set_bomb.bombs[_i3][2]].element.offsetTop + "px";
                                }
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

var bomb = function bomb(bomb_number, bomb_power, bomb_timer) {
    this.bomb_power = bomb_power;
    this.bomb_number = bomb_number;
    this.bomb_timer = bomb_timer;
    this.bomb_pusher = false;
    this.bombs = [];

    this.putBomb = function () {
        var that = this;
        window.addEventListener('keydown', function (e) {
            e.preventDefault;
            if (e.keyCode == 32 && that.bomb_number > 0) {
                this.bomb_PosX = set_player.playerPosX;
                this.bomb_PosY = set_player.playerPosY;
                this.bomb = document.createElement('div');
                this.bomb.style.top = create_map.general_table_game[this.bomb_PosX][this.bomb_PosY].element.offsetTop + "px";
                this.bomb.style.left = create_map.general_table_game[this.bomb_PosX][this.bomb_PosY].element.offsetLeft + 'px';
                this.bomb.classList.add("bomb");
                this.bomb.classList.add("bomb3");
                document.querySelector(".table").appendChild(this.bomb);
                that.bombs.push([this.bomb, this.bomb_PosX, this.bomb_PosY, that.bomb_timer, false, false, false, false, false, false, false, false]);
                that.bomb_number--;
                that.explodeBomb(that.bombs.length - 1);
            }
        });
    }, this.explodeBomb = function (i) {
        var that = this;
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
                    for (var j = 0; j < that.bomb_power; j++) {

                        if (that.bombs[i][1] + j < create_map.general_table_game.length && create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].breakable && !that.bombs[i][5] && !that.bombs[i][9]) {
                            create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].breakable = null;
                            create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].element.classList.remove("breakable");
                            if (create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].item) {
                                create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].element.classList.add(create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].value_item);
                            }
                            that.bombs[i][5] = true;
                        } else if (that.bombs[i][1] + j < create_map.general_table_game.length && create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].breakable == false) {
                            that.bombs[i][9] = true;
                        }

                        if (that.bombs[i][1] - j >= 0 && create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].breakable && !that.bombs[i][6] && !that.bombs[i][10]) {
                            create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].breakable = null;
                            create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].element.classList.remove("breakable");
                            if (create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].item) {
                                create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].element.classList.add(create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].value_item);
                            }
                            that.bombs[i][6] = true;
                        } else if (that.bombs[i][1] - j >= 0 && create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].breakable == false) {
                            that.bombs[i][10] = true;
                        }

                        if (that.bombs[i][2] + j < create_map.general_table_game.length && create_map.general_table_game[this.bomb_PosX][that.bombs[i][2] + j].breakable && !that.bombs[i][7] && !that.bombs[i][11]) {
                            create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].breakable = null;
                            create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].element.classList.remove("breakable");
                            if (create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].item) {
                                create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].element.classList.add(create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].value_item);
                            }
                            that.bombs[i][7] = true;
                        } else if (that.bombs[i][2] + j < create_map.general_table_game.length && create_map.general_table_game[this.bomb_PosX][that.bombs[i][2] + j].breakable == false) {
                            that.bombs[i][11] = true;
                        }

                        if (that.bombs[i][2] - j >= 0 && create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].breakable && !that.bombs[i][8] && !that.bombs[i][12]) {
                            create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].breakable = null;
                            create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].element.classList.remove("breakable");
                            if (create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].item) {
                                create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].element.classList.add(create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].value_item);
                            }
                            that.bombs[i][8] = true;
                        } else if (that.bombs[i][2] - j >= 0 && create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].breakable == false) {
                            that.bombs[i][12] = true;
                        }

                        if (that.bombs[i][1] + j == set_player.playerPosX && that.bombs[i][2] == set_player.playerPosY && !that.bombs[i][5] && !that.bombs[i][9]) {
                            window.alert("You lost !");
                            location.reload();
                        }
                        if (that.bombs[i][1] - j == set_player.playerPosX && that.bombs[i][2] == set_player.playerPosY && !that.bombs[i][6] && !that.bombs[i][10]) {
                            window.alert("You lost !");
                            location.reload();
                        }
                        if (that.bombs[i][1] == set_player.playerPosX && that.bombs[i][2] + j == set_player.playerPosY && !that.bombs[i][7] && !that.bombs[i][11]) {
                            window.alert("You lost !");
                            location.reload();
                        }

                        if (that.bombs[i][1] == set_player.playerPosX && that.bombs[i][2] - j == set_player.playerPosY && !that.bombs[i][8] && !that.bombs[i][12]) {
                            window.alert("You lost !");
                            location.reload();
                        }

                        if (that.bombs[i][1] + j == set_player.botPosX && that.bombs[i][2] == set_player.botPosY && !that.bombs[i][5] && !that.bombs[i][9]) {
                            window.alert("You win !");
                            location.reload();
                        }
                        if (that.bombs[i][1] - j == set_player.botPosX && that.bombs[i][2] == set_player.botPosY && !that.bombs[i][6] && !that.bombs[i][10]) {
                            window.alert("You win !");
                            location.reload();
                        }
                        if (that.bombs[i][1] == set_player.botPosX && that.bombs[i][2] + j == set_player.botPosY && !that.bombs[i][7] && !that.bombs[i][11]) {
                            window.alert("You win !");
                            location.reload();
                        }

                        if (that.bombs[i][1] == set_player.botPosX && that.bombs[i][2] - j == set_player.botPosY && !that.bombs[i][8] && !that.bombs[i][12]) {
                            window.alert("You win !");
                            location.reload();
                        }
                    }

                    that.bomb_number++;
                    that.bombs[i][0].remove();
                    that.bombs[i] = [];
                }, 300);
                clearInterval(interval);
            }
        }, bomb_timer / 3 * 1000);
    };
};

var set_bomb = new bomb(1, 2, 3);
set_bomb.putBomb();

var bot = function bot() {

    var findShortestPath = function findShortestPath(startCoordinates, grid) {
        var distanceFromTop = startCoordinates[0];
        var distanceFromLeft = startCoordinates[1];

        // Each "location" will store its coordinates
        // and the shortest path required to arrive there
        var location = {
            distanceFromTop: distanceFromTop,
            distanceFromLeft: distanceFromLeft,
            path: [],
            status: 'Start'
        };

        // Initialize the queue with the start location already inside
        var queue = [location];

        // Loop through the grid searching for the goal
        while (queue.length > 0) {
            // Take the first location off the queue
            var currentLocation = queue.shift();

            // Explore North
            var newLocation = exploreInDirection(currentLocation, 'North', grid);
            if (newLocation.status === 'Goal') {
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            // Explore East
            var newLocation = exploreInDirection(currentLocation, 'East', grid);
            if (newLocation.status === 'Goal') {
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            // Explore South
            var newLocation = exploreInDirection(currentLocation, 'South', grid);
            if (newLocation.status === 'Goal') {
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            // Explore West
            var newLocation = exploreInDirection(currentLocation, 'West', grid);
            if (newLocation.status === 'Goal') {
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }
        }

        // No valid path found
        return false;
    };

    // This function will check a location's status
    // (a location is "valid" if it is on the grid, is not an "obstacle",
    // and has not yet been visited by our algorithm)
    // Returns "Valid", "Invalid", "Blocked", or "Goal"
    var locationStatus = function locationStatus(location, grid) {
        var gridSize = grid.length;
        var dft = location.distanceFromTop;
        var dfl = location.distanceFromLeft;

        if (location.distanceFromLeft < 0 || location.distanceFromLeft >= gridSize || location.distanceFromTop < 0 || location.distanceFromTop >= gridSize) {

            // location is not on the grid--return false
            return 'Invalid';
        } else if (grid[dft][dfl] === 'Goal') {
            return 'Goal';
        } else if (grid[dft][dfl] !== 'Empty') {
            // location is either an obstacle or has been visited
            return 'Blocked';
        } else {
            return 'Valid';
        }
    };

    // Explores the grid from the given location in the given
    // direction
    var exploreInDirection = function exploreInDirection(currentLocation, direction, grid) {
        var newPath = currentLocation.path.slice();
        newPath.push(direction);

        var dft = currentLocation.distanceFromTop;
        var dfl = currentLocation.distanceFromLeft;

        if (direction === 'North') {
            dft -= 1;
        } else if (direction === 'East') {
            dfl += 1;
        } else if (direction === 'South') {
            dft += 1;
        } else if (direction === 'West') {
            dfl -= 1;
        }

        var newLocation = {
            distanceFromTop: dft,
            distanceFromLeft: dfl,
            path: newPath,
            status: 'Unknown'
        };
        newLocation.status = locationStatus(newLocation, grid);

        // If this new location is valid, mark it as 'Visited'
        if (newLocation.status === 'Valid') {
            grid[newLocation.distanceFromTop][newLocation.distanceFromLeft].value_bot = 'Visited';
        }

        return newLocation;
    };

    console.log(findShortestPath([set_player.botPosX, set_player.botPosY], create_map.general_table_game));

    //    this.botAction = function () {
    //        var that = this;
    //        var interval = setInterval(function () {
    //            var i = 0;
    //            var shortestPath = that.findShortestPath();
    //            console.log(shortestPath);
    //            if (shortestPath.length > 0) {
    //                if (i < shortestPath.length) {
    //                    console.log(set_player.botPosX, set_player.botPosY);
    //                    if (shortestPath[i] == "North") {
    //                        set_player.botPosX -= 1;
    //                    } else if (shortestPath[i] == "East") {
    //                        set_player.botPosY += 1;
    //                    } else if (shortestPath[i] == "South") {
    //                        set_player.botPosX += 1;
    //                    } else if (shortestPath[i] == "West") {
    //                        set_player.botPosY -= 1;
    //                    }
    //
    //                    set_player.bot_player.style.top = create_map.general_table_game[set_player.botPosX][set_player.botPosY].element.offsetTop + "px";
    //                    set_player.bot_player.style.left = create_map.general_table_game[set_player.botPosX][set_player.botPosY].element.offsetLeft + "px";
    //                }
    //
    //            }
    //            i++;
    //            if(!shortestPath){
    //                console.log("yo");
    //            }
    //        }, 500)
    //    }
};

var set_bot = new bot();
//set_bot.botAction();

var items = function items() {
    this.playerItems = function () {
        var that = this;
        window.addEventListener('keydown', function (e) {
            if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].item) {
                if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "bomb_area_bonus") {
                    set_bomb.bomb_power++;
                } else if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "push_bombs") {
                    set_bomb.bomb_pusher = true;
                } else if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "more_bombs") {
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