var Debug = !true
var Game = new Phaser.Game(
  Math.max( 200 , document.body.offsetWidth / 2 ),
  Math.max( 200 , document.body.offsetHeight / 2 ),
  Phaser.CANVAS
  )
var Globals = {}
var States = {
  Title: function(){},
  Mode: function(){},
  Game: function(){},
  End: function(){},
  New: function(){},
  }

States.Title.prototype = {
  variables: {},
  init: function(){
    Game.scale.scaleMode = 2
    Globals.font = {
      align: 'center',
      fill: '#FF0088',
      // font: Math.min( Math.round( Game.height / 5 ) , 40 ) + 'px Arial',
      font: '30px Arial',
      wordWrap: true,
      wordWrapWidth: Game.width,
      }
    },
  preload: function(){},
  create: function(){
    this.variables.text = Game.add.text( Game.world.centerX , Game.world.centerY , 'Click To Play' , Globals.font )
    this.variables.text.anchor.setTo( .5 )
    this.variables.text.inputEnabled = true
    this.variables.text.input.useHandCursor = true
    this.variables.text.events.onInputDown.add( function(){ Game.state.start( 'Mode' ) } , this ) },
  update: function(){},
  render: function(){},
  paused: function(){},
  resize: function(){},
  shutdown: function(){},
  }

States.Mode.prototype = {
  variables: {},
  init: function(){},
  preload: function(){},
  create: function(){
    var A = ( Game.height - 160 ) / 5
    this.variables.D1 = Game.add.text( Game.world.centerX , A , 'Easy' , Globals.font )
      this.variables.D1.anchor.setTo( .5 , 0 )
      this.variables.D1.inputEnabled = true
      this.variables.D1.input.useHandCursor = true
      this.variables.D1.events.onInputDown.add( function(){
        Game.state.start( 'Game' , true , false , 10 , false )
        } , this )
    this.variables.D2 = Game.add.text( Game.world.centerX , this.variables.D1.bottom + A , 'Medium' , Globals.font )
      this.variables.D2.anchor.setTo( .5 , 0 )
      this.variables.D2.inputEnabled = true
      this.variables.D2.input.useHandCursor = true
      this.variables.D2.events.onInputDown.add( function(){
        Game.state.start( 'Game' , true , false , 20 , false )
        } , this )
    this.variables.D3 = Game.add.text( Game.world.centerX , this.variables.D2.bottom + A , 'Hard' , Globals.font )
      this.variables.D3.anchor.setTo( .5 , 0 )
      this.variables.D3.inputEnabled = true
      this.variables.D3.input.useHandCursor = true
      this.variables.D3.events.onInputDown.add( function(){
        Game.state.start( 'Game' , true , false , 40 , false )
        } , this )
    this.variables.D4 = Game.add.text( Game.world.centerX , this.variables.D3.bottom + A , 'Challenge' , Globals.font )
      this.variables.D4.anchor.setTo( .5 , 0 )
      this.variables.D4.inputEnabled = true
      this.variables.D4.input.useHandCursor = true
      this.variables.D4.events.onInputDown.add( function(){
        Game.state.start( 'Game' , true , false , 5 , true )
        } , this )
    },
  update: function(){},
  render: function(){},
  paused: function(){},
  resize: function(){},
  shutdown: function(){},
  }

