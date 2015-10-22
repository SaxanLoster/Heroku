( function () {

  var booleans = {
    lefttoright: !true,
    minimunsize: !true,
    maintainsize: !true,
    permanent: !true,
    }
  var clickinfo = {
    elem1: null,
    elem2: null,
    time1: null,
    time2: null,
    }
  var colsinfo = {
    count: 0,
    max: 0,
    }
  var elements = {
    alert: document.getElementById( 'alert' ),
    buttons: document.getElementById( 'buttons' ),
    shows: document.getElementById( 'shows' ),
    }
  var maininfo = {
    buttonsheight: 50,
    showsheight: 0,
    showswidth: 0,
    }
  var rowsinfo = {
    count: 0,
    max: 0,
    }
  var showinfo = {
    all: document.getElementById( 'shows' ).children,
    baseheight: 80,
    basewidth: 300,
    display: [],
    height: 0,
    hidden: [],
    levels: [],
    max: 0,
    permanent: [],
    visible: [],
    width: 0,
    }
  var showlist
  var storage
  var stylesheet

  Array.prototype.has = function( string ){
    var bool = false
    for ( var iter1 = 0 ; iter1 < this.length ; iter1++ ) {
      if ( this[ iter1 ] == string ) {
        bool = true
        }
      }
    return bool
    }
  String.prototype.has = function( string ){
    return this.match( string ) !== null
    }

  var CheckLocalStorage = function () {
    if ( !localStorage.Shows ) {
      localStorage.Shows = '{\
        "backup": {},\
        "failure": {},\
        "permanent": "",\
        "showlist": {},\
        "user": "basic",\
        "watchseries": "watch-series-tv.to"\
        }'
      }
    storage = JSON.parse( localStorage.Shows )
    try {
      showlist = storage.showlist
      storage.backup = storage.showlist
      }
    catch ( e ) {
      storage.failure = storage.showlist
      storage.showlist = storage.backup
      showlist = JSON.parse( storage.showlist )
      }
    localStorage.Shows = JSON.stringify( storage )
    for ( var iter1 = 0 ; iter1 < showlist.length ; iter1++ ) {
      if ( !showinfo.levels.has( 'level' + showlist[ iter1 ].level ) ) {
        showinfo.levels.push( 'level' + showlist[ iter1 ].level )
        }
      }
    showinfo.levels.sort()
    }
  var CountDisplay = function () {
    showinfo.display = []
    for ( var iter1 = 0 ; iter1 < showinfo.all.length ; iter1++ ) {
      if ( showinfo.all[ iter1 ].offsetWidth && showinfo.all[ iter1 ].offsetHeight ) {
        showinfo.display.push( showinfo.all[ iter1 ] )
        }
      }
    }
  var CountVisible = function () {
    showinfo.visible = []
    for ( var iter1 = 0 ; iter1 < showinfo.display.length ; iter1++ ) {
      var temp1 = showinfo.display[ iter1 ].offsetLeft >= window.scrollX
      var temp2 = showinfo.display[ iter1 ].offsetTop >= window.scrollY
      var temp3 = showinfo.display[ iter1 ].offsetLeft <= window.scrollX + maininfo.showswidth
      var temp4 = showinfo.display[ iter1 ].offsetTop <= window.scrollY + maininfo.showsheight
      if ( temp1 && temp2 && temp3 && temp4 ) {
        showinfo.visible.push( showinfo.display[ iter1 ] )
        }
      }
    }
  var CreateAlert = function () {
    elements.alert.querySelector( 'input' ).addEventListener( 'click' , function ( event ) {
      elements.alert.removeAttribute( 'style' )
      } )
    }
  var CreateButtons = function () {
    RemoveChildNodes( elements.buttons )
    var e1 = document.createElement( 'input' )
    elements.buttons.appendChild( e1 )
    e1.id = 'level0'
    e1.onmousedown = OnConfigureClick
    e1.type = 'button'
    e1.value = storage.user !== 'advanced' ? 'Configure' : ''
    for ( var iter1 = 0 ; iter1 < showinfo.levels.length && showinfo.levels.length > 1 ; iter1++ ) {
      var e1 = document.createElement( 'input' )
      elements.buttons.appendChild( e1 )
      e1.id = showinfo.levels[ iter1 ]
      e1.onmousedown = OnLevelClick
      e1.type = 'button'
      e1.value = storage.user !== 'advanced' ? 'Level ' + ( iter1 + 1 ) : ''
      }
    }
  var CreateShows = function () {
    RemoveChildNodes( elements.shows )
    var AddData = function ( title , data , link , search ) {
      if ( data ) {
        if ( data.has( /^http/ ) ) {
          return data
          }
        else {
          return link.replace( /REPLACE/ , ToHyperLink( data ) )
          }
        }
      else {
        return search.replace( /REPLACE/ , ToHyperLink( title ) )
        }
      }
    var amazonlink = ''
    var amazonsearch = 'http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dinstant-video&field-keywords=REPLACE+TV'
    var imdblink = 'http://www.imdb.com/title/REPLACE'
    var imdbsearch = 'http://www.imdb.com/find?q=REPLACE%20TV&s=tt'
    var netflixlink = 'http://www.netflix.com/title/REPLACE'
    var netflixsearch = 'http://www.netflix.com/search/REPLACE'
    var watchserieslink = 'http://' + storage.watchseries + '/serie/REPLACE'
    var watchseriessearch = 'http://' + storage.watchseries + '/search/REPLACE'
    var wikipedialink = 'http://en.wikipedia.org/wiki/REPLACE'
    var wikipediasearch = 'http://en.wikipedia.org/w/index.php?search=REPLACE%20TV&title=Special%3ASearch&fulltext=1'
    for ( var iter1 = 0 ; iter1 < showlist.length ; iter1++ ) {
      var show = document.createElement( 'input' )
      elements.shows.appendChild( show )
      show.classList.add( 'level' + showlist[ iter1 ].level )
      show.dataset.amazon = AddData( showlist[ iter1 ].title , showlist[ iter1 ].amazon , amazonlink , amazonsearch )
      show.dataset.imdb = AddData( showlist[ iter1 ].title , showlist[ iter1 ].imdb , imdblink , imdbsearch )
      show.dataset.netflix = AddData( showlist[ iter1 ].title , showlist[ iter1 ].netflix , netflixlink , netflixsearch )
      show.dataset.watchseries = AddData( showlist[ iter1 ].title , showlist[ iter1 ].watchseries , watchserieslink , watchseriessearch )
      show.dataset.wikipedia = AddData( showlist[ iter1 ].title , showlist[ iter1 ].wikipedia , wikipedialink , wikipediasearch )
      show.id = showlist[ iter1 ].title
      show.onmousedown = OnShowClick
      show.value = showlist[ iter1 ].title
      show.type = 'button'
      }
    if ( storage.user !== 'advanced' || showinfo.levels.length === 1 ) {
      EditStyle( '#shows .level1' , 'display' , 'block' )
      if ( document.querySelector( '#level1' ) ) {
        document.querySelector( '#level1' ).classList.add( 'active' )
        }
      }
    else {
      EditStyle( '#shows .perm' , 'display' , 'block' )
      if ( storage.permanent !== '' ) {
        showinfo.permanent = storage.permanent.split( '|' )
        }
      for ( var iter1 = 0 ; iter1 < showinfo.permanent.length ; iter1++ ) {
        try {
          showinfo.all[ showinfo.permanent[ iter1 ] ].classList.add( 'perm' )
          }
        catch ( e ) {}
        }
      }
    }
  var DeclareStyleSheet = function () {
    stylesheet = document.createElement( 'style' )
    document.head.appendChild( stylesheet )
    stylesheet.sheet.addRule( '#shows *' )

    for ( var iter1 = 0 ; iter1 < showinfo.levels.length ; iter1++ ) {
      stylesheet.sheet.addRule( '#shows .' + showinfo.levels[ iter1 ] )
      }

    stylesheet.sheet.addRule( '#shows .perm' )
    }
  var EditStyle = function ( selector , property , value ) {
    var selector = selector.toLowerCase()
    var value = typeof value === 'number' ? value.toString() : value
    var rules = stylesheet.sheet.cssRules || stylesheet.sheet.rules
    for ( var iter1 = 0 ; iter1 < rules.length ; iter1++ ) {
      if ( rules[ iter1 ].type === 1 ) {
        if ( selector === rules[ iter1 ].selectorText.toLowerCase() ) {
          rules[ iter1 ].style[ property ] = value
          return true
          }
        }
      }
    try {
      stylesheet.sheet.insertRule( selector + '{  }' , rules.length )
      }
    catch ( error ) {
      stylesheet.sheet.addRule( selector , '' , rules.length )
      }
    rules[ rules.length - 1 ].selectorText = selector
    rules[ rules.length - 1 ].style[ property ] = value
    }
  var HideAllShows = function () {
    var inputs = document.getElementsByTagName( 'input' )
    for ( var iter1 = 0 ; iter1 < inputs.length ; iter1++ ) {
      inputs[ iter1 ].classList.remove( 'active' )
      }
    for ( var iter1 = 0 ; iter1 < showinfo.levels.length ; iter1++ ) {
      EditStyle( '#shows .' + showinfo.levels[ iter1 ] , 'display' , '' )
      }
    }
  var MainDisplayFunctions = function () {
    colsinfo.max = Math.floor( maininfo.showswidth / showinfo.basewidth )
    rowsinfo.max = Math.floor( maininfo.showsheight / showinfo.baseheight )
    showinfo.max = colsinfo.max * rowsinfo.max
    CountDisplay()
    CountVisible()
    if ( !booleans.maintainsize ) {
      RowsAndColumns()
      }
    StyleElements()
    }
  var OnChange = function () {
    scrollTo( 0 , 0 )
    maininfo.showsheight = innerHeight - maininfo.buttonsheight
    maininfo.showswidth = innerWidth
    MainDisplayFunctions()
    }
  var OnConfigureClick = function () {
    if ( storage.user !== 'advanced' ) {
      window.open( 'config.html' )
      }
    else if ( event.button === 0 ) {
      booleans.maintainsize = !booleans.maintainsize
      MainDisplayFunctions()
      }
    else if ( event.button === 1 ) {
      booleans.lefttoright = !booleans.lefttoright
      booleans.maintainsize = !true
      MainDisplayFunctions()
      }
    else if ( event.button === 2 ) {
      if ( showinfo.hidden.length > 0 ) {
        showinfo.hidden.pop().classList.remove( 'hide' )
        booleans.maintainsize = !true
        }
      MainDisplayFunctions()
      }
    else {
      console.log( event )
      }
    }
  var OnLevelClick = function () {
    switch ( event.button ) {
      case 0 :
        this.classList.toggle( 'active' )
        if ( this.classList.contains( 'active' ) ) {
          if ( !booleans.permanent ) {
            EditStyle( '#shows .perm' , 'display' , '' )
            }
          EditStyle( '#shows .' + this.id , 'display' , 'block' )
          }
        else {
          EditStyle( '#shows .' + this.id , 'display' , '' )
          if ( document.getElementsByClassName( 'active' ).length === 0 ) {
            EditStyle( '#shows .perm' , 'display' , 'block' )
            }
          }
        booleans.maintainsize = !true
        MainDisplayFunctions()
        break
      case 1 :
        HideAllShows()
        this.classList.add( 'active' )
        if ( !booleans.permanent ) {
          EditStyle( '#shows .perm' , 'display' , '' )
          }
        EditStyle( '#shows .' + this.id , 'display' , 'block' )
        booleans.maintainsize = !true
        MainDisplayFunctions()
        break
      case 2 :
        HideAllShows()
        if ( !booleans.permanent ) {
          EditStyle( '#shows .perm' , 'display' , 'block' )
          }
        booleans.maintainsize = !true
        MainDisplayFunctions()
        break
      }
    }
  var OnScroll = function () {
    if ( event.srcElement.id === 'AlertCenter' || event.srcElement.parentNode.id === 'AlertCenter' ) {}
    else {
      if ( !event.ctrlKey ) {
        event.preventDefault()
        var temp1 = event.deltaY > 0 ? 1 : -1
        if ( booleans.lefttoright ) {
          scrollBy( 0 , temp1 * showinfo.height )
          }
        else {
          scrollBy( temp1 * showinfo.width , 0 )
          }
        }
      StyleElements()
      }
    }
  var OnShowClick = function () {
    if ( storage.user !== 'advanced' || event.button === 1 || ( event.button === 0 && event.ctrlKey ) ) {
      ShowLinks( this )
      }
    else if ( event.button === 0 ) {
      clickinfo.elem1 = clickinfo.elem2
      clickinfo.elem2 = event.toElement
      clickinfo.time1 = clickinfo.time2
      clickinfo.time2 = event.timeStamp
      if ( ( clickinfo.time2 - clickinfo.time1 ) < 250 && clickinfo.elem1 === clickinfo.elem2 ) {
        showinfo.permanent.has( this.id ) ? this.classList.remove( 'perm' ) : this.classList.add( 'perm' )
        PermanentItemToggle( this.id )
        MainDisplayFunctions()
        }
      }
    else if ( event.button === 2 ) {
      this.classList.add( 'hide' )
      showinfo.hidden.push( this )
      MainDisplayFunctions()
      }
    else {
      console.log( event )
      }
    }
  var OnStart = function () {
    CheckLocalStorage()
    DeclareStyleSheet()
    CreateAlert()
    CreateButtons()
    CreateShows()
    OnChange()
    window.addEventListener( 'resize' , OnChange )
    document.body.addEventListener( 'contextmenu' , PreventActions )
    document.body.addEventListener( 'keydown' , PreventActions )
    document.body.addEventListener( 'mousedown' , PreventActions )
    document.body.addEventListener( 'mousewheel' , OnScroll )
    }
  var PermanentItemToggle = function ( show ) {
    if ( showinfo.permanent.has( show ) ) {
      showinfo.permanent.splice( showinfo.permanent.indexOf( show ) , 1 )
      }
    else {
      showinfo.permanent.push( show )
      }
    showinfo.permanent.sort()
    storage.permanent = showinfo.permanent.join( '|' )
    localStorage.Shows = JSON.stringify( storage )
    }
  var PreventActions = function ( event ) {
    var alphabet  = event.which >= 65 && event.which <= 90 && !event.ctrlKey
    var selectall = event.which == 65 && event.ctrlKey
    var type = event.type.match( /contextmenu|mousedown|wheel/ ) !== null
    if( alphabet || selectall || type ) event.preventDefault()
    }
  var RemoveChildNodes = function ( element ) {
    while( element.childNodes.length > 0 ) element.removeChild( element.firstChild )
    }
  var RowsAndColumns = function () {
    if ( showinfo.display.length <= showinfo.max ) {
      if ( booleans.minimunsize ) {
        colsinfo.count = colsinfo.max
        rowsinfo.count = rowsinfo.max
        }
      else {
        colsinfo.count = Math.ceil( showinfo.display.length / rowsinfo.max )
        rowsinfo.count = Math.ceil( showinfo.display.length / colsinfo.count )
        }
      }
    else {
      if ( booleans.lefttoright ) {
        colsinfo.count = colsinfo.max
        rowsinfo.count = Math.ceil( showinfo.display.length / colsinfo.max )
        }
      else {
        colsinfo.count = Math.ceil( showinfo.display.length / rowsinfo.max )
        rowsinfo.count = rowsinfo.max
        }
      }
    }
  var ShowLinks = function ( show ) {
    elements.alert.children[ 0 ].textContent = show.id
    elements.alert.children[ 0 ].href = 'https://www.google.com/search?q=' + ToHyperLink( show.id )
    elements.alert.children[ 1 ].href = show.dataset.amazon
    elements.alert.children[ 2 ].href = show.dataset.imdb
    elements.alert.children[ 3 ].href = show.dataset.netflix
    elements.alert.children[ 4 ].href = show.dataset.watchseries
    elements.alert.children[ 5 ].href = show.dataset.wikipedia

    elements.alert.style.display = 'flex'
    }
  var StyleElements = function () {
    showinfo.height = Math.floor( maininfo.showsheight / Math.min( rowsinfo.count , rowsinfo.max ) )
    showinfo.width = Math.floor( maininfo.showswidth / Math.min( colsinfo.count , colsinfo.max ) )

    var margin = ( maininfo.showsheight - showinfo.height * Math.min( rowsinfo.count , rowsinfo.max ) ) / 2

    EditStyle( '#shows *' , 'height' , showinfo.height + 'px' )
    EditStyle( '#shows *' , 'lineHeight' , showinfo.height + 'px' )
    EditStyle( '#shows *' , 'width' , showinfo.width  + 'px' )

    elements.shows.style.height = showinfo.height * rowsinfo.count + 'px'
    elements.shows.style.marginBottom = margin + maininfo.buttonsheight + 'px'
    elements.shows.style.marginTop = margin + 'px'
    elements.shows.style.width = showinfo.width  * colsinfo.count + 'px'
    elements.shows.style.webkitColumnCount = booleans.lefttoright ? '' : colsinfo.count

    CountVisible()

    var array = []
    var columns = Math.min( colsinfo.count , colsinfo.max )
    var middle = ( columns - 1 ) / 2
    var alignmenttoggle = true
    var shows = showinfo.visible

    for ( var iter1 = 0 ; iter1 < columns ; iter1++ ) {
      if ( iter1 === middle ) {
        array.push( 'center' )
        }
      else {
        alignmenttoggle ? array.push( 'left' ) : array.push( 'right' )
        alignmenttoggle = !alignmenttoggle
        }
      }
    if ( booleans.lefttoright ) {
      for( var iter1 = 0 ; iter1 < shows.length ; iter1++ ) {
        shows[ iter1 ].style.textAlign = array[ iter1 % colsinfo.count ]
        }
      }
    if ( !booleans.lefttoright ) {
      for( var iter1 = 0 ; iter1 < shows.length ; iter1++ ) {
        shows[ iter1 ].style.textAlign = array[ Math.floor( iter1 / rowsinfo.count ) ]
        }
      }
    }
  var ToHyperLink = function ( string ) {
    return encodeURIComponent( string ).replace( /'/g , '\\\'' )
    }
  
  OnStart()
  }() )