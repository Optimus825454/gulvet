document.addEventListener( 'DOMContentLoaded', function () {
    // Load navbar
    fetch( '/gulvet/components/navbar.html' )
        .then( response => response.text() )
        .then( data => {
            document.getElementById( 'navbar-container' ).innerHTML = data;
            // Navbar yüklendikten sonra eventleri bağla
            setTimeout( initializeNavbar, 100 );
        } )
        .catch( error => console.error( 'Navbar yüklenirken hata:', error ) );

    // Load footer
    fetch( '/gulvet/components/footer.html' )
        .then( response => response.text() )
        .then( data => {
            document.getElementById( 'footer-container' ).innerHTML = data;
        } )
        .catch( error => console.error( 'Footer yüklenirken hata:', error ) );
} );

function initializeNavbar() {
    // Mobil menü düğmesi için event listener
    const mobileMenuButton = document.getElementById( 'mobile-menu-button' );
    const mobileMenu = document.getElementById( 'mobile-menu' );

    if ( mobileMenuButton && mobileMenu ) {
        mobileMenuButton.addEventListener( 'click', function () {
            mobileMenu.classList.toggle( 'hidden' );
        } );
    }


}
