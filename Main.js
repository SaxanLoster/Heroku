// Variables
    StyleSheets = { A: 1 , B: 2 }
    Booleans  = {
        LeftToRight: !true,
        MinimunSize: !true,
        }
    ClickInfo = {
        Elem1: null,
        Elem2: null,
        Time1: null,
        Time2: null,
        }
    ColsInfo  = {
        Count: 0,
        Max: 0,
        }
    RowsInfo  = {
        Count: 0,
        Max: 0,
        }
    MainInfo  = {
        ButtonsHeight: 0,
        ShowsHeight: 0,
        ShowsWidth: 0,
        }
    ShowInfo  = {
        All: document.getElementsByTagName( 'Show' ),
        BaseHeight: 60,
        BaseWidth: 320,
        Display: [],
        Height: 0,
        Hidden: [],
        Levels: [],
        Max: 0,
        Permanent: [],
        Visible: [],
        Width: 0,
        }
// Console
    function GetCR(){
        var CC = ColsInfo.Count.pad( 2 , ' ' )
        var RC = RowsInfo.Count.pad( 2 , ' ' )
        var CM = ColsInfo.Max.pad( 2 , ' ' )
        var RM = RowsInfo.Max.pad( 2 , ' ' )
        console.log( '\tCount:\t%s x %s\n\tMax:\t%s x %s' , CC , RC , CM , RM )
        }
    function SetCR( C , R ){
        ColsInfo.Count = C > 0 ? C : Math.ceil( ShowInfo.Visible.length / R )
        RowsInfo.Count = R > 0 ? R : Math.ceil( ShowInfo.Visible.length / C )
        StyleElements()
        }
