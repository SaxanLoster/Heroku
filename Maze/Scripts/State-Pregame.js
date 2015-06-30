States.pregame.prototype = {
  init: function(){
    this.time.reset()

    this.level = arguments[ 0 ]

    this.lives = arguments[ 1 ] || 5

    this.settings = GetLevelData( this.level )

    this.win = this.settings.gems

    this.taken = []

    this.playing = true

    this.maze = new Maze( this.settings.size )

    this.pausetime = 0

    this.tilesize = 40
    
    this.x = Math.max( Math.ceil( Game.width  / this.tilesize ) , this.settings.size )
    this.y = Math.max( Math.ceil( Game.height / this.tilesize ) , this.settings.size )

    this.ox = Math.floor( ( this.x - this.settings.size ) / 2 )
    this.oy = Math.floor( ( this.y - this.settings.size ) / 2 )
    },
  create: function(){
    function GetRandomPosition( that , object ){
      do{
        var x = Game.rnd.between( 1 , that.settings.size - 2 )
        var y = Game.rnd.between( 1 , that.settings.size - 2 )
        }
      while( that.maze[ x ][ y ] == 0 || that.taken.indexOf( x + 'x' + y ) != -1 )
      that.taken.push( x + 'x' + y )
      object.position.set( ( x + that.ox ) * that.tilesize + 20 , ( y + that.oy ) * that.tilesize + 20 )
      }

    Game.physics.startSystem( Phaser.Physics.ARCADE )
    Game.stage.backgroundColor = '#000000'

    this.cursors = Game.input.keyboard.createCursorKeys()
    this.wasd = {
      up:    Game.input.keyboard.addKey( Phaser.Keyboard.W ),
      down:  Game.input.keyboard.addKey( Phaser.Keyboard.S ),
      left:  Game.input.keyboard.addKey( Phaser.Keyboard.A ),
      right: Game.input.keyboard.addKey( Phaser.Keyboard.D ),
      }

    this.map = Game.add.tilemap( null , this.tilesize , this.tilesize , this.x , this.y )
      this.map.addTilesetImage( 'Maze' , 'Maze' , 40 , 40 , 0 , 1 )
      this.map.setCollisionByIndex( 0 , true )

    this.mazelayer = this.map.create( 'Maze Layer' , this.x , this.y , this.tilesize , this.tilesize )
      this.mazelayer.resizeWorld()
      for( var a = 0 ; a < this.settings.size ; a++ ){
        for( var b = 0 ; b < this.settings.size ; b++ ){
          this.map.putTile( this.maze[ a ][ b ] , a + this.ox , b + this.oy , this.mazelayer )
          }
        }

    this.items = Game.add.group( Game.world , 'Items' , false , true )
      for( var a = 0 ; a < this.settings.gems ; a++ ){
        this.items.create( 0 , 0 , 'Items' , a )
          GetRandomPosition( this , this.items.children[ a ] )
          this.items.children[ a ].anchor.set( .5 )
          this.items.children[ a ].scale.set( .5 )
        }

    this.infobar1  = Game.add.group()
      Game.add.graphics( 0 , 0 , this.infobar1 )
      console.log( this.infobar1.children )
        this.infobar1.children[ 0 ].beginFill( 0xFFFFFF , 1 )
        this.infobar1.children[ 0 ].drawRect( 0 , 0 , Game.width , 40 )
        this.infobar1.children[ 0 ].endFill()
      Game.add.text( 5 , 20 , 'Level: ' + this.level , { font: '20px Arial' , fill: '#000' } , this.infobar1 )
        this.infobar1.children[ 1 ].anchor.set( 0 , .5 )
      Game.add.text( Game.width / 2 , 20 , 'Lives: ' + this.lives , { font: '20px Arial' , fill: '#000' } , this.infobar1 )
        this.infobar1.children[ 2 ].anchor.set( .5 , .5 )
      var Time = Math.max( Math.ceil( this.settings.time - this.time.totalElapsedSeconds() + this.pausetime ) , 0 )
      Game.add.text( this.infobar1.width - 5 , 20 , Math.floor( Time / 60 ) + ':' + ( '00' + Time % 60 ).slice( -2 ) , { font: '20px Arial' , fill: '#000' } , this.infobar1 )
        this.infobar1.children[ 3 ].anchor.set( 1 , .5 )
      this.infobar1.fixedToCamera = true

    this.infobar2 = Game.add.group()
      Game.add.graphics( 0 , Game.height - 40 , this.infobar2 )
        this.infobar2.children[ 0 ].beginFill( 0xFFFFFF , 1 )
        this.infobar2.children[ 0 ].drawRect( 0 , 0 , Game.width , 40 )
        this.infobar2.children[ 0 ].endFill()
      for( var a = 0 ; a < this.settings.gems ; a++ ){
        Game.add.sprite( Game.width * ( ( a + 1 ) * .02 ) + ( 10 + ( a * 20 ) ) , Game.height - 20 , 'Items' , a , this.infobar2 )
          this.infobar2.children[ a + 1 ].anchor.set( .5 )
          this.infobar2.children[ a + 1 ].scale.set( .5 )
          this.infobar2.children[ a + 1 ].tint = 0x000000
        }
      this.infobar2.fixedToCamera = true

    this.player = Game.add.sprite( 0 , 0 , 'Player' )
      GetRandomPosition( this , this.player )
      this.player.anchor.setTo( .5 )
      this.player.scale.setTo( .75 )
      Game.camera.follow( this.player )

    this.joystick = this.game.plugins.add( Phaser.Plugin.TouchControl )
      // this.joystick.inputEnable()
      this.joystick.settings.numDirections = 8
      this.joystick.settings.maxDistanceInPixels = 20

    if( this.settings.size * this.tilesize + 40 < Game.height ) Game.camera.bounds.setTo( 0, 0, Game.world.width , Game.height )
    this.input.keyboard.callbackContext = this
    this.input.keyboard.onDownCallback = function(){
      Game.state.start( 'game' , false , false , this )
      this.input.keyboard.onDownCallback = function(){}
      }
    this.input.onDown.addOnce( function(){ Game.state.start( 'game' , false , false , this ) } , this )
    },
  }