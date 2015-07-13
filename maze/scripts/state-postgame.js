states.postgame.prototype = {
  init: function(){
    this.that = arguments[ 0 ]
    },
  preload: function(){},
  create: function(){
    game.camera.unfollow()
    this.that.spritegroup = game.add.group()
    for( var a = 0 ; a < this.that.maze.length ; a++ ){
      for( var b = 0 ; b < this.that.maze.length ; b++ ){
        this.that.spritegroup.create( ( a + this.that.ox ) * 40 , ( b + this.that.oy ) * 40 , 'maze' , this.that.maze[ a ][ b ] )
        }
      }
    this.that.spritegroup.create( this.that.player.x , this.that.player.y , this.that.player.generateTexture() )
      this.that.spritegroup.children[ this.that.spritegroup.total - 1 ].anchor.set( .5 )
      this.that.spritegroup.children[ this.that.spritegroup.total - 1 ].scale.set( .75 )
      game.camera.focusOn( this.that.spritegroup.children[ this.that.spritegroup.total - 1 ] )
    for( var a = 0 ; a < this.that.items.total ; a++ ){
      this.that.spritegroup.create( this.that.items.children[ a ].x , this.that.items.children[ a ].y , this.that.items.children[ a ].generateTexture() )
      this.that.spritegroup.children[ this.that.spritegroup.total - 1 ].anchor.set( .5 )
      this.that.spritegroup.children[ this.that.spritegroup.total - 1 ].scale.set( .5 )
      }
    for( var a = this.that.settings.gems + 1 ; a < this.that.infobar2.total ; a++ ){
      this.that.spritegroup.create( this.that.infobar2.children[ a ].oldposition.x , this.that.infobar2.children[ a ].oldposition.y , this.that.infobar2.children[ a ].generateTexture() )
      this.that.spritegroup.children[ this.that.spritegroup.total - 1 ].anchor.set( .5 )
      this.that.spritegroup.children[ this.that.spritegroup.total - 1 ].scale.set( .5 )
      this.that.spritegroup.children[ this.that.spritegroup.total - 1 ].alpha = .5
      this.that.spritegroup.children[ this.that.spritegroup.total - 1 ].tine = 0x3f3f3f
      }
    game.world.removeBetween( 0 , game.world.children.length - 2 , true )
    if( this.that.spritegroup.height > game.height || this.that.spritegroup.width > game.width ){
      var view = Math.min( game.width , game.height )
      var ratio = game.scale.isGameLandscape ? game.height / this.that.spritegroup.height : game.width / this.that.spritegroup.height
      var tween = game.make.tween( this.that.spritegroup.scale ).to( { x: ratio , y: ratio } , 2000 , Phaser.Easing.Linear.None , true , 500 )
      var tween = game.make.tween( this.that.spritegroup ).to( { x: ( game.width - view ) / 2 , y: ( game.height - view ) / 2 } , 2000 , Phaser.Easing.Linear.None , true , 500 )
      var tween = game.make.tween( game.camera ).to( { x: 0 , y: 0 } , 2000 , Phaser.Easing.Linear.None , true , 500 )
      tween.onComplete.add( function(){
        game.time.events.add( 1500 , function(){
          game.state.start( 'over' , true , !true , !true , this.that.level , this.that.lives )
          } , this )
         } , this )
      }
    },
  update: function(){},
  render: function(){},
  paused: function(){},
  resumed: function(){},
  resize: function(){},
  shutdown: function(){},
  }