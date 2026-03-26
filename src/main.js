import './style.css'

gsap.registerPlugin(ScrollTrigger);

// Función que se ejecuta cuando TODO (incluyendo imágenes) ha cargado
window.addEventListener('load', () => {

    // Navbar

    // Animación de entrada del logo
    gsap.to('.navbar-logo', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
    });

    // Animación de entrada de los botones del menú
    gsap.to('.nav-link-premium', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.4
    });

    // Navbar cambia a negro al hacer scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.premium-navbar');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth Scroll (Bajar suavemente a las secciones)
    document.querySelectorAll('a[href^="#"]').forEach(boton => {
        boton.addEventListener('click', (evento) => {
            evento.preventDefault();
            const destino = document.querySelector(boton.getAttribute('href'));
            if (destino) {
                const posicion = destino.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: posicion - 70,
                    behavior: 'smooth'
                });

                // Cerramos menú móvil si está abierto
                const menu = document.getElementById('navbarLuxe');
                if (menu && menu.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(menu).hide();
                }
            }
        });
    });

    // Carousel
    const slides = gsap.utils.toArray('.carousel-slide');
    const indicators = gsap.utils.toArray('.indicator');
    let currentIndex = 0;
    let isAnimating = false;

    // Preparamos los slides
    gsap.set(slides, { display: 'block', opacity: 0, zIndex: 1, xPercent: 0, clipPath: 'inset(0 0 0 0%)' });
    if (slides[0]) gsap.set(slides[0], { opacity: 1, zIndex: 10 });

    function gotoSlide(index, direction = 1) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;

        const oldSlide = slides[currentIndex];
        const newSlide = slides[index];

        indicators.forEach(ind => ind.classList.remove('active'));
        if (indicators[index]) indicators[index].classList.add('active');

        const title = newSlide.querySelector('.slide-title');
        const subtitle = newSlide.querySelector('.slide-subtitle');
        const cta = newSlide.querySelector('.slide-cta');

        gsap.set(newSlide, {
            opacity: 1,
            zIndex: 30,
            xPercent: direction > 0 ? 100 : -100,
            clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0%)'
        });

        gsap.set([title, subtitle, cta], { opacity: 0, x: direction > 0 ? 50 : -50 });

        const tl = gsap.timeline({
            defaults: { duration: 1.1, ease: 'expo.inOut' },
            onComplete: () => {
                slides.forEach((s, sIdx) => { if (sIdx !== index) gsap.set(s, { opacity: 0, zIndex: 1 }); });
                gsap.set(newSlide, { zIndex: 10, clearProps: 'xPercent,clipPath' });
                isAnimating = false;
                currentIndex = index;
            }
        });

        tl.to(newSlide, { xPercent: 0, clipPath: 'inset(0 0 0 0%)' });
        tl.to(oldSlide, { xPercent: direction > 0 ? -100 : 100, opacity: 0 }, 0);
        tl.to([title, subtitle, cta], { x: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out' }, '-=0.5');
    }

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            gotoSlide(i, i > currentIndex ? 1 : -1);
            clearInterval(autoPlay);
        });
    });

    let autoPlay = setInterval(() => {
        let nextIdx = (currentIndex + 1) % slides.length;
        gotoSlide(nextIdx, 1);
    }, 10000);


    // David
    gsap.set("#especs-maybach-imagen", { opacity: 0, x: -300, scale: 1.5 });
    gsap.set(".tarjeta-der", { opacity: 0, x: 50, rotationY: 90 });
    gsap.set(".tarjeta-izq", { opacity: 0, x: -50, rotationY: -90 });
    gsap.set(".foco-luz-coche", { opacity: 0, scale: 0.5 });
    gsap.set([".barra-velocidad", ".barra-potencia", ".barra-aceleracion"], { width: "0%" });

    const davidTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".especs-maybach-section",
            start: "center center",
            end: "+=150%",
            pin: true,
            scrub: 1
        }
    });

    davidTl.to("#especs-maybach-imagen", { opacity: 1, duration: 2 })
        .to(".tarjeta-der", { opacity: 1, x: 0, rotationY: 0, duration: 2, stagger: 1 })
        .to(".barra-potencia", { width: "100%", duration: 1.5 })
        .to(".barra-aceleracion", { width: "80%", duration: 1.5 })
        .to(".foco-luz-coche", { opacity: 1, scale: 1.2, duration: 2 }, "-=1")
        .to("#especs-maybach-imagen", { x: 0, scale: 1, duration: 2 })
        .to(".tarjeta-izq", { opacity: 1, x: 0, rotationY: 0, duration: 2, stagger: 1 })
        .to(".barra-velocidad", { width: "95%", duration: 1.5 });


    // Roberto
    const introRobertoTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#roberto-intro",
            start: "top 60%",
            toggleActions: "play none none reverse"
        }
    });

    introRobertoTl.from(".roberto-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
        .from(".roberto-subtitle", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

    const robertoSteps = gsap.utils.toArray(".roberto-step");
    if (robertoSteps.length > 0) {
        robertoSteps.forEach((step) => {
            gsap.from(step.querySelector(".roberto-card"), {
                scrollTrigger: { trigger: step, start: "top 80%", end: "center center", scrub: 1 },
                y: 100, opacity: 0, ease: "power2.out"
            });
        });

        gsap.to(".roberto-bg-llantas", {
            scrollTrigger: { trigger: robertoSteps[1], start: "top 80%", end: "center center", scrub: 1 },
            opacity: 1
        });

        gsap.to(".roberto-bg-maybach", {
            scrollTrigger: { trigger: robertoSteps[2], start: "top 80%", end: "center center", scrub: 1 },
            opacity: 1
        });

        gsap.to(".roberto-bg", {
            scrollTrigger: { trigger: ".roberto-scrollytelling-wrapper", start: "top top", end: "bottom top", scrub: 1 },
            scale: 1.15, transformOrigin: "center center", ease: "none"
        });
    }


    // Iván
    const ivanHeaderTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".maybach-section",
            start: "top 80%",
            end: "top 50%",
            scrub: 1.5
        }
    });

    ivanHeaderTl.fromTo(".maybach-header h1", { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" })
        .fromTo(".maybach-header p", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }, "-=0.7");

    gsap.fromTo(".maybach-header h1", { color: "#9ca3af" }, {
        color: "#1a1a1a", ease: "none",
        scrollTrigger: { trigger: ".maybach-section", start: "top 70%", end: "top 10%", scrub: true }
    });

    gsap.fromTo(".maybach-img",
        { y: -150, x: () => (window.innerWidth >= 992 ? "25vw" : "0"), scale: 1.6 },
        {
            y: 0, x: 0, scale: 1, ease: "power2.inOut",
            scrollTrigger: { trigger: ".maybach-section", start: "top 30%", end: "top 10%", scrub: 2 }
        }
    );

    const ivanContentTl = gsap.timeline({
        scrollTrigger: { trigger: ".maybach-section", start: "top 20%", end: "top -10%", scrub: 1.5 }
    });

    ivanContentTl.fromTo(".car-details .card-body", { x: -60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1 }, 0)
        .fromTo(".payment-details", { x: 60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1 }, 0)
        .fromTo(".payment-method", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.5)" }, "-=0.4")
        .fromTo(".payment-field", { x: 20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.2")
        .fromTo(".confirm-btn", { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6, ease: "elastic.out(1, 0.7)" }, "-=0.1")
        .fromTo(".secure-info", { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, "-=0.3");

    ScrollTrigger.refresh();
});
