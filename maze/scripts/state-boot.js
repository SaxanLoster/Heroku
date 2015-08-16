states.boot.prototype = {
  init: function(){},
  preload: function(){
    this.load.spritesheet( 'maze' , 'images/maze-test.png' , 40 , 40 , 16 , 0 , 1 )
    this.load.image( 'player' , 'images/player.png' )
    this.load.spritesheet( 'items' , 'images/items.png' , 40 , 40 , 8 , 0 , 1 )
    this.load.image('compass', 'images/compass_rose.png');
    this.load.image('touch_segment', 'images/touch_segment.png');
    this.load.image('touch', 'images/touch.png');
    },
  create: function(){
    game.scale.scaleMode = 2
    game.state.start( 'title' )
    },
  }