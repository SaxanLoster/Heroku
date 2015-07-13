
Array.prototype.has = function( string ){
  var bool = false
  for( var i = 0 ; i < this.length ; i++ ){
    if( this[ i ] == string ) bool = true
    }
  return bool
  }
String.prototype.has = function( string ){
  return ( this.match( string ) !== null )
  }
String.prototype.toHyperLink = function(){
  return encodeURIComponent( this ).replace( /'/g , '\\\'' )
  }
function ccss( theClass , attribute , value , sheet ){
  var a = attribute
  var c = theClass.toLowerCase()
  var d = document.styleSheets[ sheet ]
  var r = d.cssRules || d.rules
  var s = ''
  var b = false
  var v = ( typeof value == 'number' ) ? value.toString() : value
  for( var i = 0 ; i < r.length ; i++ ){
    s = r[ i ].selectorText.toLowerCase()
    if( c == s ){
      b = true
      r[ i ].style[ a ] = v
      return
      }
    }
  if( !b ){
    try{
      d.insertRule( c + '{  }' , r.length )
      }
    catch( err ){
      d.addRule( c , '' , r.length )
      }
    r[ r.length - 1 ].selectorText = c
    r[ r.length - 1 ].style[ a ]   = v
    }
  }
function customAlert( TextTop , TextMid , TextBot , Clock ){
  ButtonSize = function(){
    document.getElementById( 'AlertButton' ).style.fontSize   = ( document.getElementById( 'AlertButton' ).offsetHeight / 2 ).toString() + 'px'
    document.getElementById( 'AlertButton' ).style.lineHeight = ( document.getElementById( 'AlertButton' ).offsetHeight - 2 ).toString() + 'px'
    }
  var Close = function(){
    document.getElementsByTagName( 'body' )[ 0 ].removeChild( document.getElementById( 'AlertFiller' ) )
    window.removeEventListener( 'resize' , ButtonSize )
    }
  var Main = document.getElementsByTagName( 'body' )[ 0 ]
  var AlertFiller = document.createElement( 'div' )
    AlertFiller.id = 'AlertFiller'
    AlertFiller.style.backgroundColor = '#000'
    AlertFiller.style.display = 'block'
    AlertFiller.style.height = '100%'
    AlertFiller.style.margin = 'auto'
    AlertFiller.style.opacity = '1'
    AlertFiller.style.position = 'fixed'
    AlertFiller.style.bottom = '0'
    AlertFiller.style.left = '0'
    AlertFiller.style.right = '0'
    AlertFiller.style.top = '0'
    AlertFiller.style.width = '100%'
    AlertFiller.style.zIndex = '10'
  var AlertBorder = document.createElement( 'div' )
    AlertBorder.id = 'AlertBorder'
    AlertBorder.style.backgroundColor = '#222'
    AlertBorder.style.borderRadius = '10px'
    AlertBorder.style.boxSizing = 'content-box'
    AlertBorder.style.MozBoxSizing = 'content-box'
    AlertBorder.style.color = '#FFF'
    AlertBorder.style.display = 'block'
    AlertBorder.style.fontSize = '20px'
    AlertBorder.style.height = '75%'
    AlertBorder.style.margin = 'auto'
    AlertBorder.style.maxHeight = '600px'
    AlertBorder.style.maxWidth = '800px'
    AlertBorder.style.position = 'fixed'
    AlertBorder.style.bottom = '0'
    AlertBorder.style.left = '0'
    AlertBorder.style.right = '0'
    AlertBorder.style.top = '0'
    AlertBorder.style.width = '75%'
    AlertBorder.style.zIndex = '11'
  var AlertHolder = document.createElement( 'div' )
    AlertHolder.id = 'AlertHolder'
    AlertHolder.style.height = 'calc( 100% - 20px )'
    AlertHolder.style.margin = '10px'
    AlertHolder.style.position = 'absolute'
    AlertHolder.style.bottom = '0'
    AlertHolder.style.left = '0'
    AlertHolder.style.right = '0'
    AlertHolder.style.top = '0'
    AlertHolder.style.width = 'calc( 100% - 20px )'
  var AlertHeader = document.createElement( 'div' )
    AlertHeader.id = 'AlertHeader'
    AlertHeader.innerHTML = TextTop
    AlertHeader.style.alignContent = 'center'
    AlertHeader.style.backgroundColor = '#444'
    AlertHeader.style.borderRadius = '5px 5px 0 0'
    AlertHeader.style.boxSizing = 'border-box'
    AlertHeader.style.display = 'flex'
    AlertHeader.style.flexDirection = 'column'
    AlertHeader.style.fontSize = '36px'
    AlertHeader.style.fontVariant = 'small-caps'
    AlertHeader.style.height = '25%'
    AlertHeader.style.justifyContent = 'center'
    AlertHeader.style.letterSpacing = '2px'
    AlertHeader.style.overflow = 'hidden'
    AlertHeader.style.position = 'relative'
    AlertHeader.style.textAlign = 'center'
    AlertHeader.style.verticalAlign = 'middle'
    AlertHeader.style.width = '100%'
  var AlertCenter = document.createElement( 'div' )
    AlertCenter.id = 'AlertCenter'
    AlertCenter.innerHTML = TextMid
    AlertCenter.style.backgroundColor = '#666'
    AlertCenter.style.boxSizing = 'border-box'
    AlertCenter.style.display = 'flex'
    AlertCenter.style.flexDirection = 'column'
    AlertCenter.style.height = '45%'
    AlertCenter.style.justifyContent = 'center'
    AlertCenter.style.overflow = 'hidden'
    AlertCenter.style.position = 'relative'
    AlertCenter.style.textAlign = 'center'
    AlertCenter.style.verticalAlign = 'middle'
    AlertCenter.style.width = '100%'
  var AlertFooter = document.createElement( 'div' )
    AlertFooter.id = 'AlertFooter'
    AlertFooter.style.backgroundColor = '#444'
    AlertFooter.style.borderRadius = '0 0 5px 5px'
    AlertFooter.style.boxSizing = 'border-box'
    AlertFooter.style.display = 'block'
    AlertFooter.style.height = '30%'
    AlertFooter.style.overflow = 'hidden'
    AlertFooter.style.position = 'relative'
    AlertFooter.style.width = '100%'
  var AlertButton = document.createElement( 'div' )
    AlertButton.id = 'AlertButton'
    AlertButton.innerHTML = TextBot
    AlertButton.onclick = Close
    AlertButton.style.backgroundColor = '#999'
    AlertButton.style.border = '1px solid #000'
    AlertButton.style.borderRadius = '25px'
    AlertButton.style.boxSizing = 'border-box'
    AlertButton.style.color = '#000'
    AlertButton.style.cursor = 'pointer'
    AlertButton.style.height = '50%'
    AlertButton.style.justifyContent = 'center'
    AlertButton.style.margin = 'auto'
    AlertButton.style.overflow = 'hidden'
    AlertButton.style.position = 'absolute'
    AlertButton.style.bottom = '0'
    AlertButton.style.left = '0'
    AlertButton.style.right = '0'
    AlertButton.style.top = '0'
    AlertButton.style.textAlign = 'center'
    AlertButton.style.width = '50%'
  Main.appendChild( AlertFiller )
  AlertFiller.appendChild( AlertBorder )
  AlertBorder.appendChild( AlertHolder )
  AlertHolder.appendChild( AlertHeader )
  AlertHolder.appendChild( AlertCenter )
  AlertHolder.appendChild( AlertFooter )
  AlertFooter.appendChild( AlertButton )
  ButtonSize()
  window.addEventListener( 'resize' , ButtonSize )
  if( Clock > 0 ) window[ 'timer' ] = setTimeout( Close , Clock )
  }
function PreventActions( Event ){
  var Alphabet  = Event.which >= 65 && Event.which <= 90 && !Event.ctrlKey
  var SelectAll = Event.which == 65 && Event.ctrlKey
  if( Alphabet || SelectAll ) Event.preventDefault()
  }
function removeChildNodes( element ){
  while( element.childNodes.length > 0 ) element.removeChild( element.firstChild )
  }
function removeChildren( element ){
  while( element.childElementCount > 0 ) element.removeChild( element.firstElementChild )
  }