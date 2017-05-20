// CLASS SET THE PLAYER
var  player = function ()
{
    //Pour faire affancer le player, il faut vérifier grâce au tableau générale si les celluls de la
    // direction souhaité sont des wall  ou de breakable.  Si ce n'est pas le cas alors il peut avancer.

    // SET THE PLAYER POSITION :
    create_map.general_table_game[0][0].element.classList.add('player');
}

var set_player = new player();
