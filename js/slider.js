const heroBackgrounds = [
    'url("./images/animals/22.png")',
    'url("./images/animals/29838eb6c86fcd1739ad3b89aa31526a.jpg")',
    'url("./images/animals/6bb5335a-8e96-4238-92f0-d20d8956e81a.jpg")',
    'url("./images/animals/simmental1.png")',
    'url("./images/animals/post1.png")',
];

function initHeroSlider() {
    const sliderContainer = document.querySelector( '.hero-slider' );
    const slidesContainer = sliderContainer.querySelector( '.slides' );
    const dotsContainer = sliderContainer.querySelector( '.flex.justify-center' );
    let currentSlide = 0;

    // Create slides
    heroBackgrounds.forEach( ( bg, index ) => {
        const slide = document.createElement( 'div' );
        slide.className = `slide absolute inset-0 transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
        slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${bg}`;
        slidesContainer.appendChild( slide.cloneNode( true ) );

        // Create dot
        const dot = document.createElement( 'button' );
        dot.className = `w-3 h-3 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-white' : 'bg-white/50'}`;
        dot.onclick = () => goToSlide( index );
        dotsContainer.appendChild( dot );
    } );

    const slides = [...slidesContainer.getElementsByClassName( 'slide' )];
    const dots = [...dotsContainer.getElementsByTagName( 'button' )];

    function goToSlide( index ) {
        slides[currentSlide].classList.remove( 'opacity-100' );
        slides[currentSlide].classList.add( 'opacity-0' );
        dots[currentSlide].classList.remove( 'bg-white' );
        dots[currentSlide].classList.add( 'bg-white/50' );

        currentSlide = index;

        slides[currentSlide].classList.remove( 'opacity-0' );
        slides[currentSlide].classList.add( 'opacity-100' );
        dots[currentSlide].classList.remove( 'bg-white/50' );
        dots[currentSlide].classList.add( 'bg-white' );
    }

    function nextSlide() {
        goToSlide( ( currentSlide + 1 ) % slides.length );
    }

    // Auto-advance slides
    setInterval( nextSlide, 5000 );
}

document.addEventListener( 'DOMContentLoaded', initHeroSlider );
