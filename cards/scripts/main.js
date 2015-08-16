var state = new Phaser.State()

state.elements = {}
state.settings = {
  fontstyle1: {
    align: 'center',
    fill: '#ffffff',
    font: '18px Arial',
    },
  fontstyle2: {
    align: 'center',
    backgroundColor: '#000000',
    fill: '#ffffff',
    font: '32px Arial',
    fontVariant: 'small-caps',
    stroke: '#000000',
    strokeThickness: 1,
    },
  fontstyle3: {
    align: 'center',
    backgroundColor: '#000000',
    fill: '#ffffff',
    font: '32px Arial',
    fontVariant: 'small-caps',
    stroke: '#ffffff',
    strokeThickness: 0,
    },
  textcard1: 'KEEP',
  textcard2: 'TOSS',
  textdeck1: 'deal',
  textdeck2: 'draw',
  textdeck3: 'show',
  textover0: 'you win',
  textover1: 'you lose',
  textover2: 'tie game',
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
  this.elements.deck = this.add.sprite( this.world.centerX , this.world.centerY , 'back' )
    this.elements.deck.anchor.set( .5 )
    this.elements.deck.inputEnabled = true
  this.elements.decktext = this.add.text( this.world.centerX , this.world.centerY , '' , this.settings.fontstyle2 )
    this.elements.decktext.anchor.set( .5 )
  this.elements.cards1 = this.add.group()
    this.elements.cards1.name = 'cards1'
    this.elements.cards1.x = this.world.centerX
    this.elements.cards1.y = 100
  this.elements.cards2 = this.add.group()
    this.elements.cards2.name = 'cards2'
    this.elements.cards2.x = this.world.centerX
    this.elements.cards2.y = this.world.height - 100
  this.elements.cardtext = this.add.group()
    this.elements.cardtext.x = this.world.centerX
    this.elements.cardtext.y = 25
    for( var iter1 = 0 ; iter1 < 5 ; iter1++ ){
      this.add.text( ( iter1 - 2 ) * 75 , 0 , '' , this.settings.fontstyle1 , this.elements.cardtext )
        this.elements.cardtext.children[ this.elements.cardtext.total - 1 ].anchor.set( .5 )
      }
  this.elements.winstext = this.add.group()
    this.elements.winstext.name = 'winstext'
    this.elements.winstext.x = 25
    this.elements.winstext.y = this.world.centerY
    this.add.text( 0 , -30 , 'Wins: ' + SaxanStorage.wins[ 0 ] , this.settings.fontstyle1 , this.elements.winstext )
      this.elements.winstext.children[ this.elements.winstext.total - 1 ].anchor.set( 0 , .5 )
    this.add.text( 0 , -10 , 'Losses: ' + SaxanStorage.wins[ 1 ] , this.settings.fontstyle1 , this.elements.winstext )
      this.elements.winstext.children[ this.elements.winstext.total - 1 ].anchor.set( 0 , .5 )
    this.add.text( 0 , 10 , 'Ties: ' + SaxanStorage.wins[ 2 ] , this.settings.fontstyle1 , this.elements.winstext )
      this.elements.winstext.children[ this.elements.winstext.total - 1 ].anchor.set( 0 , .5 )
    this.add.text( 0 , 30 , 'Win Rate: ' + ( ( ( 100 * SaxanStorage.wins[ 0 ] ) / ( SaxanStorage.wins[ 0 ] + SaxanStorage.wins[ 1 ] ) ) || 0 ).toFixed( 2 ) + '%' , this.settings.fontstyle1 , this.elements.winstext )
      this.elements.winstext.children[ this.elements.winstext.total - 1 ].anchor.set( 0 , .5 )
  this.elements.handstext = this.add.group()
    this.elements.handstext.name = 'handstext'
    this.elements.handstext.x = this.world.width - 50
    this.elements.handstext.y = this.world.centerY
    this.add.text( 0 , -80 , 'High Cards: ' + SaxanStorage.hands[ 0 ] , this.settings.fontstyle1 , this.elements.handstext )
      this.elements.handstext.children[ this.elements.handstext.total - 1 ].anchor.set( 1 , .5 )
    this.add.text( 0 , -60 , 'Pairs: ' + SaxanStorage.hands[ 1 ] , this.settings.fontstyle1 , this.elements.handstext )
      this.elements.handstext.children[ this.elements.handstext.total - 1 ].anchor.set( 1 , .5 )
    this.add.text( 0 , -40 , '2 Pairs: ' + SaxanStorage.hands[ 2 ] , this.settings.fontstyle1 , this.elements.handstext )
      this.elements.handstext.children[ this.elements.handstext.total - 1 ].anchor.set( 1 , .5 )
    this.add.text( 0 , -20 , '3 of a Kinds: ' + SaxanStorage.hands[ 3 ] , this.settings.fontstyle1 , this.elements.handstext )
      this.elements.handstext.children[ this.elements.handstext.total - 1 ].anchor.set( 1 , .5 )
    this.add.text( 0 , 0 , 'Straights: ' + SaxanStorage.hands[ 4 ] , this.settings.fontstyle1 , this.elements.handstext )
      this.elements.handstext.children[ this.elements.handstext.total - 1 ].anchor.set( 1 , .5 )
    this.add.text( 0 , 20 , 'Flushes: ' + SaxanStorage.hands[ 5 ] , this.settings.fontstyle1 , this.elements.handstext )
      this.elements.handstext.children[ this.elements.handstext.total - 1 ].anchor.set( 1 , .5 )
    this.add.text( 0 , 40 , 'Full Houses: ' + SaxanStorage.hands[ 6 ] , this.settings.fontstyle1 , this.elements.handstext )
      this.elements.handstext.children[ this.elements.handstext.total - 1 ].anchor.set( 1 , .5 )
    this.add.text( 0 , 60 , '4 of a Kinds: ' + SaxanStorage.hands[ 7 ] , this.settings.fontstyle1 , this.elements.handstext )
      this.elements.handstext.children[ this.elements.handstext.total - 1 ].anchor.set( 1 , .5 )
    this.add.text( 0 , 80 , 'Straight Flushes: ' + SaxanStorage.hands[ 8 ] , this.settings.fontstyle1 , this.elements.handstext )
      this.elements.handstext.children[ this.elements.handstext.total - 1 ].anchor.set( 1 , .5 )
  this.routines.PlayPhase1()
  }

