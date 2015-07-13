var http = require( 'http' )
var st   = require( 'st' )

var port = process.env.PORT

if( port === undefined ) port = 5000

var static = st( { path: __dirname + '' , url: '' , index: 'main.html' } )

http.createServer( function( req , res ){
    static( req , res )
    } ).listen( port )