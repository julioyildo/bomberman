//var bot = function () {
//    this.botAction = function () {
//        setInterval(function () {
//            if (set_bomb.bombs.length > 0) {
//                for (let i = 0; i < set_bomb.bomb_power; i++) {
//                    if (this.bomb_PosX + i == set_player.botPosX && this.bomb_PosY == set_player.botPosY || this.bomb_PosX - i == set_player.botPosX && this.bomb_PosY == set_player.botPosY || this.bomb_PosX == set_player.botPosX && this.bomb_PosY + i == set_player.botPosY || this.bomb_PosX == set_player.botPosX && this.bomb_PosY - i == set_player.botPosY) {
//                        if (set_player.botPosY - 1 >= 0 && create_map.general_table_game[set_player.botPosX][set_player.botPosY - 1].breakable == null) {
//                            for (let i = 0; i < that.bombs.length; i++) {
//                                if (set_player.botPosY - 1 == that.bombs[i][1] && set_player.botPosX == that.bombs[i][0]) {
//                                    that.botPosY += 1;
//                                }
//                            }
//                            set_player.botPosY -= 1;
//                        } else if (set_player.botPosX - 1 >= 0 && create_map.general_table_game[set_player.botPosX - 1][set_player.botPosY].breakable == null) {
//                            for (let i = 0; i < that.bombs.length; i++) {
//                                if (set_player.botPosY == that.bombs[i][1] && set_player.botPosX - 1 == that.bombs[i][0]) {
//                                    set_player.botPosX += 1;
//                                }
//                            }
//                            set_player.botPosX -= 1;
//                        } else if (set_player.botPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX][set_player.botPosY + 1].breakable == null) {
//                            for (let i = 0; i < that.bombs.length; i++) {
//                                if (set_player.botPosY + 1 == that.bombs[i][1] && set_player.botPosX == that.bombs[i][0]) {
//                                    set_player.botPosY -= 1;
//                                }
//                            }
//                            set_player.botPosY += 1;
//                        } else if (set_player.botPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX + 1][set_player.botPosY].breakable == null) {
//                            for (let i = 0; i < that.bombs.length; i++) {
//                                if (set_player.botPosY == that.bombs[i][1] && set_player.botPosX + 1 == that.bombs[i][0]) {
//                                    set_player.botPosX -= 1;
//                                }
//                            }
//                           set_playert.botPosX += 1;
//                        }
//                    }
//                }
//            }
//            set_player.bot_player.style.top = create_map.general_table_game[set_player.botPosX][set_player.botPosY].element.offsetTop + "px";
//            set_player.bot_player.style.left = create_map.general_table_game[set_player.botPosX][set_player.botPosY].element.offsetLeft + "px";
//        }, 50);
//    }
//}
//
//var set_bot = new bot();
//set_bot.botAction();