state.routines = {
  PlayPhase1: function(){
    this.elements.decktext.text = this.settings.textdeck1
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
      this.elements.cardtext.children[ iter1 ].text = this.settings.textcard1
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
      this.elements.decktext.text = this.settings.textdeck2
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
        this.elements.decktext.text = this.settings.textdeck3
        this.elements.deck.events.onInputDown.addOnce( this.routines.PlayPhase4 )
        } , this )
      this.settings.tweens[ 0 ].start()
      }
    else{
      this.elements.decktext.text = this.settings.textdeck3
      this.elements.deck.events.onInputDown.addOnce( this.routines.PlayPhase4 )
      }
    }.bind( state ),
  PlayPhase4: function(){
    this.elements.decktext.text = ''
    for( var iter1 = 0 ; iter1 < this.settings.hand2.length ; iter1++ ) this.elements.cards2.children[ iter1 ].loadTexture( 'cards' , this.settings.hand2[ iter1 ].frame )
    this.elements.deck.events.onInputDown.addOnce( this.routines.PlayPhase1 )
    var temp1 = this.routines.AnalyzeHand( this.settings.hand1 )
    var temp2 = this.routines.AnalyzeHand( this.settings.hand2 )
    var temp3 = this.routines.CompareHands( temp1 , temp2 )
    this.elements.decktext.text = temp3 === 0 ? this.settings.textover0 : temp3 === 1 ? this.settings.textover1 : this.settings.textover2
    SaxanStorage.wins[ temp3 ]++
    SaxanStorage.hands[ temp1.type ]++
    localStorage.Cards = JSON.stringify( SaxanStorage )
    this.elements.winstext.children[ temp3 ].text = this.elements.winstext.children[ temp3 ].text.replace( /\d+/g , SaxanStorage.wins[ temp3 ] )
    this.elements.winstext.children[ 3 ].text = 'Win Rate: ' + ( ( ( 100 * SaxanStorage.wins[ 0 ] ) / ( SaxanStorage.wins[ 0 ] + SaxanStorage.wins[ 1 ] ) ) || 0 ).toFixed( 2 ) + '%'
    this.elements.handstext.children[ temp1.type ].text = this.elements.handstext.children[ temp1.type ].text.replace( /\d+$/ , SaxanStorage.hands[ temp1.type ] )
    }.bind( state ),
  AnalyzeHand: function( para1 ){
    var temp1 = { length: 0 }
    var temp2 = { length: 0 }
    var temp3 = { 1: [] , 2: [] , 3: [] , 4: [] }
    var temp4 = 0
    for( var iter1 = 0 ; iter1 < para1.length ; iter1++ ){
      if( temp1[ para1[ iter1 ].value ] ){
        temp1[ para1[ iter1 ].value ]++
        }
      else{
        temp1.length++
        temp1[ para1[ iter1 ].value ] = 1
        }
      if( temp2[ para1[ iter1 ].suit ] ){
        temp2[ para1[ iter1 ].suit ]++
        }
      else{
        temp2.length++
        temp2[ para1[ iter1 ].suit ] = 1
        }
      }
    for( var iter1 in temp1 ){
      if( iter1 !== 'length' ){
        if( !true ){}
        else if( temp1[ iter1 ] === 1 ) temp3[ 1 ].push( parseInt( iter1 ) )
        else if( temp1[ iter1 ] === 2 ) temp3[ 2 ].push( parseInt( iter1 ) )
        else if( temp1[ iter1 ] === 3 ) temp3[ 3 ].push( parseInt( iter1 ) )
        else if( temp1[ iter1 ] === 4 ) temp3[ 4 ].push( parseInt( iter1 ) )
        else{}
        }
      }
    for( var iter1 in temp3 ) temp3[ iter1 ].sort( function( paraf1 , paraf2 ){ return paraf2 - paraf1 } )
    if( temp1.length < para1.length ){
      if( temp1.length === 4 ) temp4 = 1
      else if( temp1.length === 3 ){
        if( temp3[ 2 ].length > 0 ) temp4 = 2
        else temp4 = 3
        }
      else{
        if( temp3[ 3 ].length > 0 ) temp4 = 6
        else temp4 = 7
        }
      }
    else{
      if( temp3[ 1 ][ 0 ] - temp3[ 1 ][ temp3[ 1 ].length - 1 ] === 4 ){
        if( temp2.length === 1 ) temp4 = 8
        else temp4 = 4
        }
      else{
        if( temp2.length === 1 ) temp4 = 5
        }
      }
    return { type: temp4 , power: temp3 }
    }.bind( state ),
  CompareHands: function( para1 , para2 ){
    if( para1.type > para2.type ) return 0
    if( para1.type < para2.type ) return 1
    for( var iter1 = 4 ; iter1 > 0 ; iter1-- ){
      if( para1.power[ iter1 ].length > 0 ){
        for( var iter2 = 0 ; iter2 < para1.power[ iter1 ].length ; iter2++ ){
          if( para1.power[ iter1 ][ iter2 ] > para2.power[ iter1 ][ iter2 ] ) return 0
          if( para1.power[ iter1 ][ iter2 ] < para2.power[ iter1 ][ iter2 ] ) return 1
          }
        }
      }
    return 2
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
      temp3.to( { x: ( para2 - 2 ) * 75 , y: 0 } , 500 , "Linear" )
      temp3.onComplete.add( function( paraf1 , paraf2 ){
        if( paraf1.parent.name === 'cards1' ) paraf1.loadTexture( 'cards' , this.settings.hand1[ paraf1.name ].frame )
        } , this )
    return temp3
    }.bind( state ),
  NewCard: function( para1 , para2 ){
    return {
      drawn: !true,
      frame: para1 * 13 + para2,
      suit: para1 + 1,
      value: para2 + 2,
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
    if( para3.text === this.settings.textcard1 ){
      para3.text = this.settings.textcard2
      this.settings.hand1[ para1.name ].keep = !true
      }
    else{
      para3.text = this.settings.textcard1
      this.settings.hand1[ para1.name ].keep = true
      }
    }.bind( state ),
  }