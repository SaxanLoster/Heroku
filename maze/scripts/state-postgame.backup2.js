states.postgame.prototype = {
  init: function(){
    this.elements = arguments[ 0 ].elements
    this.settings = arguments[ 0 ].settings
    },
  preload: function(){},
  create: function(){
    game.camera.unfollow()
    this.elements.spritegroup = game.add.group()
    for( var iterA = 0 ; iterA < this.settings.maze.length ; iterA++ ){
      for( var iterB = 0 ; iterB < this.settings.maze.length ; iterB++ ){
        this.elements.spritegroup.create( ( iterA + this.settings.ox ) * 40 , ( iterB + this.settings.oy ) * 40 , 'maze' , this.settings.maze[ iterA ][ iterB ] )
        }
      }
    this.elements.spritegroup.create( this.elements.player.x , this.elements.player.y , this.elements.player.generateTexture() )
      this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].anchor.set( .5 )
      this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].scale.set( .75 )
      game.camera.focusOn( this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ] )
    for( var iterA = 0 ; iterA < this.elements.items.total ; iterA++ ){
      this.elements.spritegroup.create( this.elements.items.children[ iterA ].x , this.elements.items.children[ iterA ].y , this.elements.items.children[ iterA ].generateTexture() )
      this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].anchor.set( .5 )
      this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].scale.set( .5 )
      }
    for( var iterA = this.settings.gems + 1 ; iterA < this.elements.infobar2.total ; iterA++ ){
      this.elements.spritegroup.create( this.elements.infobar2.children[ iterA ].oldposition.x , this.elements.infobar2.children[ iterA ].oldposition.y , this.elements.infobar2.children[ iterA ].generateTexture() )
      this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].anchor.set( .5 )
      this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].scale.set( .5 )
      this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].alpha = .5
      this.elements.spritegroup.children[ this.elements.spritegroup.total - 1 ].tint = 0x1f1f1f
      }
    game.world.removeBetween( 0 , game.world.children.length - 2 , true )
    if( this.elements.spritegroup.height > game.height || this.elements.spritegroup.width > game.width ){
      var tempView = Math.min( game.width , game.height )
      var tempRatio = game.scale.isGameLandscape ? game.height / this.elements.spritegroup.height : game.width / this.elements.spritegroup.height
      var tempTween = game.make.tween( this.elements.spritegroup.scale ).to( { x: tempRatio , y: tempRatio } , 2000 , Phaser.Easing.Linear.None , true , 500 )
      var tempTween = game.make.tween( this.elements.spritegroup ).to( { x: ( game.width - tempView ) / 2 , y: ( game.height - tempView ) / 2 } , 2000 , Phaser.Easing.Linear.None , true , 500 )
      var tempTween = game.make.tween( game.camera ).to( { x: 0 , y: 0 } , 2000 , Phaser.Easing.Linear.None , true , 500 )
      }

    function NextState(){
      game.state.start( 'over' , true , !true , this.settings.win , this.settings.mode , this.settings.level , this.settings.lives , this.settings.timeleft )
      }
    this.input.onDown.addOnce( NextState , this )
    },
  update: function(){},
  render: function(){},
  paused: function(){},
  resumed: function(){},
  resize: function(){},
  shutdown: function(){},
  }