function GetLevelData( Level ){
  var Data = {}
  switch( Level ){
    case  1 :
      Data.gems = 8
      Data.flag = 0
      Data.size = 31
      Data.time = 300
      break
    case  1 :
      Data.gems = 1
      Data.flag = 0
      Data.size = 7
      Data.time = 6
      break
    case  2 :
      Data.gems = 1
      Data.flag = 0
      Data.size = 11
      Data.time = 11
      break
    case  3 :
      Data.gems = 2
      Data.flag = 0
      Data.size = 11
      Data.time = 17
      break
    case  4 :
      Data.gems = 2
      Data.flag = 0
      Data.size = 15
      Data.time = 24
      break
    case  5 :
      Data.gems = 3
      Data.flag = 0
      Data.size = 15
      Data.time = 32
      break
    case  6 :
      Data.gems = 3
      Data.flag = 1
      Data.size = 19
      Data.time = 41
      break
    case  7 :
      Data.gems = 4
      Data.flag = 1
      Data.size = 19
      Data.time = 51
      break
    case  8 :
      Data.gems = 4
      Data.flag = 1
      Data.size = 23
      Data.time = 62
      break
    case  9 :
      Data.gems = 5
      Data.flag = 1
      Data.size = 23
      Data.time = 74
      break
    case 10 :
      Data.gems = 5
      Data.flag = 1
      Data.size = 27
      Data.time = 87
      break
    case 11 :
      Data.gems = 6
      Data.flag = 2
      Data.size = 27
      Data.time = 101
      break
    case 12 :
      Data.gems = 6
      Data.flag = 2
      Data.size = 31
      Data.time = 116
      break
    case 13 :
      Data.gems = 7
      Data.flag = 2
      Data.size = 31
      Data.time = 132
      break
    case 14 :
      Data.gems = 7
      Data.flag = 2
      Data.size = 35
      Data.time = 149
      break
    case 15 :
      Data.gems = 8
      Data.flag = 2
      Data.size = 35
      Data.time = 167
      break
    case 16 :
      Data.gems = 8
      Data.flag = 3
      Data.size = 39
      Data.time = 186
      break
    case 17 :
      Data.gems = 8
      Data.flag = 3
      Data.size = 43
      Data.time = 240
      break
    case 18 :
      Data.gems = 8
      Data.flag = 3
      Data.size = 45
      Data.time = 280
      break
    case 19 :
      Data.gems = 8
      Data.flag = 3
      Data.size = 47
      Data.time = 320
      break
    case 20 :
      Data.gems = 8
      Data.flag = 3
      Data.size = 49
      Data.time = 360
      break
    default :
      Data.gems = 8
      Data.flag = 4
      Data.size = 49
      Data.time = 360 - ( Level - 20 ) * 30
      break
    }
  return Data
  }