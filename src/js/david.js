gsap.registerPlugin(ScrollTrigger);

gsap.set("#especs-maybach-imagen", { opacity: 0, x: -300, scale: 1.5 });
gsap.set(".tarjeta-der", { opacity: 0, x: 50 });
gsap.set(".tarjeta-izq", { opacity: 0, x: -50 });

let tl = gsap.timeline({
    scrollTrigger: {
    trigger: ".especs-maybach-section",
    start: "center center",
    end: "+=150%",
    pin: true,
    scrub: 1,
    // markers: true
    }
});

// Aparece la imagen y las tarjetas derechas
tl.to("#especs-maybach-imagen", { opacity: 1, duration: 2 })
    .to(".tarjeta-der", { opacity: 1, x: 0, duration: 2, stagger: 1 })
    
    // Mueve a la derecha la imagen hacia el centro
    .to("#especs-maybach-imagen", { x: 0, duration: 2})

    //  Muestra las tarjetas desde la izquierda
    .to(".tarjeta-izq", { opacity: 1, x: 0, duration: 2, stagger: 1 });
