states.pregame.prototype = {
  init: function(){
    game.time.reset()
    game.time.pausetime = 0

    this.settings = {}
    this.elements = {}

    this.settings.mode = arguments[ 0 ]

    this.settings.level = arguments[ 1 ] || 1

    this.settings.lives = arguments[ 2 ] || 5

    var tempLevelData = GetLevelData( this.settings.level )

    this.settings.gems = tempLevelData.gems
    this.settings.size = tempLevelData.size
    this.settings.timer = ( this.settings.mode === 1 ) ? ( tempLevelData.time ) : ( arguments[ 3 ] || 300 )

    this.settings.gemsleft = this.settings.gems

    this.settings.spacetaken = []

    this.settings.playing = true

    this.settings.maze = new Maze( this.settings.size )

    this.settings.tilesize = 40
    
    this.settings.x = Math.max( Math.ceil( game.width  / this.settings.tilesize ) , this.settings.size )
    this.settings.y = Math.max( Math.ceil( game.height / this.settings.tilesize ) , this.settings.size )

    this.settings.ox = Math.floor( ( this.settings.x - this.settings.size ) / 2 )
    this.settings.oy = Math.floor( ( this.settings.y - this.settings.size ) / 2 )
    },
  preload: function(){},
  create: function(){
    function GetRandomPosition( paraThis , paraObject ){
      do{
        var tempX = game.rnd.between( 1 , paraThis.settings.size - 2 )
        var tempY = game.rnd.between( 1 , paraThis.settings.size - 2 )
        }
      while( paraThis.settings.maze[ tempX ][ tempY ] === 0 || paraThis.settings.spacetaken.indexOf( tempX + 'x' + tempY ) !== -1 )
      paraThis.settings.spacetaken.push( tempX + 'x' + tempY )
      paraObject.position.set( ( tempX + paraThis.settings.ox ) * paraThis.settings.tilesize + 20 , ( tempY + paraThis.settings.oy ) * paraThis.settings.tilesize + 20 )
      }

    game.physics.startSystem( Phaser.Physics.ARCADE )
    game.stage.backgroundColor = '#000000'

    this.settings.cursors = game.input.keyboard.createCursorKeys()
    this.settings.wasd = {
      up: game.input.keyboard.addKey( Phaser.Keyboard.W ),
      down: game.input.keyboard.addKey( Phaser.Keyboard.S ),
      left: game.input.keyboard.addKey( Phaser.Keyboard.A ),
      right: game.input.keyboard.addKey( Phaser.Keyboard.D ),
      }

    this.elements.map = game.add.tilemap( null , this.settings.tilesize , this.settings.tilesize , this.settings.x , this.settings.y )
      this.elements.map.addTilesetImage( 'maze' , 'maze' , 40 , 40 , 0 , 1 )
      this.elements.map.setCollisionByIndex( 0 , true )

    this.elements.mazelayer = this.elements.map.create( 'maze' , this.settings.x , this.settings.y , this.settings.tilesize , this.settings.tilesize )
      this.elements.mazelayer.resizeWorld()
      for( var iterA = 0 ; iterA < this.settings.size ; iterA++ ){
        for( var iterB = 0 ; iterB < this.settings.size ; iterB++ ){
          this.elements.map.putTile( this.settings.maze[ iterA ][ iterB ] , iterA + this.settings.ox , iterB + this.settings.oy , this.elements.mazelayer )
          }
        }

    this.elements.items = game.add.group( game.world , 'items' , !true , true )
      for( var iterA = 0 ; iterA < this.settings.gems ; iterA++ ){
        this.elements.items.create( 0 , 0 , 'items' , iterA )
          GetRandomPosition( this , this.elements.items.children[ iterA ] )
          this.elements.items.children[ iterA ].anchor.set( .5 )
          this.elements.items.children[ iterA ].scale.set( .5 )
        }

    this.elements.infobar1  = game.add.group()
      game.add.graphics( 0 , 0 , this.elements.infobar1 )
        this.elements.infobar1.children[ this.elements.infobar1.total - 1 ].beginFill( 0xFFFFFF , 1 )
        this.elements.infobar1.children[ this.elements.infobar1.total - 1 ].drawRect( 0 , 0 , game.width , 40 )
        this.elements.infobar1.children[ this.elements.infobar1.total - 1 ].endFill()
      game.add.text( 5 , 20 , 'Level: ' + this.settings.level , { font: '20px Arial' , fill: '#000' } , this.elements.infobar1 )
        this.elements.infobar1.children[ this.elements.infobar1.total - 1 ].anchor.set( 0 , .5 )
      game.add.text( game.width / 2 , 20 , this.settings.mode === 1 ? 'Lives: ' + this.settings.lives : '' , { font: '20px Arial' , fill: '#000' } , this.elements.infobar1 )
        this.elements.infobar1.children[ this.elements.infobar1.total - 1 ].anchor.set( .5 , .5 )
      var tempTime = Math.max( Math.ceil( this.settings.timer - game.time.totalElapsedSeconds() + game.time.pausetime ) , 0 )
      game.add.text( this.elements.infobar1.width - 5 , 20 , Math.floor( tempTime / 60 ) + ':' + ( '00' + tempTime % 60 ).slice( -2 ) , { font: '20px Arial' , fill: '#000' } , this.elements.infobar1 )
        this.elements.infobar1.children[ this.elements.infobar1.total - 1 ].anchor.set( 1 , .5 )
      this.elements.infobar1.fixedToCamera = true

    this.elements.infobar2 = game.add.group()
      game.add.graphics( 0 , game.height - 40 , this.elements.infobar2 )
        this.elements.infobar2.children[ this.elements.infobar2.total - 1 ].beginFill( 0xFFFFFF , 1 )
        this.elements.infobar2.children[ this.elements.infobar2.total - 1 ].drawRect( 0 , 0 , game.width , 40 )
        this.elements.infobar2.children[ this.elements.infobar2.total - 1 ].endFill()
      for( var iterA = 0 ; iterA < this.settings.gems ; iterA++ ){
        game.add.sprite( game.width * ( ( iterA + 1 ) * .02 ) + ( 10 + ( iterA * 20 ) ) , game.height - 20 , 'items' , iterA , this.elements.infobar2 )
          this.elements.infobar2.children[ this.elements.infobar2.total - 1 ].anchor.set( .5 )
          this.elements.infobar2.children[ this.elements.infobar2.total - 1 ].scale.set( .5 )
          this.elements.infobar2.children[ this.elements.infobar2.total - 1 ].tint = 0x000000
        }
      this.elements.infobar2.fixedToCamera = true

    this.elements.player = game.add.sprite( 0 , 0 , 'player' )
      GetRandomPosition( this , this.elements.player )
      this.elements.player.anchor.setTo( .5 )
      this.elements.player.scale.setTo( .75 )
      game.camera.follow( this.elements.player )

    this.elements.joystick = this.game.plugins.add( Phaser.Plugin.TouchControl )
      // this.elements.joystick.inputEnable()
      this.elements.joystick.settings.numDirections = 8
      this.elements.joystick.settings.maxDistanceInPixels = 20

    function NextState(){
      this.input.keyboard.onDownCallback = null
      game.state.start( 'game' , !true , !true , this )
      }
    this.input.keyboard.callbackContext = this
    this.input.keyboard.onDownCallback = NextState
    this.input.onDown.addOnce( NextState , this )
    },
  update: function(){},
  render: function(){},
  paused: function(){},
  resumed: function(){},
  resize: function(){},
  shutdown: function(){},
  }