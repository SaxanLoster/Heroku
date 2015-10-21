( function () {
  var rowcount = 0
  var skip = false
  var showlist = []
  var storage

  Number.prototype.pad = function ( size , text ) {
    var i = 0
    var n = this < 0
    var s = ''
    var t = text || '0'
    var z = Math.max( size , this.toString().length )
    while( s.length < z - 1 ){
      s += t[ i ]
      i = i + 1 == t.length ? 0 : i + 1
      }
    s = t == '0' && n ? '-' + s : t + s
    s = t == '0'
      ? s.slice( 0 , z - Math.abs( this ).toString().length ) + Math.abs( this )
      : s.slice( 0 , z - this.toString().length ) + this
    return s
    }

  var CheckLocalStorage = function () {
    if ( !localStorage.Shows ) {
      localStorage.Shows = '{ "backup": {} , "failure": {} , "permanent": "" , "showlist": {} , "user": "basic" , "watchseries": "watch-series-tv.to" }'
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
    }
  var CheckNumbers = function () {
    var rows = document.querySelectorAll( 'tr' )
    for ( var iter1 = 1 ; iter1 < rows.length ; iter1++ ) {
      rows[ iter1 ].firstElementChild.textContent = iter1.pad( 3 , ' ' ).replace( / /g , '\u00a0' )
      }
    var inputs = document.querySelectorAll( 'input[type="text"]' )
    for ( var iter1 = 0 ; iter1 < inputs.length ; iter1++ ) {
      inputs[ iter1 ].addEventListener( 'focus' , OnFocus )
      }
    }
  var DeleteRow = function () {
    var rows = document.querySelectorAll( 'tr' )
    var rownumber = prompt( 'What row do you want to delete?' )
    if ( rownumber ) {
      rownumber = rownumber * 1
      }
    else {
      return false
      }
    if ( rownumber === 0 || rownumber > rowcount ) {
      return false
      }
    rows[ rownumber ].parentNode.removeChild( rows[ rownumber ] )
    rowcount--
    CheckNumbers()
    }
  var EventListeners = function () {
    window.addEventListener( 'keydown' , OnKeyDown )
    document.getElementById( 'buttons' ).children[ 0 ].addEventListener( 'click' , DeleteRow )
    document.getElementById( 'buttons' ).children[ 1 ].addEventListener( 'click' , InsertRow )
    document.getElementById( 'buttons' ).children[ 2 ].addEventListener( 'click' , SaveFile )
    document.getElementById( 'buttons' ).children[ 3 ].addEventListener( 'click' , SaveLocal )
    document.getElementById( 'buttons' ).children[ 4 ].addEventListener( 'click' , SortByLevel )
    document.getElementById( 'buttons' ).children[ 5 ].addEventListener( 'click' , SortByTitle )
    }
  var InsertRow = function(){
    var rownumber = '0'
    if ( rownumber ) {
      rownumber = rownumber * 1
      }
    else {
      return false
      }
    var main = document.getElementById( 'main' )
    var rows = document.getElementsByTagName( 'tr' )
    rowcount++

    var e1 = document.createElement( 'tr' )
    var e1e1 = document.createElement( 'th' )
    var e1e2 = document.createElement( 'td' )
    var e1e3 = document.createElement( 'td' )
    var e1e4 = document.createElement( 'td' )
    var e1e5 = document.createElement( 'td' )
    var e1e6 = document.createElement( 'td' )
    var e1e7 = document.createElement( 'td' )
    var e1e2e1 = document.createElement( 'input' )
    var e1e3e1 = document.createElement( 'input' )
    var e1e4e1 = document.createElement( 'input' )
    var e1e5e1 = document.createElement( 'input' )
    var e1e6e1 = document.createElement( 'input' )
    var e1e7e1 = document.createElement( 'input' )

    e1.appendChild( e1e1 )
    e1.appendChild( e1e2 )
    e1.appendChild( e1e3 )
    e1.appendChild( e1e4 )
    e1.appendChild( e1e5 )
    e1.appendChild( e1e6 )
    e1.appendChild( e1e7 )
    e1e2.appendChild( e1e2e1 )
    e1e3.appendChild( e1e3e1 )
    e1e4.appendChild( e1e4e1 )
    e1e5.appendChild( e1e5e1 )
    e1e6.appendChild( e1e6e1 )
    e1e7.appendChild( e1e7e1 )

    e1e1.textContent = rownumber + 1
    e1e2e1.placeholder = 'Title'
    e1e2e1.type = 'text'
    e1e3e1.value = '1'
    e1e3e1.className = 'centered'
    e1e3e1.placeholder = 'Level'
    e1e3e1.type = 'text'
    e1e4e1.placeholder = 'IMDB'
    e1e4e1.type = 'text'
    e1e5e1.placeholder = 'Netflix'
    e1e5e1.type = 'text'
    e1e6e1.placeholder = 'Watch Series'
    e1e6e1.type = 'text'
    e1e7e1.placeholder = 'Wikipedia'
    e1e7e1.type = 'text'

    if ( rownumber < rowcount - 1 ) {
      main.insertBefore( e1 , rows[ rownumber + 1 ] )
      }
    else {
      main.appendChild( e1 )
      }
    CheckNumbers()
    scroll( 0 , 0 )
    document.querySelector( '#main > tr:nth-child(2) > td:nth-child(2) > input[type="text"]' ).focus()
    }
  var Main = function(){
    var main = document.getElementById( 'main' )

    while ( main.childNodes.length > 0 ) {
      main.removeChild( main.firstChild )
      }

    var e1 = document.createElement( 'tr' )
    var e1e1 = document.createElement( 'th' )
    var e1e2 = document.createElement( 'th' )
    var e1e3 = document.createElement( 'th' )
    var e1e4 = document.createElement( 'th' )
    var e1e5 = document.createElement( 'th' )
    var e1e6 = document.createElement( 'th' )
    var e1e7 = document.createElement( 'th' )

    main.appendChild( e1 )
    e1.appendChild( e1e1 )
    e1.appendChild( e1e2 )
    e1.appendChild( e1e3 )
    e1.appendChild( e1e4 )
    e1.appendChild( e1e5 )
    e1.appendChild( e1e6 )
    e1.appendChild( e1e7 )

    e1e1.textContent = 'Count'
    e1e2.textContent = 'Title'
    e1e3.textContent = 'Level'
    e1e4.textContent = 'IMDB'
    e1e5.textContent = 'Netflix'
    e1e6.textContent = 'Watch Series'
    e1e7.textContent = 'Wikipedia'

    for ( var iter1 = 0 ; iter1 < showlist.length ; iter1++ ) {
      var e1 = document.createElement( 'tr' )
      var e1e1 = document.createElement( 'th' )
      var e1e2 = document.createElement( 'td' )
      var e1e3 = document.createElement( 'td' )
      var e1e4 = document.createElement( 'td' )
      var e1e5 = document.createElement( 'td' )
      var e1e6 = document.createElement( 'td' )
      var e1e7 = document.createElement( 'td' )
      var e1e2e1 = document.createElement( 'input' )
      var e1e3e1 = document.createElement( 'input' )
      var e1e4e1 = document.createElement( 'input' )
      var e1e5e1 = document.createElement( 'input' )
      var e1e6e1 = document.createElement( 'input' )
      var e1e7e1 = document.createElement( 'input' )

      main.appendChild( e1 )
      e1.appendChild( e1e1 )
      e1.appendChild( e1e2 )
      e1.appendChild( e1e3 )
      e1.appendChild( e1e4 )
      e1.appendChild( e1e5 )
      e1.appendChild( e1e6 )
      e1.appendChild( e1e7 )
      e1e2.appendChild( e1e2e1 )
      e1e3.appendChild( e1e3e1 )
      e1e4.appendChild( e1e4e1 )
      e1e5.appendChild( e1e5e1 )
      e1e6.appendChild( e1e6e1 )
      e1e7.appendChild( e1e7e1 )

      e1e2e1.placeholder = 'Title'
      e1e2e1.type = 'text'
      e1e2e1.value = showlist[ iter1 ].title
      e1e3e1.className = 'centered'
      e1e3e1.placeholder = 'Level'
      e1e3e1.type = 'text'
      e1e3e1.value = showlist[ iter1 ].level
      e1e4e1.placeholder = 'IMDB'
      e1e4e1.type = 'text'
      e1e4e1.value = showlist[ iter1 ].imdb
      e1e5e1.placeholder = 'Netflix'
      e1e5e1.type = 'text'
      e1e5e1.value = showlist[ iter1 ].netflix
      e1e6e1.placeholder = 'Watch Series'
      e1e6e1.type = 'text'
      e1e6e1.value = showlist[ iter1 ].watchseries
      e1e7e1.placeholder = 'Wikipedia'
      e1e7e1.type = 'text'
      e1e7e1.value = showlist[ iter1 ].wikipedia
      }

    CheckNumbers()
    rowcount = document.getElementsByTagName( 'tr' ).length - 1
    }
  var OnFocus = function () {
    setTimeout( function ( event ) {
      event.srcElement.select()
      } , 50 , event )
    }
  var OnKeyDown = function () {
    if ( event.altKey || event.ctrlKey ) {
      return false
      }
    if ( event.srcElement.tagName === 'INPUT' ) {
      if ( event.keyCode === 13 ) {
        var input = event.srcElement.parentElement.parentElement
        var column = event.srcElement.placeholder
        if( event.shiftKey ) {
          input.previousSibling.querySelector( '[placeholder=' + column + ']' ).focus()
          }
        else {
          input.nextSibling.querySelector( '[placeholder=' + column + ']' ).focus()
          }
        }
      if ( event.keyCode === 27 ) {
        event.srcElement.blur()
        }
      }
    if ( event.srcElement.tagName !== 'INPUT' ) {
      var titles = document.querySelectorAll( 'td:nth-child( 2 ) input' )
      for ( var iter1 = 0 ; iter1 < titles.length ; iter1++ ) {
        if ( titles[ iter1 ].value.charCodeAt( 0 ) === event.keyCode ) {
          break
          }
        }
      if ( iter1 < titles.length ) titles[ iter1 ].scrollIntoViewIfNeeded()
      }
    }
  var SaveData = function(){
    SortByTitle()
    var rows = document.querySelectorAll( 'tr' )
    if ( rows.length < 2 ) {
      return false
      }
    var data = '[\n'
    for ( var iter1 = 1 ; iter1 < rows.length ; iter1++ ) {
      data += '\t{'
      data += ' "title": "'       + rows[ iter1 ].children[ 1 ].firstChild.value + '" ,'
      data += ' "level": "'       + rows[ iter1 ].children[ 2 ].firstChild.value + '" ,'
      data += ' "imdb": "'        + rows[ iter1 ].children[ 3 ].firstChild.value + '" ,'
      data += ' "netflix": "'     + rows[ iter1 ].children[ 4 ].firstChild.value + '" ,'
      data += ' "watchseries": "' + rows[ iter1 ].children[ 5 ].firstChild.value + '" ,'
      data += ' "wikipedia": "'   + rows[ iter1 ].children[ 6 ].firstChild.value + '" '
      data += iter1 < rows.length - 1 ? '},\n' : '}\n'
      }
    data += ']'
    return data
    }
  var SaveFile = function(){
    window.open( 'data:text.json,' + encodeURI( SaveData() ) , 'Show.JSON' )
    }
  var SaveLocal = function(){
    storage.showlist = JSON.parse( SaveData() )
    localStorage.Shows = JSON.stringify( storage )
    }
  var SortByLevel = function(){
    var main = document.getElementById( 'main' )
    var cloned = main.cloneNode( true )
    var holder = document.createElement( 'tbody' )
    cloned.removeChild( cloned.firstElementChild )
    var rows = cloned.children
    while ( rows.length > 0 ) {
      var iter1 = 0
      for ( var iter2 = 0 ; iter2 < rows.length ; iter2++ ) {
        var row1level = rows[ iter1 ].firstElementChild.nextSibling.nextSibling.firstElementChild.value.toLowerCase()
        var row2level = rows[ iter2 ].firstElementChild.nextSibling.nextSibling.firstElementChild.value.toLowerCase()
        if ( row1level > row2level ) {
          iter1 = iter2
          }
        }
      holder.appendChild( rows[ iter1 ] )
      }
    while ( main.childNodes.length > 1 ) {
      main.removeChild( main.firstChild.nextSibling )
      }
    while ( holder.childElementCount > 0 ) {
      main.appendChild( holder.firstElementChild )
      }
    CheckNumbers()
    }
  var SortByTitle = function(){
    var main = document.getElementById( 'main' )
    var cloned = main.cloneNode( true )
    var holder = document.createElement( 'tbody' )
    cloned.removeChild( cloned.firstElementChild )
    var rows = cloned.children
    while ( rows.length > 0 ) {
      var iter1 = 0
      for ( var iter2 = 0 ; iter2 < rows.length ; iter2++ ) {
        var row1name = rows[ iter1 ].firstElementChild.nextSibling.firstElementChild.value.toLowerCase()
        var row2name = rows[ iter2 ].firstElementChild.nextSibling.firstElementChild.value.toLowerCase()
        if ( skip ) {
          row1name = row1name.replace( /^(the | a )/ , '' )
          row2name = row2name.replace( /^(the | a )/ , '' )
          }
        if ( row1name > row2name ) {
          iter1 = iter2
          }
        }
      holder.appendChild( rows[ iter1 ] )
      }
    while ( main.childNodes.length > 1 ) {
      main.removeChild( main.firstChild.nextSibling )
      }
    while ( holder.childElementCount > 0 ) {
      main.appendChild( holder.firstElementChild )
      }
    CheckNumbers()
    }

  CheckLocalStorage()
  EventListeners()
  Main()
  }() )