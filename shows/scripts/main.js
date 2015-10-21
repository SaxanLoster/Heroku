Saxan = {}

Saxan.Booleans = {
  LeftToRight: !true,
  MinimunSize: !true,
  MaintainSize: !true,
  Permanent: !true,
  }
Saxan.ClickInfo = {
  Elem1: null,
  Elem2: null,
  Time1: null,
  Time2: null,
  }
Saxan.ColsInfo = {
  Count: 0,
  Max: 0,
  }
Saxan.MainInfo = {
  ButtonsHeight: 0,
  ShowsHeight: 0,
  ShowsWidth: 0,
  }
Saxan.RowsInfo = {
  Count: 0,
  Max: 0,
  }
Saxan.ShowInfo = {
  All: document.getElementsByTagName( 'Show' ),
  BaseHeight: 80,
  BaseWidth: 300,
  Display: [],
  Height: 0,
  Hidden: [],
  Levels: [],
  Max: 0,
  Permanent: [],
  Visible: [],
  Width: 0,
  }
Saxan.StyleSheets = {
  Sheet1: 1,
  Sheet2: 2,
  }

Saxan.CheckLocalStorage = function () {
  if ( !localStorage.Shows ) {
    localStorage.Shows = '{\
      "Backup": {},\
      "Failure": {},\
      "Permanent": "",\
      "ShowList": {},\
      "User": "Basic",\
      "WatchSeries": "watch-series-tv.to"\
      }'
    }
  Saxan.Storage = JSON.parse( localStorage.Shows )
  try {
    Saxan.ShowList = Saxan.Storage.ShowList
    Saxan.Storage.Backup = Saxan.Storage.ShowList
    }
  catch ( e ) {
    Saxan.Storage.Failure = Saxan.Storage.ShowList
    Saxan.Storage.ShowList = Saxan.Storage.Backup
    Saxan.ShowList = JSON.parse( Saxan.Storage.ShowList )
    }
  localStorage.Shows = JSON.stringify( Saxan.Storage )
  for ( var iter1 = 0 ; iter1 < Saxan.ShowList.length ; iter1++ ) {
    if ( !Saxan.ShowInfo.Levels.has( 'level' + Saxan.ShowList[ iter1 ].Level ) ) {
      Saxan.ShowInfo.Levels.push( 'level' + Saxan.ShowList[ iter1 ].Level )
      }
    }
  Saxan.ShowInfo.Levels.sort()
  }
Saxan.CountDisplay = function () {
  Saxan.ShowInfo.Display = []
  for ( var iter1 = 0 ; iter1 < Saxan.ShowInfo.All.length ; iter1++ ) {
    var temp1 = Saxan.ShowInfo.All[ iter1 ].offsetWidth > 0
    var temp2 = Saxan.ShowInfo.All[ iter1 ].offsetHeight > 0
    if ( temp1 && temp2 ) {
      Saxan.ShowInfo.Display.push( Saxan.ShowInfo.All[ iter1 ] )
      }
    }
  }
Saxan.CountVisible = function () {
  Saxan.ShowInfo.Visible = []
  for ( var iter1 = 0 ; iter1 < Saxan.ShowInfo.Display.length ; iter1++ ) {
    var temp1 = Saxan.ShowInfo.Display[ iter1 ].offsetLeft >= window.scrollX
    var temp2 = Saxan.ShowInfo.Display[ iter1 ].offsetTop >= window.scrollY
    var temp3 = Saxan.ShowInfo.Display[ iter1 ].offsetLeft <= window.scrollX + Saxan.MainInfo.ShowsWidth
    var temp4 = Saxan.ShowInfo.Display[ iter1 ].offsetTop <= window.scrollY + Saxan.MainInfo.ShowsHeight
    if ( temp1 && temp2 && temp3 && temp4 ) {
      Saxan.ShowInfo.Visible.push( Saxan.ShowInfo.Display[ iter1 ] )
      }
    }
  }
