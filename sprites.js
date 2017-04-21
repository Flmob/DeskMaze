 Sprite = function(filename) {
     this.image = null;

     if (filename) {
         this.image = new Image();
         this.image.src = filename;
     } else {
         console.log("Unable to load the sprite");
     }

     this.draw = function(context, x, y, w, h) {
         if (w !== undefined && h !== undefined) {
             context.drawImage(this.image, x, y, w, h);
         } else {
             context.drawImage(this.image, x, y, this.image.width, this.image.height);
         }
     };
 };

 var sprites = {
     'Q': new Sprite("./sprites/corner.png"),
     'W': new Sprite("./sprites/wall.png"),
     'E': new Sprite("./sprites/corner1.png"),
     'A': new Sprite("./sprites/wall3.png"),
     'D': new Sprite("./sprites/wall1.png"),
     'Z': new Sprite("./sprites/corner3.png"),
     'X': new Sprite("./sprites/wall2.png"),
     'C': new Sprite("./sprites/corner2.png"),
     'B': new Sprite("./sprites/barrier.png"),
     '0': new Sprite("./sprites/barrier.png"),
     ' ': new Sprite("./sprites/floor.png"),
     'S': new Sprite('./sprites/hole.png'),
     'F': new Sprite('./sprites/cheese.png'),
     'mouse': new Sprite('./sprites/mouse.png'),
     'won': new Sprite('./sprites/won.png'),
     'lose': new Sprite('./sprites/lose.png'),
 };

 module.exports = sprites;