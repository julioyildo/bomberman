var bot = function () {

    this.findShortestPath = function () {

        this.location = {
            distanceFromTop: set_player.botPosX,
            distanceFromLeft: set_player.botPosY,
            path: [],
            status: 'Start'
        };
        this.path = [this.location];

        while (this.path.length > 0) {
            this.currentLocation = this.path.shift();

            // Explore North
            this.newLocation = this.exploreInDirection(this.currentLocation, 'North');
            if (this.newLocation.status === 'Goal') {
                return this.newLocation.path;
            } else if (this.newLocation.status === 'Valid') {
                this.path.push(this.newLocation);
            }

            // Explore East
            this.newLocation = this.exploreInDirection(this.currentLocation, 'East');
            if (this.newLocation.status === 'Goal') {
                return this.newLocation.path;
            } else if (this.newLocation.status === 'Valid') {
                this.path.push(this.newLocation);
            }

            // Explore South
            this.newLocation = this.exploreInDirection(this.currentLocation, 'South');
            if (this.newLocation.status === 'Goal') {
                return this.newLocation.path;
            } else if (this.newLocation.status === 'Valid') {
                this.path.push(this.newLocation);
            }

            // Explore West
            this.newLocation = this.exploreInDirection(this.currentLocation, 'West');
            if (this.newLocation.status === 'Goal') {
                return this.newLocation.path;
            } else if (this.newLocation.status === 'Valid') {
                this.path.push(this.newLocation);
            }
        }
        // No valid path found
        return false;
    };

    this.locationStatus = function (location) {
        var dft = location.distanceFromTop;
        var dfl = location.distanceFromLeft;

        if (location.distanceFromLeft < 0 ||
            location.distanceFromLeft >= create_map.general_table_game.length ||
            location.distanceFromTop < 0 ||
            location.distanceFromTop >= create_map.general_table_game.length) {

            // location is not on the grid--return false
            return 'Invalid';
        } else if (create_map.general_table_game[dft][dfl] === create_map.general_table_game[set_player.playerPosX][set_player.playerPosY]) {
            return 'Goal';
        } else if (create_map.general_table_game[dft][dfl].breakable !== null) {
            // location is either an obstacle or has been visited
            return 'Blocked';
        } else {
            return 'Valid';
        }
    };


    // Explores the grid from the given location in the given
    // direction
    this.exploreInDirection = function (currentLocation, direction) {
        this.newPath = currentLocation.path.slice();
        this.newPath.push(direction);

        this.dft = currentLocation.distanceFromTop;
        this.dfl = currentLocation.distanceFromLeft;

        if (direction === 'North') {
            this.dft -= 1;
        } else if (direction === 'East') {
            this.dfl += 1;
        } else if (direction === 'South') {
            this.dft += 1;
        } else if (direction === 'West') {
            this.dfl -= 1;
        }

        this.newLocation = {
            distanceFromTop: this.dft,
            distanceFromLeft: this.dfl,
            path: this.newPath,
            status: 'Unknown'
        };
        this.newLocation.status = this.locationStatus(this.newLocation);

        // If this new location is valid, mark it as 'Visited'
        if (this.newLocation.status === 'Valid') {
            create_map.general_table_game[this.newLocation.distanceFromTop][this.newLocation.distanceFromLeft].value_bot = 'Visited';
        }

        return this.newLocation;
    };

    console.log();

    this.botAction = function () {
        var that = this;
//        setInterval(function () {
//            var i = 0;
//            var shortestPath = that.findShortestPath();
//            console.log(shortestPath);
//            if (shortestPath) {
//                if (shortestPath.length > 0) {
//                    if (i < shortestPath.length) {
//                        console.log(set_player.botPosX, set_player.botPosY);
//                        if (shortestPath[i] == "North") {
//                            set_player.botPosX -= 1;
//                        } else if (shortestPath[i] == "East") {
//                            set_player.botPosY += 1;
//                        } else if (shortestPath[i] == "South") {
//                            set_player.botPosX += 1;
//                        } else if (shortestPath[i] == "West") {
//                            set_player.botPosY -= 1;
//                        }
//
//                        set_player.bot_player.style.top = create_map.general_table_game[set_player.botPosX][set_player.botPosY].element.offsetTop + "px";
//                        set_player.bot_player.style.left = create_map.general_table_game[set_player.botPosX][set_player.botPosY].element.offsetLeft + "px";
//                    }
//
//                }
//                i++;
//            }
//            else{
//                console.log("wtf");
//            }
//        }, 500);
    }
}

var set_bot = new bot();
set_bot.botAction();