Saxan.CreateInputs = function () {
  var elem1 = document.querySelector( '#Buttons' )
  removeChildNodes( elem1 )
  var elem2 = document.createElement( 'Input' )
    elem2.id = 'level0'
    elem2.onmousedown = Saxan.OnConfigureClick
    elem2.type = 'button'
    elem2.value = Saxan.Storage.User == 'Basic' ? 'Configure' : ''
  elem1.appendChild( elem2 )
  for ( var iter1 = 0 ; iter1 < Saxan.ShowInfo.Levels.length && Saxan.ShowInfo.Levels.length > 1 ; iter1++ ) {
    var elem2 = document.createElement( 'Input' )
      elem2.id = Saxan.ShowInfo.Levels[ iter1 ]
      elem2.onmousedown = Saxan.OnLevelClick
      elem2.type = 'button'
      elem2.value = Saxan.Storage.User == 'Basic' ? 'Level ' + ( iter1 + 1 ) : ''
    elem1.appendChild( elem2 )
    }
  }
Saxan.CreateShowList = function () {
  var elem1 = document.querySelector( '#Shows' )
  removeChildNodes( elem1 )
  var AddData = function ( Title , Data , Link , Search ) {
    if ( Data ) {
      if ( Data.has( /^http/ ) ) {
        return Data
        }
      else {
        return Link.replace( /REPLACE/ , Data.toHyperLink() )
        }
      }
    else {
      return Search.replace( /REPLACE/ , Title.toHyperLink() )
      }
    }
  var AmazonLink = ''
  var AmazonSearch = 'http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dinstant-video&field-keywords=REPLACE+TV'
  var IMDBLink = 'http://www.imdb.com/title/REPLACE'
  var IMDBSearch = 'http://www.imdb.com/find?q=REPLACE%20TV&s=tt'
  var NetflixLink = 'http://www.netflix.com/title/REPLACE'
  var NetflixSearch = 'http://www.netflix.com/search/REPLACE'
  var WatchSeriesLink = 'http://' + Saxan.Storage.WatchSeries + '/serie/REPLACE'
  var WatchSeriesSearch = 'http://' + Saxan.Storage.WatchSeries + '/search/REPLACE'
  var WikipediaLink = 'http://en.wikipedia.org/wiki/REPLACE'
  var WikipediaSearch = 'http://en.wikipedia.org/w/index.php?search=REPLACE%20TV&title=Special%3ASearch&fulltext=1'
  for ( var iter1 = 0 ; iter1 < Saxan.ShowList.length ; iter1++ ) {
    var Show = document.createElement( 'Show' )
      elem1.appendChild( Show )
      Show.id = Saxan.ShowList[ iter1 ].Title
      Show.dataset.amazon = AddData( Saxan.ShowList[ iter1 ].Title , Saxan.ShowList[ iter1 ].Amazon , AmazonLink , AmazonSearch )
      Show.dataset.imdb = AddData( Saxan.ShowList[ iter1 ].Title , Saxan.ShowList[ iter1 ].IMDB , IMDBLink , IMDBSearch )
      Show.dataset.netflix = AddData( Saxan.ShowList[ iter1 ].Title , Saxan.ShowList[ iter1 ].Netflix , NetflixLink , NetflixSearch )
      Show.dataset.watchseries = AddData( Saxan.ShowList[ iter1 ].Title , Saxan.ShowList[ iter1 ].WatchSeries , WatchSeriesLink , WatchSeriesSearch )
      Show.dataset.wikipedia = AddData( Saxan.ShowList[ iter1 ].Title , Saxan.ShowList[ iter1 ].Wikipedia , WikipediaLink , WikipediaSearch )
      Show.onmousedown = Saxan.OnShowClick
      Show.textContent = Saxan.ShowList[ iter1 ].Title
      Show.classList.add( 'level' + Saxan.ShowList[ iter1 ].Level )
    }
  if ( Saxan.Storage.User === 'Basic' || Saxan.ShowInfo.Levels.Length === 1 ) {
    ccss( '.level1' , 'display' , 'block' , Saxan.StyleSheets.Sheet2 )
    if ( document.querySelector( '#level1' ) ) {
      document.querySelector( '#level1' ).classList.add( 'active' )
      }
    }
  else {
    ccss( '.perm' , 'display' , 'block' , Saxan.StyleSheets.Sheet2 )
    if ( Saxan.Storage.Permanent !== '' ) {
      Saxan.ShowInfo.Permanent = Saxan.Storage.Permanent.split( '|' )
      }
    for ( var iter1 = 0 ; iter1 < Saxan.ShowInfo.Permanent.length ; iter1++ ) {
      try {
        Saxan.ShowInfo.All[ Saxan.ShowInfo.Permanent[ iter1 ] ].classList.add( 'perm' )
        }
      catch ( e ) {}
      }
    }
  }
