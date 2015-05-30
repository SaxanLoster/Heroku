function GetLevelData1( Level ){
  var Data = {
    gems: 1,
    size: 7,
    time: 5,
    }
  if( Level > 1 ){
    Data.gems ++
    Data.time += 5
    }
  if( Level > 2 ){
    Data.size += 4
    Data.time += 5
    }
  if( Level > 3 ){
    Data.gems ++
    Data.time += 5
    }
  if( Level > 4 ){
    Data.size += 4
    Data.time += 10
    }
  if( Level > 5 ){
    Data.gems ++
    Data.time += 10
    }
  if( Level > 6 ){
    Data.size += Math.min( 24 , ( Level - 6 ) * 4 )
    Data.time += Math.min( 360 , ( Level - 6 ) * 30 )
    }
  if( Level > 12 ){
    Data.size += Math.min( 12 , ( Level - 12 ) * 2 )
    Data.time += Math.min( 360 , ( Level - 12 ) * 30 )
    }
  return Data
  }
function GetLevelData( Level ){
  var Data = {}
  if( Level >= 45 ){
    Data.gems = 4
    Data.size = 51
    Data.time = 60 - ( Level - 44 ) * 5
    }
  else if( Level >= 29 ){
    Data.gems = 4
    Data.size = 51
    Data.time = 300 - ( Level - 28 ) * 15
    }
  else if( Level >= 19 ){
    Data.gems = 4
    Data.size = 51
    Data.time = 600 - ( Level - 18 ) * 30
    }
  else if( Level >= 13 ){
    Data.gems = 4
    Data.size = 39 + ( Level - 12 ) * 2
    Data.time = 360 + ( Level - 12 ) * 40
    }
  else if( Level >= 7 ){
    Data.gems = 4
    Data.size = 19 + ( Level - 7 ) * 4
    Data.time = 120 + ( Level - 6 ) * 40
    }
  else if( Level >= 6 ){
    Data.gems = 3
    Data.size = 19
    Data.time = 120
    }
  else if( Level >= 5 ){
    Data.gems = 3
    Data.size = 15
    Data.time = 90
    }
  else if( Level >= 4 ){
    Data.gems = 2
    Data.size = 15
    Data.time = 60
    }
  else if( Level >= 3 ){
    Data.gems = 2
    Data.size = 11
    Data.time = 40
    }
  else if( Level >= 2 ){
    Data.gems = 1
    Data.size = 11
    Data.time = 20
    }
  else {
    Data.gems = 1
    Data.size = 7
    Data.time = 10
    }
  return Data
  }