// Display
    function CountDisplay(){
        ShowInfo.Display = []
        for( var i = 0 ; i < ShowInfo.All.length ; i++ ){
            var A = ShowInfo.All[ i ].offsetWidth  > 0
            var B = ShowInfo.All[ i ].offsetHeight > 0
            if( A && B ) ShowInfo.Display.push( ShowInfo.All[ i ] )
            }
        }
    function CountVisible(){
        ShowInfo.Visible = []
        for( var i = 0 ; i < ShowInfo.Display.length ; i++ ){
            var A = ShowInfo.Display[ i ].offsetLeft >= window.scrollX
            var B = ShowInfo.Display[ i ].offsetTop  >= window.scrollY
            var C = ShowInfo.Display[ i ].offsetLeft <= window.scrollX + MainInfo.ShowsWidth
            var D = ShowInfo.Display[ i ].offsetTop  <= window.scrollY + MainInfo.ShowsHeight
            if( A && B && C && D ) ShowInfo.Visible.push( ShowInfo.Display[ i ] )
            }
        }
    function HideAllShows(){
        var I = document.getElementsByTagName( 'input' )
        var L = ShowInfo.Levels
        for( var i = 0 ; i < I.length ; i++ ) I[ i ].classList.remove( 'active' )
        for( var i = 0 ; i < L.length ; i++ ) ccss( '.' + L[ i ] , 'display' , '' , StyleSheets.B )
        }
    function MainDisplayFunctions(){
        ColsInfo.Max = Math.floor( MainInfo.ShowsWidth  / ShowInfo.BaseWidth )
        RowsInfo.Max = Math.floor( MainInfo.ShowsHeight / ShowInfo.BaseHeight )
        ShowInfo.Max = ColsInfo.Max * RowsInfo.Max
        CountDisplay()
        CountVisible()
        RowsAndColumns()
        StyleElements()
        }
    function PermanentItemToggle( ShowTitle ){
        switch(  ShowInfo.Permanent.has( ShowTitle ) ){
            case  true : ShowInfo.Permanent.splice( ShowInfo.Permanent.indexOf( ShowTitle ) , 1 ) ; break
            case !true : ShowInfo.Permanent.push( ShowTitle ) ; break
            }
        ShowInfo.Permanent.sort()
        localStorage.Permanent = ShowInfo.Permanent.join( '|' )
        }
    function RowsAndColumns(){
        var A = ShowInfo.Display.length <= ShowInfo.Max,
            B = Booleans.MinimunSize,
            C = Booleans.LeftToRight
        switch( true ){
            case  A &&  B :
                ColsInfo.Count = ColsInfo.Max
                RowsInfo.Count = RowsInfo.Max
                break
            case  A && !B :
                var Cm = Math.ceil( ShowInfo.Display.length / RowsInfo.Max )
                var CM = ColsInfo.Max
                var Rm = Math.ceil( ShowInfo.Display.length / ColsInfo.Max )
                var RM = RowsInfo.Max
                var S = Math.sqrt( ShowInfo.Max / ShowInfo.Display.length )
                var c1 = Math.floor( CM / S )
                var c2 = Math.ceil( CM / S )
                var r1 = Math.ceil( ShowInfo.Display.length / c1 )
                var r2 = Math.ceil( ShowInfo.Display.length / c2 )
                switch( true ){
                    case ( c2 > CM || r2 > RM ) :
                        ColsInfo.Count = c1
                        RowsInfo.Count = r1
                        break
                    case ( c1 < Cm || r1 < Rm ) :
                        ColsInfo.Count = c2
                        RowsInfo.Count = r2
                        break
                    case ( c1 * r1 < c2 * r2 ) :
                        ColsInfo.Count = c1
                        RowsInfo.Count = r1
                        break
                    case ( c1 * r1 > c2 * r2 ) :
                        ColsInfo.Count = c2
                        RowsInfo.Count = r2
                        break
                    case ( c1 * r1 == c2 * r2 ) :
                        ColsInfo.Count = c1
                        RowsInfo.Count = r1
                        break
                    }
                // ColsInfo.Count = Math.max( Math.round( ColsInfo.Max / S ) , Math.ceil( ShowInfo.Display.length / RowsInfo.Max ) )
                // RowsInfo.Count = Math.ceil( ShowInfo.Display.length / ColsInfo.Count )
                break
            case !A &&  C :
                ColsInfo.Count = ColsInfo.Max
                RowsInfo.Count = Math.ceil( ShowInfo.Display.length / ColsInfo.Max )
                break
            case !A && !C :
                ColsInfo.Count = Math.ceil( ShowInfo.Display.length / RowsInfo.Max )
                RowsInfo.Count = RowsInfo.Max
                break
            }
        }
    function ShowLinks( Show ){
        var T = Show.id
        var M = '<div style="align-items: center; justify-content: center; display: flex; flex-direction: row; height: 100%;" >\
            <div style="text-align: left;  width: 150px;" >\
                <div class="randomLinks" onclick="window.open( \'' + Show.dataset.i + '\' )" >IMDB</div>\
                <div class="randomLinks" onclick="window.open( \'' + Show.dataset.w + '\' )" >Wikipedia</div>\
                </div>\
            <div style="text-align: right; width: 150px;" >\
                <div class="randomLinks" onclick="window.open( \'' + Show.dataset.n + '\' )" >Netflix</div>\
                <div class="randomLinks" onclick="window.open( \'' + Show.dataset.s + '\' )" >Watch Series</div>\
                </div>\
            </div>'
        var B = 'Exit'
        var C = 0
        customAlert( T , M , B , C )
        }
    function StyleElements(){
        ShowInfo.Height = Math.floor( MainInfo.ShowsHeight / Math.min( RowsInfo.Count , RowsInfo.Max ) )
        ShowInfo.Width  = Math.floor( MainInfo.ShowsWidth  / Math.min( ColsInfo.Count , ColsInfo.Max ) )

        var M = ( MainInfo.ShowsHeight - ShowInfo.Height * Math.min( RowsInfo.Count , RowsInfo.Max ) ) / 2

        ccss( 'show' , 'height'     , ShowInfo.Height + 'px' , StyleSheets.A )
        ccss( 'show' , 'lineHeight' , ShowInfo.Height + 'px' , StyleSheets.A )
        ccss( 'show' , 'width'      , ShowInfo.Width  + 'px' , StyleSheets.A )

        ccss( '#Shows' , 'height'       , ShowInfo.Height * RowsInfo.Count + 'px' , StyleSheets.A )
        ccss( '#Shows' , 'marginBottom' , M + MainInfo.ButtonsHeight       + 'px' , StyleSheets.A )
        ccss( '#Shows' , 'marginTop'    , M                                + 'px' , StyleSheets.A )
        ccss( '#Shows' , 'width'        , ShowInfo.Width  * ColsInfo.Count + 'px' , StyleSheets.A )

        Booleans.LeftToRight ? ccss( '#Shows' , 'webkitColumnCount' , '' , StyleSheets.A ) : ccss( '#Shows' , 'webkitColumnCount' , ColsInfo.Count , StyleSheets.A )

        CountVisible()

        var A = [] , B = Math.min( ColsInfo.Count , ColsInfo.Max ) , C = ( B - 1 ) / 2 , D = true , V = ShowInfo.Visible

        for( var i = 0 ; i < B ; i++ ){ if( i == C ){ A.push( 'center' ) } else{ D ? A.push( 'left' ) : A.push( 'right' ) ; D = !D } }
        if(  Booleans.LeftToRight ) for( var i = 0 ; i < V.length ; i++ ) V[ i ].style.textAlign = A[ i % ColsInfo.Count ]
        if( !Booleans.LeftToRight ) for( var i = 0 ; i < V.length ; i++ ) V[ i ].style.textAlign = A[ Math.floor( i / RowsInfo.Count ) ]
        }
