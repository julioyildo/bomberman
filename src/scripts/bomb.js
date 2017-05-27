var bomb = function (bomb_number, bomb_power, bomb_timer) {
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
        },

        this.explodeBomb = function (i) {
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
                        for (let j = 1; j < that.bomb_power; j++) {

                            if (that.bombs[i][1] + j < create_map.general_table_game.length && create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].breakable && !that.unbreakableBlockRight) {
                                create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].breakable = null;
                                create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].element.classList.remove("breakable");
                                if(create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].item){
                                    create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].element.classList.add(create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].value_item);
                                }
                            } else if (that.bombs[i][1] + j < create_map.general_table_game.length && create_map.general_table_game[that.bombs[i][1] + j][that.bombs[i][2]].breakable==false) {
                                that.unbreakableBlockRight = true;
                            }

                            if (that.bombs[i][1] - j >= 0 && create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].breakable && !that.unbreakableBlockLeft) {
                                create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].breakable = null;
                                create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].element.classList.remove("breakable");
                                if(create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].item){
                                    create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].element.classList.add(create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].value_item);
                                }
                            } else if (that.bombs[i][1] - j >= 0 && create_map.general_table_game[that.bombs[i][1] - j][that.bombs[i][2]].breakable==false) {
                                that.unbreakableBlockLeft = true;
                            }


                            if (that.bombs[i][2] + j < create_map.general_table_game.length && create_map.general_table_game[this.bomb_PosX][that.bombs[i][2] + j].breakable && !that.unbreakableBlockDown) {
                                create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].breakable = null;
                                create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].element.classList.remove("breakable");
                                if(create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].item){
                                    create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].element.classList.add(create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] + j].value_item);
                                }
                            } else if (that.bombs[i][2] + j < create_map.general_table_game.length && create_map.general_table_game[this.bomb_PosX][that.bombs[i][2] + j].breakable==false) {
                                that.unbreakableBlockDown = true;
                            }

                            if (that.bombs[i][2] - j >= 0 && create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].breakable && !that.unbreakableBlockUp) {
                                create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].breakable = null;
                                create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].element.classList.remove("breakable");
                                if(create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].item){
                                    create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].element.classList.add(create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].value_item);
                                }
                            } else if (that.bombs[i][2] - j >= 0 && create_map.general_table_game[that.bombs[i][1]][that.bombs[i][2] - j].breakable==false) {
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
                    }, 300)
                    clearInterval(interval);
                }
            }, 1000);

        }
}

var set_bomb = new bomb(1, 2, 3);
set_bomb.putBomb();
