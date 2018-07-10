( function () {
  String.prototype.has = function ( string ) {
    return this.match( string ) !== null;
    };

  function xAddData( title , data , link , search ) {
    if ( data ) {
      if ( data.has( /^http/ ) ) {
        return data;
        }
      else {
        return link.replace( /REPLACE/ , xToHyperLink( data ) );
        }
      }
    else {
      return search.replace( /REPLACE/ , xToHyperLink( title ) );
      }
    }

  function xSetLinks() {
    links.forEach( function ( link , i ) {
      link.href = xAddData( show.title + (  i > 0 ? '' : ' s' + ( '00' + show.season ).slice( -2 ) + 'e' + ( '00' + show.episode ).slice( -2 ) ) , show[ 'link' + i ] , urls[ 0 ][ i ] , urls[ 1 ][ i ] );
      } );
    }

  function xToHyperLink( string ) {
    return encodeURI( string.replace( / /g , '\+' ) ).replace( /'/g , '%27' );
    }

  var STORAGE = JSON.parse( localStorage.Shows );

  var links = [].slice.call( document.getElementsByClassName( 'link' ) );
  var title = decodeURI( location.hash.slice( 1 ) );
  var urls = [ [] , [] ];
    // urls[ 0 ].push( 'http://www.alluc.ee/stream/REPLACE' );
    // urls[ 0 ].push( 'http://www.alluc.ee/stream/REPLACE' );
    urls[ 0 ].push( 'https://openloadsearch.com/search.php?q=REPLACE' );
    urls[ 1 ].push( 'https://ololo.to/s/REPLACE' );
    urls[ 0 ].push( 'https://www.amazon.com/gp/product/REPLACE' );
    urls[ 1 ].push( 'http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dinstant-video&field-keywords=REPLACE+TV' );
    urls[ 0 ].push( 'https://www.hulu.com/REPLACE' );
    urls[ 1 ].push( 'https://www.hulu.com/search?q=REPLACE' );
    urls[ 0 ].push( 'http://www.imdb.com/title/REPLACE' );
    urls[ 1 ].push( 'http://www.imdb.com/find?q=REPLACE&s=tt&ttype=tv&ref_=fn_tv' );
    urls[ 0 ].push( 'http://www.netflix.com/title/REPLACE' );
    urls[ 1 ].push( 'http://www.netflix.com/search/REPLACE' );
    // urls[ 0 ].push( 'http://dwatchseries.to/serie/REPLACE' );
    // urls[ 1 ].push( 'http://dwatchseries.to/search/REPLACE' );
    urls[ 0 ].push( 'http://dwatchseries.to/serie/REPLACE' );
    urls[ 1 ].push( 'http://dwatchseries.to/#REPLACE' );
    urls[ 0 ].push( 'http://en.wikipedia.org/wiki/REPLACE' );
    urls[ 1 ].push( 'http://en.wikipedia.org/w/index.php?search=TV%20intitle:"REPLACE"&title=Special%3ASearch&fulltext=1' );

  var show = STORAGE.showlist.find( value => value.title === title );

  document.title = show.title;

  document.body.children[ 0 ].textContent = show.title;
  document.body.children[ 0 ].href = 'https://www.google.com/search?q=' + xToHyperLink( show.title );

  document.querySelector( '#level' ).value = show.level || 1;
  document.querySelector( '#season' ).value = show.season || 1;
  document.querySelector( '#episode' ).value = show.episode || 1;

  xSetLinks();

  document.querySelector( '#level' ).addEventListener( 'change' , function ( event ) {
    if( event.srcElement.value > 0 ) {
      STORAGE = JSON.parse( localStorage.Shows );
      STORAGE.showlist.find( function ( v ) {
        if ( v.title === title ) {
          v.level = event.srcElement.value;
          localStorage.Shows = JSON.stringify( STORAGE );
          }
        } );
      }
    } );
  document.querySelector( '#season' ).addEventListener( 'change' , function ( event ) {
    if( event.srcElement.value > 0 ) {
      STORAGE = JSON.parse( localStorage.Shows );
      STORAGE.showlist.find( function ( v ) {
        show.episode = document.querySelector( '#episode' ).value = 1;
        if ( v.title === title ) {
          show.season = event.srcElement.value;
          v.season = event.srcElement.value;
          localStorage.Shows = JSON.stringify( STORAGE );
          }
        } );
      xSetLinks();
      }
    } );
  document.querySelector( '#episode' ).addEventListener( 'change' , function ( event ) {
    if( event.srcElement.value > 0 ) {
      STORAGE = JSON.parse( localStorage.Shows );
      STORAGE.showlist.find( function ( v ) {
        if ( v.title === title ) {
          show.episode = event.srcElement.value;
          v.episode = event.srcElement.value;
          localStorage.Shows = JSON.stringify( STORAGE );
          }
        } );
      xSetLinks();
      }
    } );

  window.addEventListener( 'storage' , function ( event ) {
    console.log( event );
    STORAGE = JSON.parse( localStorage.Shows );
    } );

  } () );