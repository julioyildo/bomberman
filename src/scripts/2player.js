// CLASS SET THE PLAYER

var player = function (player_number, player_bomb_number, player_bomb_power) {
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
            for (let i = 0; i < this.player_number; i++) {
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
                            for (let i = 0; i < bombs.length; i++) {
                                if (that.playerPosY - 1 == bombs[i][2] && that.playerPosX == bombs[i][1]) {
                                    
                                    //BOMBPUSHER ITEM
                                    if (that.player_bomb_pusher) {
                                        let k = 0;
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
                            for (let i = 0; i < bombs.length; i++) {
                                if (that.playerPosY == bombs[i][2] && that.playerPosX - 1 == bombs[i][1]) {
                                    
                                    //BOMBPUSHER ITEM
                                    if (that.player_bomb_pusher) {
                                        let k = 0;
                                        while (k < create_map.general_table_game.length - (create_map.general_table_game.length - bombs[i][1] + 1) && create_map.general_table_game[bombs[i][1] - k][bombs[i][2]].breakable == null) {
                                            k++;
                                        }
                                        bombs[i][1] = bombs[i][1] - k - 1;
                                        bombs[i][0].style.top = create_map.general_table_game[bombs[i][1]][bombs[i][2]].element.offsetTop + "px";
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
                            for (let i = 0; i < bombs.length; i++) {
                                if (that.playerPosY + 1 == bombs[i][2] && that.playerPosX == bombs[i][1]) {
                                    
                                    //BOMBPUSHER ITEM
                                    if (that.player_bomb_pusher) {
                                        let k = 0;
                                        while (create_map.general_table_game[bombs[i][1]][bombs[i][2] + k].breakable == null && k < (create_map.general_table_game.length - bombs[i][2] - 1)) {
                                            k++;
                                        }
                                        bombs[i][2] = bombs[i][2] + k - 1;
                                        bombs[i][0].style.left = create_map.general_table_game[bombs[i][1]][bombs[i][2]].element.offsetLeft + "px";
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
                            for (let i = 0; i < bombs.length; i++) {
                                if (that.playerPosY == bombs[i][2] && that.playerPosX + 1 == bombs[i][1]) {
                                    
                                    //BOMBPUSHER ITEM
                                    if (that.player_bomb_pusher) {
                                        let k = 0;
                                        while (create_map.general_table_game[bombs[i][1] + k][bombs[i][2]].breakable == null && k < (create_map.general_table_game.length - bombs[i][1] - 1)) {
                                            k++;
                                        }
                                        bombs[i][1] = bombs[i][1] + k - 1;
                                        bombs[i][0].style.top = create_map.general_table_game[bombs[i][1]][bombs[i][2]].element.offsetTop + "px";
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
        }
}

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
        }, 3300)
    }
});
