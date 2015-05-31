States.Over.prototype = {
  init: function(){
    Game.world.setBounds( 0 , 0 , Game.width , Game.height )
    this.win = arguments[ 0 ]
    this.level = arguments[ 1 ]
    this.lives = arguments[ 2 ] - ( this.win ? 0 : 1 ) + ( this.level % 5 == 0 ? 1 : 0 )
    this.text = this.win ? 'Level ' + this.level + ' complete.\n' + this.lives + ' lives left.\nClick to continue.' : 'Level ' + this.level + ' failed.\n' + this.lives + ' lives left.\nClick to retry.'
    },
  create: function(){
    this.text = Game.add.text( Game.world.centerX , Game.world.centerY , this.text , { align: 'center' , fill: '#FF0088' , font: '30px Arial' , wordWrap: true , wordWrapWidth: Game.width } )
    this.text.anchor.setTo( .5 )
    this.text.inputEnabled = true
    this.text.input.useHandCursor = true
    this.text.events.onInputDown.add( function(){
      var Level = this.win ? this.level + 1 : this.level
      if( this.lives > 0 ) Game.state.start( 'Game' , true , false , Level  , this.lives )
      else Game.state.start( 'Main' )
      } , this )
    },
  }