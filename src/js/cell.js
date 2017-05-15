var cell = function (posX, posY, status, div) {
    this.posX = posX;
    this.posY = posY;
    this.status = status;
    this.div = div;

    this.createDiv = function (map) {
        this.div = document.createElement('div');
        this.div.classList.add('cell');
        this.div.classList.add(this.status);
        map.appendChild(this.div);
    }

    this.updateStatus = function (newStatus) {
        this.div.classList.remove(status);
        this.status = newStatus;
        this.div.classList.add(newStatus);
    }
}
