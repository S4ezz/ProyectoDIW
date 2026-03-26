import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    // NAV BAR
    // Hacemos que el logo aparezca suavemente desde arriba
    gsap.to('.navbar-logo', {
        opacity: 1, // Hacemos que el logo sea visible
        y: 0,       // Hacemos que el logo baje a su posición
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2  // Le decimos que espere un poco para empezar
    });

    // Hacemos lo mismo con los botones del menú (pero usamos stagger para que salgan uno por uno)
    gsap.to('.nav-link-premium', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1, // Con esto conseguimos un retraso entre botones para que salga mas bonito
        delay: 0.4
    });

    // Hacemos que el navbar tenga fondo negro cuando bajamos con el ratón
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.premium-navbar');
        const pxBajar = 50; // Definimos los pixeles que queremos bajar para que cambie el navbar
        if (window.scrollY > pxBajar) {
            nav.classList.add('scrolled'); // Añadimos fondo negro si bajamos
        } else {
            nav.classList.remove('scrolled'); // Quitamos el fondo si volvemos a subir
        }
    });

    // Buscamos todos los botones que lleven a algún section (los que empiezan por #)
    const botonesMenu = document.querySelectorAll('a[href^="#"]');

    botonesMenu.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            // Buscamos el section a donde queremos ir (usamos la ID del button)
            const destino = document.querySelector(boton.getAttribute('href'));

            if (destino) {
                // Con esto sacamos la posición exacta del section al que queremos ir 
                const posicionDestino = destino.getBoundingClientRect().top + window.pageYOffset;

                // Con esto bajamos de maner suave hasta el section
                window.scrollTo({
                    top: posicionDestino - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CARRUSEL
    // Cogemos todas las diapositivas y las rayitas de abajo
    const slides = gsap.utils.toArray('.carousel-slide');
    const indicators = gsap.utils.toArray('.indicator');
    let currentIndex = 0;   // Empezamos en la primera foto
    let isAnimating = false; // Le hemos añadido esto porque cuando pulsabamos rápido a veces se petaba

    // Ponemos todas las fotos en su sitio pero invisibles
    gsap.set(slides, { display: 'block', opacity: 0, zIndex: 1, xPercent: 0, clipPath: 'inset(0 0 0 0%)' });
    // Solo dejamos visible la primera foto
    if (slides[0])
        gsap.set(slides[0], { opacity: 1, zIndex: 10 });

    // Con esto hacemos que pase a la siguiente foto solo para hacer el efecto de carrusel
    function gotoNextSlide() {
        let index = currentIndex + 1;
        if (index >= slides.length) index = 0; // si pasa el tiempo de la ultima foto vuelve a la primera
        gotoSlide(index, 1);
    }

    // Esta función es la que hace que se muevan las fotos
    function gotoSlide(index, direction = 1) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;

        const oldSlide = slides[currentIndex];
        const newSlide = slides[index];

        // Para saber donde estamos usamos las rayitas y marcamos la que corresponde
        indicators.forEach(ind => ind.classList.remove('active'));
        if (indicators[index]) indicators[index].classList.add('active');

        const title = newSlide.querySelector('.slide-title');
        const subtitle = newSlide.querySelector('.slide-subtitle');
        const cta = newSlide.querySelector('.slide-cta');

        // Con esto preparamos la foto para entrar (para ello nosotros hemos puesto la foto fuera de la pantalla)
        gsap.set(newSlide, {
            opacity: 1,
            zIndex: 30,
            xPercent: direction > 0 ? 100 : -100, // Viene de derecha o izquierda
            clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0%)'
        });

        // Escondemos los textos para que salgan con efecto
        gsap.set([title, subtitle, cta], { opacity: 0, x: direction > 0 ? 50 : -50 });

        // Con esto creamos la animación de la transición de las fotos
        const tl = gsap.timeline({
            defaults: { duration: 1.1, ease: 'expo.inOut' },
            onComplete: () => {
                // Cuando se completa limpiamos la animación y dejamos solo la foto nueva visible
                slides.forEach((s, sIndex) => {
                    if (sIndex !== index) gsap.set(s, { opacity: 0, zIndex: 1 });
                });
                gsap.set(newSlide, { zIndex: 10, clearProps: 'xPercent,clipPath' });
                isAnimating = false;
                currentIndex = index;
            }
        });

        // Hacemos que la foto nueva entre haciendo un barrido y la anterior se vaya para el otro lado
        tl.to(newSlide, { xPercent: 0, clipPath: 'inset(0 0 0 0%)' });
        tl.to(oldSlide, { xPercent: direction > 0 ? -100 : 100, opacity: 0 }, 0);

        // Hacemos que los textos salgan un poco más tarde para poder ver la transición bien
        tl.to([title, subtitle, cta], {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out'
        }, '-=0.5');
    }

    // Si hacemos click en las rayitas del carrusel nos salta a esa foto
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            gotoSlide(i, i > currentIndex ? 1 : -1);
            // si hacmeos clcik en una rayita reniciamos el contador para que la imagen pase a la siguiente sola
            clearInterval(autoPlay);
        });
    });

    // Con esto conseguimos que las fotos pasen solas cada x tiempo (hay que ponerlo en milisegundos)
    let autoPlay = setInterval(() => {
        gotoNextSlide();
    }, 10000);
});
