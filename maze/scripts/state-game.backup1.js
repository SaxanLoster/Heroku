states.game.prototype = {
  init: function(){
    this.time.reset()
    this.that = arguments[ 0 ]
    game.camera.follow( this.that.player )
    game.physics.enable( this.that.player , Phaser.Physics.ARCADE )
    this.that.player.body.collideWorldBounds = true
    },
  preload: function(){},
  create: function(){
    this.that.joystick.inputEnable()
    },
  update: function(){
    var time = Math.max( Math.ceil( this.that.settings.time - this.time.totalElapsedSeconds() + this.that.pausetime ) , 0 )
    this.that.infobar1.children[ 3 ].setText( Math.floor( time / 60 ) + ':' + ( '00' + time % 60 ).slice( -2 ) )
    game.physics.arcade.collide( this.that.player , this.that.mazelayer )

    /* Win/Lose */
      if( this.that.playing && time <= 0 && this.that.items.total > 0 && this.that.win > 0 ){
        this.that.playing = !true
        this.that.player.body.enable = !true
        game.state.start( 'postgame' , !true , !true , this.that )
        }
      game.physics.arcade.overlap( this.that.player , this.that.items , function( player , item ){
        this.that.pausetime += 5
        item.body.enable = !true
        item.oldposition = { x: item.x , y: item.y }
        this.that.infobar2.add( item )
        item.position.set( item.x - game.camera.x , item.y - game.camera.y )
        game.make.tween( item ).to( { x: this.that.infobar2.children[ item.frame + 1 ].x , y: this.that.infobar2.children[ item.frame + 1 ].y } , 1000 , Phaser.Easing.Linear.None , true ).onComplete.add( function(){
          this.that.win--
          if( this.that.win == 0 && this.that.items.total == 0 ){
            this.that.playing = !true
            setTimeout( function( level , lives ){ game.state.start( 'over' , true , !true , true , level , lives ) } , 250 , this.that.level , this.that.lives )
            }
          } , this )
        } , null , this  )
      /**/

    /* Player Movement */
      this.that.player.body.velocity.x = 0
      this.that.player.body.velocity.y = 0

      var speed = 100

      if( true && game.input.activePointer.isDown ){
        // this.that.player.body.velocity.x = speed * this.that.joystick.speed.x * -.01 * 1.17
        // this.that.player.body.velocity.y = speed * this.that.joystick.speed.y * -.01 * 1.17
        if( this.that.joystick.cursors.right ) this.that.player.body.velocity.x += speed
        if( this.that.joystick.cursors.down ) this.that.player.body.velocity.y += speed
        if( this.that.joystick.cursors.left ) this.that.player.body.velocity.x -= speed
        if( this.that.joystick.cursors.up ) this.that.player.body.velocity.y -= speed
        switch( true ){
          case this.that.joystick.cursors.up && this.that.joystick.cursors.right :
            this.that.player.rotation = Math.PI * 0.25
            break
          case this.that.joystick.cursors.right && this.that.joystick.cursors.down :
            this.that.player.rotation = Math.PI * 0.75
            break
          case this.that.joystick.cursors.down && this.that.joystick.cursors.left :
            this.that.player.rotation = Math.PI * 1.25
            break
          case this.that.joystick.cursors.left && this.that.joystick.cursors.up :
            this.that.player.rotation = Math.PI * 1.75
            break
          case this.that.joystick.cursors.up :
            this.that.player.rotation = Math.PI * 0.00
            break
          case this.that.joystick.cursors.right :
            this.that.player.rotation = Math.PI * 0.50
            break
          case this.that.joystick.cursors.down :
            this.that.player.rotation = Math.PI * 1.00
            break
          case this.that.joystick.cursors.left :
            this.that.player.rotation = Math.PI * 1.50
            break
          }
        }
      else{
        if( this.that.cursors.right.isDown || this.that.wasd.right.isDown ) this.that.player.body.velocity.x += speed
        if( this.that.cursors.down .isDown || this.that.wasd.down .isDown ) this.that.player.body.velocity.y += speed
        if( this.that.cursors.left .isDown || this.that.wasd.left .isDown ) this.that.player.body.velocity.x -= speed
        if( this.that.cursors.up   .isDown || this.that.wasd.up   .isDown ) this.that.player.body.velocity.y -= speed
        switch( true ){
          case ( this.that.cursors.up   .isDown && this.that.cursors.right.isDown ) || ( this.that.wasd.up   .isDown && this.that.wasd.right.isDown ) :
            this.that.player.rotation = Math.PI * 0.25
            break
          case ( this.that.cursors.right.isDown && this.that.cursors.down .isDown ) || ( this.that.wasd.right.isDown && this.that.wasd.down .isDown ) :
            this.that.player.rotation = Math.PI * 0.75
            break
          case ( this.that.cursors.down .isDown && this.that.cursors.left .isDown ) || ( this.that.wasd.down .isDown && this.that.wasd.left .isDown ) :
            this.that.player.rotation = Math.PI * 1.25
            break
          case ( this.that.cursors.left .isDown && this.that.cursors.up   .isDown ) || ( this.that.wasd.left .isDown && this.that.wasd.up   .isDown ) :
            this.that.player.rotation = Math.PI * 1.75
            break
          case this.that.cursors.up   .isDown || this.that.wasd.up   .isDown :
            this.that.player.rotation = Math.PI * 0.00
            break
          case this.that.cursors.right.isDown || this.that.wasd.right.isDown :
            this.that.player.rotation = Math.PI * 0.50
            break
          case this.that.cursors.down .isDown || this.that.wasd.down .isDown :
            this.that.player.rotation = Math.PI * 1.00
            break
          case this.that.cursors.left .isDown || this.that.wasd.left .isDown :
            this.that.player.rotation = Math.PI * 1.50
            break
          }
        }
      /**/
    },
  render: function(){},
  paused: function(){},
  resumed: function(){
    this.that.pausetime += this.that.time.pauseDuration * .001
    },
  resize: function(){},
  shutdown: function(){},
  }