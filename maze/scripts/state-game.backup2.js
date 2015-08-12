states.game.prototype = {
  init: function(){
    game.time.reset()

    this.elements = arguments[ 0 ].elements
    this.settings = arguments[ 0 ].settings
    },
  preload: function(){},
  create: function(){
    game.camera.follow( this.elements.player )
    game.physics.enable( this.elements.player , Phaser.Physics.ARCADE )
    this.elements.player.body.collideWorldBounds = true
    this.elements.joystick.inputEnable()
    },
  update: function(){
    if( this.settings.playing ){
      this.settings.timeleft = Math.max( Math.ceil( this.settings.timer - game.time.totalElapsedSeconds() + game.time.pausetime ) , 0 )
      this.elements.infobar1.children[ 3 ].setText( Math.floor( this.settings.timeleft / 60 ) + ':' + ( '00' + this.settings.timeleft % 60 ).slice( -2 ) )
      }
    game.physics.arcade.collide( this.elements.player , this.elements.mazelayer )

    /* Win/Lose */
      if( this.settings.playing && this.settings.timeleft <= 0 && this.elements.items.total > 0 && this.settings.gemsleft > 0 ){
        this.settings.playing = !true
        this.elements.player.body.enable = !true
        this.settings.win = !true
        game.state.start( 'postgame' , !true , !true , this )
        }
      game.physics.arcade.overlap( this.elements.player , this.elements.items , function( paraPlayer , paraItem ){
        paraItem.body.enable = !true
        paraItem.oldposition = { x: paraItem.x , y: paraItem.y }
        this.elements.infobar2.add( paraItem )
        this.settings.gemsleft--
        if( this.settings.gemsleft === 0 && this.elements.items.total === 0 ){
          this.settings.playing = !true
          this.settings.win = true
          }
        paraItem.position.set( paraItem.x - game.camera.x , paraItem.y - game.camera.y )
        game.make.tween( paraItem ).to( { x: this.elements.infobar2.children[ paraItem.frame + 1 ].x , y: this.elements.infobar2.children[ paraItem.frame + 1 ].y } , 1000 , Phaser.Easing.Linear.None , true ).onComplete.add( function(){
          if( this.settings.win ) game.state.start( 'postgame' , !true , !true , this )
          } , this )
        } , null , this  )
      /**/

    /* Player Movement */
      this.elements.player.body.velocity.x = 0
      this.elements.player.body.velocity.y = 0

      var tempSpeed = 110

      if( true && game.input.activePointer.isDown ){
        // this.elements.player.body.velocity.x = tempSpeed
        // this.elements.player.body.velocity.y = tempSpeed
        if( this.elements.joystick.cursors.right ) this.elements.player.body.velocity.x += tempSpeed
        if( this.elements.joystick.cursors.down ) this.elements.player.body.velocity.y += tempSpeed
        if( this.elements.joystick.cursors.left ) this.elements.player.body.velocity.x -= tempSpeed
        if( this.elements.joystick.cursors.up ) this.elements.player.body.velocity.y -= tempSpeed
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
        if( this.settings.cursors.right.isDown || this.settings.wasd.right.isDown ) this.elements.player.body.velocity.x += tempSpeed
        if( this.settings.cursors.down.isDown || this.settings.wasd.down.isDown ) this.elements.player.body.velocity.y += tempSpeed
        if( this.settings.cursors.left.isDown || this.settings.wasd.left.isDown ) this.elements.player.body.velocity.x -= tempSpeed
        if( this.settings.cursors.up.isDown || this.settings.wasd.up.isDown ) this.elements.player.body.velocity.y -= tempSpeed
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
    },
  render: function(){},
  paused: function(){},
  resumed: function(){
    game.time.pausetime += game.time.pauseDuration * .001
    },
  resize: function(){},
  shutdown: function(){},
  }