// ( function () {

String.prototype.has = function ( string ) {
  return this.match( string ) !== null;
  };

function xAddData( title , site ) {
  let u = JSON.parse( JSON.stringify( urls[ site ] ) );
  let d = show[ site ];
  Object.keys( u ).forEach( function( v ) {
      let s = u[ v ].match( /\^(s+)\$/ );
      let e = u[ v ].match( /\^(e+)\$/ );
      if ( s ) u[ v ] = u[ v ].replace( /\^s+\$/ , ( '0'.repeat( s[ 1 ].length ) + show.season ).slice( -1 * Math.max( s[ 1 ].length , show.season.toString().length ) ) );
      if ( e ) u[ v ] = u[ v ].replace( /\^e+\$/ , ( '0'.repeat( e[ 1 ].length ) + show.episode ).slice( -1 * Math.max( e[ 1 ].length , show.episode.toString().length ) ) );
    } );
  if ( d && d.has( /^http/ ) ) return d;
  if ( d && u.direct ) return u.direct.replace( /REPLACE/ , xToHyperLink( d ) );
  if ( u.search ) return u.search.replace( /REPLACE/ , xToHyperLink( title ) );
  }

function xSetLinks() {
  links.forEach( function ( v , i ) {
    v.querySelector( 'a' ).href = xAddData( show.title , v.id );
    v.querySelector( 'input' ).value = show[ v.id ];
    } );
  }

function xToHyperLink( string ) {
  return encodeURI( string.replace( / /g , '\+' ) ).replace( /'/g , '%27' );
  }

var STORAGE = JSON.parse( localStorage.Shows );

var links = [].slice.call( document.getElementsByClassName( 'link' ) );
var title = decodeURI( location.hash.slice( 1 ) );
var urls = {
  'amazon': {
    direct: 'https://www.amazon.com/gp/product/REPLACE',
    search: 'http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dinstant-video&field-keywords=REPLACE+TV+season+^s$',
    },
  'hulu': {
    direct: 'https://new.hulu.com/series/REPLACE',
    search: 'https://new.hulu.com/search#REPLACE',
    },
  'imdb': {
    direct: 'http://www.imdb.com/title/REPLACE',
    search: 'http://www.imdb.com/find?q=REPLACE&s=tt&ttype=tv&ref_=fn_tv',
    },
  'netflix': {
    direct: 'http://www.netflix.com/title/REPLACE',
    search: 'http://www.netflix.com/search/REPLACE',
    },
  'ololo': {
    search: 'https://ololo.to/s/REPLACE s^ss$e^ee$',
    },
  'watchseries': {
    direct: 'http://www1.swatchseries.to/episode/REPLACE_s^s$_e^e$.html',
    search: 'http://www1.swatchseries.to/#REPLACE',
    },
  'wiki': {
    direct: 'http://en.wikipedia.org/wiki/REPLACE',
    search: 'http://en.wikipedia.org/w/index.php?search=TV%20intitle:"REPLACE"&title=Special%3ASearch&fulltext=1',
    },
  };

var show = STORAGE.showlist.find( value => value.title === title );

if ( !show ) show = { title: title };

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
        // localStorage.Shows = JSON.stringify( STORAGE );
        localStorage.setItem( 'Shows' , JSON.stringify( STORAGE ) );
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
        v.episode = 1;
        v.season = event.srcElement.value;
        // localStorage.Shows = JSON.stringify( STORAGE );
        localStorage.setItem( 'Shows' , JSON.stringify( STORAGE ) );
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
        // localStorage.Shows = JSON.stringify( STORAGE );
        localStorage.setItem( 'Shows' , JSON.stringify( STORAGE ) );
        }
      } );
    xSetLinks();
    }
  } );

links.forEach( function ( v , i , a ) {
  v.querySelector( 'input' ).addEventListener( 'change' , function ( event ) {
    STORAGE = JSON.parse( localStorage.Shows );
    STORAGE.showlist.find( function ( vv ) {
      if ( vv.title === title ) {
        show[ v.id ] = event.srcElement.value;
        vv[ v.id ] = event.srcElement.value;
        // localStorage.Shows = JSON.stringify( STORAGE );
        localStorage.setItem( 'Shows' , JSON.stringify( STORAGE ) );
        xSetLinks();
        }
      } );
    } );
  } );

window.addEventListener( 'storage' , function ( event ) {
  console.log( event );
  STORAGE = JSON.parse( localStorage.Shows );
  } , false );

// } () );