var player = function (playerPosX, playerPosY, div) {    
    this.playerPosX = playerPosX;    
    this.playerPosY = playerPosY;  
    this.createPlayer = function () {        
            this.div = document.createElement('div');        
            this.div.style.top = this.playerPosY + 'px';
            this.div.style.left = this.playerPosX + 'px';
            this.div.classList.add("player");
            var map = document.querySelector('.bomberman-map');        
            map.appendChild(this.div);    
        },
        this.movePlayer = function () {
            var that = this;
            that.playerPosX = playerPosX;
            that.playerPosY = playerPosY;
            window.addEventListener('keydown', function (e) {
                // Position calcul
                that.posX = Math.floor(that.playerPosX / 50); //
                that.posY = Math.floor(that.playerPosY / 50); //

                if (e.keyCode == 38) {
                    //up
//                    that.posX = Math.floor((that.playerPosX + 15) / 50); //
//                    that.posY = Math.floor((that.playerPosY + 25) / 50); //
                    if (create_map.isUnbreakable(that.posX, that.posY) === false) {
                        that.playerPosY -= 15;
                    }
                } else if (e.keyCode == 39) {
                    //right
//                    that.posX = Math.floor((that.playerPosX + 35) / 50); //
//                    that.posY = Math.floor((that.playerPosY + 30) / 50); //
                    if (create_map.isUnbreakable(that.posX, that.posY) === false) {
                        that.playerPosX += 15;
                    }
                } else if (e.keyCode == 40) {
                    //down
//                    that.posX = Math.floor((that.playerPosX + 15) / 50); //
//                    that.posY = Math.floor((that.playerPosY + 35) / 50); //
                    if (create_map.isUnbreakable(that.posX, that.posY) === false) {
                        that.playerPosY += 15;
                    }
                } else if (e.keyCode == 37) {
                    //left
//                    that.posX = Math.floor((that.playerPosX - 5) / 50); //
//                    that.posY = Math.floor((that.playerPosY + 30) / 50); //
                    if (create_map.isUnbreakable(that.posX, that.posY) === false) {
                        that.playerPosX -= 15;
                    }
                }
                that.div.style.top = that.playerPosY + "px";
                that.div.style.left = that.playerPosX + "px";
            });
        }
    this.putBomb = function () {
        var that = this;
        that.playerPosX = playerPosX;
        that.playerPosY = playerPosY;
        that.bombUsed = false;
        window.addEventListener('keydown', function (e) {
            e.preventDefault;
            that.posX = Math.floor(that.playerPosX / 50); //
            that.posY = Math.floor(that.playerPosY / 50); //
            if (e.keyCode == 32 && !that.bombUsed) {
                this.div = document.createElement('div');        
                this.div.style.top = that.playerPosY + 'px';
                this.div.style.left = that.playerPosX + 'px';
                this.div.classList.add("bomb");
                var map = document.querySelector('.bomberman-map');        
                map.appendChild(this.div);
                that.bombUsed = true;
                setTimeout(function(){
                    that.bombUsed = false;
                    this.div.remove();
                }, 3000)
            }
        });
    }
}


var bomber = new player(50, 50);
bomber.createPlayer();
bomber.movePlayer();
bomber.putBomb();
