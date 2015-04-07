Saxan = {
  Globals: {
    Booleans: {
      LeftToRight: !true,
      MinimunSize: !true,
      },
    ClickInfo: {
      Elem1: null,
      Elem2: null,
      Time1: null,
      Time2: null,
      },
    ColsInfo: {
      Count: 0,
      Max: 0,
      },
    MainInfo: {
      ButtonsHeight: 0,
      ShowsHeight: 0,
      ShowsWidth: 0,
      },
    RowsInfo: {
      Count: 0,
      Max: 0,
      },
    ShowInfo: {
      All: document.getElementsByTagName( 'Show' ),
      BaseHeight: 80,
      BaseWidth: 320,
      Display: [],
      Height: 0,
      Hidden: [],
      Levels: [],
      Max: 0,
      Permanent: [],
      Visible: [],
      Width: 0,
      },
    StyleSheets: {
      A: 1,
      B: 2,
      },
    },
  Functions: {
    CheckLocalStorage: function(){
      if( !localStorage.Backup ) localStorage.Backup = '{}'
      if( !localStorage.Permanent ) localStorage.Permanent = ''
      if( !localStorage.User ) localStorage.User = 'Basic'
      if( !localStorage.WatchSeries ) localStorage.WatchSeries = 'watchseriestv.to'
      try{
        Saxan.Globals.ShowList = JSON.parse( localStorage.ShowListing )
        localStorage.Backup = localStorage.ShowListing
        }
      catch( e ){
        localStorage.Failure = localStorage.ShowListing
        localStorage.ShowListing = localStorage.Backup
        Saxan.Globals.ShowList = JSON.parse( localStorage.ShowListing )
        }
      for( var a = 0 ; a < Saxan.Globals.ShowList.length ; a++ ) if( !Saxan.Globals.ShowInfo.Levels.has( 'level' + Saxan.Globals.ShowList[ a ].Level ) ) Saxan.Globals.ShowInfo.Levels.push( 'level' + Saxan.Globals.ShowList[ a ].Level )
      Saxan.Globals.ShowInfo.Levels.sort()
      },
    CountDisplay: function(){
      Saxan.Globals.ShowInfo.Display = []
      for( var i = 0 ; i < Saxan.Globals.ShowInfo.All.length ; i++ ){
        var A = Saxan.Globals.ShowInfo.All[ i ].offsetWidth  > 0
        var B = Saxan.Globals.ShowInfo.All[ i ].offsetHeight > 0
        if( A && B ) Saxan.Globals.ShowInfo.Display.push( Saxan.Globals.ShowInfo.All[ i ] )
        }
      },
    CountVisible: function(){
      Saxan.Globals.ShowInfo.Visible = []
      for( var i = 0 ; i < Saxan.Globals.ShowInfo.Display.length ; i++ ){
        var A = Saxan.Globals.ShowInfo.Display[ i ].offsetLeft >= window.scrollX
        var B = Saxan.Globals.ShowInfo.Display[ i ].offsetTop  >= window.scrollY
        var C = Saxan.Globals.ShowInfo.Display[ i ].offsetLeft <= window.scrollX + Saxan.Globals.MainInfo.ShowsWidth
        var D = Saxan.Globals.ShowInfo.Display[ i ].offsetTop  <= window.scrollY + Saxan.Globals.MainInfo.ShowsHeight
        if( A && B && C && D ) Saxan.Globals.ShowInfo.Visible.push( Saxan.Globals.ShowInfo.Display[ i ] )
        }
      },
    CreateInputs: function(){
      var A = document.getElementById( 'Buttons' )
      removeChildNodes( A )
      var B
        B             = document.createElement( 'Input' )
        B.id          = 'level0'
        B.type        = 'button'
        B.value       = localStorage.User == 'Basic' ? 'Configure' : ''
        B.onmousedown = Saxan.Functions.OnConfigureClick
        A.appendChild( B )
      for( var i = 0 ; i < Saxan.Globals.ShowInfo.Levels.length && Saxan.Globals.ShowInfo.Levels.length > 1 ; i++ ){
        B             = document.createElement( 'Input' )
        B.id          = Saxan.Globals.ShowInfo.Levels[ i ]
        B.type        = 'button'
        B.value       = localStorage.User == 'Basic' ? 'Level ' + ( i + 1 ) : ''
        B.onmousedown = Saxan.Functions.OnLevelClick
        A.appendChild( B )
        }
      },
    CreateShowList: function(){
      var A = document.getElementById( 'Shows' )
      removeChildNodes( A )
      function AddData( Title , Data , Link , Search ){
        if( Data ){
          if( Data.match( /^http/ ) != null ){
            return Data
            }
          else{
            return Link.replace( /REPLACE/ , Data.toHyperLink() )
            }
          }
        else{
          return Search.replace( /REPLACE/ , Title.toHyperLink() )
          }
        }
      var AmazonLink = ''
      var AmazonSearch = 'http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dinstant-video&field-keywords=REPLACE+TV'
      var IMDBLink = 'http://www.imdb.com/title/REPLACE'
      var IMDBSearch = 'http://www.imdb.com/find?q=REPLACE%20TV&s=tt'
      var NetflixLink = 'http://www.netflix.com/WiMovie/REPLACE'
      var NetflixSearch = 'http://www.netflix.com/search/REPLACE'
      var WatchSeriesLink = 'http://' + localStorage.WatchSeries + '/serie/REPLACE'
      var WatchSeriesSearch = 'http://' + localStorage.WatchSeries + '/search/REPLACE'
      var WikipediaLink = 'http://en.wikipedia.org/wiki/REPLACE'
      var WikipediaSearch = 'http://en.wikipedia.org/w/index.php?search=REPLACE%20TV&title=Special%3ASearch&fulltext=1'
      for( var a = 0 ; a < Saxan.Globals.ShowList.length ; a++ ){
        var Show = document.createElement( 'Show' )
        Show.id                  = Saxan.Globals.ShowList[ a ].Title
        Show.dataset.Amazon      = AddData( Saxan.Globals.ShowList[ a ].Title , Saxan.Globals.ShowList[ a ].Amazon      , AmazonLink      , AmazonSearch )
        Show.dataset.IMDB        = AddData( Saxan.Globals.ShowList[ a ].Title , Saxan.Globals.ShowList[ a ].IMDB        , IMDBLink        , IMDBSearch )
        Show.dataset.Netflix     = AddData( Saxan.Globals.ShowList[ a ].Title , Saxan.Globals.ShowList[ a ].Netflix     , NetflixLink     , NetflixSearch )
        Show.dataset.WatchSeries = AddData( Saxan.Globals.ShowList[ a ].Title , Saxan.Globals.ShowList[ a ].WatchSeries , WatchSeriesLink , WatchSeriesSearch )
        Show.dataset.Wikipedia   = AddData( Saxan.Globals.ShowList[ a ].Title , Saxan.Globals.ShowList[ a ].Wikipedia   , WikipediaLink   , WikipediaSearch )
        Show.onmousedown         = Saxan.Functions.OnShowClick
        Show.textContent         = Saxan.Globals.ShowList[ a ].Title
        Show.classList.add( 'level' + Saxan.Globals.ShowList[ a ].Level )
        A.appendChild( Show )
        }
      if( localStorage.User == 'Basic' || Saxan.Globals.ShowInfo.Levels.Length == 1 ){
        ccss( '.level1' , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
        if( document.querySelector( '#level1' ) ) document.querySelector( '#level1' ).classList.add( 'active' )
        }
      else{
        if( localStorage.Permanent != '' ) Saxan.Globals.ShowInfo.Permanent = localStorage.Permanent.split( '|' )
        for( var i = 0 ; i < Saxan.Globals.ShowInfo.Permanent.length ; i++ ) Saxan.Globals.ShowInfo.All[ Saxan.Globals.ShowInfo.Permanent[ i ] ].classList.add( 'perm' )
        }
      if( localStorage.Permanent == '' ) ccss( '.level1' , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
      else                               ccss( '.perm'   , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
      },
    DeclareStyleSheet: function(){
      document.styleSheets[ Saxan.Globals.StyleSheets.A ].addRule( 'Body' )
      document.styleSheets[ Saxan.Globals.StyleSheets.A ].addRule( 'Input' )
      document.styleSheets[ Saxan.Globals.StyleSheets.A ].addRule( 'Show' )
      document.styleSheets[ Saxan.Globals.StyleSheets.A ].addRule( '#Buttons' )
      document.styleSheets[ Saxan.Globals.StyleSheets.A ].addRule( '#Shows' )

      for( var i = 0 ; i < Saxan.Globals.ShowInfo.Levels.length ; i++ ) document.styleSheets[ Saxan.Globals.StyleSheets.B ].addRule( '.' + Saxan.Globals.ShowInfo.Levels[ i ] )

      document.styleSheets[ Saxan.Globals.StyleSheets.B ].addRule( '.perm' )
      document.styleSheets[ Saxan.Globals.StyleSheets.B ].addRule( '.hide' )
      },
    GetCR: function(){
      var CC = Saxan.Globals.ColsInfo.Count.pad( 2 , ' ' )
      var RC = Saxan.Globals.RowsInfo.Count.pad( 2 , ' ' )
      var CM = Saxan.Globals.ColsInfo.Max.pad( 2 , ' ' )
      var RM = Saxan.Globals.RowsInfo.Max.pad( 2 , ' ' )
      console.log( '\tCount:\t%s x %s\n\tMax:\t%s x %s' , CC , RC , CM , RM )
      },
    HideAllShows: function(){
      var I = document.getElementsByTagName( 'input' )
      var L = Saxan.Globals.ShowInfo.Levels
      for( var i = 0 ; i < I.length ; i++ ) I[ i ].classList.remove( 'active' )
      for( var i = 0 ; i < L.length ; i++ ) ccss( '.' + L[ i ] , 'display' , '' , Saxan.Globals.StyleSheets.B )
      },
    MainDisplayFunctions: function(){
      Saxan.Globals.ColsInfo.Max = Math.floor( Saxan.Globals.MainInfo.ShowsWidth  / Saxan.Globals.ShowInfo.BaseWidth )
      Saxan.Globals.RowsInfo.Max = Math.floor( Saxan.Globals.MainInfo.ShowsHeight / Saxan.Globals.ShowInfo.BaseHeight )
      Saxan.Globals.ShowInfo.Max = Saxan.Globals.ColsInfo.Max * Saxan.Globals.RowsInfo.Max
      Saxan.Functions.CountDisplay()
      Saxan.Functions.CountVisible()
      Saxan.Functions.RowsAndColumns()
      Saxan.Functions.StyleElements()
      },
    OnChange: function(){
      scrollTo( 0 , 0 )
      var I = document.getElementsByTagName( 'input' ).length
      Saxan.Globals.MainInfo.ButtonsHeight = I && 50 || Math.ceil( innerWidth / ( I * 5 ) )
      Saxan.Globals.MainInfo.ShowsHeight   = innerHeight - Saxan.Globals.MainInfo.ButtonsHeight
      Saxan.Globals.MainInfo.ShowsWidth    = innerWidth
      ccss( '#Buttons' , 'height' , Saxan.Globals.MainInfo.ButtonsHeight + 'px' , Saxan.Globals.StyleSheets.A )
      ccss( 'input'    , 'width'  , innerWidth / I                       + 'px' , Saxan.Globals.StyleSheets.A )
      Saxan.Functions.MainDisplayFunctions()
      },
    OnConfigureClick: function(){
      switch( localStorage.User ){
        case 'Advanced' :
          switch( event.button ){
            case 0 :
              Saxan.Globals.Booleans.MinimunSize = !Saxan.Globals.Booleans.MinimunSize
              Saxan.Functions.MainDisplayFunctions()
              break
            case 1 :
              Saxan.Globals.Booleans.LeftToRight = !Saxan.Globals.Booleans.LeftToRight
              Saxan.Functions.MainDisplayFunctions()
              break
            case 2 :
              if( Saxan.Globals.ShowInfo.Hidden.length > 0 ) Saxan.Globals.ShowInfo.Hidden.pop().classList.remove( 'hide' )
              Saxan.Functions.MainDisplayFunctions()
              break
            }
          break
        case 'Basic' :
          window.open( 'Config.html' )
          break
        }
      },
    OnLevelClick: function(){
      switch( event.button ){
        case 0 :
          this.classList.toggle( 'active' )
          if( this.classList.contains( 'active' ) ){
            ccss( '.perm'       , 'display' , ''      , Saxan.Globals.StyleSheets.B )
            ccss( '.' + this.id , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
            }
          else{
            ccss( '.' + this.id , 'display' , '' , Saxan.Globals.StyleSheets.B )
            if( document.getElementsByClassName( 'active' ).length == 0 ) ccss( '.perm' , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
            }
          Saxan.Functions.MainDisplayFunctions()
          break
        case 1 :
          Saxan.Functions.HideAllShows()
          this.classList.add( 'active' )
          ccss( '.perm'       , 'display' , ''      , Saxan.Globals.StyleSheets.B )
          ccss( '.' + this.id , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
          Saxan.Functions.MainDisplayFunctions()
          break
        case 2 :
          Saxan.Functions.HideAllShows()
          ccss( '.perm' , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
          Saxan.Functions.MainDisplayFunctions()
          break
        }
      },
    OnScroll: function(){
      if( !event.ctrlKey ){
        event.preventDefault()
        var D = event.deltaY > 0 ? 1 : -1
        if( Saxan.Globals.Booleans.LeftToRight ){
          scrollBy( 0 , D * Saxan.Globals.ShowInfo.Height )
          }
        else{
          scrollBy( D * Saxan.Globals.ShowInfo.Width , 0 )
          }
        }
        Saxan.Functions.StyleElements()
      },
    OnShowClick: function(){
      switch( localStorage.User ){
        case 'Advanced' :
          switch( event.button ){
            case 0 :
              Saxan.Globals.ClickInfo.Elem1 = Saxan.Globals.ClickInfo.Elem2
              Saxan.Globals.ClickInfo.Elem2 = event.toElement
              Saxan.Globals.ClickInfo.Time1 = Saxan.Globals.ClickInfo.Time2
              Saxan.Globals.ClickInfo.Time2 = event.timeStamp
              switch( true ){
                case event.ctrlKey :
                  Saxan.Functions.ShowLinks( this )
                  break
                case ( Saxan.Globals.ClickInfo.Time2 - Saxan.Globals.ClickInfo.Time1 ) < 250 && Saxan.Globals.ClickInfo.Elem1 == Saxan.Globals.ClickInfo.Elem2 :
                  Saxan.Globals.ShowInfo.Permanent.has( this.id ) ? this.classList.remove( 'perm' ) : this.classList.add( 'perm' )
                  Saxan.Functions.PermanentItemToggle( this.id )
                  Saxan.Functions.MainDisplayFunctions()
                  break
                case !this.classList.contains( 'perm' ) :
                  this.classList.add( 'perm' )
                  break
                }
              break
            case 1 :
              Saxan.Functions.ShowLinks( this )
              break
            case 2 :
              if( this.classList.contains( 'perm' ) ){
                this.classList.toggle( 'perm' )
                Saxan.Functions.MainDisplayFunctions()
                }
              else{
                this.classList.add( 'hide' )
                Saxan.Globals.ShowInfo.Hidden.push( this )
                Saxan.Functions.MainDisplayFunctions()
                }
            }
          break
        case 'Basic' :
          Saxan.Functions.ShowLinks( this )
          break
        }
      },
    OnStart: function(){
      Saxan.Functions.CheckLocalStorage()
      Saxan.Functions.DeclareStyleSheet()
      Saxan.Functions.CreateInputs()
      Saxan.Functions.CreateShowList()
      Saxan.Functions.OnChange()
      },
    PermanentItemToggle: function( ShowTitle ){
      switch( Saxan.Globals.ShowInfo.Permanent.has( ShowTitle ) ){
        case  true : Saxan.Globals.ShowInfo.Permanent.splice( Saxan.Globals.ShowInfo.Permanent.indexOf( ShowTitle ) , 1 ) ; break
        case !true : Saxan.Globals.ShowInfo.Permanent.push( ShowTitle ) ; break
        }
      Saxan.Globals.ShowInfo.Permanent.sort()
      localStorage.Permanent = Saxan.Globals.ShowInfo.Permanent.join( '|' )
      },
    RowsAndColumns: function(){
      var A = Saxan.Globals.ShowInfo.Display.length <= Saxan.Globals.ShowInfo.Max,
        B = Saxan.Globals.Booleans.MinimunSize,
        C = Saxan.Globals.Booleans.LeftToRight
      switch( true ){
        case  A &&  B :
          Saxan.Globals.ColsInfo.Count = Saxan.Globals.ColsInfo.Max
          Saxan.Globals.RowsInfo.Count = Saxan.Globals.RowsInfo.Max
          break
        case  A && !B :
          Saxan.Globals.ColsInfo.Count = Math.ceil( Saxan.Globals.ShowInfo.Display.length / Saxan.Globals.RowsInfo.Max )
          Saxan.Globals.RowsInfo.Count = Math.ceil( Saxan.Globals.ShowInfo.Display.length / Saxan.Globals.ColsInfo.Count )
          break
        // case  A && !B &&  C :
        //   Saxan.Globals.RowsInfo.Count = Math.ceil( Saxan.Globals.ShowInfo.Display.length / Saxan.Globals.ColsInfo.Max )
        //   Saxan.Globals.ColsInfo.Count = Math.ceil( Saxan.Globals.ShowInfo.Display.length / Saxan.Globals.RowsInfo.Count )
        //   break
        // case  A && !B && !C :
        //   Saxan.Globals.ColsInfo.Count = Math.ceil( Saxan.Globals.ShowInfo.Display.length / Saxan.Globals.RowsInfo.Max )
        //   Saxan.Globals.RowsInfo.Count = Math.ceil( Saxan.Globals.ShowInfo.Display.length / Saxan.Globals.ColsInfo.Count )
        //   break
        case !A &&  C :
          Saxan.Globals.ColsInfo.Count = Saxan.Globals.ColsInfo.Max
          Saxan.Globals.RowsInfo.Count = Math.ceil( Saxan.Globals.ShowInfo.Display.length / Saxan.Globals.ColsInfo.Max )
          break
        case !A && !C :
          Saxan.Globals.ColsInfo.Count = Math.ceil( Saxan.Globals.ShowInfo.Display.length / Saxan.Globals.RowsInfo.Max )
          Saxan.Globals.RowsInfo.Count = Saxan.Globals.RowsInfo.Max
          break
        }
      },
    SetCR: function( C , R ){
      Saxan.Globals.ColsInfo.Count = C > 0 ? C : Math.ceil( Saxan.Globals.ShowInfo.Visible.length / R )
      Saxan.Globals.RowsInfo.Count = R > 0 ? R : Math.ceil( Saxan.Globals.ShowInfo.Visible.length / C )
      Saxan.Functions.StyleElements()
      },
    ShowLinks: function( Show ){
      var T = '<div class="Title" onclick="window.open( \'https://www.google.com/search?q=' + Show.id.toHyperLink() + '\' )" >' + Show.id + '</div>'
      var M = '\
        <div class="randomLinks" onclick="window.open( \'' + Show.dataset.Amazon      + '\' )" >Amazon Prime</div>\
        <div class="randomLinks" onclick="window.open( \'' + Show.dataset.IMDB        + '\' )" >IMDB</div>\
        <div class="randomLinks" onclick="window.open( \'' + Show.dataset.Netflix     + '\' )" >Netflix</div>\
        <div class="randomLinks" onclick="window.open( \'' + Show.dataset.WatchSeries + '\' )" >Watch Series</div>\
        <div class="randomLinks" onclick="window.open( \'' + Show.dataset.Wikipedia   + '\' )" >Wikipedia</div>\
        '
      var B = 'Exit'
      var C = 0
      customAlert( T , M , B , C )
      },
    StyleElements: function(){
      Saxan.Globals.ShowInfo.Height = Math.floor( Saxan.Globals.MainInfo.ShowsHeight / Math.min( Saxan.Globals.RowsInfo.Count , Saxan.Globals.RowsInfo.Max ) )
      Saxan.Globals.ShowInfo.Width  = Math.floor( Saxan.Globals.MainInfo.ShowsWidth  / Math.min( Saxan.Globals.ColsInfo.Count , Saxan.Globals.ColsInfo.Max ) )

      var M = ( Saxan.Globals.MainInfo.ShowsHeight - Saxan.Globals.ShowInfo.Height * Math.min( Saxan.Globals.RowsInfo.Count , Saxan.Globals.RowsInfo.Max ) ) / 2

      ccss( 'show' , 'height'     , Saxan.Globals.ShowInfo.Height + 'px' , Saxan.Globals.StyleSheets.A )
      ccss( 'show' , 'lineHeight' , Saxan.Globals.ShowInfo.Height + 'px' , Saxan.Globals.StyleSheets.A )
      ccss( 'show' , 'width'      , Saxan.Globals.ShowInfo.Width  + 'px' , Saxan.Globals.StyleSheets.A )

      ccss( '#Shows' , 'height'       , Saxan.Globals.ShowInfo.Height * Saxan.Globals.RowsInfo.Count + 'px' , Saxan.Globals.StyleSheets.A )
      ccss( '#Shows' , 'marginBottom' , M + Saxan.Globals.MainInfo.ButtonsHeight                     + 'px' , Saxan.Globals.StyleSheets.A )
      ccss( '#Shows' , 'marginTop'    , M                                                            + 'px' , Saxan.Globals.StyleSheets.A )
      ccss( '#Shows' , 'width'        , Saxan.Globals.ShowInfo.Width  * Saxan.Globals.ColsInfo.Count + 'px' , Saxan.Globals.StyleSheets.A )

      Saxan.Globals.Booleans.LeftToRight ? ccss( '#Shows' , 'webkitColumnCount' , '' , Saxan.Globals.StyleSheets.A ) : ccss( '#Shows' , 'webkitColumnCount' , Saxan.Globals.ColsInfo.Count , Saxan.Globals.StyleSheets.A )

      Saxan.Functions.CountVisible()

      var A = [] , B = Math.min( Saxan.Globals.ColsInfo.Count , Saxan.Globals.ColsInfo.Max ) , C = ( B - 1 ) / 2 , D = true , V = Saxan.Globals.ShowInfo.Visible

      for( var i = 0 ; i < B ; i++ ){ if( i == C ){ A.push( 'center' ) } else{ D ? A.push( 'left' ) : A.push( 'right' ) ; D = !D } }
      if(  Saxan.Globals.Booleans.LeftToRight ) for( var i = 0 ; i < V.length ; i++ ) V[ i ].style.textAlign = A[ i % Saxan.Globals.ColsInfo.Count ]
      if( !Saxan.Globals.Booleans.LeftToRight ) for( var i = 0 ; i < V.length ; i++ ) V[ i ].style.textAlign = A[ Math.floor( i / Saxan.Globals.RowsInfo.Count ) ]
      },
    },
  }