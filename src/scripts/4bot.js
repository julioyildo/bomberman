var bot = function (bot_bomb_number, bot_bomb_range) {

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
                for (let i = 0; i < this.path.length; i++) {
                    if (set_player.botPosY - 1 == this.path[i][1] && set_player.botPosX == this.path[i][0]) {
                        this.visitedLeft = true;
                    }
                }
                if (!this.visitedLeft)
                    this.cellsToMove.push("left");
            }


            if (set_player.botPosX - 1 >= 0 && create_map.general_table_game[set_player.botPosX - 1][set_player.botPosY].breakable == null) {
                for (let i = 0; i < this.path.length; i++) {
                    if (set_player.botPosY == this.path[i][1] && set_player.botPosX - 1 == this.path[i][0]) {
                        this.visitedUp = true;
                    }
                }
                if (!this.visitedUp)
                    this.cellsToMove.push("up");
            }


            if (set_player.botPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX][set_player.botPosY + 1].breakable == null) {

                for (let i = 0; i < this.path.length; i++) {
                    if (set_player.botPosY + 1 == this.path[i][1] && set_player.botPosX == this.path[i][0]) {
                        this.visitedRight = true;
                    }
                }
                if (!this.visitedRight)
                    this.cellsToMove.push("right");
            }


            if (set_player.botPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX + 1][set_player.botPosY].breakable == null) {

                for (let i = 0; i < this.path.length; i++) {
                    if (set_player.botPosY == this.path[i][1] && set_player.botPosX + 1 == this.path[i][0]) {
                        this.visitedDown = true;
                    }
                }
                if (!this.visitedDown)
                    this.cellsToMove.push("down");

            }

            this.moveToCell(this.cellsToMove);
        },

        //WHEN NOT SAFE, TEST CELLS AROUND AND REGISTER POSITIONS BOT CAN GO TO
        this.dodgeBombs = function () {
            if (bombs.length > 0) {
                this.path = [];
                this.path.push([set_player.botPosX, set_player.botPosY]);
                for (let k = 0; k < bombs.length; k++) {
                    for (let l = 0; l < bombs[k][4]; l++) {
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
                }, 3300)
            }
        }
}

var set_bot = new bot(1, 2);
setInterval(function () {
    console.log(set_bot.safe);
    if (set_bot.safe) {
        set_bot.testAroundCells();
    } else if (!set_bot.safe) {
        set_bot.dodgeBombs();
    }
}, 500);
