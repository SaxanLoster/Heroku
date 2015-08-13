states.game.prototype = {
  init: function(){
    game.time.reset()
    game.time.pausetime = 0

    this.settings = {}
    this.elements = {}
    this.routines = {}

    this.settings.mode = arguments[ 0 ]

    this.settings.level = arguments[ 1 ] || 1

    this.settings.lives = arguments[ 2 ] || 5

    var temp1 = GetLevelData( this.settings.level )

    this.settings.gems = temp1.gems
    this.settings.size = temp1.size
    this.settings.timestart = ( this.settings.mode === 1 ) ? ( temp1.time ) : ( arguments[ 3 ] )
    this.settings.timer = game.time.create( true )

    this.settings.win = !true

    this.settings.spacetaken = []

    this.settings.playing = true

    this.settings.maze = new Maze( this.settings.size )

    this.settings.tilesize = 40
    
    this.settings.x = Math.max( Math.ceil( game.width  / this.settings.tilesize ) , this.settings.size )
    this.settings.y = Math.max( Math.ceil( game.height / this.settings.tilesize ) , this.settings.size )

    this.settings.ox = Math.floor( ( this.settings.x - this.settings.size ) / 2 )
    this.settings.oy = Math.floor( ( this.settings.y - this.settings.size ) / 2 )

    this.settings.cursors = game.input.keyboard.createCursorKeys()
    this.settings.wasd = {
      up: game.input.keyboard.addKey( Phaser.Keyboard.W ),
      down: game.input.keyboard.addKey( Phaser.Keyboard.S ),
      left: game.input.keyboard.addKey( Phaser.Keyboard.A ),
      right: game.input.keyboard.addKey( Phaser.Keyboard.D ),
      }

    this.routines.GetRandomPosition = function( paraf1 ){
      while( tempf1 === undefined || tempf2 === undefined || this.settings.maze[ tempf1 ][ tempf2 ] === 0 || this.settings.spacetaken.indexOf( tempf1 + 'x' + tempf2 ) !== -1 ){
        var tempf1 = game.rnd.between( 1 , this.settings.size - 2 )
        var tempf2 = game.rnd.between( 1 , this.settings.size - 2 )
        }
      this.settings.spacetaken.push( tempf1 + 'x' + tempf2 )
      paraf1.position.set( ( tempf1 + this.settings.ox ) * this.settings.tilesize + 20 , ( tempf2 + this.settings.oy ) * this.settings.tilesize + 20 )
      }
    this.routines.PostGame = function(){
      this.settings.playing = !true
      game.camera.unfollow()
      this.elements.spritegroup = game.add.group()
      for( var iterf1 = 0 ; iterf1 < this.settings.maze.length ; iterf1++ ){
        for( var iterf2 = 0 ; iterf2 < this.settings.maze.length ; iterf2++ ){
          this.elements.spritegroup.create( ( iterf1 + this.settings.ox ) * 40 , ( iterf2 + this.settings.oy ) * 40 , 'maze' , this.settings.maze[ iterf1 ][ iterf2 ] )
          }
        }
      this.elements.spritegroup.create( this.elements.player.x , this.elements.player.y , this.elements.player.generateTexture() )
        this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].anchor.set( .5 )
        this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].scale.set( .75 )
        game.camera.focusOn( this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ] )
      for( var iterf1 = 0 ; iterf1 < this.elements.items.total ; iterf1++ ){
        this.elements.spritegroup.create( this.elements.items.children[ iterf1 ].x , this.elements.items.children[ iterf1 ].y , this.elements.items.children[ iterf1 ].generateTexture() )
        this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].anchor.set( .5 )
        this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].scale.set( .5 )
        }
      for( var iterf1 = this.settings.gems + 1 ; iterf1 < this.elements.infobar2.total ; iterf1++ ){
        this.elements.spritegroup.create( this.elements.infobar2.children[ iterf1 ].oldposition.x , this.elements.infobar2.children[ iterf1 ].oldposition.y , this.elements.infobar2.children[ iterf1 ].generateTexture() )
        this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].anchor.set( .5 )
        this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].scale.set( .5 )
        this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].alpha = .5
        this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].tint = 0x1f1f1f
        }
      game.world.removeBetween( 0 , game.world.children.length - 2 , true )
      if( this.elements.spritegroup.height > game.height || this.elements.spritegroup.width > game.width ){
        var tempf1 = Math.min( game.width , game.height )
        var tempf2 = game.scale.isGameLandscape ? game.height / this.elements.spritegroup.height : game.width / this.elements.spritegroup.height
        var tempf3 = game.make.tween( this.elements.spritegroup.scale ).to( { x: tempf2 , y: tempf2 } , 2000 , Phaser.Easing.Linear.None , true , 500 )
        var tempf3 = game.make.tween( this.elements.spritegroup ).to( { x: ( game.width - tempf1 ) / 2 , y: ( game.height - tempf1 ) / 2 } , 2000 , Phaser.Easing.Linear.None , true , 500 )
        var tempf3 = game.make.tween( game.camera ).to( { x: 0 , y: 0 } , 2000 , Phaser.Easing.Linear.None , true , 500 )
        }

      function NextState(){
        game.state.start( 'over' , true , !true , this.settings.win , this.settings.mode , this.settings.level , this.settings.lives , this.settings.timeleft )
        }
      this.input.onDown.addOnce( NextState , this )
      }
    },
  preload: function(){},
  create: function(){
    game.physics.startSystem( Phaser.Physics.ARCADE )
    game.stage.backgroundColor = '#000000'

    this.elements.map = game.add.tilemap( null , this.settings.tilesize , this.settings.tilesize , this.settings.x , this.settings.y )
      this.elements.map.addTilesetImage( 'maze' , 'maze' , 40 , 40 , 0 , 1 )
      this.elements.map.setCollisionByIndex( 0 , true )

    this.elements.mazelayer = this.elements.map.create( 'maze' , this.settings.x , this.settings.y , this.settings.tilesize , this.settings.tilesize )
      this.elements.mazelayer.resizeWorld()
      for( var iter1 = 0 ; iter1 < this.settings.size ; iter1++ ){
        for( var iter2 = 0 ; iter2 < this.settings.size ; iter2++ ){
          this.elements.map.putTile( this.settings.maze[ iter1 ][ iter2 ] , iter1 + this.settings.ox , iter2 + this.settings.oy , this.elements.mazelayer )
          }
        }

    this.elements.items = game.add.group( game.world , 'items' , !true , true )
      for( var iter1 = 0 ; iter1 < this.settings.gems ; iter1++ ){
        this.elements.items.create( 0 , 0 , 'items' , iter1 )
          this.routines.GetRandomPosition.call( this , this.elements.items.children[ iter1 ] )
          this.elements.items.children[ iter1 ].anchor.set( .5 )
          this.elements.items.children[ iter1 ].scale.set( .5 )
        }

    this.elements.infobar1  = game.add.group()
      game.add.graphics( 0 , 0 , this.elements.infobar1 )
        this.elements.infobar1.children[ this.elements.infobar1.total - 1 ].beginFill( 0xFFFFFF , 1 )
        this.elements.infobar1.children[ this.elements.infobar1.total - 1 ].drawRect( 0 , 0 , game.width , 40 )
        this.elements.infobar1.children[ this.elements.infobar1.total - 1 ].endFill()
      game.add.text( 5 , 20 , 'Level ' + this.settings.level , { font: '20px Arial' , fill: '#000' } , this.elements.infobar1 )
        this.elements.infobar1.children[ this.elements.infobar1.total - 1 ].anchor.set( 0 , .5 )
      game.add.text( game.width / 2 , 20 , this.settings.mode === 1 ? 'Lives: ' + this.settings.lives : '' , { font: '20px Arial' , fill: '#000' } , this.elements.infobar1 )
        this.elements.infobar1.children[ this.elements.infobar1.total - 1 ].anchor.set( .5 , .5 )
      var temp1 = Math.max( Math.ceil( this.settings.timer - game.time.totalElapsedSeconds() + game.time.pausetime ) , 0 )
      game.add.text( this.elements.infobar1.width - 5 , 20 , Math.floor( temp1 / 60 ) + ':' + ( '00' + temp1 % 60 ).slice( -2 ) , { font: '20px Arial' , fill: '#000' } , this.elements.infobar1 )
        this.elements.infobar1.children[ this.elements.infobar1.total - 1 ].anchor.set( 1 , .5 )
      this.elements.infobar1.fixedToCamera = true

    this.elements.infobar2 = game.add.group()
      game.add.graphics( 0 , game.height - 40 , this.elements.infobar2 )
        this.elements.infobar2.children[ this.elements.infobar2.total - 1 ].beginFill( 0xFFFFFF , 1 )
        this.elements.infobar2.children[ this.elements.infobar2.total - 1 ].drawRect( 0 , 0 , game.width , 40 )
        this.elements.infobar2.children[ this.elements.infobar2.total - 1 ].endFill()
      for( var iter1 = 0 ; iter1 < this.settings.gems ; iter1++ ){
        game.add.sprite( game.width * ( ( iter1 + 1 ) * .02 ) + ( 10 + ( iter1 * 20 ) ) , game.height - 20 , 'items' , iter1 , this.elements.infobar2 )
          this.elements.infobar2.children[ this.elements.infobar2.total - 1 ].anchor.set( .5 )
          this.elements.infobar2.children[ this.elements.infobar2.total - 1 ].scale.set( .5 )
          this.elements.infobar2.children[ this.elements.infobar2.total - 1 ].tint = 0x000000
        }
      this.elements.infobar2.fixedToCamera = true

    this.elements.player = game.add.sprite( 0 , 0 , 'player' )
      this.routines.GetRandomPosition.call( this , this.elements.player )
      this.elements.player.anchor.setTo( .5 )
      this.elements.player.scale.setTo( .75 )
      game.camera.follow( this.elements.player )

    this.elements.joystick = this.game.plugins.add( Phaser.Plugin.TouchControl )
      this.elements.joystick.inputEnable()
      this.elements.joystick.settings.numDirections = 8
      this.elements.joystick.settings.maxDistanceInPixels = 20

    game.camera.follow( this.elements.player )
    game.physics.enable( this.elements.player , Phaser.Physics.ARCADE )
    this.elements.player.body.collideWorldBounds = true

    this.settings.timer.add( this.settings.timestart * Phaser.Timer.SECOND , this.routines.PostGame , this )
    this.settings.timer.start()
    this.settings.timer.pause()
    function StartGame(){
      this.input.keyboard.onDownCallback = null
      this.settings.timer.resume()
      }
    this.input.keyboard.callbackContext = this
    this.input.keyboard.onDownCallback = StartGame
    this.input.onDown.addOnce( StartGame , this )
    },
  update: function(){
    if( true && this.settings.playing ){
      this.settings.timeleft = Math.floor( this.settings.timer.duration / Phaser.Timer.SECOND )
      this.elements.infobar1.children[ 3 ].setText( Math.floor( this.settings.timeleft / 60 ) + ':' + ( '00' + this.settings.timeleft % 60 ).slice( -2 ) )

      game.physics.arcade.collide( this.elements.player , this.elements.mazelayer )

      game.physics.arcade.overlap( this.elements.player , this.elements.items , function( paraf1 , paraf2 ){
        paraf2.body.enable = !true
        paraf2.oldposition = { x: paraf2.x , y: paraf2.y }
        this.elements.infobar2.add( paraf2 )
        if( this.elements.items.total === 0 ){
          this.elements.player.body.enable = !true
          this.elements.player.body.velocity.x = 0
          this.elements.player.body.velocity.y = 0
          this.settings.playing = !true
          this.settings.timer.stop()
          this.settings.win = true
          }
        paraf2.position.set( paraf2.x - game.camera.x , paraf2.y - game.camera.y )
        game.make.tween( paraf2 ).to( { x: this.elements.infobar2.children[ paraf2.frame + 1 ].x , y: this.elements.infobar2.children[ paraf2.frame + 1 ].y } , 1000 , Phaser.Easing.Linear.None , true ).onComplete.add( function(){
          if( this.settings.win ) this.routines.PostGame.call( this )
          } , this )
        } , null , this  )

      /* Player Movement */
        this.elements.player.body.velocity.x = 0
        this.elements.player.body.velocity.y = 0

        var temp1 = 110
        
        if( game.input.activePointer.isDown ){
          // this.elements.player.body.velocity.x = temp1
          // this.elements.player.body.velocity.y = temp1
          if( this.elements.joystick.cursors.right ) this.elements.player.body.velocity.x += temp1
          if( this.elements.joystick.cursors.down ) this.elements.player.body.velocity.y += temp1
          if( this.elements.joystick.cursors.left ) this.elements.player.body.velocity.x -= temp1
          if( this.elements.joystick.cursors.up ) this.elements.player.body.velocity.y -= temp1
          switch( true ){
            case this.elements.joystick.cursors.up && this.elements.joystick.cursors.right :
              this.elements.player.rotation = Math.PI * 0.25
              break
            case this.elements.joystick.cursors.right && this.elements.joystick.cursors.down :
              this.elements.player.rotation = Math.PI * 0.75
              break
            case this.elements.joystick.cursors.down && this.elements.joystick.cursors.left :
              this.elements.player.rotation = Math.PI * 1.25
              break
            case this.elements.joystick.cursors.left && this.elements.joystick.cursors.up :
              this.elements.player.rotation = Math.PI * 1.75
              break
            case this.elements.joystick.cursors.up :
              this.elements.player.rotation = Math.PI * 0.00
              break
            case this.elements.joystick.cursors.right :
              this.elements.player.rotation = Math.PI * 0.50
              break
            case this.elements.joystick.cursors.down :
              this.elements.player.rotation = Math.PI * 1.00
              break
            case this.elements.joystick.cursors.left :
              this.elements.player.rotation = Math.PI * 1.50
              break
            }
          }
        else{
          if( this.settings.cursors.right.isDown || this.settings.wasd.right.isDown ) this.elements.player.body.velocity.x += temp1
          if( this.settings.cursors.down.isDown || this.settings.wasd.down.isDown ) this.elements.player.body.velocity.y += temp1
          if( this.settings.cursors.left.isDown || this.settings.wasd.left.isDown ) this.elements.player.body.velocity.x -= temp1
          if( this.settings.cursors.up.isDown || this.settings.wasd.up.isDown ) this.elements.player.body.velocity.y -= temp1
          switch( true ){
            case ( this.settings.cursors.up.isDown && this.settings.cursors.right.isDown ) || ( this.settings.wasd.up.isDown && this.settings.wasd.right.isDown ) :
              this.elements.player.rotation = Math.PI * 0.25
              break
            case ( this.settings.cursors.right.isDown && this.settings.cursors.down.isDown ) || ( this.settings.wasd.right.isDown && this.settings.wasd.down.isDown ) :
              this.elements.player.rotation = Math.PI * 0.75
              break
            case ( this.settings.cursors.down.isDown && this.settings.cursors.left.isDown ) || ( this.settings.wasd.down.isDown && this.settings.wasd.left.isDown ) :
              this.elements.player.rotation = Math.PI * 1.25
              break
            case ( this.settings.cursors.left.isDown && this.settings.cursors.up.isDown ) || ( this.settings.wasd.left.isDown && this.settings.wasd.up.isDown ) :
              this.elements.player.rotation = Math.PI * 1.75
              break
            case this.settings.cursors.up.isDown || this.settings.wasd.up.isDown :
              this.elements.player.rotation = Math.PI * 0.00
              break
            case this.settings.cursors.right.isDown || this.settings.wasd.right.isDown :
              this.elements.player.rotation = Math.PI * 0.50
              break
            case this.settings.cursors.down.isDown || this.settings.wasd.down.isDown :
              this.elements.player.rotation = Math.PI * 1.00
              break
            case this.settings.cursors.left.isDown || this.settings.wasd.left.isDown :
              this.elements.player.rotation = Math.PI * 1.50
              break
            }
          }
        /**/
      }
    },
  render: function(){},
  paused: function(){},
  resumed: function(){},
  resize: function(){},
  shutdown: function(){},
  }