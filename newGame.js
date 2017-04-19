var fs = require('fs');
var game = require('./game');

var canvas = document.getElementById("canv");
var context = canvas.getContext("2d");

var i = 1;
var inpLvl = '';
var thisGame;

canvas.onclick = function() {
    try {
        var PATH = __dirname + '/levels/map' + i + '.txt';
        inpLvl = fs.readFileSync(PATH, 'utf8');

        thisGame = new game(context, inpLvl, 16);
        thisGame.drawField();

        window.onkeydown = function(e) {
            thisGame.move(e.keyCode);
        };

        i++;
    } catch (err) {
        console.error(err);
        i = 1;
    }
};