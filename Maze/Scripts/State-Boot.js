States.Boot.prototype = {
  preload: function(){
    this.load.image( 'Maze' , 'Images/Maze.png' )
    this.load.image( 'Player' , 'Images/Player.png' )
    this.load.spritesheet( 'Items' , 'Images/Items.png' , 40 , 40 , 4 )
    this.load.image('compass', 'Images/compass_rose.png');
    this.load.image('touch_segment', 'Images/touch_segment.png');
    this.load.image('touch', 'Images/touch.png');
    },
  create: function(){
    Game.scale.scaleMode = 2

    var Font = {
      align: 'center',
      fill: '#FF0088',
      font: '30px Arial',
      wordWrap: true,
      wordWrapWidth: Game.width,
      }

    Game.state.start( 'Main' , true , false , Font )
    },
  }