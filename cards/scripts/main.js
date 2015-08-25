var state = new Phaser.State()

state.elements = {}
state.settings = {
  dealtimer: 200,
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
  mobile: /Mobi/i.test( navigator.userAgent ),
  textcard0: 'TOSS',
  textcard1: 'KEEP',
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
    this.add.text( 0 , -40 , 'Wins: ' + SaxanStorage.wins[ 0 ] , this.settings.fontstyle1 , this.elements.winstext )
      this.elements.winstext.children[ this.elements.winstext.total - 1 ].anchor.set( 0 , .5 )
    this.add.text( 0 , -20 , 'Losses: ' + SaxanStorage.wins[ 1 ] , this.settings.fontstyle1 , this.elements.winstext )
      this.elements.winstext.children[ this.elements.winstext.total - 1 ].anchor.set( 0 , .5 )
    this.add.text( 0 , 0 , 'Ties: ' + SaxanStorage.wins[ 2 ] , this.settings.fontstyle1 , this.elements.winstext )
      this.elements.winstext.children[ this.elements.winstext.total - 1 ].anchor.set( 0 , .5 )
    this.add.text( 0 , 20 , 'Win Rate: ' + ( ( ( 100 * SaxanStorage.wins[ 0 ] ) / ( SaxanStorage.wins[ 0 ] + SaxanStorage.wins[ 1 ] ) ) || 0 ).toFixed( 2 ) + '%' , this.settings.fontstyle1 , this.elements.winstext )
      this.elements.winstext.children[ this.elements.winstext.total - 1 ].anchor.set( 0 , .5 )
    this.add.text( 0 , 40 , 'Streak: ' + SaxanStorage.streak.split( '|' )[ 1 ] + ' ' + ( SaxanStorage.streak.split( '|' )[ 0 ] == 0 ? ( SaxanStorage.streak.split( '|' )[ 1 ] == 1 ? 'Win' : 'Wins' ) : ( SaxanStorage.streak.split( '|' )[ 1 ] == 1 ? 'Loss' : 'Losses' ) ) , this.settings.fontstyle1 , this.elements.winstext )
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
    for( var iter1 = 0 ; iter1 < this.settings.deck.length ; iter1++ ) this.settings.deck[ iter1 ].place = 'deck'
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
    this.routines.AIDraw()
    this.settings.tweens = []
    for( var iter1 = 0 ; iter1 < this.settings.hand1.length ; iter1++ ){
      if( this.settings.hand1[ iter1 ].place === 'discard1' ){
        this.settings.hand1.splice( iter1 , 1 )
        this.elements.cards1.removeChildAt( iter1 )
        this.settings.tweens.push( this.routines.DealCard( 1 , iter1 ) )
        }
      }
    for( var iter1 = 0 ; iter1 < this.settings.hand2.length ; iter1++ ){
      if( this.settings.hand2[ iter1 ].place === 'discard2' ){
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
    for( var iter1 = 0 ; iter1 < this.settings.hand1.length ; iter1++ ) this.elements.cards1.children[ iter1 ].loadTexture( 'cards' , this.settings.hand1[ iter1 ].frame )
    for( var iter1 = 0 ; iter1 < this.settings.hand2.length ; iter1++ ) this.elements.cards2.children[ iter1 ].loadTexture( 'cards' , this.settings.hand2[ iter1 ].frame )
    this.elements.deck.events.onInputDown.addOnce( this.routines.PlayPhase1 )
    var temp1 = this.routines.AnalyzeHand( this.settings.hand1 )
    var temp2 = this.routines.AnalyzeHand( this.settings.hand2 )
    var temp3 = this.routines.CompareHands( temp1 , temp2 )
    this.elements.decktext.text = temp3 === 0 ? this.settings.textover0 : temp3 === 1 ? this.settings.textover1 : this.settings.textover2
    SaxanStorage.wins[ temp3 ]++
    SaxanStorage.hands[ temp1.type ]++
    var temp4 = SaxanStorage.streak.split( '|' )
    if( temp4[ 1 ] > 0 && temp4[ 0 ] == temp3 ) SaxanStorage.streak = temp3 + '|' + ( 1 + parseInt( temp4[ 1 ] ) )
    else SaxanStorage.streak = temp3 + '|1'
    localStorage.Cards = JSON.stringify( SaxanStorage )
    var temp4 = SaxanStorage.streak.split( '|' )[ 1 ]
    this.elements.winstext.children[ temp3 ].text = this.elements.winstext.children[ temp3 ].text.replace( /\d+/g , SaxanStorage.wins[ temp3 ] )
    this.elements.winstext.children[ 3 ].text = 'Win Rate: ' + ( ( ( 100 * SaxanStorage.wins[ 0 ] ) / ( SaxanStorage.wins[ 0 ] + SaxanStorage.wins[ 1 ] ) ) || 0 ).toFixed( 2 ) + '%'
    this.elements.winstext.children[ 4 ].text = 'Streak: ' + temp4 + ' ' + ( temp3 == 0 ? ( temp4 == 1 ? 'Win' : 'Wins' ) : ( temp4 == 1 ? 'Loss' : 'Losses' ) )
    this.elements.handstext.children[ temp1.type ].text = this.elements.handstext.children[ temp1.type ].text.replace( /\d+$/ , SaxanStorage.hands[ temp1.type ] )
    }.bind( state ),
  AnalyzeHand: function( para1 ){
    var temp1 = [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]
    var temp2 = [ 0 , 0 , 0 , 0 ]
    var temp3 = [ [] , [] , [] , [] ]
    var temp4 = 0
    for( var iter1 = 0 ; iter1 < para1.length ; iter1++ ){
      temp1[ para1[ iter1 ].value ]++
      temp2[ para1[ iter1 ].suit ]++
      }
    for( var iter1 in temp1 ){
      if( temp1[ iter1 ] === 1 ) temp3[ 0 ].push( parseInt( iter1 ) )
      if( temp1[ iter1 ] === 2 ) temp3[ 1 ].push( parseInt( iter1 ) )
      if( temp1[ iter1 ] === 3 ) temp3[ 2 ].push( parseInt( iter1 ) )
      if( temp1[ iter1 ] === 4 ) temp3[ 3 ].push( parseInt( iter1 ) )
      }
    for( var iter1 in temp3 ) temp3[ iter1 ].sort( function( paraf1 , paraf2 ){ return paraf2 - paraf1 } )
    if( temp1.join( '' ).replace( /0/g , '' ).length < para1.length ){
      if( temp1.join( '' ).replace( /0/g , '' ).length === 4 ) temp4 = 1
      else if( temp1.join( '' ).replace( /0/g , '' ).length === 3 ){
        if( temp3[ 1 ].length > 0 ) temp4 = 2
        else temp4 = 3
        }
      else{
        if( temp3[ 2 ].length > 0 ) temp4 = 6
        else temp4 = 7
        }
      }
    else{
      if( temp3[ 0 ][ 0 ] - temp3[ 0 ][ temp3[ 0 ].length - 1 ] === 4 ){
        if( temp2.join( '' ).replace( /0/g , '' ).length === 1 ) temp4 = 8
        else temp4 = 4
        }
      else{
        if( temp2.join( '' ).replace( /0/g , '' ).length === 1 ) temp4 = 5
        }
      }
    return { type: temp4 , power: temp3 , suits: temp2 }
    }.bind( state ),
  CompareHands: function( para1 , para2 ){
    if( para1.type > para2.type ) return 0
    if( para1.type < para2.type ) return 1
    for( var iter1 = para1.power.length - 1 ; iter1 >= 0 ; iter1-- ){
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
    while( temp1 === undefined || this.settings.deck[ temp1 ].place !== 'deck' ) var temp1 = Math.floor( Math.random() * this.settings.deck.length )
    this.settings.deck[ temp1 ].place = 'hand' + para1 + '|' + para2
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
      temp3.to( { x: ( para2 - 2 ) * 75 , y: 0 } , this.settings.dealtimer * ( this.settings.mobile + 1 ), "Linear" )
      temp3.onComplete.add( function( paraf1 , paraf2 ){
        if( paraf1.parent.name === 'cards1' ) paraf1.loadTexture( 'cards' , this.settings.hand1[ paraf1.name ].frame )
        // if( paraf1.parent.name === 'cards2' ) paraf1.loadTexture( 'cards' , this.settings.hand2[ paraf1.name ].frame )
        } , this )
    return temp3
    }.bind( state ),
  NewCard: function( para1 , para2 ){
    return {
      frame: para1 * 13 + para2,
      place: 'deck',
      suit: para1,
      value: para2,
      }
    }.bind( state ),
  NewDeck: function(){
    this.settings.deck = []
    for( var iter1 = 0 ; iter1 < 4 ; iter1++ ){
      for( var iter2 = 0 ; iter2 < 5 ; iter2++ ){
        this.settings.deck.push( this.routines.NewCard( iter1 , iter2 ) )
        }
      }
    }.bind( state ),
  SortHand: function( para1 , para2 ){
    if( para1.value > para2.value ) return -1
    if( para1.value < para2.value ) return +1
    return 0
    }.bind( state ),
  ToggleDraw: function( para1 , para2 , para3 ){
    if( para3.text === '' ) return !true
    if( para3.text === this.settings.textcard1 ){
      para3.text = this.settings.textcard0
      this.settings.hand1[ para1.name ].place = 'discard1'
      }
    else{
      para3.text = this.settings.textcard1
      this.settings.hand1[ para1.name ].place = 'hand1'
      }
    }.bind( state ),
  AIDraw: function(){
    var f1 = this.settings.hand2.slice().sort( this.routines.SortHand )
    var f2 = this.routines.AnalyzeHand( this.settings.hand2 )
    if( f2.type.toString().match( /0/ ) !== null ){
      var ff1 = [ [] , [] , [] , [] , [] ]
      for( var iter1 = 0 ; iter1 < f2.power[ 0 ].length ; iter1++ ){
        ff1[ iter1 ].push( f2.power[ 0 ][ iter1 ] )
        for( var iter2 = iter1 + 1 ; iter2 < f2.power[ 0 ].length ; iter2++ ){
          var fff1 = f2.power[ 0 ][ iter1 ] - f2.power[ 0 ][ iter2 ]
          if( fff1 <= ( iter2 - iter1 + 1 ) ) ff1[ iter1 ].push( f2.power[ 0 ][ iter2 ] )
          }
        }
      var ff2 = !true
      var ff3 = []
      for( var iter1 in f2.suits ) if( f2.suits[ iter1 ] === 4 ) ff2 = iter1
      for( var iter1 in ff1 ) if( ff1[ iter1 ].length === 4 ) ff3.push( iter1 )
      switch( true ){
        case !!ff2 && !!ff3.length:
          for( var iter1 = 0 , fff1 = 0 ; iter1 < 4 ; iter1++ ){
            if( f1[ iter1 + ff3.length -1 ].suit === ff2 ) fff1++
            }
          if( fff1 === 4 ){
            f1[ ( ff3[ 0 ] + 4 ) % 5 ].place = 'discard2'
            }
          else{
            for( var iter1 = 0 , fff1 ; iter1 < this.settings.hand2.length ; iter1++ ) if( this.settings.hand2[ iter1 ].suit != ff2 ) fff1 = this.settings.hand2[ iter1 ]
            var fff2 = f1[ ( ff3[ 0 ] + 4 ) % 5 ]
            if( fff1.value < fff2.value ) fff1.place = 'discard2'
            else fff2.place = 'discard2'
            }
          break
        case !!ff2 && !ff3.length:
          for( var iter1 = 0 , fff1 ; iter1 < this.settings.hand2.length ; iter1++ ) if( this.settings.hand2[ iter1 ].suit != ff2 ) fff1 = iter1
          this.settings.hand2[ fff1 ].place = 'discard2'
          break
        case !ff2 && !!ff3.length:
          f1[ ( ff3[ 0 ] + 4 ) % 5 ].place = 'discard2'
          break
        case !ff2 && !ff3.length:
          f1[ 0 ].place = Math.random() < Math.pow( .99999 , f1[ 0 ].value * f1[ 0 ].value * f1[ 0 ].value * f1[ 0 ].value * 20 ) ? 'discard2' : f1[ 0 ].value
          for( var iter1 = 1 ; iter1 < f1.length ; iter1++ ){
            if( f1[ iter1 - 1 ].place !== 'discard2' || Math.random() > .8 ) f1[ iter1 ].place = Math.random() < Math.pow( .975 , f1[ 0 ].value / iter1 ) ? 'discard2' : f1[ iter1 ].place
            else f1[ iter1 ].place = 'discard2'
            }
          break
        }
      }
    if( f2.type.toString().match( /1|2|3|7/ ) !== null ){
      for( var iter1 = 0 ; iter1 < f1.length ; iter1++ ){
        if( f2.power[ 0 ].indexOf( f1[ iter1 ].value ) !== -1 ){
          if( f1[ iter1 ].value === f2.power[ 0 ][ 0 ] ){
            if( f2.type === 2 ){
              f1[ iter1 ].place = 'discard2'
              }
            else if( Math.random() < Math.pow( .9999999925 , Math.pow( f1[ iter1 ].value , 8 ) ) ){
              f1[ iter1 ].place = 'discard2'
              }
            }
          else{
            f1[ iter1 ].place = 'discard2'
            }
          }
        }
      }
    }.bind( state ),
  }