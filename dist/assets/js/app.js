"use strict";

var game = {};

game.container = document.querySelector(".container");
game.row = document.querySelectorAll(".row");
game.size = 10;
game.lab_construction_size = game.container.clientWidth / game.size + 'px';

game.cell = {};
game.cell.position = {};

game.walls_number = 10;

game.init_tab = function (size) {
    var _tab = new Array(size);
    for (var i = 0; i < size; i++) {
        _tab[i] = new Array(size);
        var _row = document.createElement('div');
        _row.className = 'row';
        for (var j = 0; j < _tab[i].length; j++) {
            var cell = JSON.parse(JSON.stringify(game.cell));
            cell.position.x = i;
            cell.position.y = j;
            _tab[i][j] = cell;
            var _case = document.createElement('div');
            _case.className = 'case top right bottom left';
            _case.style.width = game.lab_construction_size;
            _case.style.height = game.lab_construction_size;
            _row.appendChild(_case);
        }
        game.container.appendChild(_row);
    }
    return _tab;
};
game.tab = game.init_tab(game.size);
console.log(game.row);

game.walls_generation = function (n) {
    for (var i = 0; i < n; i++) {
        var randomX = Math.floor(Math.random() * 10);
        var randomY = Math.floor(Math.random() * 10);
        game.tab[randomX][randomY].style.background = 'red';
    }
};
game.walls = game.walls_generation(game.walls_number);