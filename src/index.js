addEventListener( 'fetch', event => {
    event.respondWith( handleRequest( event.request ) )
} )

async function handleRequest( request ) {
    // URL'den yolu al
    const url = new URL( request.url )
    const path = url.pathname

    // Statik dosyalar için
    if ( path.includes( '.' ) ) {
        const response = await fetch( request )
        return response
    }

    // Ana sayfa için
    if ( path === '/' || path === '/index.html' ) {
        const response = await fetch( '/index.html', {
            headers: { 'Content-Type': 'text/html' },
        } )
        return response
    }

    // 404 sayfası
    return new Response( 'Sayfa bulunamadı', { status: 404 } )
}
