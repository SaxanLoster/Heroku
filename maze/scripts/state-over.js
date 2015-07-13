states.over.prototype = {
  init: function(){
    game.world.setBounds( 0 , 0 , game.width , game.height )
    this.win = arguments[ 0 ]
    this.level = arguments[ 1 ]
    this.lives = arguments[ 2 ] - ( this.win ? 0 : 1 ) + ( this.level % 5 == 0 ? 1 : 0 )
    this.text = this.win ? 'Level ' + this.level + ' complete.\n' + this.lives + ' lives left.\nClick to continue.' : 'Level ' + this.level + ' failed.\n' + this.lives + ' lives left.\nClick to retry.'
    },
  preload: function(){},
  create: function(){
    this.text = game.add.text( game.world.centerX , game.world.centerY , this.text , { align: 'center' , fill: '#FF0088' , font: '30px Arial' , wordWrap: true , wordWrapWidth: game.width } )
    this.text.anchor.setTo( .5 )
    this.text.inputEnabled = true
    this.text.input.useHandCursor = true
    this.text.events.onInputDown.add( function(){
      var level = this.win ? this.level + 1 : this.level
      if( this.lives > 0 ) game.state.start( 'pregame' , true , !true , level  , this.lives )
      else game.state.start( 'title' )
      } , this )
    },
  update: function(){},
  render: function(){},
  paused: function(){},
  resumed: function(){},
  resize: function(){},
  shutdown: function(){},
  }