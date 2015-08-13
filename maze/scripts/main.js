var states = {
  template: function(){},
  boot: function(){},
  title: function(){},
  game: function(){},
  over: function(){},
  }

states.template.prototype = {
  init: function(){},
  preload: function(){},
  create: function(){},
  update: function(){},
  render: function(){},
  paused: function(){},
  resumed: function(){},
  resize: function(){},
  shutdown: function(){},
  }

var VERSION = '0001'

if( !localStorage.MazeGame ){
  SaxanStorage = {
    'version': VERSION,
    'highscores': {
      'life5': 0,
      'time5': 0,
      },
    }
  localStorage.MazeGame = JSON.stringify( SaxanStorage )
  }
else{
  SaxanStorage = JSON.parse( localStorage.MazeGame )
  if( SaxanStorage.version !== VERSION ){
    SaxanStorage.highscores = {
      'life5': 0,
      'time5': 0,
      }
    localStorage.MazeGame = JSON.stringify( SaxanStorage )
    }
  }

// keyboard continue
// phone dimensions
// loading bar
// local storage
// maize maze
// gemhunter
