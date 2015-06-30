states.title.prototype = {
  init: function(){},
  preload: function(){},
  create: function(){
    var playgame = game.add.text( game.world.centerX , game.world.centerY , 'Play Game' , { align: 'center' , fill: '#FF0088' , font: '30px Arial' , wordWrap: true , wordWrapWidth: game.width } )
      playgame.anchor.setTo( .5 )
      playgame.inputEnabled = true
      playgame.input.useHandCursor = true
      playgame.events.onInputDown.add( function(){ game.state.start( 'pregame' , true , !true , 1 ) } , this )
    },
  update: function(){},
  render: function(){},
  paused: function(){},
  resumed: function(){},
  resize: function(){},
  shutdown: function(){},
  }