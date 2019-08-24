var UTILITY;

UTILITY = ( function () {

'use strict';

var BOOLEANS , CLICKINFO , COLSINFO , ELEMENTS , MAININFO , ROWSINFO , SHOWINFO , STORAGE , STYLESHEET;

BOOLEANS = {
  debugmode: !true ,
  lefttoright: !true ,
  minimunsize: !true ,
  maintainsize: !true ,
  permanent: !true ,
  };
CLICKINFO = {
  elem1: null ,
  elem2: null ,
  time1: null ,
  time2: null ,
  };
COLSINFO = {
  count: 0 ,
  max: 0 ,
  };
ELEMENTS = {
  buttons: document.getElementById( 'buttons' ) ,
  shows: document.getElementById( 'shows' ) ,
  };
MAININFO = {
  buttonsheight: 50 ,
  links: document.getElementsByClassName( 'link' ).length ,
  showsheight: 0 ,
  showswidth: 0 ,
  };
ROWSINFO = {
  count: 0 ,
  max: 0 ,
  };
SHOWINFO = {
  all: [] ,
  baseheight: 80 ,
  basewidth: 300 ,
  display: [] ,
  height: 0 ,
  hidden: [] ,
  levels: [] ,
  max: 0 ,
  permanent: [] ,
  visible: [] ,
  width: 0 ,
  };

Array.prototype.has = function ( string ) {
  var result = false;

  for ( var iter1 = 0 ; iter1 < this.length ; iter1++ ) {
    if ( this[ iter1 ] == string ) {
      result = true;
      }
    }

  return result;
  };
String.prototype.has = function ( string ) {
  return this.match( string ) !== null;
  };

function xCheckLocalStorage() {
  var i0;

  if ( !localStorage.Shows ) {
    localStorage.Shows = '{ "permanent": "" , "showlist": {} }';
    }

  STORAGE = JSON.parse( localStorage.Shows );

  for ( i0 = 0 ; i0 < STORAGE.showlist.length ; i0++ ) {
    if ( !SHOWINFO.levels.has( 'level' + STORAGE.showlist[ i0 ].level ) ) {
      SHOWINFO.levels.push( 'level' + STORAGE.showlist[ i0 ].level );
      }
    }

  SHOWINFO.levels.sort();
  }

function xCountDisplay() {
  var i0;

  SHOWINFO.display = [];

  for ( i0 = 0 ; i0 < SHOWINFO.all.length ; i0++ ) {
    if ( SHOWINFO.all[ i0 ].offsetWidth && SHOWINFO.all[ i0 ].offsetHeight ) {
      SHOWINFO.display.push( SHOWINFO.all[ i0 ] );
      }
    }
  }

function xCountVisible() {
  var e0 , i0 , i1;

  SHOWINFO.visible = [];

  /*for ( i0 = 0 ; i0 < SHOWINFO.display.length ; i0++ ) {
    var temp1 = SHOWINFO.display[ i0 ].offsetLeft >= window.scrollX;
    var temp2 = SHOWINFO.display[ i0 ].offsetTop >= window.scrollY;
    var temp3 = SHOWINFO.display[ i0 ].offsetLeft <= window.scrollX + MAININFO.showswidth;
    var temp4 = SHOWINFO.display[ i0 ].offsetTop <= window.scrollY + MAININFO.showsheight;
    if ( temp1 && temp2 && temp3 && temp4 ) {
      SHOWINFO.visible.push( SHOWINFO.display[ i0 ] );
      break;
      }
    }*/


  i0 = !BOOLEANS.lefttoright ? Math.round( window.scrollX / SHOWINFO.width ) * ROWSINFO.count : Math.round( window.scrollY / SHOWINFO.height ) * COLSINFO.count;

  for ( i0 , i1 = 0 ; i0 < SHOWINFO.display.length && i1 < SHOWINFO.max ; i0++ , i1++ ) {
    SHOWINFO.visible.push( SHOWINFO.display[ i0 ] );
    }
  }

function xCreateButtons() {
  var docfrag , i0 , newbutton;

  docfrag = document.createDocumentFragment();

  newbutton = document.createElement( 'input' );
  newbutton.id = 'level0';
  newbutton.onmousedown = xOnConfigureClick;
  newbutton.type = 'button';
  docfrag.appendChild( newbutton );

  for ( i0 = 0 ; i0 < SHOWINFO.levels.length ; i0++ ) {
    newbutton = document.createElement( 'input' );
    newbutton.id = SHOWINFO.levels[ i0 ];
    newbutton.onmousedown = xOnLevelClick;
    newbutton.type = 'button';
    docfrag.appendChild( newbutton );
    }

  ELEMENTS.buttons.appendChild( docfrag );
  }

function xCreateShows() {
  var docfrag , i0 , newshow , urls;

  docfrag = document.createDocumentFragment();

  for ( i0 = 0 ; i0 < STORAGE.showlist.length ; i0++ ) {
    newshow = document.createElement( 'a' );
    newshow.className = 'show level' + STORAGE.showlist[ i0 ].level;
    newshow.id = STORAGE.showlist[ i0 ].title;
    newshow.href = 'show.html#' + STORAGE.showlist[ i0 ].title;
    newshow.onmousedown = xOnShowClick;
    newshow.onclick = function( event ) { event.preventDefault(); }
    newshow.type = 'button';
    newshow.value = newshow.textContent = STORAGE.showlist[ i0 ].title;
    docfrag.appendChild( newshow );
    SHOWINFO.all.push( newshow );
    }

  ELEMENTS.shows.appendChild( docfrag );
  xEditStyle( '#shows .perm' , 'display' , 'block' );

  for ( i0 = 0 ; i0 < STORAGE.permanent.length ; i0++ ) {
    try {
      document.getElementById( STORAGE.permanent[ i0 ] ).classList.add( 'perm' );
      }
    catch ( e ) {
      console.log( STORAGE.permanent[ i0 ] , e );
      }
    }
  }

function xDeclareStyleSheet() {
  STYLESHEET = document.createElement( 'style' );
  document.head.appendChild( STYLESHEET );
  STYLESHEET.sheet.addRule( '#shows *' );

  for ( var i0 = 0 ; i0 < SHOWINFO.levels.length ; i0++ ) {
    STYLESHEET.sheet.addRule( '#shows .' + SHOWINFO.levels[ i0 ] );
    }

  STYLESHEET.sheet.addRule( '#shows .perm' );
  }

function xEditStyle( selector , property , value ) {
  var i0 , rules;
  rules = STYLESHEET.sheet.cssRules || STYLESHEET.sheet.rules;
  for ( i0 = 0 ; i0 < rules.length ; i0++ ) {
    if ( rules[ i0 ].type === 1 ) {
      if ( selector === rules[ i0 ].selectorText.toLowerCase() ) {
        rules[ i0 ].style[ property ] = value;
        return true;
        }
      }
    }
  try {
    STYLESHEET.sheet.insertRule( selector + '{  }' , rules.length );
    }
  catch ( error ) {
    STYLESHEET.sheet.addRule( selector , '' , rules.length );
    }
  rules[ rules.length - 1 ].selectorText = selector;
  rules[ rules.length - 1 ].style[ property ] = value;
  }

function xHideAllShows() {
  var i0;
  for ( i0 = 0 ; i0 < ELEMENTS.buttons.children.length ; i0++ ) {
    ELEMENTS.buttons.children[ i0 ].classList.remove( 'active' );
    }
  for ( i0 = 0 ; i0 < SHOWINFO.levels.length ; i0++ ) {
    xEditStyle( '#shows .' + SHOWINFO.levels[ i0 ] , 'display' , '' );
    }
  }

function xMainDisplayFunctions() {
  COLSINFO.max = Math.floor( MAININFO.showswidth / SHOWINFO.basewidth );
  ROWSINFO.max = Math.floor( MAININFO.showsheight / SHOWINFO.baseheight );
  SHOWINFO.max = COLSINFO.max * ROWSINFO.max;
  xCountDisplay();
  xCountVisible();
  if ( !BOOLEANS.maintainsize ) {
    xRowsAndColumns();
    }
  xStyleElements();
  }

function xOnConfigureClick() {
  switch ( event.button ) {
    case 0:
      BOOLEANS.maintainsize = !BOOLEANS.maintainsize;
      xMainDisplayFunctions();
      break;
    case 1:
      BOOLEANS.lefttoright = !BOOLEANS.lefttoright;
      BOOLEANS.maintainsize = !true;
      xMainDisplayFunctions();
      break;
    case 2:
      if ( SHOWINFO.hidden.length > 0 ) {
        SHOWINFO.hidden.pop().classList.remove( 'hide' );
        BOOLEANS.maintainsize = !true;
        }
      xMainDisplayFunctions();
      break;
      }
  }

function xOnLevelClick() {
  switch ( event.button ) {
    case 0:
      this.classList.toggle( 'active' );
      if ( this.classList.contains( 'active' ) ) {
        if ( !BOOLEANS.permanent ) {
          xEditStyle( '#shows .perm' , 'display' , '' );
          }
        xEditStyle( '#shows .' + this.id , 'display' , 'block' );
        }
      else {
        xEditStyle( '#shows .' + this.id , 'display' , '' );
        if ( document.getElementsByClassName( 'active' ).length === 0 ) {
          xEditStyle( '#shows .perm' , 'display' , 'block' );
          }
        }
      BOOLEANS.maintainsize = !true;
      xMainDisplayFunctions();
      break;
    case 1:
      xHideAllShows();
      this.classList.add( 'active' );
      if ( !BOOLEANS.permanent ) {
        xEditStyle( '#shows .perm' , 'display' , '' );
        }
      xEditStyle( '#shows .' + this.id , 'display' , 'block' );
      BOOLEANS.maintainsize = !true;
      xMainDisplayFunctions();
      break;
    case 2:
      xHideAllShows();
      if ( !BOOLEANS.permanent ) {
        xEditStyle( '#shows .perm' , 'display' , 'block' );
        }
      BOOLEANS.maintainsize = !true;
      xMainDisplayFunctions();
      break;
      }
  }

function xOnResize() {
  scrollTo( 0 , 0 );
  MAININFO.showsheight = window.innerHeight - MAININFO.buttonsheight;
  MAININFO.showswidth = window.innerWidth;
  xMainDisplayFunctions();
  }

function xOnScroll() {
  var direction;

  if ( !event.ctrlKey ) {
    event.preventDefault();
    direction = event.deltaY > 0 ? 1 : -1;
    if ( BOOLEANS.lefttoright ) {
      scrollBy( 0 , direction * SHOWINFO.height );
      }
    else {
      scrollBy( direction * SHOWINFO.width , 0 );
      }
    }
  xStyleElements();
  }

function xOnShowClick( event ) {
  if ( event.button === 1 || ( event.button === 0 && event.ctrlKey ) ) {
    // window.open( 'show.html#' + this.id );
    }
  else if ( event.button === 0 ) {
    event.preventDefault();
    CLICKINFO.elem1 = CLICKINFO.elem2;
    CLICKINFO.elem2 = event.toElement;
    CLICKINFO.time1 = CLICKINFO.time2;
    CLICKINFO.time2 = event.timeStamp;
    if ( ( CLICKINFO.time2 - CLICKINFO.time1 ) < 250 && CLICKINFO.elem1 === CLICKINFO.elem2 ) {
      if ( STORAGE.permanent.has( this.id ) ) {
        this.classList.remove( 'perm' );
        }
      else {
        this.classList.add( 'perm' );
        }
      xPermanentItemToggle( this.id );
      xMainDisplayFunctions();
      }
    }
  else if ( event.button === 2 ) {
    this.classList.add( 'hide' );
    SHOWINFO.hidden.push( this );
    xMainDisplayFunctions();
    }
  else {
    console.log( event );
    }
  }

function xOnStart() {
  xCheckLocalStorage();
  xDeclareStyleSheet();
  xCreateButtons();
  xCreateShows();
  xOnResize();
  window.addEventListener( 'resize' , xOnResize );
  document.body.addEventListener( 'contextmenu' , xPreventActions );
  // document.body.addEventListener( 'keydown' , xPreventActions );
  document.body.addEventListener( 'mousedown' , xPreventActions );
  document.body.addEventListener( 'mousewheel' , xOnScroll , { passive: false } );
  }

function xPermanentItemToggle( show ) {
  if ( STORAGE.permanent.has( show ) ) {
    STORAGE.permanent.splice( STORAGE.permanent.indexOf( show ) , 1 );
    }
  else {
    STORAGE.permanent.push( show );
    }
  STORAGE.permanent.sort();
  localStorage.Shows = localStorage.Shows.replace( /\[.+?\]/ , JSON.stringify( STORAGE.permanent ) );
  }

function xPreventActions( event ) {
  var alphabet , selectall , type;

  alphabet = event.which >= 65 && event.which <= 90 && !event.ctrlKey;
  selectall = event.which == 65 && event.ctrlKey;
  type = event.type.match( /contextmenu|mousedown|wheel/ ) !== null;

  if ( alphabet || selectall || type ) {
    event.preventDefault();
    }
  }

function xRowsAndColumns() {
  if ( SHOWINFO.display.length <= SHOWINFO.max ) {
    if ( BOOLEANS.minimunsize ) {
      COLSINFO.count = COLSINFO.max;
      ROWSINFO.count = ROWSINFO.max;
      }
    else {
      COLSINFO.count = Math.ceil( SHOWINFO.display.length / ROWSINFO.max );
      ROWSINFO.count = Math.ceil( SHOWINFO.display.length / COLSINFO.count );
      }
    }
  else {
    if ( BOOLEANS.lefttoright ) {
      COLSINFO.count = COLSINFO.max;
      ROWSINFO.count = Math.ceil( SHOWINFO.display.length / COLSINFO.max );
      }
    else {
      COLSINFO.count = Math.ceil( SHOWINFO.display.length / ROWSINFO.max );
      ROWSINFO.count = ROWSINFO.max;
      }
    }
  }

function xStyleElements() {
  var columns , i0 , leftright , margin , middle , order;

  SHOWINFO.height = Math.floor( MAININFO.showsheight / Math.min( ROWSINFO.count , ROWSINFO.max ) );
  SHOWINFO.width = Math.floor( MAININFO.showswidth / Math.min( COLSINFO.count , COLSINFO.max ) );

  margin = ( MAININFO.showsheight - SHOWINFO.height * Math.min( ROWSINFO.count , ROWSINFO.max ) ) / 2;

  xEditStyle( '#shows .show' , 'height' , SHOWINFO.height + 'px' );
  xEditStyle( '#shows .show' , 'lineHeight' , SHOWINFO.height + 'px' );
  xEditStyle( '#shows .show' , 'width' , SHOWINFO.width + 'px' );

  ELEMENTS.shows.style.height = SHOWINFO.height * ROWSINFO.count + 'px';
  ELEMENTS.shows.style.marginBottom = margin + MAININFO.buttonsheight + 'px';
  ELEMENTS.shows.style.marginTop = margin + 'px';
  ELEMENTS.shows.style.width = SHOWINFO.width * COLSINFO.count + 'px';
  ELEMENTS.shows.style.webkitColumnCount = BOOLEANS.lefttoright ? '' : COLSINFO.count;

  xCountVisible();

  columns = Math.min( COLSINFO.count , COLSINFO.max );
  leftright = true;
  middle = ( columns - 1 ) / 2;
  order = [];

  for ( i0 = 0 ; i0 < columns ; i0++ ) {
    if ( i0 === middle ) {
      order.push( 'center' );
      }
    else {
      if ( leftright ) {
        order.push( 'left' );
        }
      else {
        order.push( 'right' );
        }
      leftright = !leftright;
      }
    }
  if ( BOOLEANS.lefttoright ) {
    for ( i0 = 0 ; i0 < SHOWINFO.visible.length ; i0++ ) {
      SHOWINFO.visible[ i0 ].style.textAlign = order[ i0 % COLSINFO.count ];
      }
    }
  if ( !BOOLEANS.lefttoright ) {
    for ( i0 = 0 ; i0 < SHOWINFO.visible.length ; i0++ ) {
      SHOWINFO.visible[ i0 ].style.textAlign = order[ Math.floor( i0 / ROWSINFO.count ) ];
      }
    }
  }

xOnStart();

return {
  xGetGlobals: function () {
    return {
      BOOLEANS: BOOLEANS,
      CLICKINFO: CLICKINFO,
      COLSINFO: COLSINFO,
      ELEMENTS: ELEMENTS,
      MAININFO: MAININFO,
      ROWSINFO: ROWSINFO,
      SHOWINFO: SHOWINFO,
      STORAGE: STORAGE,
      STYLESHEET: STYLESHEET,
      }
    },
  xToggleDebug: function () {
    BOOLEANS.debugmode = !BOOLEANS.debugmode;
    console.log( 'Debug is %s' , BOOLEANS.debugmode )
    },
  };
}() );