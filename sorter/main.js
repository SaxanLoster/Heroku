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

var xSort = function () {
  var list = E.list.value && E.list.value.split( '\n' );
  if ( list.length == 0 ) return false;
  var result = [];

  var xSetCompare = function ( v1 , v2 ) {
    if ( i == 0 ) f = false;
    while( E.resultbox.firstChild ) E.resultbox.removeChild( E.resultbox.firstChild );
    e = document.createElement( 'button' );
    e.textContent = v1;
    e.addEventListener( 'click' , function ( event ) {
      i++;
      if ( i >= list.length -1 ) i = 0;
      if ( i === 0 && !f ) {
        E.list.value = list.join( '\n' );
        while( E.resultbox.firstChild ) E.resultbox.removeChild( E.resultbox.firstChild );
        }
      else xSetCompare( list[ i ] , list[ i + 1 ] );
      } );
    E.resultbox.appendChild( e );
    e = document.createElement( 'button' );
    e.textContent = v2;
    e.addEventListener( 'click' , function ( event ) {
      var t = list[ i ];
      list[ i ] = list[ i + 1 ];
      list[ i + 1 ] = t;
      i++;
      f = true;
      if ( i >= list.length - 1 ) i = 0;
      xSetCompare( list[ i ] , list[ i + 1 ] );
      } );
    E.resultbox.appendChild( e );
    };

  var i = 0 , f = false;

  xSetCompare( list[ i ] , list[ i + 1 ] );
  };

E.sortbutton.addEventListener( 'click' , xSort );