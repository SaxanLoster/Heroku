states.over.prototype = {
  init: function(){
    game.world.setBounds( 0 , 0 , game.width , game.height )
    this.vars = {}
    this.vars.win = arguments[ 0 ]
    this.vars.mode = arguments[ 1 ]
    this.vars.level = arguments[ 2 ]
    this.vars.lives = arguments[ 3 ] - ( this.vars.win ? 0 : 1 ) + ( this.vars.level % 5 === 0 ? 1 : 0 )
    this.vars.time = arguments[ 4 ]
    },
  preload: function(){},
  create: function(){
    var tempLine1 = 'Level ' + this.vars.level + ( this.vars.win ? ' complete.\n' : ' failed.\n' )
    var tempLine2 = ( this.vars.mode === 1 ? this.vars.lives + ' lives' : ( Math.floor( this.vars.time / 60 ) + ':' + ( '00' + this.vars.time % 60 ).slice( -2 ) ) ) + ' left.\n'
    var tempLine3 = 'Click to ' + ( this.vars.win ? 'continue.\n' : ( this.vars.mode === 1 && this.vars.lives > 0 ? 'retry.' : 'return to main menu.' ) )
    var tempText = tempLine1 + tempLine2 + tempLine3
    this.vars.text = game.add.text( game.world.centerX , game.world.centerY , tempText , { align: 'center' , fill: '#FF0088' , font: '30px Arial' , wordWrap: true , wordWrapWidth: game.width } )
    this.vars.text.anchor.setTo( .5 )
    this.vars.text.inputEnabled = true
    this.vars.text.input.useHandCursor = true
    this.vars.text.events.onInputDown.add( function(){
      this.vars.next = this.vars.win ? this.vars.level + 1 : this.vars.level
      if( this.vars.lives > 0 ) game.state.start( 'pregame' , true , !true , this.vars.mode , this.vars.next , this.vars.lives , this.vars.time )
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