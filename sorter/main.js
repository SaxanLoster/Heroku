// list.sort( ( v1 , v2 ) => confirm( "Press okay for " + v1 + " or cancel for " + v2 ) ? -1 : +1; );

var E = {
  listbox: document.getElementById( 'listbox' ),
  preset: document.getElementById( 'preset' ),
  list: document.getElementById( 'list' ),
  sortbutton: document.getElementById( 'sortbutton' ),
  resultbox: document.getElementById( 'resultbox' ),
  };

var presets = [
  { label: 'None' , value: [ '' ] },
  { label: 'Rainbow Six Attackers' , value: 'ASH,BLACKBEARD,BLITZ,BUCK,CAPITAO,FUZE,GLAZ,HIBANA,IQ,JACKAL,MONTAGNE,SLEDGE,THATCHER,THERMITE,TWITCH' },
  { label: 'Rainbow Six Defenders' , value: 'BANDIT,CASTLE,CAVEIRA,DOC,ECHO,FROST,JAEGER,KAPKAN,MIRA,MUTE,PULSE,ROOK,SMOKE,TACHANKA,VALKYRIE' },
  ];

presets.forEach( function( v ) {
  var e = document.createElement( 'option' );
  e.value = v.value;
  e.textContent = v.label;
  E.preset.appendChild( e );
  } );

E.preset.addEventListener( 'change' , function( e ) {
  E.list.value = this.selectedOptions[ 0 ].value.split( ',' ).join( '\n' );
  } );

var gList , gLow , gHigh , gIndex1 , gIndex2 , gStack;

var xSetResults = function () {
  while( E.resultbox.firstChild ) E.resultbox.removeChild( E.resultbox.firstChild );
  var e = document.createElement( 'input' );
  e.placeholder = 'Title';
  e.className = 'result';
  E.resultbox.appendChild( e )
  var e = document.createElement( 'div' );
  e.textContent = gList.join( '\n' );
  e.className = 'result';
  E.resultbox.appendChild( e );
  var e = document.createElement( 'button' );
  e.textContent = 'Save';
  e.className = 'result';
  E.resultbox.appendChild( e );

  }
var xSwap = function ( v1 , v2 ) {
  var t = gList[ v1 ];
  gList[ v1 ] = gList[ v2 ];
  gList[ v2 ] = t;
  };
var xSort = function ( low , high ) {
  gLow = low;
  gHigh = high;
  gIndex1 = low - 1;
  gIndex2 = low
  xSetCompare( gList[ gIndex2 ] , gList[ gHigh ] );
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
    xSwap( gIndex1 , gIndex2 );
    gIndex2++;
    if ( gIndex2 <= gHigh - 1 ) {
      xSetCompare( gList[ gIndex2 ] , gList[ gHigh ] );
      }
    else {
      xSwap( gIndex1 + 1 , gHigh );
      gStack.push( [ gIndex1 + 2 , gHigh ] );
      gStack.push( [ gLow , gIndex1 ] );
      xPopStack();
      }
    } );
  E.resultbox.appendChild( e );
  var e = document.createElement( 'button' );
  e.textContent = v2;
  e.className = 'choice';
  e.addEventListener( 'click' , function ( event ) {
    gIndex2++;
    if ( gIndex2 <= gHigh - 1 ) {
      xSetCompare( gList[ gIndex2 ] , gList[ gHigh ] );
      }
    else {
      xSwap( gIndex1 + 1 , gHigh );
      gStack.push( [ gIndex1 + 2 , gHigh ] );
      gStack.push( [ gLow , gIndex1 ] );
      xPopStack();
      }
    } );
  E.resultbox.appendChild( e );
  }

E.sortbutton.addEventListener( 'click' , function ( e ) {
  gList = E.list.value.split( '\n' );
  gStack = [];
  xSort( 0 , gList.length - 1 );
  } );