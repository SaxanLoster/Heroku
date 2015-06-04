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
    
    this.x = Math.max( Math.ceil( document.querySelector( 'Canvas' ).offsetWidth  / 80 ) , this.settings.size )
    this.y = Math.max( Math.ceil( document.querySelector( 'Canvas' ).offsetHeight / 80 ) , this.settings.size + 1 )

    this.ox = Math.floor( ( this.x - this.settings.size ) / 2 )
    this.oy = Math.floor( ( this.y - this.settings.size ) / 2 ) || 1
    },
  create: function(){
    function GetRandomPosition( that , object ){
      do{
        var x = Game.rnd.between( 1 , that.settings.size - 2 )
        var y = Game.rnd.between( 1 , that.settings.size - 2 )
        }
      while( that.maze[ x ][ y ] == 0 || that.taken.indexOf( x + 'x' + y ) != -1 )
      that.taken.push( x + 'x' + y )
      object.position.set( ( x + that.ox ) * 40 + 20 , ( y + that.oy ) * 40 + 20 )
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

    this.map = Game.add.tilemap( null , 40 , 40 , this.x , this.y )
      this.map.addTilesetImage( 'Maze' , 'Maze' , 40 , 40 , 0 , 1 )
      this.map.setCollisionByIndex( 0 , true )

    this.mazelayer = this.map.create( 'Maze Layer' , this.x , this.y , 40 , 40 )
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

    this.infobar = Game.add.group()
      Game.add.graphics( 0 , 0 , this.infobar )
        this.infobar.children[ 0 ].beginFill( 0xFFFFFF , 1 )
        this.infobar.children[ 0 ].drawRect( 0 , 0 , Game.width , 40 )
        this.infobar.children[ 0 ].endFill()
      for( var a = 0 ; a < this.settings.gems ; a++ ){
        Game.add.sprite( Game.width * ( ( a + 1 ) * .02 ) + ( 10 + ( a * 20 ) ) , 20 , 'Items' , a , this.infobar )
          this.infobar.children[ a + 1 ].anchor.set( .5 )
          this.infobar.children[ a + 1 ].scale.set( .5 )
          this.infobar.children[ a + 1 ].tint = 0x000000
        }
      var Time = Math.max( Math.ceil( this.settings.time - this.time.totalElapsedSeconds() + this.pausetime ) , 0 )
      Game.add.text( this.infobar.width - 5 , 20 , Math.floor( Time / 60 ) + ':' + ( '00' + Time % 60 ).slice( -2 ) , { font: '20px Arial' , fill: '#000' } , this.infobar )
        this.infobar.children[ this.settings.gems + 1 ].anchor.set( 1 , .5 )
      this.infobar.fixedToCamera = true

    this.pointers = Game.add.group( Game.world , 'Pointers' )
      for( var a = 0 ; a < this.settings.gems ; a++ ){
        Game.add.graphics( 100 + 40 * a , 100 , this.pointers )
          this.pointers.children[ a ].beginFill( 0xFFFFFF , 1 )
          this.pointers.children[ a ].drawCircle( 0 , 0 , 20 )
          this.pointers.children[ a ].endFill()
          this.pointers.children[ a ].alpha = 0
        }
      for( var a = 0 ; a < this.settings.gems ; a++ ){
        this.pointers.create( 100 + 40 * a , 100 , 'Items' , a )
          this.pointers.children[ this.settings.gems + a ].anchor.set( .5 )
          this.pointers.children[ this.settings.gems + a ].scale.set( .25 )
          this.pointers.children[ this.settings.gems + a ].alpha = 0
        }
      this.pointers.fixedToCamera = true

    this.player = Game.add.sprite( 0 , 0 , 'Player' )
      GetRandomPosition( this , this.player )
      this.player.anchor.setTo( .5 )
      this.player.scale.setTo( .75 )
      Game.camera.follow( this.player )

    if( this.settings.size * 40 + 40 < Game.height ) Game.camera.bounds.setTo( 0, 0, Game.world.width , Game.height )
    this.input.keyboard.onDownCallback = function( that ){ Game.state.start( 'game' , false , false , that ) }( this )
    this.input.onDown.addOnce( function(){ Game.state.start( 'game' , false , false , this ) } , this )
    },
  }