Saxan.DeclareStyleSheet = function () {
  document.styleSheets[ Saxan.StyleSheets.Sheet1 ].addRule( 'Body' )
  document.styleSheets[ Saxan.StyleSheets.Sheet1 ].addRule( 'Input' )
  document.styleSheets[ Saxan.StyleSheets.Sheet1 ].addRule( 'Show' )
  document.styleSheets[ Saxan.StyleSheets.Sheet1 ].addRule( '#Buttons' )
  document.styleSheets[ Saxan.StyleSheets.Sheet1 ].addRule( '#Shows' )

  for ( var iter1 = 0 ; iter1 < Saxan.ShowInfo.Levels.length ; iter1++ ) {
    document.styleSheets[ Saxan.StyleSheets.Sheet2 ].addRule( '.' + Saxan.ShowInfo.Levels[ iter1 ] )
    }

  document.styleSheets[ Saxan.StyleSheets.Sheet2 ].addRule( '.perm' )
  document.styleSheets[ Saxan.StyleSheets.Sheet2 ].addRule( '.hide' )
  }
Saxan.GetCR = function () {
  var temp1 = Saxan.ColsInfo.Count.pad( 2 , ' ' )
  var temp2 = Saxan.RowsInfo.Count.pad( 2 , ' ' )
  var temp3 = Saxan.ColsInfo.Max.pad( 2 , ' ' )
  var temp4 = Saxan.RowsInfo.Max.pad( 2 , ' ' )
  console.log( '\tCount:\t%s x %s\n\tMax:\t%s x %s' , temp1 , temp2 , temp3 , temp4 )
  }
Saxan.HideAllShows = function () {
  var elem1 = document.getElementsByTagName( 'input' )
  for ( var a = 0 ; a < elem1.length ; a++ ) {
    elem1[ a ].classList.remove( 'active' )
    }
  for ( var a = 0 ; a < Saxan.ShowInfo.Levels.length ; a++ ) {
    ccss( '.' + Saxan.ShowInfo.Levels[ a ] , 'display' , '' , Saxan.StyleSheets.Sheet2 )
    }
  }
Saxan.MainDisplayFunctions = function () {
  Saxan.ColsInfo.Max = Math.floor( Saxan.MainInfo.ShowsWidth / Saxan.ShowInfo.BaseWidth )
  Saxan.RowsInfo.Max = Math.floor( Saxan.MainInfo.ShowsHeight / Saxan.ShowInfo.BaseHeight )
  Saxan.ShowInfo.Max = Saxan.ColsInfo.Max * Saxan.RowsInfo.Max
  Saxan.CountDisplay()
  Saxan.CountVisible()
  if ( !Saxan.Booleans.MaintainSize ) {
    Saxan.RowsAndColumns()
    }
  Saxan.StyleElements()
  }
Saxan.OnChange = function () {
  scrollTo( 0 , 0 )
  var temp1 = document.getElementsByTagName( 'input' ).length
  Saxan.MainInfo.ButtonsHeight = temp1 && 50 || Math.ceil( innerWidth / ( temp1 * 5 ) )
  Saxan.MainInfo.ShowsHeight = innerHeight - Saxan.MainInfo.ButtonsHeight
  Saxan.MainInfo.ShowsWidth = innerWidth
  ccss( '#Buttons' , 'height' , Saxan.MainInfo.ButtonsHeight + 'px' , Saxan.StyleSheets.Sheet1 )
  ccss( 'input' , 'width' , innerWidth / temp1 + 'px' , Saxan.StyleSheets.Sheet1 )
  Saxan.MainDisplayFunctions()
  }
