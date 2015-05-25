States.Game.prototype = {
  init: function( font , type , size , infinite ){
    this.time.reset()

    this.type = type

    this.font = font

    this.size = this.type ? Math.floor( ( size * 2 + 1 ) / 2 ) * 2 + 1 : size

    this.infinite = infinite

    this.maze = this.type ? new MazeExpanded( this.size ) : new MazeCompact( this.size , this.size )

    this.pausetime = 0
    
    var A = this.type ? .5 : 1
    var B = this.game.device.desktop ? 1 : 2

    this.starttime = Math.max( Math.pow( ( this.size * A * B ) , 2 ) * .5 , infinite ? 0 : 60 )

    this.x = Math.max( Math.ceil( document.querySelector( 'Canvas' ).offsetWidth  / 80 ) , this.size )
    this.y = Math.max( Math.ceil( document.querySelector( 'Canvas' ).offsetHeight / 80 ) , this.size + 1 )

    this.ox = Math.floor( ( this.x - this.size ) / 2 )
    this.oy = Math.floor( ( this.y - this.size ) / 2 ) || 1
    },
  create: function(){
    function GetRandomX( that ){
      var Number
      do {
        Number = Game.rnd.between( that.ox , that.ox + that.size - 1 )
        }
      while( that.type && ( Number - that.ox ) % 2 == 0 )
      return Number * 40 + 20
      }
    function GetRandomY( that ){
      var Number
      do {
        Number = Game.rnd.between( that.oy , that.oy + that.size - 1 )
        }
      while( that.type && ( Number - that.oy ) % 2 == 0 )
      return Number * 40 + 20
      }

    Game.physics.startSystem( Phaser.Physics.ARCADE )
    Game.stage.backgroundColor = '#000000'

    this.cursors = Game.input.keyboard.createCursorKeys()

    this.map = Game.add.tilemap( null , 40 , 40 , this.x , this.y )
      this.map.addTilesetImage( 'Maze' , 'Maze' , 40 , 40 , 0 , 1 )

    this.mazelayer = this.map.create( 'Maze Layer' , this.x , this.y , 40 , 40 )
      this.mazelayer.resizeWorld()
      for( var a = 0 ; a < this.map.width ; a++ ){
        for( var b = 0 ; b < this.map.height ; b++ ){
          this.map.putTile( 0 , a , b , this.mazelayer )
          }
        }
      if( this.type ){
        for( var a = 0 ; a < this.size ; a++ ){
          for( var b = 0 ; b < this.size ; b++ ){
            this.map.putTile( this.maze[ a ][ b ] , a + this.ox , b + this.oy , this.mazelayer )
            }
          }
        this.map.setCollisionByIndex( 0 , true )
        }
      else{
        for( var a = 0 ; a < this.size ; a++ ){
          for( var b = 0 ; b < this.size ; b++ ){
            this.map.putTile( this.maze[ a ][ b ] , a + this.ox , b + this.oy , this.mazelayer )
            }
          }
        for( var a = 0 ; a < this.map.width ; a++ ){
          for( var b = 0 ; b < this.map.height ; b++ ){
            var A = this.map.getTile( a , b , this.mazelayer )
            var B = A.index
            var D = L = R = U = true
            if( B >= 8 ){
              B -= 8
              L = false
              }
            if( B >= 4 ){
              B -= 4
              D = false
              }
            if( B >= 2 ){
              B -= 2
              R = false
              }
            if( B >= 1 ){
              B -= 1
              U = false
              }
            A.setCollision( L , R , U , D )
            }
          }
        }
    // this.mazelayer.debug = true

    this.items = Game.add.group( Game.world , 'Items' , false , true )
      this.items.create( GetRandomX( this ) , GetRandomY( this ) , 'Items' , 0 )
        this.items.children[ 0 ].anchor.set( .5 )
        this.items.children[ 0 ].scale.set( .5 )
      this.items.create( GetRandomX( this ) , GetRandomY( this ) , 'Items' , 1 )
        this.items.children[ 1 ].anchor.set( .5 )
        this.items.children[ 1 ].scale.set( .5 )
      this.items.create( GetRandomX( this ) , GetRandomY( this ) , 'Items' , 2 )
        this.items.children[ 2 ].anchor.set( .5 )
        this.items.children[ 2 ].scale.set( .5 )
      this.items.create( GetRandomX( this ) , GetRandomY( this ) , 'Items' , 3 )
        this.items.children[ 3 ].anchor.set( .5 )
        this.items.children[ 3 ].scale.set( .5 )

    this.infobar = Game.add.group()
      Game.add.graphics( 0 , 0 , this.infobar )
        this.infobar.children[ 0 ].beginFill( 0xFFFFFF , 1 )
        this.infobar.children[ 0 ].drawRect( 0 , 0 , Game.width , 40 )
        this.infobar.children[ 0 ].endFill()
      Game.add.sprite( Game.width * .02 + 10 , 20 , 'Items' , 0 , this.infobar )
        this.infobar.children[ 1 ].anchor.set( .5 )
        this.infobar.children[ 1 ].scale.set( .5 )
        this.infobar.children[ 1 ].tint = 0x000000
      Game.add.sprite( Game.width * .04 + 30 , 20 , 'Items' , 1 , this.infobar )
        this.infobar.children[ 2 ].anchor.set( .5 )
        this.infobar.children[ 2 ].scale.set( .5 )
        this.infobar.children[ 2 ].tint = 0x000000
      Game.add.sprite( Game.width * .06 + 50 , 20 , 'Items' , 2 , this.infobar )
        this.infobar.children[ 3 ].anchor.set( .5 )
        this.infobar.children[ 3 ].scale.set( .5 )
        this.infobar.children[ 3 ].tint = 0x000000
      Game.add.sprite( Game.width * .08 + 70 , 20 , 'Items' , 3 , this.infobar )
        this.infobar.children[ 4 ].anchor.set( .5 )
        this.infobar.children[ 4 ].scale.set( .5 )
        this.infobar.children[ 4 ].tint = 0x000000
      Game.add.text( this.infobar.width - 5 , 20 , 'Timer' , { font: '20px Arial' , fill: '#000' } , this.infobar )
        this.infobar.children[ 5 ].anchor.set( 1 , .5 )
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

    if( this.size * 40 + 40 < Game.height ) Game.camera.bounds.setTo( 0, 0, Game.world.width , Game.height )
    },
  update: function(){
    var Time = Math.ceil( this.starttime - this.time.totalElapsedSeconds() + this.pausetime )
    this.infobar.children[ 5 ].setText( Math.floor( Time / 60 ) + ':' + ( '00' + Time % 60 ).slice( -2 ) )
    if( Time <= 0 ) Game.state.start( 'Over' , true , false , this.font , false , this.infinite , this.size )

    Game.physics.arcade.collide( this.player , this.mazelayer )
    Game.physics.arcade.overlap( this.player , this.items , function( player , item ){
      item.body.enable = false
      this.infobar.add( item )
      item.position.set( item.x - Game.camera.x , item.y - Game.camera.y )
      Game.make.tween( item ).to( { x: this.infobar.children[ item.frame + 1 ].x , y: this.infobar.children[ item.frame + 1 ].y } , 1000 , Phaser.Easing.Linear.None , true ).onComplete.add( function(){
        this.infobar.add( item )
        if( this.items.children.length == 0 ) Game.state.start( 'Over' , true , false , this.font , true , this.infinite , this.size , this.type )
        } , this )
      } , null , this  )

    this.player.body.velocity.x = 0
    this.player.body.velocity.y = 0

    var Speed = 150

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