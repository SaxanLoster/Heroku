States.Mode.prototype = {
  init: function( font , type ){
    this.font = font
    this.type = type
    },
  create: function(){
    var Spacing = ( Game.height - 160 ) / 5
    var Mode1 = Game.add.text( Game.world.centerX , Spacing , 'Easy' , this.font )
      Mode1.anchor.setTo( .5 , 0 )
      Mode1.inputEnabled = true
      Mode1.input.useHandCursor = true
      Mode1.events.onInputDown.add( function(){
        Game.state.start( 'Game' , true , false , this.font , this.type , 10 , false )
        } , this )
    var Mode2 = Game.add.text( Game.world.centerX , Mode1.bottom + Spacing , 'Medium' , this.font )
      Mode2.anchor.setTo( .5 , 0 )
      Mode2.inputEnabled = true
      Mode2.input.useHandCursor = true
      Mode2.events.onInputDown.add( function(){
        Game.state.start( 'Game' , true , false , this.font , this.type , 20 , false )
        } , this )
    var Mode3 = Game.add.text( Game.world.centerX , Mode2.bottom + Spacing , 'Hard' , this.font )
      Mode3.anchor.setTo( .5 , 0 )
      Mode3.inputEnabled = true
      Mode3.input.useHandCursor = true
      Mode3.events.onInputDown.add( function(){
        Game.state.start( 'Game' , true , false , this.font , this.type , 40 , false )
        } , this )
    var Mode4 = Game.add.text( Game.world.centerX , Mode3.bottom + Spacing , 'Challenge' , this.font )
      Mode4.anchor.setTo( .5 , 0 )
      Mode4.inputEnabled = true
      Mode4.input.useHandCursor = true
      Mode4.events.onInputDown.add( function(){
        Game.state.start( 'Game' , true , false , this.font , this.type , 5 , true )
        } , this )
    },
  }