Saxan.OnConfigureClick = function () {
  if ( Saxan.Storage.User !== 'Advanced' ) {
    window.open( 'config.html' )
    }
  else if ( event.button === 0 ) {
    // Saxan.Booleans.MinimunSize = !Saxan.Booleans.MinimunSize
    Saxan.Booleans.MaintainSize = !Saxan.Booleans.MaintainSize
    Saxan.MainDisplayFunctions()
    }
  else if ( event.button === 1 ) {
    Saxan.Booleans.LeftToRight = !Saxan.Booleans.LeftToRight
    Saxan.Booleans.MaintainSize = !true
    Saxan.MainDisplayFunctions()
    }
  else if ( event.button === 2 ) {
    if ( Saxan.ShowInfo.Hidden.length > 0 ) {
      Saxan.ShowInfo.Hidden.pop().classList.remove( 'hide' )
      Saxan.Booleans.MaintainSize = !true
      }
    Saxan.MainDisplayFunctions()
    }
  else {
    console.log( event )
    }
  }
Saxan.OnLevelClick = function () {
  switch ( event.button ) {
    case 0 :
      this.classList.toggle( 'active' )
      if ( this.classList.contains( 'active' ) ) {
        if ( !Saxan.Booleans.Permanent ) {
          ccss( '.perm' , 'display' , '' , Saxan.StyleSheets.Sheet2 )
          }
        ccss( '.' + this.id , 'display' , 'block' , Saxan.StyleSheets.Sheet2 )
        }
      else {
        ccss( '.' + this.id , 'display' , '' , Saxan.StyleSheets.Sheet2 )
        if ( document.getElementsByClassName( 'active' ).length === 0 ) {
          ccss( '.perm' , 'display' , 'block' , Saxan.StyleSheets.Sheet2 )
          }
        }
      Saxan.Booleans.MaintainSize = !true
      Saxan.MainDisplayFunctions()
      break
    case 1 :
      Saxan.HideAllShows()
      this.classList.add( 'active' )
      if ( !Saxan.Booleans.Permanent ) {
        ccss( '.perm' , 'display' , '' , Saxan.StyleSheets.Sheet2 )
        }
      ccss( '.' + this.id , 'display' , 'block' , Saxan.StyleSheets.Sheet2 )
      Saxan.Booleans.MaintainSize = !true
      Saxan.MainDisplayFunctions()
      break
    case 2 :
      Saxan.HideAllShows()
      if ( !Saxan.Booleans.Permanent ) {
        ccss( '.perm' , 'display' , 'block' , Saxan.StyleSheets.Sheet2 )
        }
      Saxan.Booleans.MaintainSize = !true
      Saxan.MainDisplayFunctions()
      break
    }
  }
Saxan.OnScroll = function () {
  if ( event.srcElement.id === 'AlertCenter' || event.srcElement.parentNode.id === 'AlertCenter' ) {}
  else {
    if ( !event.ctrlKey ) {
      event.preventDefault()
      var temp1 = event.deltaY > 0 ? 1 : -1
      if ( Saxan.Booleans.LeftToRight ) {
        scrollBy( 0 , temp1 * Saxan.ShowInfo.Height )
        }
      else {
        scrollBy( temp1 * Saxan.ShowInfo.Width , 0 )
        }
      }
    Saxan.StyleElements()
    }
  }
