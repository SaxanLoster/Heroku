States.boot.prototype = {
  preload: function(){
    this.load.image( 'Maze' , 'Images/Maze-Test.png' )
    this.load.image( 'Player' , 'Images/Player.png' )
    this.load.spritesheet( 'Items' , 'Images/Items.png' , 40 , 40 , 8 , 0 , 1 )
    this.load.image('compass', 'Images/compass_rose.png');
    this.load.image('touch_segment', 'Images/touch_segment.png');
    this.load.image('touch', 'Images/touch.png');
    },
  create: function(){
    Game.scale.scaleMode = 2

    Game.state.start( 'title' )
    },
  }