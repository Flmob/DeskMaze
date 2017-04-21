var fs = require('fs');
var game = require('./game');

var canvas = document.getElementById("canv");
var context = canvas.getContext("2d");

var i = 1;
var inpLvl = '';
var thisGame;

window.onload = function() {
    var paths = [];
    isPath = true;

    while (isPath) {
        isPath = fs.existsSync(__dirname + '/levels/map' + i + '.txt');
        paths.push(__dirname + '/levels/map' + i + '.txt');
        i++;
    }

    console.log('All levels detected', paths);
    thisGame = new game(context, paths, 16);
    thisGame.drawField();

    window.onkeydown = function(e) {
        thisGame.move(e.keyCode);
    };
};