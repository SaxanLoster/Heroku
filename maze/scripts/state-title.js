states.title.prototype = {
  init: function(){},
  preload: function(){},
  create: function(){
    var tempMode1 = game.add.text( game.world.centerX , game.world.height * ( 1 / 3 ) , '5 Life Challenge' , { align: 'center' , fill: '#FF0088' , font: '30px Arial' , wordWrap: true , wordWrapWidth: game.width } )
      tempMode1.anchor.setTo( .5 )
      tempMode1.inputEnabled = true
      tempMode1.input.useHandCursor = true
      tempMode1.events.onInputDown.add( function(){ game.state.start( 'game' , true , !true , 1 , 1 , 5 ) } , this )
    var tempMode2 = game.add.text( game.world.centerX , game.world.height * ( 2 / 3 ) , '5 Minute Challenge' , { align: 'center' , fill: '#FF0088' , font: '30px Arial' , wordWrap: true , wordWrapWidth: game.width } )
      tempMode2.anchor.setTo( .5 )
      tempMode2.inputEnabled = true
      tempMode2.input.useHandCursor = true
      tempMode2.events.onInputDown.add( function(){ game.state.start( 'game' , true , !true , 2 , 1 , 1 , 300 ) } , this )
    },
  update: function(){},
  render: function(){},
  paused: function(){},
  resumed: function(){},
  resize: function(){},
  shutdown: function(){},
  }