// ( function () {

'use strict';

let ELEMENTS , ROWCOUNT , SKIP , STORAGE;

ELEMENTS = {
  main: document.getElementById( 'main' ) ,
  rows: [] ,
  };
ROWCOUNT = 0;
SKIP = false;

function xBuildRow( data ) {
  var data = data || {};

  let row = document.createElement( 'tr' );

  [ 'title' , 'level' , 'amazon' , 'hulu' , 'imdb' , 'netflix' , 'ololo' , 'watchseries' , 'wiki' , 'season' , 'episode' ].forEach( function ( v ) {
    let cell = document.createElement( 'td' );
    let input = document.createElement( 'input' );
    row.appendChild( cell );
    cell.appendChild( input );
    input.addEventListener( 'focus' , xOnFocus );
    input.type = 'text';
    input.placeholder = v;
    input.classList.add( v );
    input.value = data[ v ] || '';
    } );

  return row;
  }

function xCheckLocalStorage() {
  if ( !localStorage.Shows ) {
    localStorage.Shows = '{ "permanent": "" , "showlist": {} }';
    }
  STORAGE = JSON.parse( localStorage.Shows );
  }

function xDeleteRow() {
  let row;

  row = prompt( 'What row do you want to delete?' );

  if ( row ) {
    row = ( row * 1 ) - 1;
    }
  else {
    return false;
    }

  if ( row < 0 || row >= ROWCOUNT ) {
    return false;
    }

  ELEMENTS.main.removeChild( ELEMENTS.rows[ row ] );
  ELEMENTS.rows.splice( row , 1 );
  ROWCOUNT--;
  }

function xEventListeners() {
  let buttons;

  buttons = document.getElementById( 'buttons' ).children;

  window.addEventListener( 'keydown' , xOnKeyDown );
  buttons[ 0 ].addEventListener( 'click' , xDeleteRow );
  buttons[ 1 ].addEventListener( 'click' , xInsertRow );
  buttons[ 2 ].addEventListener( 'click' , xSaveFile );
  buttons[ 3 ].addEventListener( 'click' , xSaveLocal );
  buttons[ 4 ].addEventListener( 'click' , xSortBy.bind( undefined , xSortByLevel ) );
  buttons[ 5 ].addEventListener( 'click' , xSortBy.bind( undefined , xSortByTitle ) );
  }

function xInsertRow() {
  let row;

  row = xBuildRow();

  row.querySelector( '.level' ).value = '1';
  row.querySelector( '.season' ).value = '1';
  row.querySelector( '.episode' ).value = '1';

  ELEMENTS.main.insertBefore( row , ELEMENTS.rows[ 0 ] );
  ELEMENTS.rows.unshift( row );

  ROWCOUNT++;
  scroll( 0 , 0 );
  document.querySelector( '#main > tr:nth-child(1) > td:nth-child(1) > input[type="text"]' ).focus();
  }

function xMain() {
  let docfrag = document.createDocumentFragment();

  while ( ELEMENTS.main.childElementCount ) {
    ELEMENTS.main.removeChild( ELEMENTS.main.firstElementChild );
    }

  ROWCOUNT = STORAGE.showlist.length;

  for ( let i = 0 ; i < ROWCOUNT ; i++ ) {
    let row = xBuildRow( STORAGE.showlist[ i ] );
    docfrag.appendChild( row );
    ELEMENTS.rows.push( row );
    }

  ELEMENTS.main.appendChild( docfrag );
  }

function xOnFocus() {
  setTimeout( function ( event ) {
    event.srcElement.select();
    } , 50 , event );
  }

function xOnKeyDown() {
  if ( event.altKey || event.ctrlKey ) {
    return false;
    }

  if ( event.srcElement.tagName === 'INPUT' ) {
    if ( event.keyCode === 13 ) {
      let row = event.srcElement.parentElement.parentElement;
      let col = event.srcElement.placeholder;
      if ( event.shiftKey ) {
        row.previousSibling.querySelector( '[placeholder="' + col + '"]' ).focus();
        }
      else {
        row.nextSibling.querySelector( '[placeholder="' + col + '"]' ).focus();
        }
      }
    if ( event.keyCode === 27 ) {
      event.srcElement.blur();
      }
    }
  else {
    let i;
    for ( i = 0 ; i < ROWCOUNT ; i++ ) {
      if ( ELEMENTS.rows[ i ].firstChild.firstChild.value.toUpperCase().charCodeAt( 0 ) === event.keyCode ) {
        break;
        }
      }
    if ( i < ROWCOUNT ) {
      ELEMENTS.rows[ i ].scrollIntoViewIfNeeded();
      }
    }
  }

function xSaveData() {
  xSortBy( xSortByTitle );
  return '[\n' + ELEMENTS.rows.map( v => '{' + [].map.call( v.children , vv => '"' + vv.firstChild.placeholder + '": "' + vv.firstChild.value + '"' ).join( ', ' ) + '}' ).join( ',\n' ) + '\n]';
  }

function xSaveFile() {
  window.open( 'data:text.json,' + encodeURI( xSaveData() ) , 'Show.JSON' );
  }

function xSaveLocal() {
  STORAGE = JSON.parse( localStorage.Shows );
  STORAGE.showlist = JSON.parse( xSaveData() );
  localStorage.Shows = JSON.stringify( STORAGE );
  }

function xSortBy( sortby ) {
  let docfrag = document.createDocumentFragment();

  ELEMENTS.rows.sort( sortby );

  for ( let i = 0 ; i < ROWCOUNT ; i++ ) {
    docfrag.appendChild( ELEMENTS.rows[ i ] );
    }

  ELEMENTS.main.appendChild( docfrag );
  scrollTo( 0 , 0 );
  }

function xSortByLevel( v1 , v2 ) {
  let levels = [ v1.querySelector( '.level' ).value.toLowerCase() , v2.querySelector( '.level' ).value.toLowerCase() ];
  let titles = [ v1.querySelector( '.title' ).value.toLowerCase() , v2.querySelector( '.title' ).value.toLowerCase() ];

  if ( SKIP ) {
    titles.forEach( function SKIP( item ) {
      return item.replace( /^(the | a )/i , '' );
      } );
    }

  if ( levels[ 0 ] < levels[ 1 ] ) {
    return -1;
    }
  if ( levels[ 0 ] > levels[ 1 ] ) {
    return +1;
    }
  if ( titles[ 0 ] < titles[ 1 ] ) {
    return -1;
    }
  if ( titles[ 0 ] > titles[ 1 ] ) {
    return +1;
    }
  return 0;
  }

function xSortByTitle( v1 , v2 ) {
  let titles = [ v1.querySelector( '.title' ).value.toLowerCase() , v2.querySelector( '.title' ).value.toLowerCase() ];

  if ( SKIP ) {
    titles.forEach( function SKIP( item ) {
      return item.replace( /^(the | a )/i , '' );
      } );
    }

  if ( titles[ 0 ] < titles[ 1 ] ) {
    return -1;
    }
  if ( titles[ 0 ] > titles[ 1 ] ) {
    return +1;
    }
  return 0;
  }

if ( true ) {
xCheckLocalStorage();
xEventListeners();
xMain();
}

// }() );