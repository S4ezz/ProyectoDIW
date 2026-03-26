document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hacemos la animación de la intro de extras
    const introTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#roberto-intro",
            start: "top 60%", // Empieza cuando el título asoma un poco

            // Con esto lo que hacemos es que se reproduzca al bajar y se deshaga al subir
            toggleActions: "play none none reverse"
        }
    });

    // Animamos el título 
    introTl.from(".roberto-title", {
        y: 50, // Viene de un poco más abajo
        opacity: 0, // Empieza invisible
        duration: 1, // Tarda 1 segundo
        ease: "power3.out"
    })
        // Animamos el subtítulo
        .from(".roberto-subtitle", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6"); // Lo "solapamos" un poco con el título para que quede más fluido

    // Buscamos todos extras que hay
    const steps = gsap.utils.toArray(".roberto-step");

    if (steps.length > 0) {
        // Para cada extra hacemos que su tarjeta aparezca al hacer scroll
        steps.forEach((step, index) => {
            gsap.from(step.querySelector(".roberto-card"), {
                scrollTrigger: {
                    trigger: step,
                    start: "top 80%", // Aparece cuando el bloque llegamos a la parte baja del bloque
                    end: "center center",
                    scrub: 1, // La animación se mueve con el scroll que hagamos
                },
                y: 100,
                opacity: 0,
                ease: "power2.out"
            });
        });

        // Cambiamos el fondo a la imagen de las llantas cuando llegamos al segundo extra
        gsap.to(".roberto-bg-llantas", {
            scrollTrigger: {
                trigger: steps[1],
                start: "top 80%",
                end: "center center",
                scrub: 1
            },
            opacity: 1 // Se vuelve visible poco a poco con el scroll
        });

        // Cambiamos el fondo a la imagen del coche cuando llegamos al tercer extra
        gsap.to(".roberto-bg-maybach", {
            scrollTrigger: {
                trigger: steps[2],
                start: "top 80%",
                end: "center center",
                scrub: 1
            },
            opacity: 1
        });

        // Hacemos un efecto de zoom suave en el fondo mientras bajamos por toda la sección
        gsap.to(".roberto-bg", {
            scrollTrigger: {
                trigger: ".roberto-scrollytelling-wrapper",
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            scale: 1.15, // Se hace un 15% más grande
            transformOrigin: "center center",
            ease: "none"
        });
    }

});
