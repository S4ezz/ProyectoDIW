gsap.registerPlugin(ScrollTrigger);
// Coloca la imagen del coche a la izquierda y la hace más grande
gsap.set("#especs-maybach-imagen", { opacity: 0, x: -300, scale: 1.5 });

// Coloca las tarjetas a la derecha y hace una rotación para quee parezca un "3d"
gsap.set(".tarjeta-der", { opacity: 0, x: 50, rotationY: 90 });
gsap.set(".tarjeta-izq", { opacity: 0, x: -50, rotationY: -90 });

// Coloca el foco de luz del coche
gsap.set(".foco-luz-coche", { opacity: 0, scale: 0.5 });

// Coloca las barras de velocidad, potencia y aceleración
gsap.set(".barra-velocidad", { width: "0%" });
gsap.set(".barra-potencia", { width: "0%" });
gsap.set(".barra-aceleracion", { width: "0%" });

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

tl.to("#especs-maybach-imagen", { opacity: 1, duration: 2 })
  //  Mueve las tarjetas de la derecha para q se vean
  .to(".tarjeta-der", { opacity: 1, x: 0, rotationY: 0, duration: 2, stagger: 1 })

  // Animación de las barras 
  .to(".barra-potencia", { width: "100%", duration: 1.5 })
  .to(".barra-aceleracion", { width: "80%", duration: 1.5 })

  // Animación del foco de luz del coche
  .to(".foco-luz-coche", { opacity: 1, scale: 1.2, duration: 2 }, "-=1")

  // Animación de la imagen del coche 
  .to("#especs-maybach-imagen", { x: 0, scale: 1, duration: 2 })

  // Mueve las tarjetas de la izquierda para qu se vean
  .to(".tarjeta-izq", { opacity: 1, x: 0, rotationY: 0, duration: 2, stagger: 1 })
  // Animación de la barra de velocidad
  .to(".barra-velocidad", { width: "95%", duration: 1.5 })

