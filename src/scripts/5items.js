var items = function () {
    
    //ITEMS ARE ACTIVATED WHEN PLAYER AND BOT ARE OVER THEM
    this.itemsActivation = function () {
        var that = this;
        window.addEventListener('keydown', function (e) {
            if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].item) {
                if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "bomb_area_bonus") {
                    set_player.player_bomb_power++;
                } else if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "push_bombs") {
                    set_player.player_bomb_pusher = true;
                } else if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "more_bombs") {
                    set_player.player_bomb_number++;
                }
                create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].item = false;
                create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].element.className = "cell";
            }
        });

        setInterval(function () {
            if (create_map.general_table_game[set_player.botPosX][set_player.botPosY].item) {
                if (create_map.general_table_game[set_player.botPosX][set_player.botPosY].value_item == "bomb_area_bonus") {
                    set_bot.bot_bomb_power++;
                } else if (create_map.general_table_game[set_player.botPosX][set_player.botPosY].value_item == "push_bombs") {
                    set_bot.bot_bomb_pusher = true;
                } else if (create_map.general_table_game[set_player.botPosX][set_player.botPosY].value_item == "more_bombs") {
                    set_bot.bot_bomb_number++;
                }
                create_map.general_table_game[set_player.botPosX][set_player.botPosY].item = false;
                create_map.general_table_game[set_player.botPosX][set_player.botPosY].element.className = "cell";
            }
        }, 50);
    }
}

var set_items = new items();
set_items.itemsActivation();
