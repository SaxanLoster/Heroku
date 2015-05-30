function MazeCompact( W , H ){

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

  return Convert()
  }

function MazeExpanded( Size ){

  function Cell( x , y ){
    this.x = x
    this.y = y
    }

  var Cells = []
  var Walls = []
  var c = 0
  for( var a = 0 ; a < Size ; a++ ){
    Cells[ a ] = []
    for( var b = 0 ; b < Size ; b++ ){
      Cells[ a ][ b ] = new Cell( a , b )
      if( a % 2 == 1 && b % 2 == 1 ){
        Cells[ a ][ b ].v = 1
        Cells[ a ][ b ].l = c
        c++
        }
      else{
        Cells[ a ][ b ].v = 0
        if( !( a == 0 || b == 0 || a == Size - 1 || b == Size - 1 ) && !( a % 2 == 0 && b % 2 == 0 ) ) Walls.push( [ a , b ] )
        }
      }
    }
  while( Walls.length > 0 ){
    var Test = Walls.splice( Math.floor( Math.random() * Walls.length ) , 1 )[ 0 ]
    if( Test[ 0 ] % 2 == 1 ){
      if( Cells[ Test[ 0 ] ][ Test[ 1 ] - 1 ].l != Cells[ Test[ 0 ] ][ Test[ 1 ] + 1 ].l ){
        Cells[ Test[ 0 ] ][ Test[ 1 ] ].v = 1
        var A = Cells[ Test[ 0 ] ][ Test[ 1 ] + 1 ].l
        Cells[ Test[ 0 ] ][ Test[ 1 ] ].l = Cells[ Test[ 0 ] ][ Test[ 1 ] - 1 ].l
        for( var a = 0 ; a < Cells.length ; a++ ){
          for( var b = 0 ; b < Cells[ a ].length ; b++ ){
            if( Cells[ a ][ b ].l == A ) Cells[ a ][ b ].l = Cells[ Test[ 0 ] ][ Test[ 1 ] - 1 ].l
            }
          }
        }
      }
    else{
      if( Cells[ Test[ 0 ] - 1 ][ Test[ 1 ] ].l != Cells[ Test[ 0 ] + 1 ][ Test[ 1 ] ].l ){
        Cells[ Test[ 0 ] ][ Test[ 1 ] ].v = 1
        var A = Cells[ Test[ 0 ] + 1 ][ Test[ 1 ] ].l
        Cells[ Test[ 0 ] ][ Test[ 1 ] ].l = Cells[ Test[ 0 ] - 1 ][ Test[ 1 ] ].l
        for( var a = 0 ; a < Cells.length ; a++ ){
          for( var b = 0 ; b < Cells[ a ].length ; b++ ){
            if( Cells[ a ][ b ].l == A ) Cells[ a ][ b ].l = Cells[ Test[ 0 ] - 1 ][ Test[ 1 ] ].l
            }
          }
        }
      }
    }

  function Convert(){
    var NewCells = []
    for( var a = 0 ; a < Cells.length ; a++ ){
      NewCells[ a ] = []
      for( var b = 0 ; b < Cells[ a ].length ; b++ ){
        var A = 0
        if( Cells[ a ][ b ].v == 0 ) NewCells[ a ][ b ] = 0
        else{
          if( Cells[ a + 0 ][ b - 1 ].v != 0 ) A += 1
          if( Cells[ a + 1 ][ b + 0 ].v != 0 ) A += 2
          if( Cells[ a + 0 ][ b + 1 ].v != 0 ) A += 4
          if( Cells[ a - 1 ][ b + 0 ].v != 0 ) A += 8
          NewCells[ a ][ b ] = A
          }
        }
      }
    return NewCells
    }

  return Convert()
  }