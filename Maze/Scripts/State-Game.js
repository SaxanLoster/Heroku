States.game.prototype = {
  init: function(){
    this.time.reset()
    this.that = arguments[ 0 ]

    Game.camera.follow( this.that.player )
    Game.physics.enable( this.that.player , Phaser.Physics.ARCADE )
    this.that.player.body.collideWorldBounds = true
    },
  create: function(){
    this.that.joystick.inputEnable()
    },
  update: function(){
    var Time = Math.max( Math.ceil( this.that.settings.time - this.time.totalElapsedSeconds() + this.that.pausetime ) , 0 )
    this.that.infobar1.children[ 3 ].setText( Math.floor( Time / 60 ) + ':' + ( '00' + Time % 60 ).slice( -2 ) )
    Game.physics.arcade.collide( this.that.player , this.that.mazelayer )

    // Win/Lose
      if( this.that.playing && Time <= 0 && this.that.items.children.length > 0 && this.that.win > 0 ){
        this.that.playing = false
        this.that.player.body.enable = false
        Game.camera.unfollow( this.that.player )
        var tweens = Game.make.tween( this.that.camera )
        tweens.onComplete.add( function(){ Game.state.start( 'over' , true , false , false , this.that.level , this.that.lives ) } , this )
        for( var a = 0 ; a < this.that.items.children.length ; a++ ){
          if( !this.that.items.children[ a ].inCamera ){
            tweens.to( { 'x': this.that.items.children[ a ].x - 320 , 'y': this.that.items.children[ a ].y - 230.75 } , 2000 , Phaser.Easing.Linear.None , false , 500 )
            tweens.to( { 'x': this.that.player.x - 320 , 'y': this.that.player.y - 230.75 } , 2000 , Phaser.Easing.Linear.None , false , 2000 )
            }
          }
        if( tweens.timeline.length == 0 ) Game.state.start( 'over' , true , false , false , this.that.level , this.that.lives )
        tweens.start()
        }

      Game.physics.arcade.overlap( this.that.player , this.that.items , function( player , item ){
        this.that.pausetime += 5
        item.body.enable = false
        this.that.infobar2.add( item )
        item.position.set( item.x - Game.camera.x , item.y - Game.camera.y )
        Game.make.tween( item ).to( { x: this.that.infobar2.children[ item.frame + 1 ].x , y: this.that.infobar2.children[ item.frame + 1 ].y } , 1000 , Phaser.Easing.Linear.None , true ).onComplete.add( function(){
          this.that.win--
          if( this.that.win == 0 && this.that.items.children.length == 0 ){
            this.that.playing = false
            setTimeout( function( level , lives ){ Game.state.start( 'over' , true , false , true , level , lives ) } , 250 , this.that.level , this.that.lives )
            }
          } , this )
        } , null , this  )

    // Player Movement
      this.that.player.body.velocity.x = 0
      this.that.player.body.velocity.y = 0

      var Speed = 100

      if( true && Game.input.activePointer.isDown ){
        this.that.player.body.velocity.x = Speed * this.that.joystick.speed.x * -.01 * 1.17
        this.that.player.body.velocity.y = Speed * this.that.joystick.speed.y * -.01 * 1.17
        }
      else{
        if( this.that.cursors.right.isDown || this.that.wasd.right.isDown ) this.that.player.body.velocity.x += +Speed
        if( this.that.cursors.down .isDown || this.that.wasd.down .isDown ) this.that.player.body.velocity.y += +Speed
        if( this.that.cursors.left .isDown || this.that.wasd.left .isDown ) this.that.player.body.velocity.x += -Speed
        if( this.that.cursors.up   .isDown || this.that.wasd.up   .isDown ) this.that.player.body.velocity.y += -Speed

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
    },
  resumed: function(){
    this.that.pausetime += this.that.time.pauseDuration * .001
    },
  }