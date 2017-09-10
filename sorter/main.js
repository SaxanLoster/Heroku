var E = {
  listbox: document.getElementById( 'listbox' ),
  preset: document.getElementById( 'preset' ),
  list: document.getElementById( 'list' ),
  sortbutton: document.getElementById( 'sortbutton' ),
  resultbox: document.getElementById( 'resultbox' ),
  };

var presets = [
  { title: "None" , value: "" },
  { title: "Fast Food" , value: "In N Out,McDonalds,Carl\'s Jr,Subway,Tommy\'s,The Hat,Wingstop,Jack In The Box,Del Taco,Wendy's,Burger King,Chipotle,Panda Express" },
  { title: "Rainbow Six Attackers" , value: "ASH,BLACKBEARD,BLITZ,BUCK,CAPITAO,FUZE,GLAZ,HIBANA,IQ,JACKAL,MONTAGNE,SLEDGE,THATCHER,THERMITE,TWITCH" },
  { title: "Rainbow Six Defenders" , value: "BANDIT,CASTLE,CAVEIRA,DOC,ECHO,FROST,JAEGER,KAPKAN,MIRA,MUTE,PULSE,ROOK,SMOKE,TACHANKA,VALKYRIE" },
  ];

if ( !localStorage.sorter ) localStorage.sorter = "[]";
presets = presets.concat( JSON.parse( localStorage.sorter ) );

presets.forEach( function( v ) {
  var e = document.createElement( 'option' );
  e.value = v.value;
  e.textContent = v.title;
  E.preset.appendChild( e );
  } );

E.preset.addEventListener( 'change' , function( e ) {
  E.list.value = this.selectedOptions[ 0 ].value.split( ',' ).join( '\n' );
  } );

var gHigh , gIndex1 , gIndex2 , gList , gLow , gPivot , gStack , gTitle;

var xSetResults = function () {
  while( E.resultbox.firstChild ) E.resultbox.removeChild( E.resultbox.firstChild );
  var e = document.createElement( 'input' );
  e.placeholder = 'Title';
  e.value = gTitle;
  e.className = 'result';
  E.resultbox.appendChild( e )
  var e = document.createElement( 'div' );
  e.textContent = gList.join( '\n' );
  e.className = 'result';
  E.resultbox.appendChild( e );
  var e = document.createElement( 'button' );
  e.textContent = 'Save';
  e.className = 'result';
  e.addEventListener( 'click' , function ( event ) {
    var s = JSON.parse( localStorage.sorter );
    var t = document.querySelector( '#resultbox input.result' ).value || '';
    var v = document.querySelector( '#resultbox div.result' ).textContent.split( '\n' ).join( ',' );
    var i = s.findIndex( v => v.title === t );
    if ( i > -1 ) s[ i ].value = v
    else s.push( { title: t , value: v } );
    localStorage.sorter = JSON.stringify( s );
    } );
  E.resultbox.appendChild( e );
  }
var xSwap = function ( v1 , v2 ) {
  var t = gList[ v1 ];
  gList[ v1 ] = gList[ v2 ];
  gList[ v2 ] = t;
  };
var xSort = function ( low , high ) {
  gHigh = high;
  gIndex1 = low - 1;
  gIndex2 = low
  gLow = low;
  gPivot = Math.floor( ( gHigh + gLow ) / 2 );
  // gPivot = high;
  if ( gIndex1 === gPivot ) gIndex1++;
  if ( gIndex2 === gPivot ) gIndex2++;
  xSetCompare( gList[ gIndex2 ] , gList[ gPivot ] );
  }
var xPopStack = function () {
  var s;
  do {
    s = gStack.pop();
    if ( s[ 0 ] >= s[ 1 ] ) s = null;
    } while ( gStack.length > 0 && !s )
  if ( s ) xSort( s[ 0 ] , s[ 1 ] );
  else xSetResults();
  };
var xSetCompare = function ( v1 , v2 ) {
  while( E.resultbox.firstChild ) E.resultbox.removeChild( E.resultbox.firstChild );
  var e = document.createElement( 'button' );
  e.textContent = v1;
  e.className = 'choice';
  e.addEventListener( 'click' , function ( event ) {
    gIndex1++;
    if ( gIndex1 === gPivot ) gIndex1++;
    if ( gIndex1 !== gIndex2 ) xSwap( gIndex1 , gIndex2 );
    xClickEvent();
    } );
  E.resultbox.appendChild( e );
  var e = document.createElement( 'button' );
  e.textContent = v2;
  e.className = 'choice';
  e.addEventListener( 'click' , function ( event ) {
    xClickEvent()
    } );
  E.resultbox.appendChild( e );
  }
var xClickEvent = function () {
  gIndex2++;
  if ( gIndex2 == gPivot ) gIndex2++;
  if ( gIndex2 <= gHigh ) {
    xSetCompare( gList[ gIndex2 ] , gList[ gPivot ] );
    }
  else {
    if ( gIndex1 > gPivot ) gIndex1--;
    xSwap( gIndex1 + 1 , gPivot );
    if ( gLow !== gIndex1 + 2 ) gStack.push( [ gIndex1 + 2 , gHigh ] );
    if ( gHigh !== gIndex1 ) gStack.push( [ gLow , gIndex1 ] );
    xPopStack();
    }
  };

E.sortbutton.addEventListener( 'click' , function ( e ) {
  gList = E.list.value.split( '\n' );
  gStack = [ [ 0 , gList.length - 1 ] ];
  gTitle = E.preset.selectedOptions[ 0 ].textContent;
  xPopStack();
  } );