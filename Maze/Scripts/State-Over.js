States.Over.prototype = {
  init: function( font , win , infinite , size , type ){
    Game.world.setBounds( 0 , 0 , Game.width , Game.height )
    this.font = font
    this.win = win || false
    this.infinite = infinite || false
    this.type = type || false
    if( infinite ){
      this.size = size <= 25 ? size + 10 : size <= 40 ? size + 5 : size + 2
      this.text = win ? 'Congratulations.\nClick to continue on to a ' + this.size + 'x' + this.size + ' maze.': 'You lost on a ' + size  + 'x' + size + ' maze.'
      }
    else{
      this.text = win ? 'You beat a ' + size  + 'x' + size + ' maze.' : 'You have FAILED this city!'
      }
    },
  create: function(){
    this.text = Game.add.text( Game.world.centerX , Game.world.centerY , this.text , this.font )
    this.text.anchor.setTo( .5 )
    this.text.inputEnabled = true
    this.text.input.useHandCursor = true
    this.text.events.onInputDown.add( function(){
      if( this.win && this.infinite ) Game.state.start( 'Game' , true , false , this.font , this.type , this.size , true )
      else Game.state.start( 'Main' , true , false , this.font )
      } , this )
    },
  }