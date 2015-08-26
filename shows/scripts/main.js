Saxan = {
  Globals: {
    Booleans: {
      LeftToRight: !true,
      MinimunSize: !true,
      Permanent: !true,
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
      BaseWidth: 300,
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
      if( !localStorage.Shows ) localStorage.Shows = '{ "Backup": {} , "Failure": {} , "Permanent": "" , "ShowList": {} , "User": "Basic" , "WatchSeries": "watch-series-tv.to" }'
      Saxan.Globals.Storage = JSON.parse( localStorage.Shows )
      try{
        Saxan.Globals.ShowList = Saxan.Globals.Storage.ShowList
        Saxan.Globals.Storage.Backup = Saxan.Globals.Storage.ShowList
        }
      catch( e ){
        Saxan.Globals.Storage.Failure = Saxan.Globals.Storage.ShowList
        Saxan.Globals.Storage.ShowList = Saxan.Globals.Storage.Backup
        Saxan.Globals.ShowList = JSON.parse( Saxan.Globals.Storage.ShowList )
        }
      localStorage.Shows = JSON.stringify( Saxan.Globals.Storage )
      for( var a = 0 ; a < Saxan.Globals.ShowList.length ; a++ ) if( !Saxan.Globals.ShowInfo.Levels.has( 'level' + Saxan.Globals.ShowList[ a ].Level ) ) Saxan.Globals.ShowInfo.Levels.push( 'level' + Saxan.Globals.ShowList[ a ].Level )
      Saxan.Globals.ShowInfo.Levels.sort()
      },
    CountDisplay: function(){
      Saxan.Globals.ShowInfo.Display = []
      for( var a = 0 ; a < Saxan.Globals.ShowInfo.All.length ; a++ ){
        var A = Saxan.Globals.ShowInfo.All[ a ].offsetWidth > 0
        var B = Saxan.Globals.ShowInfo.All[ a ].offsetHeight > 0
        if( A && B ) Saxan.Globals.ShowInfo.Display.push( Saxan.Globals.ShowInfo.All[ a ] )
        }
      },
    CountVisible: function(){
      Saxan.Globals.ShowInfo.Visible = []
      for( var a = 0 ; a < Saxan.Globals.ShowInfo.Display.length ; a++ ){
        var A = Saxan.Globals.ShowInfo.Display[ a ].offsetLeft >= window.scrollX
        var B = Saxan.Globals.ShowInfo.Display[ a ].offsetTop >= window.scrollY
        var C = Saxan.Globals.ShowInfo.Display[ a ].offsetLeft <= window.scrollX + Saxan.Globals.MainInfo.ShowsWidth
        var D = Saxan.Globals.ShowInfo.Display[ a ].offsetTop <= window.scrollY + Saxan.Globals.MainInfo.ShowsHeight
        if( A && B && C && D ) Saxan.Globals.ShowInfo.Visible.push( Saxan.Globals.ShowInfo.Display[ a ] )
        }
      },
    CreateInputs: function(){
      var A = document.querySelector( '#Buttons' )
      removeChildNodes( A )
      var B = document.createElement( 'Input' )
        B.id = 'level0'
        B.onmousedown = Saxan.Functions.OnConfigureClick
        B.type = 'button'
        B.value = Saxan.Globals.Storage.User == 'Basic' ? 'Configure' : ''
      A.appendChild( B )
      for( var a = 0 ; a < Saxan.Globals.ShowInfo.Levels.length && Saxan.Globals.ShowInfo.Levels.length > 1 ; a++ ){
        var B = document.createElement( 'Input' )
          B.id = Saxan.Globals.ShowInfo.Levels[ a ]
          B.onmousedown = Saxan.Functions.OnLevelClick
          B.type = 'button'
          B.value = Saxan.Globals.Storage.User == 'Basic' ? 'Level ' + ( a + 1 ) : ''
        A.appendChild( B )
        }
      },
    CreateShowList: function(){
      var A = document.querySelector( '#Shows' )
      removeChildNodes( A )
      function AddData( Title , Data , Link , Search ){
        if( Data ){
          if( Data.has( /^http/ ) ){
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
      var NetflixLink = 'http://www.netflix.com/title/REPLACE'
      var NetflixSearch = 'http://www.netflix.com/search/REPLACE'
      var WatchSeriesLink = 'http://' + Saxan.Globals.Storage.WatchSeries + '/serie/REPLACE'
      var WatchSeriesSearch = 'http://' + Saxan.Globals.Storage.WatchSeries + '/search/REPLACE'
      var WikipediaLink = 'http://en.wikipedia.org/wiki/REPLACE'
      var WikipediaSearch = 'http://en.wikipedia.org/w/index.php?search=REPLACE%20TV&title=Special%3ASearch&fulltext=1'
      for( var a = 0 ; a < Saxan.Globals.ShowList.length ; a++ ){
        var Show = document.createElement( 'Show' )
          Show.id = Saxan.Globals.ShowList[ a ].Title
          Show.dataset.Amazon = AddData( Saxan.Globals.ShowList[ a ].Title , Saxan.Globals.ShowList[ a ].Amazon , AmazonLink , AmazonSearch )
          Show.dataset.IMDB = AddData( Saxan.Globals.ShowList[ a ].Title , Saxan.Globals.ShowList[ a ].IMDB , IMDBLink , IMDBSearch )
          Show.dataset.Netflix = AddData( Saxan.Globals.ShowList[ a ].Title , Saxan.Globals.ShowList[ a ].Netflix , NetflixLink , NetflixSearch )
          Show.dataset.WatchSeries = AddData( Saxan.Globals.ShowList[ a ].Title , Saxan.Globals.ShowList[ a ].WatchSeries , WatchSeriesLink , WatchSeriesSearch )
          Show.dataset.Wikipedia = AddData( Saxan.Globals.ShowList[ a ].Title , Saxan.Globals.ShowList[ a ].Wikipedia , WikipediaLink , WikipediaSearch )
          Show.onmousedown = Saxan.Functions.OnShowClick
          Show.textContent = Saxan.Globals.ShowList[ a ].Title
          Show.classList.add( 'level' + Saxan.Globals.ShowList[ a ].Level )
        A.appendChild( Show )
        }
      if( Saxan.Globals.Storage.User === 'Basic' || Saxan.Globals.ShowInfo.Levels.Length === 1 ){
        ccss( '.level1' , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
        if( document.querySelector( '#level1' ) ) document.querySelector( '#level1' ).classList.add( 'active' )
        }
      else{
        ccss( '.perm' , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
        if( Saxan.Globals.Storage.Permanent !== '' ) Saxan.Globals.ShowInfo.Permanent = Saxan.Globals.Storage.Permanent.split( '|' )
        for( var a = 0 ; a < Saxan.Globals.ShowInfo.Permanent.length ; a++ ) Saxan.Globals.ShowInfo.All[ Saxan.Globals.ShowInfo.Permanent[ a ] ].classList.add( 'perm' )
        }
      },
    DeclareStyleSheet: function(){
      document.styleSheets[ Saxan.Globals.StyleSheets.A ].addRule( 'Body' )
      document.styleSheets[ Saxan.Globals.StyleSheets.A ].addRule( 'Input' )
      document.styleSheets[ Saxan.Globals.StyleSheets.A ].addRule( 'Show' )
      document.styleSheets[ Saxan.Globals.StyleSheets.A ].addRule( '#Buttons' )
      document.styleSheets[ Saxan.Globals.StyleSheets.A ].addRule( '#Shows' )

      for( var a = 0 ; a < Saxan.Globals.ShowInfo.Levels.length ; a++ ) document.styleSheets[ Saxan.Globals.StyleSheets.B ].addRule( '.' + Saxan.Globals.ShowInfo.Levels[ a ] )

      document.styleSheets[ Saxan.Globals.StyleSheets.B ].addRule( '.perm' )
      document.styleSheets[ Saxan.Globals.StyleSheets.B ].addRule( '.hide' )
      },
    GetCR: function(){
      var A = Saxan.Globals.ColsInfo.Count.pad( 2 , ' ' )
      var B = Saxan.Globals.RowsInfo.Count.pad( 2 , ' ' )
      var C = Saxan.Globals.ColsInfo.Max.pad( 2 , ' ' )
      var D = Saxan.Globals.RowsInfo.Max.pad( 2 , ' ' )
      console.log( '\tCount:\t%s x %s\n\tMax:\t%s x %s' , A , B , C , D )
      },
    HideAllShows: function(){
      var A = document.getElementsByTagName( 'input' )
      var B = Saxan.Globals.ShowInfo.Levels
      for( var a = 0 ; a < A.length ; a++ ) A[ a ].classList.remove( 'active' )
      for( var a = 0 ; a < B.length ; a++ ) ccss( '.' + B[ a ] , 'display' , '' , Saxan.Globals.StyleSheets.B )
      },
    MainDisplayFunctions: function(){
      Saxan.Globals.ColsInfo.Max = Math.floor( Saxan.Globals.MainInfo.ShowsWidth / Saxan.Globals.ShowInfo.BaseWidth )
      Saxan.Globals.RowsInfo.Max = Math.floor( Saxan.Globals.MainInfo.ShowsHeight / Saxan.Globals.ShowInfo.BaseHeight )
      Saxan.Globals.ShowInfo.Max = Saxan.Globals.ColsInfo.Max * Saxan.Globals.RowsInfo.Max
      Saxan.Functions.CountDisplay()
      Saxan.Functions.CountVisible()
      Saxan.Functions.RowsAndColumns()
      Saxan.Functions.StyleElements()
      },
    OnChange: function(){
      scrollTo( 0 , 0 )
      var A = document.getElementsByTagName( 'input' ).length
      Saxan.Globals.MainInfo.ButtonsHeight = A && 50 || Math.ceil( innerWidth / ( A * 5 ) )
      Saxan.Globals.MainInfo.ShowsHeight = innerHeight - Saxan.Globals.MainInfo.ButtonsHeight
      Saxan.Globals.MainInfo.ShowsWidth = innerWidth
      ccss( '#Buttons' , 'height' , Saxan.Globals.MainInfo.ButtonsHeight + 'px' , Saxan.Globals.StyleSheets.A )
      ccss( 'input' , 'width' , innerWidth / A + 'px' , Saxan.Globals.StyleSheets.A )
      Saxan.Functions.MainDisplayFunctions()
      },
    OnConfigureClick: function(){
      switch( Saxan.Globals.Storage.User ){
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
          window.open( 'config.html' )
          break
        }
      },
    OnLevelClick: function(){
      switch( event.button ){
        case 0 :
          this.classList.toggle( 'active' )
          if( this.classList.contains( 'active' ) ){
            if( !Saxan.Globals.Booleans.Permanent ) ccss( '.perm' , 'display' , '' , Saxan.Globals.StyleSheets.B )
            ccss( '.' + this.id , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
            }
          else{
            ccss( '.' + this.id , 'display' , '' , Saxan.Globals.StyleSheets.B )
            if( document.getElementsByClassName( 'active' ).length === 0 ) ccss( '.perm' , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
            }
          Saxan.Functions.MainDisplayFunctions()
          break
        case 1 :
          Saxan.Functions.HideAllShows()
          this.classList.add( 'active' )
          if( !Saxan.Globals.Booleans.Permanent ) ccss( '.perm' , 'display' , '' , Saxan.Globals.StyleSheets.B )
          ccss( '.' + this.id , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
          Saxan.Functions.MainDisplayFunctions()
          break
        case 2 :
          Saxan.Functions.HideAllShows()
          if( !Saxan.Globals.Booleans.Permanent ) ccss( '.perm' , 'display' , 'block' , Saxan.Globals.StyleSheets.B )
          Saxan.Functions.MainDisplayFunctions()
          break
        }
      },
    OnScroll: function(){
      if( !event.ctrlKey ){
        event.preventDefault()
        var A = event.deltaY > 0 ? 1 : -1
        if( Saxan.Globals.Booleans.LeftToRight ){
          scrollBy( 0 , A * Saxan.Globals.ShowInfo.Height )
          }
        else{
          scrollBy( A * Saxan.Globals.ShowInfo.Width , 0 )
          }
        }
        Saxan.Functions.StyleElements()
      },
    OnShowClick: function(){
      switch( Saxan.Globals.Storage.User ){
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
        case true : Saxan.Globals.ShowInfo.Permanent.splice( Saxan.Globals.ShowInfo.Permanent.indexOf( ShowTitle ) , 1 ) ; break
        case !true : Saxan.Globals.ShowInfo.Permanent.push( ShowTitle ) ; break
        }
      Saxan.Globals.ShowInfo.Permanent.sort()
      Saxan.Globals.Storage.Permanent = Saxan.Globals.ShowInfo.Permanent.join( '|' )
      localStorage.Shows = JSON.stringify( Saxan.Globals.Storage )
      },
    RowsAndColumns: function(){
      var A = Saxan.Globals.ShowInfo.Display.length <= Saxan.Globals.ShowInfo.Max
      var B = Saxan.Globals.Booleans.MinimunSize
      var C = Saxan.Globals.Booleans.LeftToRight
      switch( true ){
        case A && B :
          Saxan.Globals.ColsInfo.Count = Saxan.Globals.ColsInfo.Max
          Saxan.Globals.RowsInfo.Count = Saxan.Globals.RowsInfo.Max
          break
        case A && !B :
          Saxan.Globals.ColsInfo.Count = Math.ceil( Saxan.Globals.ShowInfo.Display.length / Saxan.Globals.RowsInfo.Max )
          Saxan.Globals.RowsInfo.Count = Math.ceil( Saxan.Globals.ShowInfo.Display.length / Saxan.Globals.ColsInfo.Count )
          break
        case !A && C :
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
      var A = '<div class="Title" onclick="window.open( \'https://www.google.com/search?q=' + Show.id.toHyperLink() + '\' )" >' + Show.id + '</div>'
      var B = '\
        <div class="randomLinks" onclick="window.open( \'' + Show.dataset.Amazon + '\' )" >Amazon Prime</div>\
        <div class="randomLinks" onclick="window.open( \'' + Show.dataset.IMDB + '\' )" >IMDB</div>\
        <div class="randomLinks" onclick="window.open( \'' + Show.dataset.Netflix + '\' )" >Netflix</div>\
        <div class="randomLinks" onclick="window.open( \'' + Show.dataset.WatchSeries + '\' )" >Watch Series</div>\
        <div class="randomLinks" onclick="window.open( \'' + Show.dataset.Wikipedia + '\' )" >Wikipedia</div>\
        '
      var C = 'Exit'
      var D = 0
      customAlert( A , B , C , D )
      },
    StyleElements: function(){
      Saxan.Globals.ShowInfo.Height = Math.floor( Saxan.Globals.MainInfo.ShowsHeight / Math.min( Saxan.Globals.RowsInfo.Count , Saxan.Globals.RowsInfo.Max ) )
      Saxan.Globals.ShowInfo.Width = Math.floor( Saxan.Globals.MainInfo.ShowsWidth / Math.min( Saxan.Globals.ColsInfo.Count , Saxan.Globals.ColsInfo.Max ) )

      var A = ( Saxan.Globals.MainInfo.ShowsHeight - Saxan.Globals.ShowInfo.Height * Math.min( Saxan.Globals.RowsInfo.Count , Saxan.Globals.RowsInfo.Max ) ) / 2

      ccss( 'show' , 'height' , Saxan.Globals.ShowInfo.Height + 'px' , Saxan.Globals.StyleSheets.A )
      ccss( 'show' , 'lineHeight' , Saxan.Globals.ShowInfo.Height + 'px' , Saxan.Globals.StyleSheets.A )
      ccss( 'show' , 'width' , Saxan.Globals.ShowInfo.Width  + 'px' , Saxan.Globals.StyleSheets.A )

      ccss( '#Shows' , 'height' , Saxan.Globals.ShowInfo.Height * Saxan.Globals.RowsInfo.Count + 'px' , Saxan.Globals.StyleSheets.A )
      ccss( '#Shows' , 'marginBottom' , A + Saxan.Globals.MainInfo.ButtonsHeight + 'px' , Saxan.Globals.StyleSheets.A )
      ccss( '#Shows' , 'marginTop' , A + 'px' , Saxan.Globals.StyleSheets.A )
      ccss( '#Shows' , 'width' , Saxan.Globals.ShowInfo.Width  * Saxan.Globals.ColsInfo.Count + 'px' , Saxan.Globals.StyleSheets.A )

      Saxan.Globals.Booleans.LeftToRight ? ccss( '#Shows' , 'webkitColumnCount' , '' , Saxan.Globals.StyleSheets.A ) : ccss( '#Shows' , 'webkitColumnCount' , Saxan.Globals.ColsInfo.Count , Saxan.Globals.StyleSheets.A )

      Saxan.Functions.CountVisible()

      var A = []
      var B = Math.min( Saxan.Globals.ColsInfo.Count , Saxan.Globals.ColsInfo.Max )
      var C = ( B - 1 ) / 2
      var D = true
      var E = Saxan.Globals.ShowInfo.Visible

      for( var i = 0 ; i < B ; i++ ){ if( i == C ){ A.push( 'center' ) } else{ D ? A.push( 'left' ) : A.push( 'right' ) ; D = !D } }
      if( Saxan.Globals.Booleans.LeftToRight ) for( var i = 0 ; i < E.length ; i++ ) E[ i ].style.textAlign = A[ i % Saxan.Globals.ColsInfo.Count ]
      if( !Saxan.Globals.Booleans.LeftToRight ) for( var i = 0 ; i < E.length ; i++ ) E[ i ].style.textAlign = A[ Math.floor( i / Saxan.Globals.RowsInfo.Count ) ]
      },
    },
  }