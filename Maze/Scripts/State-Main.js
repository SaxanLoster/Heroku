States.Main.prototype = {
  init: function( font ){
    this.font = font
    },
  create: function(){
    var Type1 = Game.add.text( Game.world.centerX , Game.world.centerY - Game.height * .1 , 'Compact Mode' , this.font )
      Type1.anchor.setTo( .5 , 1 )
      Type1.inputEnabled = true
      Type1.input.useHandCursor = true
      Type1.events.onInputDown.add( function(){
        Game.state.start( 'Mode' , true , false , this.font , false )
        } , this )
    var Type2 = Game.add.text( Game.world.centerX , Game.world.centerY + Game.height * .1 , 'Expanded Mode' , this.font )
      Type2.anchor.setTo( .5 , 0 )
      Type2.inputEnabled = true
      Type2.input.useHandCursor = true
      Type2.events.onInputDown.add( function(){
        Game.state.start( 'Mode' , true , false , this.font , true )
        } , this )
    },
  }