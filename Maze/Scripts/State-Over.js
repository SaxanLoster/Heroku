States.Over.prototype = {
  init: function(){
    Game.world.setBounds( 0 , 0 , Game.width , Game.height )
    this.win = arguments[ 0 ] || false
    this.level = arguments[ 1 ]
    this.text = this.win ? 'Level ' + this.level + ' complete.\nClick to continue.' : 'Level ' + this.level + ' failed.\nClick to retry.'
    },
  create: function(){
    this.text = Game.add.text( Game.world.centerX , Game.world.centerY , this.text , { align: 'center' , fill: '#FF0088' , font: '30px Arial' , wordWrap: true , wordWrapWidth: Game.width } )
    this.text.anchor.setTo( .5 )
    this.text.inputEnabled = true
    this.text.input.useHandCursor = true
    this.text.events.onInputDown.add( function(){
      var Level = this.win ? this.level + 1 : this.level
      Game.state.start( 'Game' , true , false , Level )
      } , this )
    },
  }