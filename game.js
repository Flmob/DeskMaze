var fs = require('fs');
var sprites = require('./sprites');

function game(context, paths, scale) {
    if (!paths || !context) return null;

    var aLeft = 37;
    var aUp = 38;
    var aRight = 39;
    var aDown = 40;

    var kLeft = 65;
    var kUp = 87;
    var kRight = 68;
    var kDown = 83;

    var kRepl = 82;
    var kYes = 89;
    var kNo = 78;
    var kEnter = 13;

    var sWon = 1;
    var sGame = 0;
    var sLose = -1;
    var state = sGame;
    var lvlCount = 0;


    this.field = [];
    this.tInfo = [];
    this.info = [];

    this.initLvl = function(nLvl) {
        if (!(nLvl < paths.length - 1)) {
            console.log("555555555555555");
            this.drawField(sWon);
            return;
        }
        this.field = fs.readFileSync(paths[nLvl], 'utf8').split('\n');

        this.tInfo = this.field.shift().split(' ');

        this.tInfo.forEach(function(element, i, arr) {
            arr[i] = +arr[i];
        }, this);

        console.log(this.tInfo);

        this.info = this.tInfo.slice();

        this.field.forEach(function(element, i, arr) {
            arr[i] = arr[i].split('');
            if (i < arr.length - 1) arr[i].pop();
        }, this);
    };

    this.initLvl(lvlCount);

    this.restart = function() {
        this.info = this.tInfo.slice();
        this.drawField();
    };

    this.drawField = function(state) {
        var h = this.field.length < 6 ? 6 : this.field.length;
        var w = this.field[1].length + 5;

        context.canvas.height = h * scale;
        context.canvas.width = w * scale;

        context.fillStyle = "#151515";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        for (var i = 0; i < this.field.length; i++) {
            for (var j = 0; j < this.field[i].length; j++) {
                sprites[' '].draw(context, j * scale, i * scale, scale, scale);
                sprites[this.field[i][j]].draw(context, j * scale, i * scale, scale, scale);
            }
        }

        sprites['mouse'].draw(context, this.info[0] * scale, this.info[1] * scale, scale, scale);

        if (state === sWon) {
            sprites['won'].draw(context, (w - 4) * scale, scale);
        } else if (state === sLose) {
            sprites['lose'].draw(context, (w - 4) * scale, scale);
        }
    };

    this.move = function(kKode) {
        if (kKode == aRight || kKode == kRight) {
            if (this.field[this.info[1]][this.info[0] + 1] == ' ' ||
                this.field[this.info[1]][this.info[0] + 1] == 'F' ||
                this.field[this.info[1]][this.info[0] + 1] == 'S') {
                this.info[0]++;
                this.info[2]--;
            }
        } else if (kKode == aDown || kKode == kDown) {
            if (this.field[this.info[1] + 1][this.info[0]] == ' ' ||
                this.field[this.info[1] + 1][this.info[0]] == 'F' ||
                this.field[this.info[1] + 1][this.info[0]] == 'S') {
                this.info[1]++;
                this.info[2]--;
            }
        } else if (kKode == aLeft || kKode == kLeft) {
            if (this.field[this.info[1]][this.info[0] - 1] == ' ' ||
                this.field[this.info[1]][this.info[0] - 1] == 'F' ||
                this.field[this.info[1]][this.info[0] - 1] == 'S') {
                this.info[0]--;
                this.info[2]--;
            }
        } else if (kKode == aUp || kKode == kUp) {
            if (this.field[this.info[1] - 1][this.info[0]] == ' ' ||
                this.field[this.info[1] - 1][this.info[0]] == 'F' ||
                this.field[this.info[1] - 1][this.info[0]] == 'S') {
                this.info[1]--;
                this.info[2]--;
            }
        } else if (kKode == kRepl) this.restart();
        else if (kKode == kEnter) this.initLvl(++lvlCount);
        // console.log(this.info);

        if (this.field[this.info[1]][this.info[0]] == 'F') {
            state = sWon;
            this.drawField(state);
        } else if (this.info[2] <= 0) {
            state = sLose;
            this.drawField(state);
        } else {
            state = sGame;
            this.drawField(state);
        }
    };
}

module.exports = game;