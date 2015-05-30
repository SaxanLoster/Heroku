var States = {
  Template: function(){},
  Boot: function(){},
  Main: function(){},
  Game: function(){},
  Over: function(){},
  }

States.Template.prototype = {
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

// add flags
// cycles
// more gems
// show gem on loss
// end screen info
// player animation
// early gem stacking
// timer length
// keyboard continue