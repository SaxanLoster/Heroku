States.Boot.prototype = {
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