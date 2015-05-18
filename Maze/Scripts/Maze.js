function Maze( W , H ){

  function Cell( X , Y ){
    this.X = X
    this.Y = Y
    this.V = false
    this.W = {
      U: true,
      R: true,
      D: true,
      L: true,
      }
    }

  function GetOptions( C , W ){
    var Options = []

    function CheckOption( X , Y ){
      if( W ){
        var a = ( C.W.D && X > C.Y )
        var b = ( C.W.L && Y < C.X )
        var c = ( C.W.R && Y > C.X )
        var d = ( C.W.U && X < C.Y )
        if( a || b || c || d ) return
        }
      
      if( Cells[ X ] && Cells[ X ][ Y ] && !Cells[ X ][ Y ].V ) Options.push( Cells[ X ][ Y ] )
      }

    CheckOption( C.X     , C.Y - 1 )
    CheckOption( C.X     , C.Y + 1 )
    CheckOption( C.X - 1 , C.Y     )
    CheckOption( C.X + 1 , C.Y     )

    return Options

    }

  function VisitCell( C , D ){
    C.V = true
    if( D ) C.W[ D ] = false

    var O = GetOptions( C )

    while( O.length > 0 ){
      var N = O[ Math.floor( Math.random() * O.length ) ]
      switch( true ){
        case ( C.Y < N.Y ) :
          C.W.D = false
          VisitCell( N , 'U' )
          break
        case ( C.X > N.X ) :
          C.W.L = false
          VisitCell( N , 'R' )
          break
        case ( C.X < N.X ) :
          C.W.R = false
          VisitCell( N , 'L' )
          break
        case ( C.Y > N.Y ) :
          C.W.U = false
          VisitCell( N , 'D' )
          break
        }
        O = GetOptions( C )
      }

    }

  function Convert(){
    var NewCells = []
    for( var a = 0 ; a < Cells.length ; a++ ){
      NewCells[ a ] = []
      for( var b = 0 ; b < Cells[ a ].length ; b++ ){
        var A = 0
        if( !Cells[ a ][ b ].W.U ) A += 1
        if( !Cells[ a ][ b ].W.R ) A += 2
        if( !Cells[ a ][ b ].W.D ) A += 4
        if( !Cells[ a ][ b ].W.L ) A += 8
        NewCells[ a ].push( A )
        }
      }
    return NewCells
    }

  var Cells = []

  for( var x = 0 ; x < W ; x++ ){
    Cells[ x ] = []
    for( var y = 0 ; y < H ; y++ ){
      Cells[ x ][ y ] = new Cell( x , y )
      }
    }

  VisitCell( Cells[ Math.floor( Math.random() * W ) ][ Math.floor( Math.random() * H ) ] )

  return [ Cells , Convert() ]
  }