states.pregame.prototype = {
  init: function(){
    this.that = this

    this.that.time.reset()

    this.that.level = arguments[ 0 ]

    this.that.lives = arguments[ 1 ] || 5

    this.that.settings = GetLevelData( this.that.level )

    this.that.win = this.that.settings.gems

    this.that.taken = []

    this.that.playing = true

    this.that.maze = new Maze( this.that.settings.size )

    this.that.pausetime = 0

    this.that.tilesize = 40
    
    this.that.x = Math.max( Math.ceil( game.width  / this.that.tilesize ) , this.that.settings.size )
    this.that.y = Math.max( Math.ceil( game.height / this.that.tilesize ) , this.that.settings.size )

    this.that.ox = Math.floor( ( this.that.x - this.that.settings.size ) / 2 )
    this.that.oy = Math.floor( ( this.that.y - this.that.settings.size ) / 2 )
    },
  preload: function(){},
  create: function(){
    function GetRandomPosition( that , object ){
      do{
        var x = game.rnd.between( 1 , that.settings.size - 2 )
        var y = game.rnd.between( 1 , that.settings.size - 2 )
        }
      while( that.maze[ x ][ y ] == 0 || that.taken.indexOf( x + 'x' + y ) != -1 )
      that.taken.push( x + 'x' + y )
      object.position.set( ( x + that.ox ) * that.tilesize + 20 , ( y + that.oy ) * that.tilesize + 20 )
      }

    game.physics.startSystem( Phaser.Physics.ARCADE )
    game.stage.backgroundColor = '#000000'

    this.that.cursors = game.input.keyboard.createCursorKeys()
    this.that.wasd = {
      up:    game.input.keyboard.addKey( Phaser.Keyboard.W ),
      down:  game.input.keyboard.addKey( Phaser.Keyboard.S ),
      left:  game.input.keyboard.addKey( Phaser.Keyboard.A ),
      right: game.input.keyboard.addKey( Phaser.Keyboard.D ),
      }

    this.that.map = game.add.tilemap( null , this.that.tilesize , this.that.tilesize , this.that.x , this.that.y )
      this.that.map.addTilesetImage( 'maze' , 'maze' , 40 , 40 , 0 , 1 )
      this.that.map.setCollisionByIndex( 0 , true )

    this.that.mazelayer = this.that.map.create( 'maze' , this.that.x , this.that.y , this.that.tilesize , this.that.tilesize )
      this.that.mazelayer.resizeWorld()
      for( var a = 0 ; a < this.that.settings.size ; a++ ){
        for( var b = 0 ; b < this.that.settings.size ; b++ ){
          this.that.map.putTile( this.that.maze[ a ][ b ] , a + this.that.ox , b + this.that.oy , this.that.mazelayer )
          }
        }

    this.that.items = game.add.group( game.world , 'items' , !true , true )
      for( var a = 0 ; a < this.that.settings.gems ; a++ ){
        this.that.items.create( 0 , 0 , 'items' , a )
          GetRandomPosition( this , this.that.items.children[ a ] )
          this.that.items.children[ a ].anchor.set( .5 )
          this.that.items.children[ a ].scale.set( .5 )
        }

    this.that.infobar1  = game.add.group()
      game.add.graphics( 0 , 0 , this.that.infobar1 )
        this.that.infobar1.children[ this.that.infobar1.total - 1 ].beginFill( 0xFFFFFF , 1 )
        this.that.infobar1.children[ this.that.infobar1.total - 1 ].drawRect( 0 , 0 , game.width , 40 )
        this.that.infobar1.children[ this.that.infobar1.total - 1 ].endFill()
      game.add.text( 5 , 20 , 'Level: ' + this.that.level , { font: '20px Arial' , fill: '#000' } , this.that.infobar1 )
        this.that.infobar1.children[ this.that.infobar1.total - 1 ].anchor.set( 0 , .5 )
      game.add.text( game.width / 2 , 20 , 'Lives: ' + this.that.lives , { font: '20px Arial' , fill: '#000' } , this.that.infobar1 )
        this.that.infobar1.children[ this.that.infobar1.total - 1 ].anchor.set( .5 , .5 )
      var Time = Math.max( Math.ceil( this.that.settings.time - this.that.time.totalElapsedSeconds() + this.that.pausetime ) , 0 )
      game.add.text( this.that.infobar1.width - 5 , 20 , Math.floor( Time / 60 ) + ':' + ( '00' + Time % 60 ).slice( -2 ) , { font: '20px Arial' , fill: '#000' } , this.that.infobar1 )
        this.that.infobar1.children[ this.that.infobar1.total - 1 ].anchor.set( 1 , .5 )
      this.that.infobar1.fixedToCamera = true

    this.that.infobar2 = game.add.group()
      game.add.graphics( 0 , game.height - 40 , this.that.infobar2 )
        this.that.infobar2.children[ this.that.infobar2.total - 1 ].beginFill( 0xFFFFFF , 1 )
        this.that.infobar2.children[ this.that.infobar2.total - 1 ].drawRect( 0 , 0 , game.width , 40 )
        this.that.infobar2.children[ this.that.infobar2.total - 1 ].endFill()
      for( var a = 0 ; a < this.that.settings.gems ; a++ ){
        game.add.sprite( game.width * ( ( a + 1 ) * .02 ) + ( 10 + ( a * 20 ) ) , game.height - 20 , 'items' , a , this.that.infobar2 )
          this.that.infobar2.children[ this.that.infobar2.total - 1 ].anchor.set( .5 )
          this.that.infobar2.children[ this.that.infobar2.total - 1 ].scale.set( .5 )
          this.that.infobar2.children[ this.that.infobar2.total - 1 ].tint = 0x000000
        }
      this.that.infobar2.fixedToCamera = true

    this.that.player = game.add.sprite( 0 , 0 , 'player' )
      GetRandomPosition( this , this.that.player )
      this.that.player.anchor.setTo( .5 )
      this.that.player.scale.setTo( .75 )
      game.camera.follow( this.that.player )

    this.that.joystick = this.that.game.plugins.add( Phaser.Plugin.TouchControl )
      // this.that.joystick.inputEnable()
      this.that.joystick.settings.numDirections = 8
      this.that.joystick.settings.maxDistanceInPixels = 20

    function LoadGame(){
      this.that.input.keyboard.onDownCallback = null
      game.state.start( 'game' , !true , !true , this.that )
      }
    this.that.input.keyboard.callbackContext = this
    this.that.input.keyboard.onDownCallback = LoadGame
    this.that.input.onDown.addOnce( LoadGame , this )
    },
  update: function(){},
  render: function(){},
  paused: function(){},
  resumed: function(){},
  resize: function(){},
  shutdown: function(){},
  }