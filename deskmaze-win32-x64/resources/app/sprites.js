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

 sprites = {
     wall: new Sprite("./sprites/wall.png"),
     wall1: new Sprite("./sprites/wall1.png"),
     wall2: new Sprite("./sprites/wall2.png"),
     wall3: new Sprite("./sprites/wall3.png"),

     corner: new Sprite("./sprites/corner.png"),
     corner1: new Sprite("./sprites/corner1.png"),
     corner2: new Sprite("./sprites/corner2.png"),
     corner3: new Sprite("./sprites/corner3.png"),

     barrier: new Sprite("./sprites/barrier.png"),
     floor: new Sprite("./sprites/floor.png"),
     hole: new Sprite('./sprites/hole.png'),
     cheese: new Sprite('./sprites/cheese.png'),

     mouse: new Sprite('./sprites/mouse.png'),

     won: new Sprite('./sprites/won.png'),
     lose: new Sprite('./sprites/lose.png')
 };

 module.exports = sprites;