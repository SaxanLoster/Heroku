var Game
var Debug = !true
var States = {
  Difficulty: {
    variables: {},
    create: function(){
      var A = {
        font: "40px Arial",
        fill: '#FF0088',
        align: "center",
        }
      this.variables.D1 = Game.add.text( Game.world.centerX , 50 , 'Easy' , A )
      this.variables.D1.anchor.setTo( .5 , 0 )
      this.variables.D1.inputEnabled = true
      this.variables.D1.events.onInputDown.add( function(){
        States.Game.variables.size = 10
        Game.state.start( 'Game' )
        } , this )
      this.variables.D2 = Game.add.text( Game.world.centerX , Game.world.centerY , 'Medium' , A )
      this.variables.D2.anchor.setTo( .5 , .5 )
      this.variables.D2.inputEnabled = true
      this.variables.D2.events.onInputDown.add( function(){
        States.Game.variables.size = 20
        Game.state.start( 'Game' )
        } , this )
      this.variables.D3 = Game.add.text( Game.world.centerX , Game.world.height - 50 , 'Hard' , A )
      this.variables.D3.anchor.setTo( .5 , 1 )
      this.variables.D3.inputEnabled = true
      this.variables.D3.events.onInputDown.add( function(){
        States.Game.variables.size = 40
        Game.state.start( 'Game' )
        } , this )
      },
    preload: function(){
      },
    render: function(){
      },
    update: function(){
      },
    },
  Game: {
    variables: {},
    create: function(){
      var that = this
      this.variables.winconditions = {
        0: false,
        1: false,
        2: false,
        3: false,
        }
      function CreateBase(){
        Game.physics.startSystem( Phaser.Physics.ARCADE )
        Game.stage.backgroundColor = '#000000'

        that.variables.x = Math.max( Math.ceil( document.querySelector( 'Canvas' ).offsetWidth  / 40 ) , that.variables.size )
        that.variables.y = Math.max( Math.ceil( document.querySelector( 'Canvas' ).offsetHeight / 40 ) , that.variables.size + 1 )

        that.variables.ox = Math.floor( ( that.variables.x - that.variables.size ) / 2 )
        that.variables.oy = Math.floor( ( that.variables.y - that.variables.size ) / 2 ) || 1

        that.variables.map = Game.add.tilemap( null , 40 , 40 , that.variables.x , that.variables.y )

        that.variables.cursors = Game.input.keyboard.createCursorKeys()
        }
      function CreateInfoBar(){
        that.variables.infobar = Game.add.group()
        that.variables.infobar.fixedToCamera = true
        var A = Game.make.graphics()
          A.beginFill( 0xFFFFFF , 1 )
          A.drawRect( 0 , 0 , Game.width , 40 )
          A.endFill()
          that.variables.infobar.add( A )
        var A = Game.make.sprite( 60 , 20 , 'Items' , 0 )
          A.anchor.set( .5 )
          A.scale.set( .5 )
          A.tint = 0x000000
          that.variables.infobar.add( A )
        var A = Game.make.sprite( 100 , 20 , 'Items' , 1 )
          A.anchor.set( .5 )
          A.scale.set( .5 )
          A.tint = 0x000000
          that.variables.infobar.add( A )
        var A = Game.make.sprite( 140 , 20 , 'Items' , 2 )
          A.anchor.set( .5 )
          A.scale.set( .5 )
          A.tint = 0x000000
          that.variables.infobar.add( A )
        var A = Game.make.sprite( 180 , 20 , 'Items' , 3 )
          A.anchor.set( .5 )
          A.scale.set( .5 )
          A.tint = 0x000000
          that.variables.infobar.add( A )
        }
      function CreateItems(){
        that.variables.items = Game.add.group( Game.world , 'Items' , false , true )
        that.variables.items.create( GetRandomX() , GetRandomY() , 'Items' , 0 )
        that.variables.items.create( GetRandomX() , GetRandomY() , 'Items' , 1 )
        that.variables.items.create( GetRandomX() , GetRandomY() , 'Items' , 2 )
        that.variables.items.create( GetRandomX() , GetRandomY() , 'Items' , 3 )
        for( var a = 0 ; a < that.variables.items.children.length ; a++ ){
          that.variables.items.children[ a ].anchor.set( .5 )
          that.variables.items.children[ a ].scale.set( .5 )
          }
        }
      function CreateMazeLayer(){
        that.variables.map.addTilesetImage( 'Maze' )
        that.variables.mazelayer = that.variables.map.create( 'Maze Layer' , that.variables.x , that.variables.y , 40 , 40 )
        that.variables.mazelayer.debug = Debug
        that.variables.mazelayer.resizeWorld()
        that.variables.maze = new Maze( that.variables.size , that.variables.size )
        for( var a = 0 ; a < that.variables.map.width ; a++ ){
          for( var b = 0 ; b < that.variables.map.height ; b++ ){
            that.variables.map.putTile( 0 , a , b , that.variables.mazelayer )
            }
          }
        for( var a = 0 ; a < that.variables.size ; a++ ){
          for( var b = 0 ; b < that.variables.size ; b++ ){
            that.variables.map.putTile( that.variables.maze[ 1 ][ a ][ b ] , a + that.variables.ox , b + that.variables.oy , that.variables.mazelayer )
            }
          }
        for( var a = 0 ; a < that.variables.map.width ; a++ ){
          for( var b = 0 ; b < that.variables.map.height ; b++ ){
            var A = that.variables.map.getTile( a , b , that.variables.mazelayer )
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
      function CreatePlayer(){
        that.variables.player = Game.add.sprite( GetRandomX() , GetRandomY() , 'Player' )
        that.variables.player.anchor.setTo( .5 )
        that.variables.player.scale.setTo( .75 )
        Game.physics.enable( that.variables.player , Phaser.Physics.ARCADE )
        that.variables.player.body.collideWorldBounds = true
        Game.camera.follow( that.variables.player )
        }
      function GetRandomX(){
        return Game.rnd.between( that.variables.ox , that.variables.ox + that.variables.size - 1 ) * 40 + 20
        }
      function GetRandomY(){
        return Game.rnd.between( that.variables.oy , that.variables.oy + that.variables.size - 1 ) * 40 + 20
        }
      CreateBase()
      CreateMazeLayer()
      CreateItems()
      CreateInfoBar()
      CreatePlayer()
      },
    preload: function(){
      Game.load.image( 'Maze' , 'Maze.png' )
      Game.load.image( 'Player' , 'Player.png' )
      Game.load.image( 'Test' , 'Test.png' )
      Game.load.spritesheet( 'Items' , 'Items.png' , 40 , 40 , 4 )
      },
    render: function(){
      if( Debug ){
        Game.debug.body( this.variables.player )
        for( var a = 0 ; a < this.variables.items.children.length ; a++ ) Game.debug.body( this.variables.items.children[ a ] )
        }
      },
    update: function(){
      Game.physics.arcade.collide( this.variables.player , this.variables.mazelayer )
      Game.physics.arcade.overlap( this.variables.player , this.variables.triggerlayer )
      Game.physics.arcade.overlap( this.variables.player , this.variables.items , function( player , item ){
        item.body.enable = false
        player.body.enable = false
        Game.make.tween( item ).to( { x: this.variables.infobar.children[ item.frame + 1 ].previousPosition.x , y: this.variables.infobar.children[ item.frame + 1 ].previousPosition.y } , 1000 , Phaser.Easing.Linear.None , true ).onComplete.add( function(){
          player.body.enable = true
          item.position = this.variables.infobar.children[ item.frame + 1 ].position
          this.variables.infobar.add( item )
          this.variables.winconditions[ item.frame ] = true
          } , this )
        } , null , this  )

      this.variables.player.body.velocity.x = 0
      this.variables.player.body.velocity.y = 0

      // Game.physics.arcade.moveToXY( this.variables.items.children[ 0 ] , 60 , 20 , null , 1000 )

      var Speed = 150

      if( this.variables.cursors.up   .isDown ) this.variables.player.body.velocity.y += -Speed
      if( this.variables.cursors.right.isDown ) this.variables.player.body.velocity.x += +Speed
      if( this.variables.cursors.down .isDown ) this.variables.player.body.velocity.y += +Speed
      if( this.variables.cursors.left .isDown ) this.variables.player.body.velocity.x += -Speed

      if( this.variables.cursors.up   .isDown && !this.variables.player.body.blocked.up    ) this.variables.player.rotation = Math.PI * 0.0
      if( this.variables.cursors.right.isDown && !this.variables.player.body.blocked.right ) this.variables.player.rotation = Math.PI * 0.5
      if( this.variables.cursors.down .isDown && !this.variables.player.body.blocked.down  ) this.variables.player.rotation = Math.PI * 1.0
      if( this.variables.cursors.left .isDown && !this.variables.player.body.blocked.left  ) this.variables.player.rotation = Math.PI * 1.5
      },
    },
  Title: {
    variables:{},
    create: function(){
      this.variables.text = Game.add.text( 
        Game.world.centerX,
        Game.world.centerY,
        "Click To Play",
        {
          font: "40px Arial",
          fill: '#FF0088',
          align: "center",
          }
        )
      this.variables.text.anchor.setTo( .5 )
      this.variables.text.inputEnabled = true
      this.variables.text.events.onInputDown.add( function(){
        Game.state.start( 'Difficulty' )
        } , this )
      },
    preload: function(){
      Game.scale.maxWidth  = document.body.offsetWidth
      Game.scale.maxHeight = document.body.offsetHeight
      Game.scale.scaleMode = 2
      Game.scale.setScreenSize()
      },
    render: function(){
      },
    update: function(){
      },
    },
  New: {
    variables: {},
    create: function(){
      },
    preload: function(){
      },
    render: function(){
      },
    update: function(){
      },
    },
  }

Game = new Phaser.Game( Math.min( document.body.offsetWidth / 2 ) , Math.min( document.body.offsetHeight / 2 ) , Phaser.CANVAS )
Game.state.add( 'Difficulty' , States.Difficulty )
Game.state.add( 'Game' , States.Game )
Game.state.add( 'Title' , States.Title )
Game.state.add( 'New' , States.New )
Game.state.start( 'Title' )