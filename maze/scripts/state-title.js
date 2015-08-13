states.title.prototype = {
  init: function(){},
  preload: function(){},
  create: function(){
    var temp1 = game.add.text( game.world.centerX , game.world.height * ( 1 / 3 ) , '5 Life Challenge' , { align: 'center' , fill: '#FF0088' , font: '30px Arial' , wordWrap: true , wordWrapWidth: game.width } )
      temp1.anchor.setTo( .5 )
      temp1.inputEnabled = true
      temp1.input.useHandCursor = true
      temp1.events.onInputDown.add( function(){ game.state.start( 'game' , true , !true , 1 , 1 , 5 ) } , this )
    var temp2 = game.add.text( game.world.centerX , game.world.height * ( 2 / 3 ) , '5 Minute Challenge' , { align: 'center' , fill: '#FF0088' , font: '30px Arial' , wordWrap: true , wordWrapWidth: game.width } )
      temp2.anchor.setTo( .5 )
      temp2.inputEnabled = true
      temp2.input.useHandCursor = true
      temp2.events.onInputDown.add( function(){ game.state.start( 'game' , true , !true , 2 , 1 , 1 , 5 ) } , this )
    },
  update: function(){},
  render: function(){},
  paused: function(){},
  resumed: function(){},
  resize: function(){},
  shutdown: function(){},
  }