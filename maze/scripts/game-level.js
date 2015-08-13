function GetLevelData( level ){
  var data = {}
  switch( level ){
    case  1 :
      data.gems = 2
      data.size = 5
      data.time = 5
      // break
    case  1 :
      data.gems = 1
      data.size = 7
      data.time = 10
      break
    case  2 :
      data.gems = 1
      data.size = 11
      data.time = 15
      break
    case  3 :
      data.gems = 2
      data.size = 11
      data.time = 20
      break
    case  4 :
      data.gems = 2
      data.size = 15
      data.time = 27
      break
    case  5 :
      data.gems = 3
      data.size = 15
      data.time = 34
      break
    case  6 :
      data.gems = 3
      data.size = 19
      data.time = 43
      break
    case  7 :
      data.gems = 4
      data.size = 19
      data.time = 54
      break
    case  8 :
      data.gems = 4
      data.size = 23
      data.time = 65
      break
    case  9 :
      data.gems = 5
      data.size = 23
      data.time = 76
      break
    case 10 :
      data.gems = 5
      data.size = 27
      data.time = 89
      break
    case 11 :
      data.gems = 6
      data.size = 27
      data.time = 102
      break
    case 12 :
      data.gems = 6
      data.size = 31
      data.time = 117
      break
    case 13 :
      data.gems = 7
      data.size = 31
      data.time = 132
      break
    case 14 :
      data.gems = 7
      data.size = 35
      data.time = 149
      break
    case 15 :
      data.gems = 8
      data.size = 35
      data.time = 166
      break
    case 16 :
      data.gems = 8
      data.size = 39
      data.time = 185
      break
    case 17 :
      data.gems = 8
      data.size = 43
      data.time = 240
      break
    case 18 :
      data.gems = 8
      data.size = 45
      data.time = 280
      break
    case 19 :
      data.gems = 8
      data.size = 47
      data.time = 320
      break
    case 20 :
      data.gems = 8
      data.size = 49
      data.time = 360
      break
    default :
      data.gems = 8
      data.size = 49
      data.time = 360 - ( level - 20 ) * 30
      break
    }
  return data
  }