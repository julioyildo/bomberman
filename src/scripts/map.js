
// CLASS SET THE MAP
var map = function (size, breakable_number, items){
    //PROPRIETIES :
    this.container = document.querySelector(".bomberman-map");
    this.table_size = size;
    this.breakable_bumber = breakable_number;
    this.items = items;


    // TABLE :
    this.general_table_game = [];
    this.is_empty = [];
    this.is_breakable = [];




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
                    breakable : null,
                    element : cell,
                    item : null
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
        for (let i = 0; i < this.breakable_bumber; i++) {
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
        for (let i = 0; i < this.items; i++) {

            var random_item = Math.floor(Math.random() * this.is_breakable.length);
            this.is_breakable[random_item].item = true;
            this.is_breakable[random_item].element.classList.add('item');

        }
    }





};



// SET THE MAP
var create_map = new map(11,200, 30);
create_map.create_map();
create_map.unbreakable();
create_map.isEmpty();
create_map.breakable();
create_map.element();
