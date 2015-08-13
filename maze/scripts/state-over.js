states.over.prototype = {
  init: function(){
    game.world.setBounds( 0 , 0 , game.width , game.height )

    this.settings = {}
    this.routines = {}

    this.settings.win = arguments[ 0 ]
    this.settings.mode = arguments[ 1 ]
    this.settings.level = arguments[ 2 ]
    this.settings.lives = arguments[ 3 ] - ( this.settings.win ? 0 : 1 ) + ( this.settings.mode === 1 && this.settings.level % 5 === 0 ? 1 : 0 )
    this.settings.time = arguments[ 4 ]

    this.settings.newscore = false
    var temp1 = ( this.settings.level - ( this.settings.win ? 0 : 1 ) )
    switch( this.settings.mode ){
      case 1:
        if( SaxanStorage.highscores.life5 < temp1 ){
          SaxanStorage.highscores.life5 = temp1
          this.settings.newscore = true
          }
        break
      case 2:
        if( SaxanStorage.highscores.time5 < temp1 ){
          SaxanStorage.highscores.time5 = temp1
          this.settings.newscore = true
          }
        break
      }
    localStorage.MazeGame = JSON.stringify( SaxanStorage )
    },
  preload: function(){},
  create: function(){
    var temp1 = 'Level ' + this.settings.level + ( this.settings.win ? ' complete.' : ' failed.' )
    var temp2 = '\n' + ( this.settings.mode === 1 ? this.settings.lives + ' lives' : ( Math.floor( this.settings.time / 60 ) + ':' + ( '00' + this.settings.time % 60 ).slice( -2 ) ) ) + ' left.'
    var temp3 = '\n' + ( this.settings.newscore ? 'NEW! ' : '' ) + 'Highscore: Level ' + ( this.settings.mode === 1 ? SaxanStorage.highscores.life5 : SaxanStorage.highscores.time5 )
    var temp4 = '\n' + 'Click to ' + ( this.settings.win ? 'continue.\n' : ( this.settings.mode === 1 && this.settings.lives > 0 ? 'retry.' : 'return to main menu.' ) )
    var tempText = temp1 + temp2 + temp3 + temp4
    this.settings.text = game.add.text( game.world.centerX , game.world.centerY , tempText , { align: 'center' , fill: '#FF0088' , font: '30px Arial' , wordWrap: true , wordWrapWidth: game.width } )
    this.settings.text.anchor.setTo( .5 )
    this.settings.text.inputEnabled = true
    this.settings.text.input.useHandCursor = true
    this.settings.text.events.onInputDown.add( function(){
      this.settings.next = this.settings.win ? this.settings.level + 1 : this.settings.level
      this.settings.lives === 0 ? game.state.start( 'title' ) : game.state.start( 'game' , true , !true , this.settings.mode , this.settings.next , this.settings.lives , this.settings.time )
      } , this )
    },
  update: function(){},
  render: function(){},
  paused: function(){},
  resumed: function(){},
  resize: function(){},
  shutdown: function(){},
  }