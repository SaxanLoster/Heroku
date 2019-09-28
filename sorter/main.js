var E = {
  listbox: document.getElementById( 'listbox' ),
  preset: document.getElementById( 'preset' ),
  list: document.getElementById( 'list' ),
  sortbutton: document.getElementById( 'sortbutton' ),
  resultbox: document.getElementById( 'resultbox' ),
  };

var presets = [
  { title: "None" , value: "" },
  { title: "Fast Food" , value: "In N Out,McDonalds,Carl\'s Jr,Subway,Gandolfos,The Deli,Popeyes,Tommy\'s,The Hat,Wingstop,Jack In The Box,Del Taco,Wendy's,Burger King,Chipotle,Panda Express" },
  { title: "Rainbow Six Attackers" , value: "ASH,THERMITE,BLITZ,IQ,FUZE,GLAZ,MONTAGNE,TWITCH,SLEDGE,THATCHER,BUCK,BLACKBEARD,CAPITAO,HIBANA,JACKAL,YING,ZOFIA,DOKKAEBI,FINKA,LION,MAVERICK,NOMAD,GRIDLOCK,NOKK,AMARU" },
  { title: "Rainbow Six Defenders" , value: "BANDIT,JAEGER,CASTLE,PULSE,DOC,ROOK,KAPKAN,TACHANKA,MUTE,SMOKE,FROST,VALKYRIE,CAVEIRA,ECHO,MIRA,LESION,ELA,VIGIL,ALIBI,MAESTRO,CLASH,KAID,MOZZIE,WARDEN,GOYO" },
  ];

if ( !localStorage.sorter ) localStorage.sorter = "[]";
JSON.parse( localStorage.sorter ).forEach( function ( v ) {
  let i = presets.findIndex( vv => vv.title == v.title );
  if ( i >= 0 ) presets[ i ] = v;
  else presets.push( v );
  } );

presets.filter( ( v , i , a ) => a.findIndex( vv => vv.title == v.title ) == i ).forEach( function( v ) {
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
  console.log( 'xSetResults' );
  while( E.resultbox.firstChild ) E.resultbox.removeChild( E.resultbox.firstChild );
  E.resultbox.classList.remove( 'sorting' );
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
  console.log( 'xSort' , low , high );
  gHigh = high;
  gIndex1 = low - 1;
  gIndex2 = low
  gLow = low;
  gPivot = Math.floor( ( gHigh + gLow ) / 2 );
  if ( gIndex1 === gPivot ) gIndex1++;
  if ( gIndex2 === gPivot ) gIndex2++;
  while( E.resultbox.firstChild ) E.resultbox.removeChild( E.resultbox.firstChild );
  E.fragment = document.createDocumentFragment();
  for ( let i = gLow ; i <= gHigh ; i++ ) {
    if ( i !== gPivot ) xSetCompare( gPivot , i );
    }
  E.resultbox.appendChild( E.fragment );
  }
var xPopStack = function () {
  console.log( 'xPopStack' , gStack.length );
  var s;
  do {
    s = gStack.pop();
    if ( s && s[ 0 ] >= s[ 1 ] ) s = null;
    } while ( gStack.length > 0 && !s )
  if ( s ) xSort( s[ 0 ] , s[ 1 ] );
  else xSetResults();
  };
var xSetCompare = function ( v1 , v2 ) {
  let cn = ( '000' + v1 ).slice( -3 ) + '-' + ( '000' + v2 ).slice( -3 );
  let eh = document.createElement( 'div' );
    eh.className = 'comparison';
    eh.id = cn;
  let r1 = document.createElement( 'input' );
    r1.id = 'radio' + cn + '=' + ( '000' + v1 ).slice( -3 );
    r1.name = cn;
    r1.type = 'radio';
    r1.value = v1;
  let l1 = document.createElement( 'label' );
    l1.htmlFor = 'radio' + cn + '=' + ( '000' + v1 ).slice( -3 );
    l1.textContent = gList[ v1 ];
  let r2 = document.createElement( 'input' );
    r2.id = 'radio' + cn + '=' + ( '000' + v2 ).slice( -3 );
    r2.name = cn;
    r2.type = 'radio';
    r2.value = v2;
  let l2 = document.createElement( 'label' );
    l2.htmlFor = 'radio' + cn + '=' + ( '000' + v2 ).slice( -3 );
    l2.textContent = gList[ v2 ];

  eh.appendChild( r1 );
  eh.appendChild( l1 );
  eh.appendChild( document.createElement( 'div' ) );
  eh.appendChild( r2 );
  eh.appendChild( l2 );
  eh.addEventListener( 'click' , xClickEvent );
  E.fragment.appendChild( eh );
  }
var xClickEvent = function () {
  let list = [].slice.call( document.querySelectorAll( '.comparison' ) );
  let checked = [].slice.call( document.querySelectorAll( '.comparison > input:checked' ) );
  if ( checked.length == list.length ) {
    console.log( list , checked )
    while( E.resultbox.firstChild ) E.resultbox.removeChild( E.resultbox.firstChild );
    let newlist = [ gList[ gPivot ] ];
    let newpivot = gLow;
    list.forEach( function ( v , i ) {
      let g = v.id.split( '-' ).map( vv => parseInt( vv.replace( /^0{0,2}/g , '' ) ) );
      let s = parseInt( checked[ i ].value.replace( /^0{0,2}/g , '' ) );
      console.log( g , s );
      if ( s == g[ 0 ] ) newlist.push( gList[ g[ 1 ] ] );
      else {
        newlist.unshift( gList[ g[ 1 ] ] );
        newpivot++;
        }
      } );
    console.log( newlist );
    for ( let i = gLow , j = 0 ; i <= gHigh ; i++ , j++ ) gList[ i ] = newlist[ j ];
    console.log( gHigh , newpivot , gLow );
    if ( gHigh - 1 > newpivot ) gStack.push( [ newpivot + 1 , gHigh ] );
    if ( gLow  + 1 < newpivot ) gStack.push( [ gLow  , newpivot - 1 ] );
    xPopStack();
    }
  };

E.sortbutton.addEventListener( 'click' , function ( e ) {
  E.resultbox.classList.add( 'sorting' );
  gList = E.list.value.split( '\n' );
  gStack = [ [ 0 , gList.length - 1 ] ];
  gTitle = E.preset.selectedOptions[ 0 ].textContent;
  xPopStack();
  } );