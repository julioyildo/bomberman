var bomb = function (bomb_number, bomb_power, bomb_timer) {
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
        },

        this.explodeBomb = function (i) {
            var that = this;
            this.unbreakableBlockUp = false;
            this.unbreakableBlockDown = false;
            this.unbreakableBlockLeft = false;
            this.unbreakableBlockRight = false;
            this.breakableBlockUp = false;
            this.breakableBlockDown = false;
            this.breakableBlockLeft = false;
            this.breakableBlockRight = false;
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
                        for (let j = 1; j < that.bomb_power; j++) {

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
                                that.bombs[i][10] = true
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
                    }, 300)
                    clearInterval(interval);
                }
            }, (bomb_timer / 3) * 1000);

        }
}

var set_bomb = new bomb(1, 2, 3);
set_bomb.putBomb();
