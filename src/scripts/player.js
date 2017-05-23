// CLASS SET THE PLAYER
var player = function (player_number, bomb_power) {
    this.player_number = player_number;
    this.players_positions = [{
        x: 0,
        y: 0
    }, {
        x: create_map.general_table_game.length - 1,
        y: create_map.general_table_game.length - 1
    }];
    this.bomb_power = bomb_power;
    this.bombs = [];
    //Pour faire affancer le player, il faut vérifier grâce au tableau générale si les celluls de la
    // direction souhaité sont des wall  ou de breakable.  Si ce n'est pas le cas alors il peut avancer.

    // SET THE PLAYER POSITION :
    this.createPlayer = function () {
            for (let i = 0; i < this.player_number; i++) {
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
        },

        this.movePlayer = function () {
            var that = this;
            window.addEventListener("keydown", function (e) {
                e.preventDefault();
                if (e.keyCode == 37) {
                    if (that.playerPosY - 1 >= 0 && create_map.general_table_game[that.playerPosX][that.playerPosY - 1].breakable == null) {
                        if (that.bombs.length > 0) {
                            for (let i = 0; i < that.bombs.length; i++) {
                                if (that.playerPosY - 1 == that.bombs[i][1] && that.playerPosX == that.bombs[i][0]) {
                                    that.playerPosY += 1;
                                }
                            }
                        }
                        that.playerPosY -= 1;
                    }

                } else if (e.keyCode == 38) {
                    if (that.playerPosX - 1 >= 0 && create_map.general_table_game[that.playerPosX - 1][that.playerPosY].breakable == null) {
                        if (that.bombs.length > 0) {
                            for (let i = 0; i < that.bombs.length; i++) {
                                if (that.playerPosY == that.bombs[i][1] && that.playerPosX - 1 == that.bombs[i][0]) {
                                    that.playerPosX += 1;
                                }
                            }
                        }
                        that.playerPosX -= 1;
                    }
                } else if (e.keyCode == 39) {
                    if (that.playerPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[that.playerPosX][that.playerPosY + 1].breakable == null) {
                        if (that.bombs.length > 0) {
                            for (let i = 0; i < that.bombs.length; i++) {
                                if (that.playerPosY + 1 == that.bombs[i][1] && that.playerPosX == that.bombs[i][0]) {
                                    that.playerPosY -= 1;
                                }
                            }
                        }
                        that.playerPosY += 1;
                    }
                } else if (e.keyCode == 40) {
                    if (that.playerPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[that.playerPosX + 1][that.playerPosY].breakable == null) {
                        if (that.bombs.length > 0) {
                            for (let i = 0; i < that.bombs.length; i++) {
                                if (that.playerPosY == that.bombs[i][1] && that.playerPosX + 1 == that.bombs[i][0]) {
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
        },



        this.putBomb = function () {
            var that = this;
            that.bombUsed = false;
            window.addEventListener('keydown', function (e) {
                e.preventDefault;
                if (e.keyCode == 32 && !that.bombUsed) {
                    this.bomb_PosX = that.playerPosX;
                    this.bomb_PosY = that.playerPosY;
                    that.bombs.push([this.bomb_PosX, this.bomb_PosY]);
                    this.bomb = document.createElement('div');        
                    this.bomb.style.top = create_map.general_table_game[this.bomb_PosX][this.bomb_PosY].element.offsetTop + "px";
                    this.bomb.style.left = create_map.general_table_game[this.bomb_PosX][this.bomb_PosY].element.offsetLeft + 'px';
                    this.bomb.classList.add("bomb");     
                    document.querySelector(".table").appendChild(this.bomb);
                    that.bombUsed = true;
                    setTimeout(function () {
                        for (let i = 0; i < that.bomb_power; i++) {
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

                        that.bombUsed = false;
                        this.bomb.remove();
                        that.bombs = [];
                    }, 1000)
                }
            });
        },

        this.botPlayerAction = function () {
            var that = this;
            setInterval(function () {
                if (that.bombs.length > 0) {
                    for (let i = 0; i < that.bomb_power; i++) {
                        console.log(this.bomb_PosX);
                        if (this.bomb_PosX + i == that.botPosX && this.bomb_PosY == that.botPosY || this.bomb_PosX - i == that.botPosX && this.bomb_PosY == that.botPosY || this.bomb_PosX == that.botPosX && this.bomb_PosY + i == that.botPosY || this.bomb_PosX == that.botPosX && this.bomb_PosY - i == that.botPosY) {
                            if (that.botPosY - 1 >= 0 && create_map.general_table_game[that.botPosX][that.botPosY - 1].breakable == null) {
                                for (let i = 0; i < that.bombs.length; i++) {
                                    if (that.botPosY - 1 == that.bombs[i][1] && that.botPosX == that.bombs[i][0]) {
                                        that.botPosY += 1;
                                    }
                                }
                                that.botPosY -= 1;
                            } else if (that.botPosX - 1 >= 0 && create_map.general_table_game[that.botPosX - 1][that.botPosY].breakable == null) {
                                for (let i = 0; i < that.bombs.length; i++) {
                                    if (that.botPosY == that.bombs[i][1] && that.botPosX - 1 == that.bombs[i][0]) {
                                        that.botPosX += 1;
                                    }
                                }
                                that.botPosX -= 1;
                            } else if (that.botPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[that.botPosX][that.botPosY + 1].breakable == null) {
                                for (let i = 0; i < that.bombs.length; i++) {
                                    if (that.botPosY + 1 == that.bombs[i][1] && that.botPosX == that.bombs[i][0]) {
                                        that.botPosY -= 1;
                                    }
                                }
                                that.botPosY += 1;
                            } else if (that.botPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[that.botPosX + 1][that.botPosY].breakable == null) {
                                for (let i = 0; i < that.bombs.length; i++) {
                                    if (that.botPosY == that.bombs[i][1] && that.botPosX + 1 == that.bombs[i][0]) {
                                        that.botPosX -= 1;
                                    }
                                }
                                that.botPosX += 1;
                            }
                        }
                    }
                }
                console.log(that.botPosX, that.botPosY);
                that.bot_player.style.top = create_map.general_table_game[that.botPosX][that.botPosY].element.offsetTop + "px";
                that.bot_player.style.left = create_map.general_table_game[that.botPosX][that.botPosY].element.offsetLeft + "px";
            }, 50);
        };
}

var set_player = new player(2, 2);
set_player.createPlayer();
set_player.movePlayer();
set_player.putBomb();
set_player.botPlayerAction();
