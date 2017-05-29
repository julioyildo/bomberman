
// CLASS SET THE MAP
// bombe_plus_one, walk_fast, bombe_area_bonus, push_bombs
var map = function (size, breakable_number, items, bombe_plus_one, bombe_area_bonus, push_bombs){
    //PROPRIETIES :
    this.container          = document.querySelector(".bomberman-map");
    this.table_size         = size;
    this.breakable_bumber   = breakable_number;
    this.items              = items;
    this.bombe_plus_one     = bombe_plus_one;
    this.bombe_area_bonus   = bombe_area_bonus;
    this.push_bombs         = push_bombs;




    // TABLES :
    this.general_table_game = [];
    this.is_empty           = [];
    this.is_breakable       = [];
    this.is_item            = [];




    //CREATE THE GENERAL TABLE WHICH SET THE IDENTITY OF EACH CELLS :
    this.create_map = function()
    {
        // create the table
        var tab = document.createElement('div');
        tab.className = 'table';


        for (let i = 0; i < this.table_size ; i++)
        {
            this.general_table_game.push([]);

            // create each rows
            var row = document.createElement('div');
            row.className = 'row';

            for (let j = 0; j < this.table_size ; j++)
            {
                var cell = document.createElement('div');
                cell.className = 'cell';
                row.appendChild(cell);

                // for each cell create object identity
                this.general_table_game[i].push({
                    x    : i,
                    y    : j,
                    element : cell,
                    breakable : null,
                    item : null,
                    value_item : null
                });
            }

            tab.appendChild(row);
        }

        this.container.appendChild(tab);
    }

     console.log(this.general_table_game);






    // FUNCTION SET UNBREAKABLE CELLS
    this.unbreakable = function()
    {
        for (let i = 1; i < this.general_table_game.length-1; i+=2)
        {

            for (let j = 1; j < this.general_table_game[i].length-1; j+=2)
            {
                this.general_table_game[i][j].breakable = false;
                this.general_table_game[i][j].element.classList.add('unbreakable');

            }

        }
    }








    // FUNCTION SET THE EMPTY CELLS IN NEW TABLE
    this.isEmpty = function ()
    {
        for (let i = 0; i < this.general_table_game.length; i++)
        {
            for (let j = 0; j < this.general_table_game[i].length; j++)
            {
                if (this.general_table_game[i][j].breakable == null )
                {
                    this.is_empty.push(this.general_table_game[i][j]);
                }

            }

        }

    }








    // FUNCTION SET THE BREAKABLE BLOK

    this.breakable = function ()
    {
        for (let i = 0; i < this.breakable_bumber; i++)
        {
            var slice_null_table = this.is_empty.slice(3, this.is_empty.length-3);
            var random_cell = Math.floor(Math.random() * slice_null_table.length);


            slice_null_table[random_cell].breakable = true;
            slice_null_table[random_cell].element.classList.add('breakable');

            this.is_breakable.push(slice_null_table[random_cell]);

        }
        // console.log(this.is_breakable );
    }






    // FUNCTION SET THE ITEMS
    this.element = function ()
    {
        for (let i = 0; i < this.items; i++)
        {
            // relance:
            var random_item = Math.floor(Math.random() * this.is_breakable.length);

            if (!this.is_breakable[random_item].item)
            {
                this.is_breakable[random_item].item = true;
                this.is_item.push(this.is_breakable[random_item]);

            }
            else
            {
                i--;
            }
        }
    }

    console.log(this.is_item);










    // FUNCTION SET VALUE OF EACH ITEM
    this.element_value = function ()
    {
        this.value_items = ["more_bombs", "bomb_area_bonus",  "push_bombs"];


//        relance_boucle:
        for (let j = 0; j < this.is_item.length; j++)
        {
            var random_item_value = Math.floor(Math.random() * this.value_items.length);


            if (this.value_items[random_item_value] === "more_bombs" && this.bombe_plus_one > 0)
            {
                this.is_item[j].value_item = this.value_items[random_item_value];
                this.bombe_plus_one--;
            }
            else if (this.value_items[random_item_value] === "bomb_area_bonus" && this.bombe_area_bonus > 0)
            {
                this.is_item[j].value_item = this.value_items[random_item_value];
                this.bombe_area_bonus--;
            }
            else if (this.value_items[random_item_value] === "push_bombs" && this.push_bombs > 0)
            {
                this.is_item[j].value_item = this.value_items[random_item_value];
                this.push_bombs--;
            }
            else {
                j--;
            }
        }
    }









};



// SET THE MAP
var create_map = new map(11,200, 20, 8, 10, 2);
create_map.create_map();
create_map.unbreakable();
create_map.isEmpty();
create_map.breakable();
create_map.element();
create_map.element_value();
