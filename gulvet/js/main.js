document.addEventListener( 'DOMContentLoaded', function () {
    // Navbar'ı yükle
    const navbarPlaceholder = document.getElementById( 'navbar-placeholder' );
    if ( navbarPlaceholder ) {
        fetch( '/gulvet/components/navbar.html' )
            .then( response => response.text() )
            .then( data => {
                navbarPlaceholder.innerHTML = data;
                initNavbar();
            } );
    } else if ( lower.includes( 'çalışma' ) || lower.includes( 'saat' ) ) {
        reply = 'Hafta içi 09:00 - 18:00, Cumartesi 09:00 - 14:00 saatleri arasında hizmet veriyoruz.';
    } else if ( lower.includes( 'adres' ) || lower.includes( 'lokasyon' ) || lower.includes( 'nerede' ) ) {
        reply = 'İşletmemiz Konya Merkez\'dedir. Detaylı adres için iletişime geçebilirsiniz.';
    } else if ( lower.includes( 'ödeme' ) || lower.includes( 'kredi kartı' ) || lower.includes( 'nakit' ) ) {
        reply = 'Nakit, havale ve kredi kartı ile ödeme kabul ediyoruz.';
    } else if ( lower.includes( 'teslimat' ) || lower.includes( 'kargo' ) || lower.includes( 'ne zaman' ) ) {
        reply = 'Teslimat süremiz genellikle 3-7 iş günü arasındadır.';
    } else if ( lower.includes( 'garanti' ) || lower.includes( 'iade' ) ) {
        reply = 'Hayvanlarımız sağlık garantilidir. Sorun olması durumunda iade veya değişim sağlanır.';
    } else if ( lower.includes( 'kampanya' ) || lower.includes( 'indirim' ) ) {
        reply = 'Dönemsel kampanyalarımız için lütfen bizi takip edin veya iletişime geçin.';
    } else if ( lower.includes( 'randevu' ) || lower.includes( 'ziyaret' ) ) {
        reply = 'Çiftliğimizi ziyaret etmek için önceden randevu alabilirsiniz.';
    } else if ( lower.includes( 'sosyal medya' ) || lower.includes( 'instagram' ) || lower.includes( 'facebook' ) ) {
        reply = 'Bizi Instagram ve Facebook\'ta "gulvethayvancilik" olarak bulabilirsiniz.';
    } else if ( lower.includes( 'uzmanlık' ) || lower.includes( 'hangi alan' ) ) {
        reply = 'Damızlık hayvan satışı, sürü yönetimi ve hayvan sağlığı danışmanlığı alanlarında uzmanız.';
    } else if ( lower.includes( 'sağlık' ) || lower.includes( 'bakım' ) ) {
        reply = 'Hayvan sağlığı ve bakımı konusunda da size destek verebiliriz.';
    }

    // Teklif formu gönderim işlemi
    const quoteForm = document.getElementById( 'quote-form' );
    const quoteModal = document.getElementById( 'quote-modal' );
    if ( quoteForm && quoteModal ) {
        quoteForm.addEventListener( 'submit', function ( e ) {
            e.preventDefault();
            alert( 'Teklif talebiniz gönderildi!' );
            e.target.reset();
            quoteModal.classList.add( 'hidden' );
        } );
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
} );

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
