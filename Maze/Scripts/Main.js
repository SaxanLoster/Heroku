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