// Events
    function OnChange(){
        scrollTo( 0 , 0 )
        var I = document.getElementsByTagName( 'input' ).length
        MainInfo.ButtonsHeight = I && 50 || Math.ceil( innerWidth / ( I * 5 ) )
        MainInfo.ShowsHeight   = innerHeight - MainInfo.ButtonsHeight
        MainInfo.ShowsWidth    = innerWidth
        ccss( '#Buttons' , 'height' , MainInfo.ButtonsHeight + 'px' , StyleSheets.A )
        ccss( 'input'    , 'width'  , innerWidth / I         + 'px' , StyleSheets.A )
        MainDisplayFunctions()
        }
    function OnConfigureClick(){
        switch( localStorage.User ){
            case 'Advanced' :
                switch( event.which ){
                    case 1 :
                        Booleans.MinimunSize = !Booleans.MinimunSize
                        MainDisplayFunctions()
                        break
                    case 2 :
                        Booleans.LeftToRight = !Booleans.LeftToRight
                        MainDisplayFunctions()
                        break
                    case 3 :
                        if( ShowInfo.Hidden.length > 0 ) ShowInfo.Hidden.pop().classList.remove( 'hide' )
                        MainDisplayFunctions()
                        break
                    }
                break
            case 'Basic' :
                switch( event.which ){
                    case 1 :
                        window.open( 'Config.html' )
                        break
                    case 2 :
                        break
                    case 3 :
                        if( ShowInfo.Hidden.length > 0 ) ShowInfo.Hidden.pop().classList.remove( 'hide' )
                        MainDisplayFunctions()
                        break
                    }
                break
            }
        }
    function OnLevelClick(){
        switch( event.which ){
            case 1 :
                this.classList.toggle( 'active' )
                if( this.classList.contains( 'active' ) ){
                    ccss( '.perm'       , 'display' , ''      , StyleSheets.B )
                    ccss( '.' + this.id , 'display' , 'block' , StyleSheets.B )
                    }
                else{
                    ccss( '.' + this.id , 'display' , '' , StyleSheets.B )
                    if( document.getElementsByClassName( 'active' ).length == 0 ) ccss( '.perm' , 'display' , 'block' , StyleSheets.B )
                    }
                MainDisplayFunctions()
                break
            case 2 :
                HideAllShows()
                this.classList.add( 'active' )
                ccss( '.perm'       , 'display' , ''      , StyleSheets.B )
                ccss( '.' + this.id , 'display' , 'block' , StyleSheets.B )
                MainDisplayFunctions()
                break
            case 3 :
                HideAllShows()
                ccss( '.perm' , 'display' , 'block' , StyleSheets.B )
                MainDisplayFunctions()
                break
            }
        }
    function OnScroll(){
        if( !event.ctrlKey ){
            event.preventDefault()
            var D = event.deltaY > 0 ? 1 : -1
            if( Booleans.LeftToRight ){
                scrollBy( 0 , D * ShowInfo.Height )
                }
            else{
                scrollBy( D * ShowInfo.Width , 0 )
                }
            }
            StyleElements()
        }
    function OnShowClick(){
        switch( localStorage.User ){
            case 'Advanced' :
                switch( event.which ){
                    case 1 :
                        ClickInfo.Elem1 = ClickInfo.Elem2
                        ClickInfo.Elem2 = event.toElement
                        ClickInfo.Time1 = ClickInfo.Time2
                        ClickInfo.Time2 = event.timeStamp
                        switch( true ){
                            case event.ctrlKey :
                                ShowLinks( this )
                                break
                            case ( ClickInfo.Time2 - ClickInfo.Time1 ) < 250 && ClickInfo.Elem1 == ClickInfo.Elem2 :
                                ShowInfo.Permanent.has( this.id ) ? this.classList.remove( 'perm' ) : this.classList.add( 'perm' )
                                PermanentItemToggle( this.id )
                                MainDisplayFunctions()
                                break
                            case !this.classList.contains( 'perm' ) :
                                this.classList.add( 'perm' )
                                break
                            }
                        break
                    case 2 :
                        ShowLinks( this )
                        break
                    case 3 :
                        if( this.classList.contains( 'perm' ) ){
                            this.classList.toggle( 'perm' )
                            MainDisplayFunctions()
                            }
                        else{
                            this.classList.add( 'hide' )
                            ShowInfo.Hidden.push( this )
                            MainDisplayFunctions()
                            }
                    }
                break
            case 'Basic' :
                switch( event.which ){
                    case 1 :
                        this.classList.toggle( 'perm' )
                        MainDisplayFunctions()
                        break
                    case 2 :
                        ShowLinks( this )
                        break
                    case 3 :
                        this.classList.add( 'hide' )
                        ShowInfo.Hidden.push( this )
                        MainDisplayFunctions()
                        break
                    }
                break
            }
        }
    function OnStart(){
        CheckLocalStorage()
        DeclareStyleSheet()
        CreateInputs()
        CreateShowList()
        OnChange()
        }
