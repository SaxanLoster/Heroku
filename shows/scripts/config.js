( function () {

  'use strict';

  var ELEMENTS , LINKS , ROWCOUNT , SKIP , STORAGE;

  ELEMENTS = {
    main: document.getElementById( 'main' ) ,
    rows: [] ,
    };
  LINKS = 0;
  ROWCOUNT = 0;
  SKIP = false;

  function xBuildRow( data ) {
    var cells , i0 , inputs , names , row;

    data = data || {};

    names = [
      'Title' ,
      'Level' ,
      'Alluc' ,
      'Amazon Prime' ,
      'AV Club' ,
      'IMDB' ,
      'Netflix' ,
      'Watch Series' ,
      'Wikipedia' ,
      'Season',
      'Episode',
      ];

    cells = [];
    inputs = [];
    row = document.createElement( 'tr' );

    for ( i0 = 0 ; i0 < names.length ; i0++ ) {
      cells.push( document.createElement( 'td' ) );
      inputs.push( document.createElement( 'input' ) );
      row.appendChild( cells[ i0 ] );
      cells[ i0 ].appendChild( inputs[ i0 ] );
      inputs[ i0 ].addEventListener( 'focus' , xOnFocus );
      inputs[ i0 ].type = 'text';
      inputs[ i0 ].placeholder = names[ i0 ] || 'ERROR';
      }

    inputs[ 0 ].value = data.title || '';

    inputs[ 1 ].className = 'centered';
    inputs[ 1 ].value = data.level || '1';

    for ( i0 = 0 ; i0 < LINKS ; i0++ ) {
      inputs[ 2 + i0 ].value = data[ 'link' + ( i0 ) ] || '';
      }

    inputs[ 3 + i0 ].className = 'centered';
    inputs[ 3 + i0 ].value = data.season || '1';

    inputs[ 4 + i0 ].className = 'centered';
    inputs[ 4 + i0 ].value = data.episode || '1';

    return row;
    }

  function xCheckLocalStorage() {
    var i0;

    if ( !localStorage.Shows ) {
      localStorage.Shows = '{ "permanent": "" , "showlist": {} }';
      }

    STORAGE = JSON.parse( localStorage.Shows );

    for ( i0 in STORAGE.showlist[ 0 ] ) {
      if ( i0.indexOf( 'link' ) !== -1 ) {
        LINKS++;
        }
      }
    }

  function xDeleteRow() {
    var row;

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
    var buttons;

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
    var row;

    row = xBuildRow();

    ELEMENTS.main.insertBefore( row , ELEMENTS.rows[ 0 ] );
    ELEMENTS.rows.unshift( row );

    ROWCOUNT++;
    scroll( 0 , 0 );
    document.querySelector( '#main > tr:nth-child(1) > td:nth-child(1) > input[type="text"]' ).focus();
    }

  function xMain() {
    var docfrag , i0 , row;

    docfrag = document.createDocumentFragment();

    while ( ELEMENTS.main.childElementCount ) {
      ELEMENTS.main.removeChild( ELEMENTS.main.firstElementChild );
      }

    ROWCOUNT = STORAGE.showlist.length;

    for ( i0 = 0 ; i0 < ROWCOUNT ; i0++ ) {
      row = xBuildRow( STORAGE.showlist[ i0 ] );
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
    var col , i0 , row;

    if ( event.altKey || event.ctrlKey ) {
      return false;
      }

    if ( event.srcElement.tagName === 'INPUT' ) {
      if ( event.keyCode === 13 ) {
        row = event.srcElement.parentElement.parentElement;
        col = event.srcElement.placeholder;
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
      for ( i0 = 0 ; i0 < ROWCOUNT ; i0++ ) {
        if ( ELEMENTS.rows[ i0 ].firstChild.firstChild.value.toUpperCase().charCodeAt( 0 ) === event.keyCode ) {
          break;
          }
        }
      if ( i0 < ROWCOUNT ) {
        ELEMENTS.rows[ i0 ].scrollIntoViewIfNeeded();
        }
      }
    }

  function xSaveData() {
    var cells , data , i0 , i1;

    xSortBy( xSortByTitle );

    data = '[\n';

    for ( i0 = 0 ; i0 < ROWCOUNT ; i0++ ) {
      i1 = 0;
      cells = ELEMENTS.rows[ i0 ].children;
      data += '\t{';
      data += ' "title": "' + cells[ i1++ ].firstChild.value + '" ,';
      data += ' "level": "' + cells[ i1++ ].firstChild.value + '" ,';
      data += ' "link' + ( i1 - 2 ) + '": "' + cells[ i1++ ].firstChild.value + '" ,';
      data += ' "link' + ( i1 - 2 ) + '": "' + cells[ i1++ ].firstChild.value + '" ,';
      data += ' "link' + ( i1 - 2 ) + '": "' + cells[ i1++ ].firstChild.value + '" ,';
      data += ' "link' + ( i1 - 2 ) + '": "' + cells[ i1++ ].firstChild.value + '" ,';
      data += ' "link' + ( i1 - 2 ) + '": "' + cells[ i1++ ].firstChild.value + '" ,';
      data += ' "link' + ( i1 - 2 ) + '": "' + cells[ i1++ ].firstChild.value + '" ,';
      data += ' "season": "' + cells[ i1++ ].firstChild.value + '" ,';
      data += ' "episode": "' + cells[ i1++ ].firstChild.value + '" ';
      data += i0 < ROWCOUNT - 1 ? '},\n' : '}\n';
      }

    data += ']';

    return data;
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
    var docfrag , i0;

    docfrag = document.createDocumentFragment();

    ELEMENTS.rows.sort( sortby );

    for ( i0 = 0 ; i0 < ROWCOUNT ; i0++ ) {
      docfrag.appendChild( ELEMENTS.rows[ i0 ] );
      }

    ELEMENTS.main.appendChild( docfrag );
    scrollTo( 0 , 0 );
    }

  function xSortByLevel( p0 , p1 ) {
    var levels , titles;

    levels = [ p0.firstChild.nextSibling.firstChild.value , p1.firstChild.nextSibling.firstChild.value ];
    titles = [ p0.firstChild.firstChild.value.toLowerCase() , p1.firstChild.firstChild.value.toLowerCase() ];

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

  function xSortByTitle( p0 , p1 ) {
    var titles;

    titles = [ p0.firstChild.firstChild.value.toLowerCase() , p1.firstChild.firstChild.value.toLowerCase() ];

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

  xCheckLocalStorage();
  xEventListeners();
  xMain();
  }() );