States.Game.prototype = {
  init: function(){
    Game.time.desiredFps = 30

    this.time.reset()

    this.level = arguments[ 0 ]

    this.settings = GetLevelData( this.level )

    this.win = this.settings.gems

    this.maze = new MazeExpanded( this.settings.size )

    this.pausetime = 0
    
    this.x = Math.max( Math.ceil( document.querySelector( 'Canvas' ).offsetWidth  / 80 ) , this.settings.size )
    this.y = Math.max( Math.ceil( document.querySelector( 'Canvas' ).offsetHeight / 80 ) , this.settings.size + 1 )

    this.ox = Math.floor( ( this.x - this.settings.size ) / 2 )
    this.oy = Math.floor( ( this.y - this.settings.size ) / 2 ) || 1
    },
  create: function(){
    function GetRandomX( that ){
      do var Number = Game.rnd.between( that.ox , that.ox + that.settings.size - 1 )
      while( ( Number - that.ox ) % 2 == 0 )
      return Number * 40 + 20
      }
    function GetRandomY( that ){
      do var Number = Game.rnd.between( that.oy , that.oy + that.settings.size - 1 )
      while( ( Number - that.oy ) % 2 == 0 )
      return Number * 40 + 20
      }

    Game.physics.startSystem( Phaser.Physics.ARCADE )
    Game.stage.backgroundColor = '#000000'

    this.cursors = Game.input.keyboard.createCursorKeys()

    this.map = Game.add.tilemap( null , 40 , 40 , this.x , this.y )
      this.map.addTilesetImage( 'Maze' , 'Maze' , 40 , 40 , 0 , 1 )
      this.map.setCollisionByIndex( 0 , true )

    this.mazelayer = this.map.create( 'Maze Layer' , this.x , this.y , 40 , 40 )
      this.mazelayer.resizeWorld()
      // for( var a = 0 ; a < this.map.width ; a++ ){
      //   for( var b = 0 ; b < this.map.height ; b++ ){
      //     this.map.putTile( 0 , a , b , this.mazelayer )
      //     }
      //   }
      for( var a = 0 ; a < this.settings.size ; a++ ){
        for( var b = 0 ; b < this.settings.size ; b++ ){
          this.map.putTile( this.maze[ a ][ b ] , a + this.ox , b + this.oy , this.mazelayer )
          }
        }
    // this.mazelayer.debug = true

    this.items = Game.add.group( Game.world , 'Items' , false , true )
      for( var a = 0 ; a < this.settings.gems ; a++ ){
        this.items.create( GetRandomX( this ) , GetRandomY( this ) , 'Items' , a )
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
      Game.add.text( this.infobar.width - 5 , 20 , 'Timer' , { font: '20px Arial' , fill: '#000' } , this.infobar )
        this.infobar.children[ this.settings.gems + 1 ].anchor.set( 1 , .5 )
      this.infobar.fixedToCamera = true

    this.player = Game.add.sprite( GetRandomX( this ) , GetRandomY( this ) , 'Player' )
      this.player.anchor.setTo( .5 )
      this.player.scale.setTo( .75 )
      Game.physics.enable( this.player , Phaser.Physics.ARCADE )
      this.player.body.collideWorldBounds = true
      Game.camera.follow( this.player )

    this.joystick = this.game.plugins.add( Phaser.Plugin.TouchControl )
      this.joystick.inputEnable()
      this.joystick.settings.singleDirection = false
      this.joystick.settings.maxDistanceInPixels = 20

    if( this.settings.size * 40 + 40 < Game.height ) Game.camera.bounds.setTo( 0, 0, Game.world.width , Game.height )
    },
  update: function(){
    var Time = Math.ceil( this.settings.time - this.time.totalElapsedSeconds() + this.pausetime )
    this.infobar.children[ this.settings.gems + 1 ].setText( Math.floor( Time / 60 ) + ':' + ( '00' + Time % 60 ).slice( -2 ) )
    if( Time <= 0 && this.items.children.length > 0 && this.win > 0 ) Game.state.start( 'Over' , true , false , false , this.level )

    Game.physics.arcade.collide( this.player , this.mazelayer )
    Game.physics.arcade.overlap( this.player , this.items , function( player , item ){
      item.body.enable = false
      this.infobar.add( item )
      item.position.set( item.x - Game.camera.x , item.y - Game.camera.y )
      Game.make.tween( item ).to( { x: this.infobar.children[ item.frame + 1 ].x , y: this.infobar.children[ item.frame + 1 ].y } , 1000 , Phaser.Easing.Linear.None , true ).onComplete.add( function(){
        this.win--
        if( this.win == 0 && this.items.children.length == 0 ) setTimeout( function( level ){ Game.state.start( 'Over' , true , false , true , level ) } , 250 , this.level )
        } , this )
      } , null , this  )

    this.player.body.velocity.x = 0
    this.player.body.velocity.y = 0

    var Speed = 100

    if( true && Game.input.activePointer.isDown ){
      this.player.body.velocity.x = Speed * this.joystick.speed.x * -.01
      this.player.body.velocity.y = Speed * this.joystick.speed.y * -.01
      }
    else{
      if( this.cursors.right.isDown ) this.player.body.velocity.x += +Speed
      if( this.cursors.down .isDown ) this.player.body.velocity.y += +Speed
      if( this.cursors.left .isDown ) this.player.body.velocity.x += -Speed
      if( this.cursors.up   .isDown ) this.player.body.velocity.y += -Speed

      switch( true ){
        case this.cursors.up   .isDown && this.cursors.right.isDown :
          this.player.rotation = Math.PI * 0.25
          break
        case this.cursors.right.isDown && this.cursors.down .isDown :
          this.player.rotation = Math.PI * 0.75
          break
        case this.cursors.down .isDown && this.cursors.left .isDown :
          this.player.rotation = Math.PI * 1.25
          break
        case this.cursors.left .isDown && this.cursors.up   .isDown :
          this.player.rotation = Math.PI * 1.75
          break
        case this.cursors.up   .isDown :
          this.player.rotation = Math.PI * 0.00
          break
        case this.cursors.right.isDown :
          this.player.rotation = Math.PI * 0.50
          break
        case this.cursors.down .isDown :
          this.player.rotation = Math.PI * 1.00
          break
        case this.cursors.left .isDown :
          this.player.rotation = Math.PI * 1.50
          break
        }
      }
    },
  resumed: function(){
    this.pausetime += this.time.pauseDuration * .001
    },
  }