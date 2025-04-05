window.toggleMobileMenu = function () {
    console.log( 'toggleMobileMenu fonksiyonu çağrıldı' );

    const menu = document.getElementById( 'mobile-menu' );
    const button = document.getElementById( 'mobile-menu-button' );
    const icon = button.querySelector( 'i' );

    console.log( 'Menu elementi:', menu );
    console.log( 'Button elementi:', button );

    if ( menu.classList.contains( 'hidden' ) ) {
        console.log( 'Menü açılıyor...' );
        menu.classList.remove( 'hidden' );
        icon.classList.remove( 'fa-bars' );
        icon.classList.add( 'fa-times' );
    } else {
        console.log( 'Menü kapanıyor...' );
        menu.classList.add( 'hidden' );
        icon.classList.remove( 'fa-times' );
        icon.classList.add( 'fa-bars' );
    }
}

// Ana sayfa yüklendiğinde çalışacak
document.addEventListener( 'DOMContentLoaded', function () {
    console.log( 'DOM yüklendi, mobile-menu.js başlatılıyor' );

    // Navbar yüklenene kadar bekle ve kontrol et
    const checkNavbarLoaded = setInterval( function () {
        const button = document.getElementById( 'mobile-menu-button' );
        const menu = document.getElementById( 'mobile-menu' );

        if ( button && menu ) {
            console.log( 'Navbar elemanları bulundu, event listener\'lar ekleniyor' );
            clearInterval( checkNavbarLoaded );

            button.addEventListener( 'click', function ( e ) {
                e.preventDefault();
                e.stopPropagation();
                console.log( 'Mobil menü butonu tıklandı' );
                menu.classList.toggle( 'hidden' );

                // İkon değişimi
                const icon = button.querySelector( 'i' );
                if ( icon ) {
                    if ( menu.classList.contains( 'hidden' ) ) {
                        icon.classList.remove( 'fa-times' );
                        icon.classList.add( 'fa-bars' );
                    } else {
                        icon.classList.remove( 'fa-bars' );
                        icon.classList.add( 'fa-times' );
                    }
                }
            } );

            // Dışarı tıklanınca menüyü kapat
            document.addEventListener( 'click', function ( e ) {
                if ( !menu.classList.contains( 'hidden' ) &&
                    !menu.contains( e.target ) &&
                    !button.contains( e.target ) ) {
                    menu.classList.add( 'hidden' );
                    const icon = button.querySelector( 'i' );
                    if ( icon ) {
                        icon.classList.remove( 'fa-times' );
                        icon.classList.add( 'fa-bars' );
                    }
                }
            } );
        }
    }, 100 ); // Her 100ms'de bir kontrol et

    // 5 saniye sonra interval'i temizle (timeout güvenliği)
    setTimeout( () => clearInterval( checkNavbarLoaded ), 5000 );
} );