// Initialization
    function CheckLocalStorage(){
        if( !localStorage.ShowListing ){
            var s = ''
            s += 'ShowList=[]\n'
            s += 'function Show(Title){\n'
            s += 'this.t=Title\n'
            s += 'this.l="1"\n'
            s += 'this.i=""\n'
            s += 'this.w=""\n'
            s += 'this.n=""\n'
            s += 'this.s=""\n'
            s += 'ShowList.push(this)}\n'
            s += 'template=["Title","Level","IMDB","Wikipedia","Netflix","Watch Series"]'
            localStorage.ShowListing = s
            }
        if( !localStorage.User ) localStorage.User = 'Basic'
        // if( localStorage.User == 'Advanced' )
        if( !localStorage.Permanent ) localStorage.Permanent = ''
        eval( localStorage.ShowListing )
        for( var i = 0 ; i < ShowList.length ; i++ ) if( !ShowInfo.Levels.has( 'level' + ShowList[ i ].l ) ) ShowInfo.Levels.push( 'level' + ShowList[ i ].l )
        ShowInfo.Levels.sort()
        }
    function DeclareStyleSheet(){
        document.styleSheets[ StyleSheets.A ].addRule( 'Body' )
        document.styleSheets[ StyleSheets.A ].addRule( 'Input' )
        document.styleSheets[ StyleSheets.A ].addRule( 'Show' )
        document.styleSheets[ StyleSheets.A ].addRule( '#Buttons' )
        document.styleSheets[ StyleSheets.A ].addRule( '#Shows' )

        for( var i = 0 ; i < ShowInfo.Levels.length ; i++ ) document.styleSheets[ StyleSheets.B ].addRule( '.' + ShowInfo.Levels[ i ] )

        document.styleSheets[ StyleSheets.B ].addRule( '.perm' )
        document.styleSheets[ StyleSheets.B ].addRule( '.hide' )
        }
    function CreateInputs(){
        var A = document.getElementById( 'Buttons' )
        removeChildNodes( A )
        var B
            B             = document.createElement( 'Input' )
            B.id          = 'level0'
            B.type        = 'button'
            B.value       = localStorage.User == 'Basic' ? 'Configure' : ''
            B.onmousedown = OnConfigureClick
            A.appendChild( B )
        for( var i = 0 ; i < ShowInfo.Levels.length && ShowInfo.Levels.length > 1 ; i++ ){
            B             = document.createElement( 'Input' )
            B.id          = ShowInfo.Levels[ i ]
            B.type        = 'button'
            B.value       = localStorage.User == 'Basic' ? 'Level ' + ( i + 1 ) : ''
            B.onmousedown = OnLevelClick
            A.appendChild( B )
            }
        }
    function CreateShowList(){
        var B  = document.getElementById( 'Shows' ),
            iM = 'http://www.imdb.com/title/',
            iB = 'http://www.imdb.com/find?q=',
            iE = '%20TV&s=tt',
            nM = 'http://www.netflix.com/WiMovie/',
            nB = 'http://www.netflix.com/search/',
            nE = '',
            sM = 'http://watchseries.ag/serie/',
            sB = 'http://watchseries.ag/search/',
            sE = '',
            wM = 'http://en.wikipedia.org/wiki/',
            wB = 'http://en.wikipedia.org/w/index.php?search=',
            wE = '%20TV&title=Special%3ASearch&fulltext=1'
        removeChildNodes( B )
        for( var i = 0 ; i < ShowList.length ; i++ ){
            Show             = document.createElement( 'Show' )
            Show.id          = ShowList[ i ].t
            Show.dataset.i   = ShowList[ i ].i != '' ? iM + ShowList[ i ].i.toHyperLink() : iB + ShowList[ i ].t.toHyperLink() + iE
            Show.dataset.n   = ShowList[ i ].n != '' ? nM + ShowList[ i ].n.toHyperLink() : nB + ShowList[ i ].t.toHyperLink() + nE
            Show.dataset.s   = ShowList[ i ].s != '' ? sM + ShowList[ i ].s.toHyperLink() : sB + ShowList[ i ].t.toHyperLink() + sE
            Show.dataset.w   = ShowList[ i ].w != '' ? wM + ShowList[ i ].w.toHyperLink() : wB + ShowList[ i ].t.toHyperLink() + wE
            Show.onmousedown = OnShowClick
            Show.textContent = ShowList[ i ].t
            Show.classList.add( 'level' + ShowList[ i ].l )
            document.getElementById( 'Shows' ).appendChild( Show )
            }
        if( localStorage.User == 'Basic' || ShowInfo.Levels.Length == 1 ){
            ccss( '.level1' , 'display' , 'block' , StyleSheets.B )
            }
        else{
            if( localStorage.Permanent != '' ) ShowInfo.Permanent = localStorage.Permanent.split( '|' )
            for( var i = 0 ; i < ShowInfo.Permanent.length ; i++ ) ShowInfo.All[ ShowInfo.Permanent[ i ] ].classList.add( 'perm' )
            }
        ccss( '.perm' , 'display' , 'block' , StyleSheets.B )
        }