States.Game.prototype = {
  variables: {},
  init: function( size , infinite ){
    this.time.reset()

    this.variables.size = size

    this.variables.infinite = infinite

    this.variables.timer = {
      pause: 0,
      resume: true,
      start: Math.max( Math.pow( this.variables.size , 2 ) * .5 , infinite ? 0 : 60 ),
      }

    this.variables.x = Math.max( Math.ceil( document.querySelector( 'Canvas' ).offsetWidth  / 80 ) , this.variables.size )
    this.variables.y = Math.max( Math.ceil( document.querySelector( 'Canvas' ).offsetHeight / 80 ) , this.variables.size + 1 )

    this.variables.ox = Math.floor( ( this.variables.x - this.variables.size ) / 2 )
    this.variables.oy = Math.floor( ( this.variables.y - this.variables.size ) / 2 ) || 1
    },
  preload: function(){
    Game.load.image( 'Maze' , 'Images/Maze.png' )
    Game.load.image( 'Player' , 'Images/Player.png' )
    Game.load.spritesheet( 'Items' , 'Images/Items.png' , 40 , 40 , 4 )
    },
  create: function(){
    var that = this
    function CreateBase(){
      Game.physics.startSystem( Phaser.Physics.ARCADE )
      Game.stage.backgroundColor = '#000000'

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
      var A = Game.make.sprite( Game.width * .02 + 10 , 20 , 'Items' , 0 )
        A.anchor.set( .5 )
        A.scale.set( .5 )
        A.tint = 0x000000
        that.variables.infobar.add( A )
      var A = Game.make.sprite( Game.width * .04 + 30 , 20 , 'Items' , 1 )
        A.anchor.set( .5 )
        A.scale.set( .5 )
        A.tint = 0x000000
        that.variables.infobar.add( A )
      var A = Game.make.sprite( Game.width * .06 + 50 , 20 , 'Items' , 2 )
        A.anchor.set( .5 )
        A.scale.set( .5 )
        A.tint = 0x000000
        that.variables.infobar.add( A )
      var A = Game.make.sprite( Game.width * .08 + 70 , 20 , 'Items' , 3 )
        A.anchor.set( .5 )
        A.scale.set( .5 )
        A.tint = 0x000000
        that.variables.infobar.add( A )
      that.variables.time = Game.make.text( that.variables.infobar.width - 5 , 20 , 'Timer' , { font: '20px Arial' , fill: '#000' } )
        that.variables.time.anchor.set( 1 , .5 )
        that.variables.infobar.add( that.variables.time )
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
    if( this.variables.size * 40 + 40 < Game.height ) Game.camera.bounds.setTo( 0, 0, Game.world.width , Game.height )
    },
  update: function(){
    if( !this.variables.timer.resume ){
      this.variables.timer.resume = true
      this.variables.timer.pause += this.time.pauseDuration * .001
      }
    var A = Math.ceil( this.variables.timer.start - this.time.totalElapsedSeconds() + this.variables.timer.pause )
    this.variables.time.setText( Math.floor( A / 60 ) + ':' + ( '00' + A % 60 ).slice( -2 ) )
    if( A <= 0 ) Game.state.start( 'End' , true , false , false , this.variables.infinite , this.variables.size )

    Game.physics.arcade.collide( this.variables.player , this.variables.mazelayer )
    Game.physics.arcade.overlap( this.variables.player , this.variables.items , function( player , item ){
      item.body.enable = false
      this.variables.infobar.add( item )
      item.position.set( item.x - Game.camera.x , item.y - Game.camera.y )
      Game.make.tween( item ).to( { x: this.variables.infobar.children[ item.frame + 1 ].x , y: this.variables.infobar.children[ item.frame + 1 ].y } , 1000 , Phaser.Easing.Linear.None , true ).onComplete.add( function(){
        this.variables.infobar.add( item )
        if( this.variables.items.children.length == 0 ) Game.state.start( 'End' , true , false , true , this.variables.infinite , this.variables.size )
        } , this )
      } , null , this  )

    this.variables.player.body.velocity.x = 0
    this.variables.player.body.velocity.y = 0

    var Speed = 150
    var Angle = []


    if( !true && Game.input.mousePointer.isDown ){
      console.log( 'this' )
      Game.physics.arcade.moveToPointer( this.variables.player , 200 )
      console.log( this.variables.player.body.rotation )
      }
    else{
      if( this.variables.cursors.right.isDown ) this.variables.player.body.velocity.x += +Speed
      if( this.variables.cursors.down .isDown ) this.variables.player.body.velocity.y += +Speed
      if( this.variables.cursors.left .isDown ) this.variables.player.body.velocity.x += -Speed
      if( this.variables.cursors.up   .isDown ) this.variables.player.body.velocity.y += -Speed

      if( this.variables.cursors.right.isDown ) Angle.push( 0.5 )
      if( this.variables.cursors.down .isDown ) Angle.push( 1.0 )
      if( this.variables.cursors.left .isDown ) Angle.push( 1.5 )
      if( this.variables.cursors.up   .isDown ) Angle.push( 2.0 )
      this.variables.angle = Math.PI * ( eval( Angle.join( '+' ) ) / Angle.length ) || this.variables.angle || 0
      this.variables.player.rotation = this.variables.angle
      }
    },
  render: function(){
    if( Debug ){
      Game.debug.body( this.variables.player )
      Game.debug.bodyInfo( this.variables.player )
      for( var a = 0 ; a < this.variables.items.children.length ; a++ ) Game.debug.body( this.variables.items.children[ a ] )
      }
    },
  paused: function(){
    this.variables.timer.resume = false
    },
  resize: function(){},
  shutdown: function(){},
  }

States.End.prototype = {
  variables: {},
  init: function( win , infinite , size ){
    Game.world.setBounds( 0 , 0 , Game.width , Game.height )
    this.variables.win = win || false
    this.variables.infinite = infinite || false
    if( infinite ){
      this.variables.size = size <= 25 ? size + 10 : size <= 40 ? size + 5 : size + 2
      this.variables.text = win ? 'Congratulations.\nClick to continue on to the next maze.' : 'You reached a ' + size  + 'x' + size + 'maze.'
      }
    else{
      this.variables.text = win ? 'You win.' : 'You have FAILED this city!'
      }
    },
  preload: function(){},
  create: function(){
    this.variables.text = Game.add.text( Game.world.centerX , Game.world.centerY , this.variables.text , Globals.font )
    this.variables.text.anchor.setTo( .5 )
    this.variables.text.inputEnabled = true
    this.variables.text.input.useHandCursor = true
    this.variables.text.events.onInputDown.add( function(){
      console.log( this.variables )
      if( this.variables.win && this.variables.infinite ) Game.state.start( 'Game' , true , false , this.variables.size , true )
      else Game.state.start( 'Title' )
      } , this )
    },
  update: function(){},
  render: function(){},
  paused: function(){},
  resize: function(){},
  shutdown: function(){},
  }

States.New.prototype = {
  variables: {},
  init: function(){},
  preload: function(){},
  create: function(){},
  update: function(){},
  render: function(){},
  paused: function(){},
  resize: function(){},
  shutdown: function(){},
  }

Game.state.add( 'Title' , States.Title )
Game.state.add( 'Mode' , States.Mode )
Game.state.add( 'Game' , States.Game )
Game.state.add( 'End' , States.End )
Game.state.add( 'New' , States.New )
Game.state.start( 'Title' )