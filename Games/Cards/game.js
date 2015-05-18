// Variables
  var Game = new Phaser.Game( 500 , 500 , Phaser.CANVAS , 'Card Game' , { preload: preload , create: create } )
  var Back
  var BackText
  var Cards1
  var Cards2
  var Deck = []
  var Draw = []
  var DrawText = []
  var Player1 = []
  var Player2 = []

function preload(){
  Game.load.spritesheet( 'Cards' , 'Cards.png' , 71 , 96 , 52 , 1 , 2 )
  Game.load.image( 'Back' , 'Back.png' )
  }

function create(){
  Game.stage.backgroundColor = '#000000'

  Back = Game.add.sprite( 250 , 250 ,'Back' )
  Back.anchor.setTo( .5 , .5 )
  Back.inputEnabled = true
  Back.events.onInputDown.addOnce( PlayDeal , this )

  Cards1 = Game.add.group()
  Cards1.x = 250
  Cards1.y = 50

  Cards2 = Game.add.group()
  Cards2.x = 250
  Cards2.y = 450

  CreateText()
  MakeDeck()
  }

function CreateText(){
  var S1 = { font: '18px Arial' , fill: '#FFF' , align: 'center' }
  var S2 = { font: '32px Arial' , fill: '#000' , stroke: '#FFF' , strokeThickness: 5 , align: 'center' }
  for( var a = 0 ; a < 5 ; a++ ){
    var A = Game.add.text( 100 + ( a * 75 ) , 25 , '' , S1 )
    A.anchor.set( .5 )
    DrawText.push( A )
    }
  BackText = Game.add.text( 250 , 250 , 'Deal' , S2 )
  BackText.anchor.set( .5 )
  }

function DealCard(){
  var Count = 0
  do {
    var A = Math.floor( Math.random() * Deck.length )
    Count++
    } while( Deck[ A ] && Count < 52 )
  Deck[ A ] = true
  return A
  }

function MakeDeck(){
  for( var a = 0 ; a < 4 ; a++ ){
    for( var b = 0 ; b < 13 ; b++ ){
      Deck.push( false )
      }
    }
  return Deck
  }

function PlayDeal(){
  Back.events.onInputDown.addOnce( PlayDraw )
  BackText.text = 'Draw'
  function DealPlayer1(){
    Player1.push( DealCard() )
    var A = Cards1.create( ( Cards1.children.length - 2 ) * 75 , 0 , 'Cards' )
    A.anchor.setTo( .5 , 0 )
    A.inputEnabled = true
    A.events.onInputDown.add( ToggleDraw , A )
    A.name = Player1.length - 1
    A.frame = Player1[ Player1.length - 1 ]
    }
  function DealPlayer2(){
    Player2.push( DealCard() )
    var A = Cards2.create( ( Cards2.children.length - 2 ) * 75 , 0 , 'Back' )
    A.anchor.setTo( .5 , 1 )
    }
  for( var a = 0 ; a < DrawText.length ; a++ ) DrawText[ a ].text = 'Keep'
  for( var a = 0 ; a < 5 ; a++ ){
    setTimeout( function(){ DealPlayer1() } , a * 500 + 250 )
    setTimeout( function(){ DealPlayer2() } , a * 500 + 500 )
    }
  }

function PlayDraw(){
  Back.events.onInputDown.addOnce( PlayShow )
  BackText.text = 'Show'
  while( Draw.length > 0 ){
    var A = DealCard()
    var B = Cards1.create( ( Draw[ 0 ].name - 2 ) * 75 , 0 , 'Cards' )
    B.anchor.setTo( .5 , 0 )
    B.frame = A
    Player1.splice( Draw[ 0 ].name , 1 , A )
    Draw.shift()
    }
  for( var a = 0 ; a < DrawText.length; a++ ) DrawText[ a ].text = ''
  }

function PlayShow(){
  Back.events.onInputDown.addOnce( function(){ ResetGame() ; PlayDeal() } )
  BackText.text = 'Deal'
  Cards2.removeAll( true )
  for( var a = 0 ; a < Player2.length ; a++ ){
    var A = Cards2.create( ( Cards2.children.length - 2 ) * 75 , 0 , 'Cards' )
    A.anchor.setTo( .5 , 1 )
    A.frame = Player2[ a ]
    }
  }

function ResetGame(){
  Cards1.removeAll( true )
  Cards2.removeAll( true )
  for( var a = 0 ; a < Deck.length ; a++ ) Deck[ a ] = false
  Draw = []
  for( var a = 0 ; a < DrawText.length; a++ ) DrawText[ a ].text = ''
  Player1 = []
  Player2 = []
  }

function ToggleDraw(){
  for( var a = 0 ; a < Draw.length ; a++ ){
    if( Draw[ a ] == this ){
      Draw.splice( a , 1 )
      DrawText[ this.name ].text = 'Keep'
      return
      }
    }
  DrawText[ this.name ].text = ''
  Draw.push( this )
  }