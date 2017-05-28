var bot = function () {
    this.botAction = function () {
        setInterval(function () {
            if (set_bomb.bombs.length > 0) {
                for (let j = 0; j < set_bomb.bombs.length; j++) {
                    for (let i = 0; i < set_bomb.bomb_power; i++) {
                        if (set_bomb.bombs[j][1] + i == set_player.botPosX && set_bomb.bombs[j][2] == set_player.botPosY || set_bomb.bombs[j][1] - i == set_player.botPosX && set_bomb.bombs[j][2] == set_player.botPosY || set_bomb.bombs[j][1] == set_player.botPosX && set_bomb.bombs[j][2] + i == set_player.botPosY || set_bomb.bombs[j][1] == set_player.botPosX && set_bomb.bombs[j][2] - i == set_player.botPosY) {
                            if (set_player.botPosY - 1 >= 0 && create_map.general_table_game[set_player.botPosX][set_player.botPosY - 1].breakable == null) {
                                if (set_player.botPosY - 1 == set_bomb.bombs[j][1] && set_player.botPosX == set_bomb.bombs[j][0]) {
                                    set_bomb.botPosY += 1;
                                }
                                set_player.botPosY -= 1;
                            } else if (set_player.botPosX - 1 >= 0 && create_map.general_table_game[set_player.botPosX - 1][set_player.botPosY].breakable == null) {
                                if (set_player.botPosY == set_bomb.bombs[j][1] && set_player.botPosX - 1 == set_bomb.bombs[j][0]) {
                                    set_player.botPosX += 1;
                                }
                                set_player.botPosX -= 1;
                            } else if (set_player.botPosY + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX][set_player.botPosY + 1].breakable == null) {
                                if (set_player.botPosY + 1 == set_bomb.bombs[j][1] && set_player.botPosX == set_bomb.bombs[j][0]) {
                                    set_player.botPosY -= 1;
                                }
                                set_player.botPosY += 1;
                            } else if (set_player.botPosX + 1 < create_map.general_table_game.length && create_map.general_table_game[set_player.botPosX + 1][set_player.botPosY].breakable == null) {
                                if (set_player.botPosY == set_bomb.bombs[j][1] && set_player.botPosX + 1 == set_bomb.bombs[j][0]) {
                                    set_player.botPosX -= 1;
                                }
                                set_player.botPosX += 1;
                            }
                        }
                    }
                }
                set_player.bot_player.style.top = create_map.general_table_game[set_player.botPosX][set_player.botPosY].element.offsetTop + "px";
                set_player.bot_player.style.left = create_map.general_table_game[set_player.botPosX][set_player.botPosY].element.offsetLeft + "px";
            }
        }, 50);
    }
}

var set_bot = new bot();
set_bot.botAction();
