var state = new Phaser.State()

state.elements = {}
state.settings = {
  fontstyle1: {
    align: 'center',
    fill: '#FFF',
    font: '18px Arial',
    },
  fontstyle2: {
    align: 'center',
    fill: '#000',
    font: '32px Arial',
    stroke: '#FFF',
    strokeThickness: 5,
    },
  }

state.init = function(){
  game.scale.scaleMode = 2
  this.routines.NewDeck()
  }
state.preload = function (){
  this.load.spritesheet( 'cards' , 'images/cards.png' , 71 , 96 , 52 , 1 , 2 )
  this.load.image( 'back' , 'images/back.png' )
  }
state.create = function(){
  this.stage.backgroundColor = 0x000000
  this.elements.deck = this.add.sprite( 250 , 250 , 'back' )
    this.elements.deck.anchor.setTo( .5 , .5 )
    this.elements.deck.inputEnabled = true
  this.elements.decktext = this.add.text( 250 , 250 , '' , this.settings.fontstyle2 )
    this.elements.decktext.anchor.set( .5 )
  this.elements.cards1 = this.add.group()
    this.elements.cards1.name = 'cards1'
    this.elements.cards1.x = 250
    this.elements.cards1.y = 100
  this.elements.cards2 = this.add.group()
    this.elements.cards2.name = 'cards2'
    this.elements.cards2.x = 250
    this.elements.cards2.y = 400
  this.elements.cardtext = this.add.group()
    this.elements.cardtext.x = 250
    this.elements.cardtext.y = 25
    for( var iter1 = 0 ; iter1 < 5 ; iter1++ ){
      this.add.text( ( iter1 - 2 ) * 75 , 0 , '' , this.settings.fontstyle1 , this.elements.cardtext )
        this.elements.cardtext.children[ this.elements.cardtext.total - 1 ].anchor.set( .5 )
      }
  this.routines.PlayPhase1()
  }

