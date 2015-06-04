States.title.prototype = {
  create: function(){
    var PlayGame = Game.add.text( Game.world.centerX , Game.world.centerY , 'Play Game' , { align: 'center' , fill: '#FF0088' , font: '30px Arial' , wordWrap: true , wordWrapWidth: Game.width } )
      PlayGame.anchor.setTo( .5 )
      PlayGame.inputEnabled = true
      PlayGame.input.useHandCursor = true
      PlayGame.events.onInputDown.add( function(){ Game.state.start( 'pregame' , true , false , 1 ) } , this )
    },
  }