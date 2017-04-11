( function () {
  var alert , i0 , links , show , storage , title , url;

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

  function xToHyperLink( string ) {
    return encodeURI( string.replace( / /g , '\+' ) ).replace( /'/g , '\\\'' );
    }

  alert = document.getElementById( 'alert' );
  i0 = 0;
  links = document.getElementsByClassName( 'link' ).length;
  storage = JSON.parse( localStorage.Shows );
  title = location.hash.slice( 1 );
  urls = [
    [] ,
    []
    ];
    urls[ 0 ].push( 'http://www.alluc.ee/stream/REPLACE' );
    urls[ 1 ].push( 'http://www.alluc.ee/stream/REPLACE' );
    urls[ 0 ].push( 'https://www.amazon.com/gp/product/REPLACE' );
    urls[ 1 ].push( 'http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dinstant-video&field-keywords=REPLACE+TV' );
    urls[ 0 ].push( 'http://www.avclub.com/tv/REPLACE' );
    urls[ 1 ].push( 'http://www.avclub.com/search/?q=REPLACE&feature_type=tv-club' );
    urls[ 0 ].push( 'http://www.imdb.com/title/REPLACE' );
    urls[ 1 ].push( 'http://www.imdb.com/find?q=REPLACE&s=tt&ttype=tv&ref_=fn_tv' );
    urls[ 0 ].push( 'http://www.netflix.com/title/REPLACE' );
    urls[ 1 ].push( 'http://www.netflix.com/search/REPLACE' );
    urls[ 0 ].push( 'http://watchseriesgo.to/serie/REPLACE' );
    urls[ 1 ].push( 'http://watchseriesgo.to/search/REPLACE' );
    urls[ 0 ].push( 'http://en.wikipedia.org/wiki/REPLACE' );
    urls[ 1 ].push( 'http://en.wikipedia.org/w/index.php?search=TV%20intitle:"REPLACE"&title=Special%3ASearch&fulltext=1' );

  show = storage.showlist.find( value => value.title === title );

  document.title = show.title;

  alert.children[ 0 ].textContent = show.title;
  alert.children[ 0 ].href = 'https://www.google.com/search?q=' + xToHyperLink( show.title );

  while ( i0 < links ) {
    alert.children[ i0 + 1 ].href = xAddData( show.title , show[ 'link' + i0 ] , urls[ 0 ][ i0 ] , urls[ 1 ][ i0++ ] );
    }

  } () );