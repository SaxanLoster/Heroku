var Maze = BraidedGrowingTree

function PerfectKruskal( Size ){

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

function BraidedKruskal( Size ){

  function Cell( x , y ){
    this.x = x
    this.y = y
    }

  function CheckNeighbors( Cell ){

    }

  var Maze = []
  var Walls1 = []
  var Walls2 = []
  var c = 0
  for( var a = 0 ; a < Size ; a++ ){
    Maze[ a ] = []
    for( var b = 0 ; b < Size ; b++ ){
      Maze[ a ][ b ] = new Cell( a , b )
      if( a % 2 == 1 && b % 2 == 1 ){
        Maze[ a ][ b ].v = 1
        Maze[ a ][ b ].l = c
        c++
        }
      else{
        Maze[ a ][ b ].v = 0
        if( !( a == 0 || b == 0 || a == Size - 1 || b == Size - 1 )/* && !( a % 2 == 0 && b % 2 == 0 ) */) Walls1.push( [ a , b ] )
        }
      }
    }
  while( Walls1.length > 0 ){
    var Cell = Walls1.splice( Math.floor( Math.random() * Walls1.length ) , 1 )[ 0 ]
    Walls2.push( Cell )
    if( Cell[ 0 ] % 2 == 0 && Cell[ 1 ] % 2 == 0 ){
      // if( Maze[ Cell[ 0 ] ][ Cell[ 1 ] - 1 ].l != Maze[ Cell[ 0 ] ][ Cell[ 1 ] + 1 ].l ){
      //   Maze[ Cell[ 0 ] ][ Cell[ 1 ] ].v = 1
      //   var A = Maze[ Cell[ 0 ] ][ Cell[ 1 ] + 1 ].l
      //   Maze[ Cell[ 0 ] ][ Cell[ 1 ] ].l = Maze[ Cell[ 0 ] ][ Cell[ 1 ] - 1 ].l
      //   for( var a = 0 ; a < Maze.length ; a++ ){
      //     for( var b = 0 ; b < Maze[ a ].length ; b++ ){
      //       if( Maze[ a ][ b ].l == A ) Maze[ a ][ b ].l = Maze[ Cell[ 0 ] ][ Cell[ 1 ] - 1 ].l
      //       }
      //     }
      //   }
      }
    else if( Cell[ 0 ] % 2 == 1 ){
      if( Maze[ Cell[ 0 ] ][ Cell[ 1 ] - 1 ].l != Maze[ Cell[ 0 ] ][ Cell[ 1 ] + 1 ].l ){
        Maze[ Cell[ 0 ] ][ Cell[ 1 ] ].v = 1
        var A = Maze[ Cell[ 0 ] ][ Cell[ 1 ] + 1 ].l
        Maze[ Cell[ 0 ] ][ Cell[ 1 ] ].l = Maze[ Cell[ 0 ] ][ Cell[ 1 ] - 1 ].l
        for( var a = 0 ; a < Maze.length ; a++ ){
          for( var b = 0 ; b < Maze[ a ].length ; b++ ){
            if( Maze[ a ][ b ].l == A ) Maze[ a ][ b ].l = Maze[ Cell[ 0 ] ][ Cell[ 1 ] - 1 ].l
            }
          }
        }
      }
    else{
      if( Maze[ Cell[ 0 ] - 1 ][ Cell[ 1 ] ].l != Maze[ Cell[ 0 ] + 1 ][ Cell[ 1 ] ].l ){
        Maze[ Cell[ 0 ] ][ Cell[ 1 ] ].v = 1
        var A = Maze[ Cell[ 0 ] + 1 ][ Cell[ 1 ] ].l
        Maze[ Cell[ 0 ] ][ Cell[ 1 ] ].l = Maze[ Cell[ 0 ] - 1 ][ Cell[ 1 ] ].l
        for( var a = 0 ; a < Maze.length ; a++ ){
          for( var b = 0 ; b < Maze[ a ].length ; b++ ){
            if( Maze[ a ][ b ].l == A ) Maze[ a ][ b ].l = Maze[ Cell[ 0 ] - 1 ][ Cell[ 1 ] ].l
            }
          }
        }
      }
    }
  while( !true && Walls2.length > 0 ){
    var Cell = Walls2.splice( Math.floor( Math.random() * Walls2.length ) , 1 )[ 0 ]
    if( Math.random() < .1 ){
      if( Cell[ 0 ] % 2 == 1 ){
        Maze[ Cell[ 0 ] ][ Cell[ 1 ] ].v = 1
        var A = Maze[ Cell[ 0 ] ][ Cell[ 1 ] + 1 ].l
        Maze[ Cell[ 0 ] ][ Cell[ 1 ] ].l = Maze[ Cell[ 0 ] ][ Cell[ 1 ] - 1 ].l
        for( var a = 0 ; a < Maze.length ; a++ ){
          for( var b = 0 ; b < Maze[ a ].length ; b++ ){
            if( Maze[ a ][ b ].l == A ) Maze[ a ][ b ].l = Maze[ Cell[ 0 ] ][ Cell[ 1 ] - 1 ].l
            }
          }
        }
      else{
        Maze[ Cell[ 0 ] ][ Cell[ 1 ] ].v = 1
        var A = Maze[ Cell[ 0 ] + 1 ][ Cell[ 1 ] ].l
        Maze[ Cell[ 0 ] ][ Cell[ 1 ] ].l = Maze[ Cell[ 0 ] - 1 ][ Cell[ 1 ] ].l
        for( var a = 0 ; a < Maze.length ; a++ ){
          for( var b = 0 ; b < Maze[ a ].length ; b++ ){
            if( Maze[ a ][ b ].l == A ) Maze[ a ][ b ].l = Maze[ Cell[ 0 ] - 1 ][ Cell[ 1 ] ].l
            }
          }
        }
      }
    }

  function Convert(){
    var NewMaze = []
    for( var a = 0 ; a < Maze.length ; a++ ){
      NewMaze[ a ] = []
      for( var b = 0 ; b < Maze[ a ].length ; b++ ){
        var A = 0
        if( Maze[ a ][ b ].v == 0 ) NewMaze[ a ][ b ] = 0
        else{
          if( Maze[ a + 0 ][ b - 1 ].v != 0 ) A += 1
          if( Maze[ a + 1 ][ b + 0 ].v != 0 ) A += 2
          if( Maze[ a + 0 ][ b + 1 ].v != 0 ) A += 4
          if( Maze[ a - 1 ][ b + 0 ].v != 0 ) A += 8
          NewMaze[ a ][ b ] = A
          }
        }
      }
    return NewMaze
    }

  return Convert()
  }

function PerfectGrowingTree( Size ){
  function MakeCell( x , y ){
    return { x: x , y: y , v: 0 }
    }
  function GetCell( Type ){
    if( !Type ) var Type = Math.floor( Math.random() * 4 ) + 1
    switch( Type ){
      case 1 : return Cells[ Math.floor( Math.random() * Cells.length ) ]
      case 2 : return Cells[ 0 ]
      case 3 : return Cells[ Math.round( ( Cells.length - 1 ) / 2 + ( Math.random() - .5 ) ) ]
      case 4 : return Cells[ Cells.length - 1 ]
      }
    }
  function GetNeighbors( A ){
    var B = []
    if( A.x > 2        && Maze[ A.x - 2 ][ A.y ].v == 0 && Maze[ A.x - 2 ][ A.y ].w == 0 ) B.push( Maze[ A.x - 2 ][ A.y ] )
    if( A.x < Size - 3 && Maze[ A.x + 2 ][ A.y ].v == 0 && Maze[ A.x + 2 ][ A.y ].w == 0 ) B.push( Maze[ A.x + 2 ][ A.y ] )
    if( A.y > 2        && Maze[ A.x ][ A.y - 2 ].v == 0 && Maze[ A.x ][ A.y - 2 ].w == 0 ) B.push( Maze[ A.x ][ A.y - 2 ] )
    if( A.y < Size - 3 && Maze[ A.x ][ A.y + 2 ].v == 0 && Maze[ A.x ][ A.y + 2 ].w == 0 ) B.push( Maze[ A.x ][ A.y + 2 ] )
    return B
    }
  function CarvePath( From , To ){
    if( Maze[ ( From.x + To.x ) / 2 ][ ( From.y + To.y ) / 2 ].v == 0 ){
      Maze[ ( From.x + To.x ) / 2 ][ ( From.y + To.y ) / 2 ].v = 1
      Maze[ ( From.x + To.x ) / 2 ][ ( From.y + To.y ) / 2 ].w = 0
      Cells.push( Maze[ ( From.x + To.x ) / 2 ][ ( From.y + To.y ) / 2 ] )
      }
    Maze[ To.x ][ To.y ].v = 1
    Maze[ To.x ][ To.y ].w = 0
    Cells.push( Maze[ To.x ][ To.y ] )
    }
  function Convert(){
    var NewMaze = []
    for( var a = 0 ; a < Maze.length ; a++ ){
      NewMaze[ a ] = []
      for( var b = 0 ; b < Maze[ a ].length ; b++ ){
        var A = 0
        if( Maze[ a ][ b ].w == 1 ) NewMaze[ a ][ b ] = 0
        else{
          if( Maze[ a + 0 ][ b - 1 ].w == 0 ) A += 1
          if( Maze[ a + 1 ][ b + 0 ].w == 0 ) A += 2
          if( Maze[ a + 0 ][ b + 1 ].w == 0 ) A += 4
          if( Maze[ a - 1 ][ b + 0 ].w == 0 ) A += 8
          NewMaze[ a ][ b ] = A
          }
        }
      }
    return NewMaze
    }
  var Maze = []
  var Paths = []
  var Cells = []
  for( var a = 0 ; a < Size ; a++ ){
    Maze[ a ] = []
    for( var b = 0 ; b < Size ; b++ ){
      Maze[ a ][ b ] = MakeCell( a , b )
      if( a % 2 == 1 && b % 2 == 1 ){
        Maze[ a ][ b ].w = 0
        Paths.push( Maze[ a ][ b ] )
        }
      else{
        Maze[ a ][ b ].w = 1
        }
      }
    }
  Cells.push( Paths[ Math.floor( Math.random() * Paths.length ) ] )
  Cells[ 0 ].v = 1
  while( Cells.length > 0 ){
    var Cell = GetCell()
    var Neighbors = GetNeighbors( Cell )
    if( Neighbors.length == 0 ) Cells.splice( Cells.indexOf( Cell ) , 1 )
    else CarvePath( Cell , Neighbors[ Math.floor( Math.random() * Neighbors.length ) ] )
    }
  return Convert()
  }

function BraidedGrowingTree( Size ){
  function AStar( Start , Goal ){
    for( var a = 0 ; a < Size ; a++ ){
      for( var b = 0 ; b < Size ; b++ ){
        Maze[ a ][ b ].f = null
        Maze[ a ][ b ].v = !true
        Maze[ a ][ b ].d = 0
        }
      }
    var Min = 50
    Start.v = true
    var Cells = [ Start ]
    var Cell
    while( Cells.length > 0 ){
      Cell = Cells.shift()
      if( Cell == Goal || Cell.d >= Min ) break
      if( Cell.x > 0        && Maze[ Cell.x - 1 ][ Cell.y - 0 ].w == 0 && Maze[ Cell.x - 1 ][ Cell.y - 0 ].v == !true ){
        Cells.push( Maze[ Cell.x - 1 ][ Cell.y - 0 ] )
        Maze[ Cell.x - 1 ][ Cell.y - 0 ].f = Cell
        Maze[ Cell.x - 1 ][ Cell.y - 0 ].v = true
        Maze[ Cell.x - 1 ][ Cell.y - 0 ].d = Cell.d + 1
        }
      if( Cell.x < Size - 1 && Maze[ Cell.x + 1 ][ Cell.y + 0 ].w == 0 && Maze[ Cell.x + 1 ][ Cell.y + 0 ].v == !true ){
        Cells.push( Maze[ Cell.x + 1 ][ Cell.y + 0 ] )
        Maze[ Cell.x + 1 ][ Cell.y + 0 ].f = Cell
        Maze[ Cell.x + 1 ][ Cell.y + 0 ].v = true
        Maze[ Cell.x + 1 ][ Cell.y + 0 ].d = Cell.d + 1
        }
      if( Cell.y > 0        && Maze[ Cell.x - 0 ][ Cell.y - 1 ].w == 0 && Maze[ Cell.x - 0 ][ Cell.y - 1 ].v == !true ){
        Cells.push( Maze[ Cell.x - 0 ][ Cell.y - 1 ] )
        Maze[ Cell.x - 0 ][ Cell.y - 1 ].f = Cell
        Maze[ Cell.x - 0 ][ Cell.y - 1 ].v = true
        Maze[ Cell.x - 0 ][ Cell.y - 1 ].d = Cell.d + 1
        }
      if( Cell.y < Size - 1 && Maze[ Cell.x + 0 ][ Cell.y + 1 ].w == 0 && Maze[ Cell.x + 0 ][ Cell.y + 1 ].v == !true ){
        Cells.push( Maze[ Cell.x + 0 ][ Cell.y + 1 ] )
        Maze[ Cell.x + 0 ][ Cell.y + 1 ].f = Cell
        Maze[ Cell.x + 0 ][ Cell.y + 1 ].v = true
        Maze[ Cell.x + 0 ][ Cell.y + 1 ].d = Cell.d + 1
        }
      }
    // if( Cell.d >= Min ) console.log( ( Start.x + Goal.x ) / 2 , ( Start.y + Goal.y ) / 2 )
    return Cell.d >= Min
    }
  function CarvePath( From , To ){
    if( Maze[ ( From.x + To.x ) / 2 ][ ( From.y + To.y ) / 2 ].v == 0 ){
      Maze[ ( From.x + To.x ) / 2 ][ ( From.y + To.y ) / 2 ].v = true
      Maze[ ( From.x + To.x ) / 2 ][ ( From.y + To.y ) / 2 ].w = 0
      Cells.push( Maze[ ( From.x + To.x ) / 2 ][ ( From.y + To.y ) / 2 ] )
      }
    Maze[ To.x ][ To.y ].v = true
    Maze[ To.x ][ To.y ].w = 0
    Cells.push( Maze[ To.x ][ To.y ] )
    }
  function Convert(){
    var NewMaze = []
    for( var a = 0 ; a < Maze.length ; a++ ){
      NewMaze[ a ] = []
      for( var b = 0 ; b < Maze[ a ].length ; b++ ){
        var A = 0
        if( Maze[ a ][ b ].w == 1 ) NewMaze[ a ][ b ] = 0
        else{
          if( Maze[ a + 0 ][ b - 1 ].w == 0 ) A += 1
          if( Maze[ a + 1 ][ b + 0 ].w == 0 ) A += 2
          if( Maze[ a + 0 ][ b + 1 ].w == 0 ) A += 4
          if( Maze[ a - 1 ][ b + 0 ].w == 0 ) A += 8
          NewMaze[ a ][ b ] = A
          }
        }
      }
    return NewMaze
    }
  function GetCell( Group , Types ){
    if( !Types ) var Types = [ 1 , 2 , 3 , 4 ]
    if( Types == 0 ) Types = [ 1 , 2 , 3 , 4 ]
    var Mode = typeof Types == 'number' ? Types : Types[ Math.floor( Math.random() * Types.length ) ]
    switch( Mode ){
      case 1 : return Group[ Math.floor( Math.random() * Group.length ) ]
      case 2 : return Group[ 0 ]
      case 3 : return Group[ Math.round( ( Group.length - 1 ) / 2 + ( Math.random() - .5 ) ) ]
      case 4 : return Group[ Group.length - 1 ]
      }
    }
  function GetNeighbors( A ){
    var B = []
    if( A.x > 2        && Maze[ A.x - 2 ][ A.y ].v == !true && Maze[ A.x - 2 ][ A.y ].w == 0 ) B.push( Maze[ A.x - 2 ][ A.y ] )
    if( A.x < Size - 3 && Maze[ A.x + 2 ][ A.y ].v == !true && Maze[ A.x + 2 ][ A.y ].w == 0 ) B.push( Maze[ A.x + 2 ][ A.y ] )
    if( A.y > 2        && Maze[ A.x ][ A.y - 2 ].v == !true && Maze[ A.x ][ A.y - 2 ].w == 0 ) B.push( Maze[ A.x ][ A.y - 2 ] )
    if( A.y < Size - 3 && Maze[ A.x ][ A.y + 2 ].v == !true && Maze[ A.x ][ A.y + 2 ].w == 0 ) B.push( Maze[ A.x ][ A.y + 2 ] )
    return B
    }
  function MakeCell( x , y ){
    return { x: x , y: y , v: !true }
    }
  var Maze = []
  var Paths = []
  var Cells = []
  var Walls = []
  for( var a = 0 ; a < Size ; a++ ){
    Maze[ a ] = []
    for( var b = 0 ; b < Size ; b++ ){
      Maze[ a ][ b ] = MakeCell( a , b )
      if( a % 2 == 1 && b % 2 == 1 ){
        Maze[ a ][ b ].w = 0
        Paths.push( Maze[ a ][ b ] )
        }
      else{
        Maze[ a ][ b ].w = 1
        }
      }
    }
  Cells.push( Paths[ Math.floor( Math.random() * Paths.length ) ] )
  Cells[ 0 ].v = 1
  while( Cells.length > 0 ){
    var Cell = GetCell( Cells , [ 2 , 3 , 3 , 4 ] )
    var Neighbors = GetNeighbors( Cell )
    if( Neighbors.length == 0 ) Cells.splice( Cells.indexOf( Cell ) , 1 )
    else CarvePath( Cell , Neighbors[ Math.floor( Math.random() * Neighbors.length ) ] )
    }
  if( Size >= 15 ){
    for( var a = 0 ; a < Size ; a++ ){
      for( var b = 0 ; b < Size ; b++ ){
        if( Maze[ a ][ b ].w == 1 ) Walls.push( Maze[ a ][ b ] )
        }
      }
    while( Walls.length > 0 ){
      var Cell = GetCell( Walls , 0 )
      if( Cell.x > 0 && Cell.x < Size - 1 && Cell.y > 0 && Cell.y < Size - 1 ){
        if( Math.random() < .05 ){
          if( Maze[ Cell.x - 1 ][ Cell.y ].w == 0 && Maze[ Cell.x + 1 ][ Cell.y ].w == 0 && Maze[ Cell.x ][ Cell.y - 1 ].w == 1 && Maze[ Cell.x ][ Cell.y + 1 ].w == 1 ){
            if( AStar( Maze[ Cell.x - 1 ][ Cell.y ] , Maze[ Cell.x + 1 ][ Cell.y ] ) ) CarvePath( Maze[ Cell.x - 1 ][ Cell.y ] , Maze[ Cell.x + 1 ][ Cell.y ] )
            }
          if( Maze[ Cell.x ][ Cell.y - 1 ].w == 0 && Maze[ Cell.x ][ Cell.y + 1 ].w == 0 && Maze[ Cell.x - 1 ][ Cell.y ].w == 1 && Maze[ Cell.x + 1 ][ Cell.y ].w == 1 ){
            if( AStar( Maze[ Cell.x ][ Cell.y - 1 ] , Maze[ Cell.x ][ Cell.y + 1 ] ) ) CarvePath( Maze[ Cell.x ][ Cell.y - 1 ] , Maze[ Cell.x ][ Cell.y + 1 ] )
            }
          }
        }
      Walls.splice( Walls.indexOf( Cell ) , 1 )
      }
    }
  return Convert()
  }