state.routines = {
  PlayPhase1: function(){
    this.elements.decktext.text = 'Deal'
    this.elements.cards1.removeAll()
    this.elements.cards2.removeAll()
    for( var iter1 = 0 ; iter1 < this.settings.deck.length ; iter1++ ){
      this.settings.deck[ iter1 ].drawn = !true
      this.settings.deck[ iter1 ].keep = true
      }
    this.settings.hand1 = []
    this.settings.hand2 = []
    this.elements.deck.events.onInputDown.addOnce( this.routines.PlayPhase2 )
    }.bind( state ),
  PlayPhase2: function(){
    this.elements.decktext.text = ''
    for( var iter1 = 0 ; iter1 < this.elements.cardtext.total ; iter1++ ){
      this.elements.cardtext.children[ iter1 ].text = 'Keep'
      }
    this.settings.tweens = []
    for( var iter1 = 0 ; iter1 < 5 ; iter1++ ){
      this.settings.tweens.push( this.routines.DealCard( 1 , iter1 ) )
      this.settings.tweens.push( this.routines.DealCard( 2 , iter1 ) )
      }
    for( var iter1 = 1 ; iter1 < this.settings.tweens.length ; iter1++ ){
      this.settings.tweens[ iter1 - 1 ].chain( this.settings.tweens[ iter1 ] )
      }
    this.settings.tweens[ this.settings.tweens.length - 1 ].onComplete.add( function(){
      this.elements.decktext.text = 'Draw'
      this.elements.deck.events.onInputDown.addOnce( this.routines.PlayPhase3 )
      } , this )
    this.settings.tweens[ 0 ].start()
    }.bind( state ),
  PlayPhase3: function(){
    this.elements.decktext.text = ''
    for( var iter1 = 0 ; iter1 < this.elements.cardtext.total ; iter1++ ) this.elements.cardtext.children[ iter1 ].text = ''
    this.settings.tweens = []
    for( var iter1 = 0 ; iter1 < this.settings.hand1.length ; iter1++ ){
      if( !this.settings.hand1[ iter1 ].keep ){
        this.settings.hand1.splice( iter1 , 1 )
        this.elements.cards1.removeChildAt( iter1 )
        this.settings.tweens.push( this.routines.DealCard( 1 , iter1 ) )
        }
      }
    for( var iter1 = 0 ; iter1 < this.settings.hand2.length ; iter1++ ){
      if( !this.settings.hand2[ iter1 ].keep ){
        this.settings.hand2.splice( iter1 , 1 )
        this.elements.cards2.removeChildAt( iter1 )
        this.settings.tweens.push( this.routines.DealCard( 2 , iter1 ) )
        }
      }
    for( var iter1 = 1 ; iter1 < this.settings.tweens.length ; iter1++ ){
      this.settings.tweens[ iter1 - 1 ].chain( this.settings.tweens[ iter1 ] )
      }
    if( this.settings.tweens.length > 0 ){
      this.settings.tweens[ this.settings.tweens.length - 1 ].onComplete.add( function(){
        this.elements.decktext.text = 'Show'
        this.elements.deck.events.onInputDown.addOnce( this.routines.PlayPhase4 )
        } , this )
      this.settings.tweens[ 0 ].start()
      }
    else{
      this.elements.decktext.text = 'Show'
      this.elements.deck.events.onInputDown.addOnce( this.routines.PlayPhase4 )
      }
    }.bind( state ),
  PlayPhase4: function(){
    this.elements.decktext.text = 'Clear'
    for( var iter1 = 0 ; iter1 < this.settings.hand2.length ; iter1++ ) this.elements.cards2.children[ iter1 ].loadTexture( 'cards' , this.settings.hand2[ iter1 ].frame )
    this.elements.deck.events.onInputDown.addOnce( this.routines.PlayPhase1 )
    this.routines.AnalyzeHand( this.settings.hand1 )
    }.bind( state ),
  AnalyzeHand: function( para1 ){
    for( var iter1 = 0 , temp1 = !true ; iter1 < para1.length ; iter1++ ){
      for( var iter2 = iter1 + 1 ; iter2 < para1.length ; iter2++ ){
        if( para1[ iter1 ].value === para1[ iter2 ].value ) temp1 = true
        }
      }
    if( temp1 ){
      // var temp2 = []
      // for( var iter1
      }
    else{

      }
    return {}
    }.bind( state ),
  DealCard: function( para1 , para2 ){
    while( temp1 === undefined || this.settings.deck[ temp1 ].drawn ) var temp1 = Math.floor( Math.random() * this.settings.deck.length )
    this.settings.deck[ temp1 ].drawn = true
    this.settings[ 'hand' + para1 ].splice( para2 , 0 , this.settings.deck[ temp1 ] )
    var temp2 = this.add.sprite( 0 , para1 === 1 ? 150 : -150 , 'back' )
      temp2.anchor.set( .5 )
      temp2.name = para2
      if( para1 === 1 ){
        temp2.inputEnabled = true
        temp2.events.onInputDown.add( this.routines.ToggleDraw , this , 0 , this.elements.cardtext.children[ para2 ] )
        }
      this.elements[ 'cards' + para1 ].addAt( temp2 , para2 )
    var temp3 = this.add.tween( temp2 )
      temp3.to( { x: ( para2 - 2 ) * 75 , y: 0 } , 250 , "Linear" )
      temp3.onComplete.add( function( paraf1 , paraf2 ){
        if( paraf1.parent.name === 'cards1' ) paraf1.loadTexture( 'cards' , this.settings.hand1[ paraf1.name ].frame )
        } , this )
    return temp3
    }.bind( state ),
  NewCard: function( para1 , para2 ){
    return {
      drawn: !true,
      frame: para1 * 13 + para2,
      suit: para1,
      value: para2,
      keep: true,
      }
    }.bind( state ),
  NewDeck: function(){
    this.settings.deck = []
    for( var iter1 = 0 ; iter1 < 4 ; iter1++ ){
      for( var iter2 = 0 ; iter2 < 13 ; iter2++ ){
        this.settings.deck.push( this.routines.NewCard( iter1 , iter2 ) )
        }
      }
    }.bind( state ),
  ToggleDraw: function( para1 , para2 , para3 ){
    if( para3.text === 'Keep' ){
      para3.text = 'Discard'
      this.settings.hand1[ para1.name ].keep = !true
      }
    else{
      para3.text = 'Keep'
      this.settings.hand1[ para1.name ].keep = true
      }
    }.bind( state ),
  }