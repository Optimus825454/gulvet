document.addEventListener( 'DOMContentLoaded', function () {
    // Sadece bir kez loadComponents çağrılsın
    loadComponents();
} );

function loadComponents() {
    // Navbar yükleme - URL düzeltildi
    fetch( '/gulvet/components/navbar.html' )
        .then( response => {
            if ( !response.ok ) throw new Error( 'Navbar yüklenemedi' );
            return response.text();
        } )
        .then( data => {
            const navbarEl = document.getElementById( 'navbar-placeholder' );
            if ( !navbarEl ) throw new Error( 'Navbar placeholder bulunamadı' );
            navbarEl.innerHTML = data;

            // initNavbar ve initMobileMenu fonksiyonlarını çağır
            if ( typeof initNavbar === 'function' ) initNavbar();
            if ( typeof initMobileMenu === 'function' ) {
                console.log( 'Mobile menu init başlatılıyor' );
                initMobileMenu();
            }
        } )
        .catch( err => console.error( 'Navbar yükleme hatası:', err ) );

    // Footer yükleme - URL düzeltildi
    fetch( '/gulvet/components/footer.html' )
        .then( response => {
            if ( !response.ok ) throw new Error( 'Footer yüklenemedi' );
            return response.text();
        } )
        .then( data => {
            const footerEl = document.getElementById( 'footer-placeholder' );
            if ( !footerEl ) throw new Error( 'Footer placeholder bulunamadı' );
            footerEl.innerHTML = data;
        } )
        .catch( err => console.error( 'Footer yükleme hatası:', err ) );
}

// GUL-AI avatar sürüklenebilirlik
const avatar = document.getElementById( 'gul-ai-avatar' );
if ( avatar ) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    avatar.addEventListener( 'mousedown', function ( e ) {
        isDragging = true;
        offsetX = e.clientX - avatar.getBoundingClientRect().left;
        offsetY = e.clientY - avatar.getBoundingClientRect().top;
        avatar.style.transition = 'none';
    } );

    document.addEventListener( 'mousemove', function ( e ) {
        if ( isDragging ) {
            avatar.style.left = ( e.clientX - offsetX ) + 'px';
            avatar.style.top = ( e.clientY - offsetY ) + 'px';
            avatar.style.position = 'absolute';
        }
    } );

    // GUL-AI karşılama balonu typewriter + fade-out
    const bubbleEl = document.getElementById( 'gul-ai-bubble' );
    if ( bubbleEl ) {
        const message = 'Merhaba! Ben GUL-AI, size nasıl yardımcı olabilirim?';
        let index = 0;
        let typingInterval;
        let fadeTimeout;

        function startTypewriter() {
            bubbleEl.classList.remove( 'fade-out' );
            bubbleEl.style.opacity = '1';
            bubbleEl.textContent = '';
            index = 0;

            typingInterval = setInterval( () => {
                if ( index < message.length ) {
                    bubbleEl.textContent += message.charAt( index );
                    index++;
                } else {
                    clearInterval( typingInterval );
                    fadeTimeout = setTimeout( () => {
                        bubbleEl.classList.add( 'fade-out' );
                    }, 2000 );
                }
            }, 50 );
        }

        startTypewriter();

        bubbleEl.addEventListener( 'click', () => {
            clearInterval( typingInterval );
            clearTimeout( fadeTimeout );
            startTypewriter();
        } );
    }

    document.addEventListener( 'mouseup', function () {
        isDragging = false;
        avatar.style.transition = '';
    } );
}

// GUL-AI karşılama balonu ve sohbet açma/kapama
const bubble = document.getElementById( 'gul-ai-bubble' );
const chatBox = document.getElementById( 'gul-ai-chat' );
const closeBtn = document.getElementById( 'gul-ai-close' );

if ( bubble && chatBox && closeBtn ) {
    bubble.addEventListener( 'click', function () {
        chatBox.classList.toggle( 'hidden' );
    } );

    closeBtn.addEventListener( 'click', function () {
        chatBox.classList.add( 'hidden' );
    } );

    const avatarContainer = document.getElementById( 'gul-ai-avatar' );
    if ( avatarContainer ) {
        avatarContainer.addEventListener( 'click', function () {
            chatBox.classList.remove( 'hidden' );
        } );
    }
}

// GUL-AI basit soru-cevap
const chatInput = document.querySelector( '#gul-ai-chat input[type="text"]' );
const chatMessages = document.querySelector( '#gul-ai-chat .p-4' );

