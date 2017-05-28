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
            },

            this.explodeBomb = function (i) {
            
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


                        for (let j = 0; j < bombs[i][4]; j++) {

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
                            }, 300)

                        }

                        //REMOVE BOMB FROM THE DOM AND CLEAR ARRAY
                        setTimeout(function () {
                            bombs[i][0].remove();
                            bombs[i] = [];
                        }, 300)

                        clearInterval(interval);
                    }
                }, (bomb_timer / 3) * 1000);

            }
    }
