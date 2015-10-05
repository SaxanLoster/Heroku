Saxan = {
  Globals: {
    Rows: 0,
    ShowList: {},
    Skip: false,
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
      },
    CheckNumbers: function(){
      var A = document.querySelectorAll( 'tr' )
      for( var a = 1 ; a < A.length ; a++ ) A[ a ].firstElementChild.textContent = a.pad( 3 , ' ' ).replace( / /g , '\u00a0' )
      Saxan.Functions.EventListeners()
      },
    DeleteRow: function(){
      var A = prompt( 'What row do you want to delete?' )
      if( A ) A = A * 1
      else return
      if( A == 0 || A > Saxan.Globals.Rows ) return
      var B = document.querySelectorAll( 'tr' )
      B[ A ].parentNode.removeChild( B[ A ] )
      rows--
      Saxan.Functions.CheckNumbers()
      },
    EventListeners: function(){
      var A = document.querySelectorAll( 'input[type="text"]' )
      for( var a = 0 ; a < A.length ; a++ ) A[ a ].addEventListener( 'focus' , Saxan.Functions.OnFocus )
      window.addEventListener( 'keydown' , Saxan.Functions.OnKeyDown )
      },
    InsertRow: function(){
      var a = '0'
      if( a ) a = a * 1
      else return
      var A = document.getElementById( 'main' )
      var B = document.getElementsByTagName( 'tr' )
      var C , D , E
      Saxan.Globals.Rows++

      C = document.createElement( 'tr' )
        D = document.createElement( 'th' )
          D.textContent = a + 1
          C.appendChild( D )
        D = document.createElement( 'td' )
          E = document.createElement( 'input' )
            E.placeholder = 'Title'
            E.type = 'text'
            D.appendChild( E )
          C.appendChild( D )
        D = document.createElement( 'td' )
          E = document.createElement( 'input' )
            E.classList.add( 'centerText' )
            E.placeholder = 'Level'
            E.type = 'text'
            E.value = '1'
            D.appendChild( E )
          C.appendChild( D )
        D = document.createElement( 'td' )
          E = document.createElement( 'input' )
            E.placeholder = 'IMDB'
            E.type = 'text'
            D.appendChild( E )
          C.appendChild( D )
        D = document.createElement( 'td' )
          E = document.createElement( 'input' )
            E.placeholder = 'Netflix'
            E.type = 'text'
            D.appendChild( E )
          C.appendChild( D )
        D = document.createElement( 'td' )
          E = document.createElement( 'input' )
            E.placeholder = 'Watch Series'
            E.type = 'text'
            D.appendChild( E )
          C.appendChild( D )
        D = document.createElement( 'td' )
          E = document.createElement( 'input' )
            E.placeholder = 'Wikipedia'
            E.type = 'text'
            D.appendChild( E )
          C.appendChild( D )

      if( a < Saxan.Globals.Rows - 1 ) A.insertBefore( C , B[ a + 1 ] )
      else A.appendChild( C )
      Saxan.Functions.CheckNumbers()
      scroll( 0 , 0 )
      document.querySelector( '#main > tr:nth-child(2) > td:nth-child(2) > input[type="text"]' ).focus()
      },
    Main: function(){
      var A = document.getElementById( 'main' )
      var B , C , D , E

      removeChildren( A )

      B = document.createElement( 'tr' )
        C = document.createElement( 'th' )
          C.textContent = 'Count'
          B.appendChild( C )
        C = document.createElement( 'th' )
          C.textContent = 'Title'
          B.appendChild( C )
        C = document.createElement( 'th' )
          C.textContent = 'Level'
          B.appendChild( C )
        C = document.createElement( 'th' )
          C.textContent = 'IMDB'
          B.appendChild( C )
        C = document.createElement( 'th' )
          C.textContent = 'Netflix'
          B.appendChild( C )
        C = document.createElement( 'th' )
          C.textContent = 'Watch Series'
          B.appendChild( C )
        C = document.createElement( 'th' )
          C.textContent = 'Wikipedia'
          B.appendChild( C )
        A.appendChild( B )

      for( var a = 0 ; a < Saxan.Globals.ShowList.length ; a++ ){
        B = document.createElement( 'tr' )
          C = document.createElement( 'th' )
            B.appendChild( C )
          C = document.createElement( 'td' )
            D = document.createElement( 'input' )
              D.placeholder = 'Title'
              D.type = 'text'
              D.value = Saxan.Globals.ShowList[ a ].Title
              C.appendChild( D )
            B.appendChild( C )
          C = document.createElement( 'td' )
            D = document.createElement( 'input' )
              D.classList.add( 'centerText' )
              D.placeholder = 'Level'
              D.type = 'text'
              D.value = Saxan.Globals.ShowList[ a ].Level
              C.appendChild( D )
            B.appendChild( C )
          C = document.createElement( 'td' )
            D = document.createElement( 'input' )
              D.placeholder = 'IMDB'
              D.type = 'text'
              D.value = Saxan.Globals.ShowList[ a ].IMDB
              C.appendChild( D )
            B.appendChild( C )
          C = document.createElement( 'td' )
            D = document.createElement( 'input' )
              D.placeholder = 'Netflix'
              D.type = 'text'
              D.value = Saxan.Globals.ShowList[ a ].Netflix
              C.appendChild( D )
            B.appendChild( C )
          C = document.createElement( 'td' )
            D = document.createElement( 'input' )
              D.placeholder = 'Watch Series'
              D.type = 'text'
              D.value = Saxan.Globals.ShowList[ a ].WatchSeries
              C.appendChild( D )
            B.appendChild( C )
          C = document.createElement( 'td' )
            D = document.createElement( 'input' )
              D.placeholder = 'Wikipedia'
              D.type = 'text'
              D.value = Saxan.Globals.ShowList[ a ].Wikipedia
              C.appendChild( D )
            B.appendChild( C )
          A.appendChild( B )
        }

      Saxan.Functions.CheckNumbers()
      Saxan.Globals.Rows = document.getElementsByTagName( 'tr' ).length - 1
      },
    OnFocus: function(){
      setTimeout( function( event ){
        event.srcElement.select()
        } , 50 , event )
      },
    OnKeyDown: function(){
      if( event.altKey || event.ctrlKey ) return false
      if( event.srcElement.tagName.toLowerCase() === 'input' ){
        if( event.keyCode === 13 ){
          var A = event.srcElement.parentElement.parentElement
          var B = event.srcElement.placeholder
          if( event.shiftKey ) A.previousSibling.querySelector( '[placeholder=' + B + ']' ).focus()
          else A.nextSibling.querySelector( '[placeholder=' + B + ']' ).focus()
          }
        if( event.keyCode === 27 ){
          event.srcElement.blur()
          }
        }
      if( event.srcElement.tagName.toLowerCase() !== 'input' ){
        var A = document.querySelectorAll( 'td:nth-child( 2 ) input' )
        for( var a = 0 ; a < A.length ; a++ ) if( A[ a ].value.charCodeAt( 0 ) === event.keyCode ) break
        if( a < A.length ) A[ a ].scrollIntoViewIfNeeded()
        }
      },
    OnResize: function(){
      var A = document.querySelectorAll( 'input.head' )
      var B = Math.F( innerWidth / A.length )
      document.querySelector( '#head' ).style.width       = B * A.length
      document.querySelector( '#head' ).style.marginLeft  = ( innerWidth - ( B * A.length ) ) / 2
      document.querySelector( '#head' ).style.marginRight = ( innerWidth - ( B * A.length ) ) / 2
      for( var i = 0 ; i < A.length ; i++ ) A[ i ].style.width = B - 24 + 'px'
      },
    SaveData: function(){
      Saxan.Functions.SortByTitle()
      var A = document.querySelectorAll( 'tr' )
      if( A.length < 2 ) return
      var B = '[\n'
      for( var a = 1 ; a < A.length ; a++ ){
        B += '\t{'
        B += ' "Title": "'       + A[ a ].children[ 1 ].firstChild.value + '" ,'
        B += ' "Level": "'       + A[ a ].children[ 2 ].firstChild.value + '" ,'
        B += ' "IMDB": "'        + A[ a ].children[ 3 ].firstChild.value + '" ,'
        B += ' "Netflix": "'     + A[ a ].children[ 4 ].firstChild.value + '" ,'
        B += ' "WatchSeries": "' + A[ a ].children[ 5 ].firstChild.value + '" ,'
        B += ' "Wikipedia": "'   + A[ a ].children[ 6 ].firstChild.value + '" '
        B += a < A.length - 1 ? '},\n' : '}\n'
        }
      B += ']'
      return B
      },
    SaveFile: function(){
      var A = Saxan.Functions.SaveData()
      window.open( 'data:text.json,' + encodeURI( A ) , 'Show.JSON' )
      },
    SaveLocal: function(){
      Saxan.Globals.Storage.ShowList = JSON.parse( Saxan.Functions.SaveData() )
      localStorage.Shows = JSON.stringify( Saxan.Globals.Storage )
      },
    SortByLevel: function(){
      var A = document.getElementById( 'main' )
      var B = document.querySelectorAll( 'tr' )
      var C = A.cloneNode( true )
      var D = document.createElement( 'tbody' )
      C.removeChild( C.firstElementChild )
      var E = C.children
      var F = 0
      while( E.length > 0 ){
        var a = 0
        for( var b = 0 ; b < E.length ; b++ ){
          var c = E[ a ].firstElementChild.nextSibling.nextSibling.firstElementChild.value.toLowerCase()
          var d = E[ b ].firstElementChild.nextSibling.nextSibling.firstElementChild.value.toLowerCase()
          if( c > d ) a = b
          }
        D.appendChild( E[ a ] )
        F++
        }
      while( A.childNodes.length > 1 ) A.removeChild( A.firstChild.nextSibling )
      while( D.childElementCount > 0 ) A.appendChild( D.firstElementChild )
      Saxan.Functions.CheckNumbers()
      },
    SortByTitle: function(){
      var A = document.getElementById( 'main' )
      var B = document.querySelectorAll( 'tr' )
      var C = A.cloneNode( true )
      var D = document.createElement( 'tbody' )
      C.removeChild( C.firstElementChild )
      var E = C.children
      var F = 0
      while( E.length > 0 ){
        var a = 0
        for( var b = 0 ; b < E.length ; b++ ){
          var c = E[ a ].firstElementChild.nextSibling.firstElementChild.value.toLowerCase()
          var d = E[ b ].firstElementChild.nextSibling.firstElementChild.value.toLowerCase()
          if( Saxan.Globals.Skip ){
            c = c.replace( /^(the | a )/ , '' )
            d = d.replace( /^(the | a )/ , '' )
            }
          if( c > d ) a = b
          }
        D.appendChild( E[ a ] )
        F++
        }
      while( A.childNodes.length > 1 ) A.removeChild( A.firstChild.nextSibling )
      while( D.childElementCount > 0 ) A.appendChild( D.firstElementChild )
      Saxan.Functions.CheckNumbers()
      },
    },
  }