Saxan.OnShowClick = function () {
  if ( Saxan.Storage.User !== 'Advanced' || event.button === 1 || ( event.button === 0 && event.ctrlKey ) ) {
    Saxan.ShowLinks( this )
    }
  else if ( event.button === 0 ) {
    Saxan.ClickInfo.Elem1 = Saxan.ClickInfo.Elem2
    Saxan.ClickInfo.Elem2 = event.toElement
    Saxan.ClickInfo.Time1 = Saxan.ClickInfo.Time2
    Saxan.ClickInfo.Time2 = event.timeStamp
    if ( ( Saxan.ClickInfo.Time2 - Saxan.ClickInfo.Time1 ) < 250 && Saxan.ClickInfo.Elem1 === Saxan.ClickInfo.Elem2 ) {
      Saxan.ShowInfo.Permanent.has( this.id ) ? this.classList.remove( 'perm' ) : this.classList.add( 'perm' )
      Saxan.PermanentItemToggle( this.id )
      Saxan.MainDisplayFunctions()
      }
    }
  else if ( event.button === 2 ) {
    this.classList.add( 'hide' )
    Saxan.ShowInfo.Hidden.push( this )
    Saxan.MainDisplayFunctions()
    }
  else {
    console.log( event )
    }
  }
Saxan.OnStart = function () {
  Saxan.CheckLocalStorage()
  Saxan.DeclareStyleSheet()
  Saxan.CreateInputs()
  Saxan.CreateShowList()
  Saxan.OnChange()
  window.addEventListener( 'resize' , Saxan.OnChange )
  document.body.addEventListener( 'contextmenu' , PreventActions )
  document.body.addEventListener( 'keydown' , PreventActions )
  document.body.addEventListener( 'mousedown' , PreventActions )
  document.body.addEventListener( 'mousewheel' , Saxan.OnScroll )
  }
Saxan.PermanentItemToggle = function ( ShowTitle ) {
  if ( Saxan.ShowInfo.Permanent.has( ShowTitle ) ) {
    Saxan.ShowInfo.Permanent.splice( Saxan.ShowInfo.Permanent.indexOf( ShowTitle ) , 1 )
    }
  else {
    Saxan.ShowInfo.Permanent.push( ShowTitle )
    }
  Saxan.ShowInfo.Permanent.sort()
  Saxan.Storage.Permanent = Saxan.ShowInfo.Permanent.join( '|' )
  localStorage.Shows = JSON.stringify( Saxan.Storage )
  }
Saxan.RowsAndColumns = function () {
  if ( Saxan.ShowInfo.Display.length <= Saxan.ShowInfo.Max ) {
    if ( Saxan.Booleans.MinimunSize ) {
      Saxan.ColsInfo.Count = Saxan.ColsInfo.Max
      Saxan.RowsInfo.Count = Saxan.RowsInfo.Max
      }
    else {
      Saxan.ColsInfo.Count = Math.ceil( Saxan.ShowInfo.Display.length / Saxan.RowsInfo.Max )
      Saxan.RowsInfo.Count = Math.ceil( Saxan.ShowInfo.Display.length / Saxan.ColsInfo.Count )
      }
    }
  else {
    if ( Saxan.Booleans.LeftToRight ) {
      Saxan.ColsInfo.Count = Saxan.ColsInfo.Max
      Saxan.RowsInfo.Count = Math.ceil( Saxan.ShowInfo.Display.length / Saxan.ColsInfo.Max )
      }
    else {
      Saxan.ColsInfo.Count = Math.ceil( Saxan.ShowInfo.Display.length / Saxan.RowsInfo.Max )
      Saxan.RowsInfo.Count = Saxan.RowsInfo.Max
      }
    }
  }
Saxan.SetCR = function ( para1 , para2 ) {
  Saxan.ColsInfo.Count = para1 > 0 ? para1 : Math.ceil( Saxan.ShowInfo.Visible.length / para2 )
  Saxan.RowsInfo.Count = para2 > 0 ? para2 : Math.ceil( Saxan.ShowInfo.Visible.length / para1 )
  Saxan.StyleElements()
  }
