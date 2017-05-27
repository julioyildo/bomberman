var items = function () {
    this.playerItems = function () {
        var that = this;
        window.addEventListener('keydown', function (e) {
            if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].item) {
                if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "bombe_area_bonus") {
                    set_bomb.bomb_power++;
                } else if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "push_bombs") {
                    set_bomb.bomb_pusher = true;
                } else if (create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].value_item == "bombe_plus_one") {
                    set_bomb.bomb_number++;
                }
                create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].item = false;
                create_map.general_table_game[set_player.playerPosX][set_player.playerPosY].element.className = "cell";
            }
        });
    }
}

var set_items = new items();
set_items.playerItems();
