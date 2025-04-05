const express = require( 'express' );
const path = require( 'path' );
const app = express();

// Statik dosyaları serve et
app.use( express.static( path.join( __dirname, '..' ) ) );

// Components dizini için özel rota
app.get( '/components/*', ( req, res ) => {
    res.sendFile( path.join( __dirname, '..', req.path ) );
} );

// Ana rotalar
app.get( '/', ( req, res ) => {
    res.sendFile( path.join( __dirname, '..', 'index.html' ) );
} );

const PORT = process.env.PORT || 3000;
app.listen( PORT, () => {
    console.log( `Server http://localhost:${PORT} adresinde çalışıyor` );
} );