Saxan.ShowLinks = function ( Show ) {
  var A = '<div class="Title" onclick="window.open( \'https://www.google.com/search?q=' + Show.id.toHyperLink() + '\' )" >' + Show.id + '</div>'
  var B = '\
    <div class="randomLinks" onclick="window.open( \'' + Show.dataset.amazon + '\' )" >Amazon Prime</div>\
    <div class="randomLinks" onclick="window.open( \'' + Show.dataset.imdb + '\' )" >IMDB</div>\
    <div class="randomLinks" onclick="window.open( \'' + Show.dataset.netflix + '\' )" >Netflix</div>\
    <div class="randomLinks" onclick="window.open( \'' + Show.dataset.watchseries + '\' )" >Watch Series</div>\
    <div class="randomLinks" onclick="window.open( \'' + Show.dataset.wikipedia + '\' )" >Wikipedia</div>\
    '
  var C = 'Exit'
  var D = 0
  customAlert( A , B , C , D )
  }
Saxan.StyleElements = function () {
  Saxan.ShowInfo.Height = Math.floor( Saxan.MainInfo.ShowsHeight / Math.min( Saxan.RowsInfo.Count , Saxan.RowsInfo.Max ) )
  Saxan.ShowInfo.Width = Math.floor( Saxan.MainInfo.ShowsWidth / Math.min( Saxan.ColsInfo.Count , Saxan.ColsInfo.Max ) )

  var A = ( Saxan.MainInfo.ShowsHeight - Saxan.ShowInfo.Height * Math.min( Saxan.RowsInfo.Count , Saxan.RowsInfo.Max ) ) / 2

  ccss( 'show' , 'height' , Saxan.ShowInfo.Height + 'px' , Saxan.StyleSheets.Sheet1 )
  ccss( 'show' , 'lineHeight' , Saxan.ShowInfo.Height + 'px' , Saxan.StyleSheets.Sheet1 )
  ccss( 'show' , 'width' , Saxan.ShowInfo.Width  + 'px' , Saxan.StyleSheets.Sheet1 )

  ccss( '#Shows' , 'height' , Saxan.ShowInfo.Height * Saxan.RowsInfo.Count + 'px' , Saxan.StyleSheets.Sheet1 )
  ccss( '#Shows' , 'marginBottom' , A + Saxan.MainInfo.ButtonsHeight + 'px' , Saxan.StyleSheets.Sheet1 )
  ccss( '#Shows' , 'marginTop' , A + 'px' , Saxan.StyleSheets.Sheet1 )
  ccss( '#Shows' , 'width' , Saxan.ShowInfo.Width  * Saxan.ColsInfo.Count + 'px' , Saxan.StyleSheets.Sheet1 )

  if ( Saxan.Booleans.LeftToRight ) {
    ccss( '#Shows' , 'webkitColumnCount' , '' , Saxan.StyleSheets.Sheet1 )
    // ccss( '#Shows' , 'columnFill' , '' , Saxan.StyleSheets.Sheet1 )
    }
  else {
    ccss( '#Shows' , 'webkitColumnCount' , Saxan.ColsInfo.Count , Saxan.StyleSheets.Sheet1 )
    // ccss( '#Shows' , 'columnFill' , 'auto' , Saxan.StyleSheets.Sheet1 )
    }

  Saxan.CountVisible()

  var A = []
  var B = Math.min( Saxan.ColsInfo.Count , Saxan.ColsInfo.Max )
  var C = ( B - 1 ) / 2
  var D = true
  var E = Saxan.ShowInfo.Visible

  for ( var i = 0 ; i < B ; i++ ) {
    if ( i == C ) {
      A.push( 'center' )
      }
    else {
      D ? A.push( 'left' ) : A.push( 'right' )
      D = !D
      }
    }
  if ( Saxan.Booleans.LeftToRight ) {
    for( var i = 0 ; i < E.length ; i++ ) {
      E[ i ].style.textAlign = A[ i % Saxan.ColsInfo.Count ]
      }
    }
  if ( !Saxan.Booleans.LeftToRight ) {
    for( var i = 0 ; i < E.length ; i++ ) {
      E[ i ].style.textAlign = A[ Math.floor( i / Saxan.RowsInfo.Count ) ]
      }
    }
  }