if ( chatInput && chatMessages ) {
    chatInput.addEventListener( 'keydown', function ( e ) {
        if ( e.key === 'Enter' && chatInput.value.trim() !== '' ) {
            const userMessage = chatInput.value.trim();

            // Kullanıcı mesajını göster
            const userDiv = document.createElement( 'div' );
            userDiv.className = 'text-sm text-right text-green-800 bg-green-100 px-2 py-1 rounded-lg';
            userDiv.textContent = userMessage;
            chatMessages.appendChild( userDiv );

            chatInput.value = '';

            // Otomatik cevap üret
            let reply = 'Üzgünüm, sizi tam anlayamadım.';

            const lower = userMessage.toLowerCase();
            if ( lower.includes( 'merhaba' ) || lower.includes( 'selam' ) ) {
                reply = 'Merhaba! Size nasıl yardımcı olabilirim?';
            } else if ( lower.includes( 'fiyat' ) || lower.includes( 'ücret' ) ) {
                reply = 'Hayvanlarımızın fiyatları için lütfen iletişim bilgilerinizi bırakın, size dönüş yapalım.';
            } else if ( lower.includes( 'teşekkür' ) ) {
                reply = 'Rica ederim! Başka bir sorunuz varsa buradayım.';
            } else if ( lower.includes( 'iletişim' ) ) {
                reply = 'Bize 0536 856 20 81 numaralı telefondan ulaşabilirsiniz.';
            }
            else if ( lower.includes( 'adres' ) || lower.includes( 'yer' ) ) {
                reply = 'Bizim şubemiz Tokat\'da bulunmaktayız. Adresimiz ise Tokat Mah. Şehit Mustafa Kemal Bulvarı No:15/1 Sokak Kat:2 A\'ta bulunmaktadır..';
            }
            else if ( lower.includes( 'konum' ) || lower.includes( 'yer' ) ) {
                reply = 'Bizim şubemiz Tokat\'da bulunmaktayız. Adresimiz ise Tokat Mah. Şehit Mustafa Kemal Bulvarı No:15/1 Sokak Kat:2 A\'ta bulunmaktadır..';
            }
            else if ( lower.includes( 'iş saatleri' ) || lower.includes( 'saatler' ) ) {
                reply = 'Pazartesi-Cuma günleri 09:00-18:00 arası, Cumartesi günleri 09:00-14:00 arası çalışıyoruz.';
            } else if ( lower.includes( 'hizmet' ) || lower.includes( 'ne yapıyorsunuz' ) ) {
                reply = 'Damızlık hayvan satışı, danışmanlık ve lojistik hizmetleri sunuyoruz.';
            } else if ( lower.includes( 'hayvan' ) || lower.includes( 'ürün' ) ) {
                reply = 'Damızlık hayvan satışı yapıyoruz. Hangi tür hayvanlarla ilgilendiğinizi belirtirseniz daha iyi yardımcı olabilirim.';
            } else if ( lower.includes( 'danışmanlık' ) || lower.includes( 'destek' ) ) {
                reply = 'Danışmanlık hizmeti için lütfen iletişim bilgilerinizi bırakın.';
            } else if ( lower.includes( 'lojistik' ) || lower.includes( 'kurumsal' ) ) {
                reply = 'Kurumsal müşterilerimize özel paketler hazırlıyoruz. İlgili detayları öğrenmek isterseniz lütfen bizimle iletişime geçin.';
            } else if ( lower.includes( 'sorun' ) || lower.includes( 'problem' ) ) {
                reply = 'Sorununuzu daha iyi anlayabilmemiz için lütfen detayları bizimle paylaşın.';
            } else if ( lower.includes( 'sorular' ) || lower.includes( 'soru' ) ) {
                reply = 'Sorularınızı buradan yazabilirsiniz. Size yardımcı olmaktan memnuniyet duyarım.';
            } else {
                reply = 'Üzgünüm sizi anlayamadım isterseniz numaranızı bırakın uzmanlarımız hemen sizinle iletişime geçsin.';
            }

            // Cevabı göster
            const botDiv = document.createElement( 'div' );
            botDiv.className = 'text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-lg';
            botDiv.textContent = reply;
            chatMessages.appendChild( botDiv );

            // Scroll en alta
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    } );
}

function initNavbar() {
    const nav = document.querySelector( '.sticky-nav' );
    if ( nav ) {
        window.addEventListener( 'scroll', function () {
            if ( window.scrollY > 0 ) {
                nav.classList.add( 'scrolled' );
            } else {
                nav.classList.remove( 'scrolled' );
            }
        } );
    }

    // Mobil menü butonu
    const mobileMenuButton = document.getElementById( 'mobile-menu-button' );
    if ( mobileMenuButton ) {
        mobileMenuButton.addEventListener( 'click', () => {
            const mobileMenu = document.getElementById( 'mobile-menu' );
            if ( mobileMenu ) {
                mobileMenu.classList.toggle( 'hidden' );
            }
        } );
    }
}
