var sprites = require('./sprites');

function game(context, inpLvl, scale) {
    if (!inpLvl || !context) return null;

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

    var sWon = 1;
    var sLose = 2;

    var tfield = inpLvl.split('\n');
    var tInfo = tfield.shift();

    tInfo = tInfo.split(' ');
    tInfo.splice(0, 2);

    tInfo.forEach(function(element, i, arr) {
        arr[i] = +arr[i];
    }, this);

    this.info = tInfo.slice();

    for (var i = 0; i < tfield.length; i++) {
        tfield[i] = tfield[i].split('');
        if (tfield[i][tfield[i].length - 1] == '') tfield[i].pop();
    }

    this.field = tfield;

    this.restart = function() {
        this.info = tInfo.slice();
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
                if (this.field[i][j] == 'Q') {
                    sprites.corner.draw(context, j * scale, i * scale, scale, scale);
                } else if (this.field[i][j] == 'W') {
                    sprites.wall.draw(context, j * scale, i * scale, scale, scale);
                } else if (this.field[i][j] == 'E') {
                    sprites.corner1.draw(context, j * scale, i * scale, scale, scale);
                } else if (this.field[i][j] == 'A') {
                    sprites.wall3.draw(context, j * scale, i * scale, scale, scale);
                } else if (this.field[i][j] == 'D') {
                    sprites.wall1.draw(context, j * scale, i * scale, scale, scale);
                } else if (this.field[i][j] == 'Z') {
                    sprites.corner3.draw(context, j * scale, i * scale, scale, scale);
                } else if (this.field[i][j] == 'X') {
                    sprites.wall2.draw(context, j * scale, i * scale, scale, scale);
                } else if (this.field[i][j] == 'C') {
                    sprites.corner2.draw(context, j * scale, i * scale, scale, scale);
                } else if (this.field[i][j] == 'B' || this.field[i][j] == '0') {
                    sprites.barrier.draw(context, j * scale, i * scale, scale, scale);
                } else if (this.field[i][j] == ' ') {
                    sprites.floor.draw(context, j * scale, i * scale, scale, scale);
                } else if (this.field[i][j] == 'S') {
                    sprites.floor.draw(context, j * scale, i * scale, scale, scale);
                    sprites.hole.draw(context, j * scale, i * scale, scale, scale);
                } else if (this.field[i][j] == 'F') {
                    sprites.floor.draw(context, j * scale, i * scale, scale, scale);
                    sprites.cheese.draw(context, j * scale, i * scale, scale, scale);
                }
            }
        }

        sprites.mouse.draw(context, this.info[0] * scale, this.info[1] * scale, scale, scale);

        if (state === sWon) {
            sprites.won.draw(context, (w - 4.5) * scale, scale);
        } else if (state === sLose) {
            sprites.lose.draw(context, (w - 4.5) * scale, scale);
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

        console.log(this.info);

        if (this.field[this.info[1]][this.info[0]] == 'F') {
            this.drawField(1);
        } else if (this.info[2] <= 0) {
            this.drawField(2);
        } else this.drawField();
    };
}

module.exports = game;