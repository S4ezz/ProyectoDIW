// Registro de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animaciones para la sección de Roberto (Persona 3)
const persona3 = document.querySelector('#persona3');

if (persona3) {
  // Animación para el escenario de "Introducción"
  // gsap.from: anima desde los valores indicados hasta el estado original del CSS
  gsap.from("#scene-intro-extras .reveal-text", {
    scrollTrigger: {
      trigger: "#scene-intro-extras",
      start: "top 80%", // Empieza cuando el top de la sección toca el 80% de la pantalla
      end: "bottom 20%",
      toggleActions: "play reverse play reverse", // Reproduce al bajar, revierte al subir
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.3, // Retraso entre el título y el párrafo
    ease: "power2.out"
  });

  // --- Escena 1 (Cielo Estrellado) ---
  // El texto entra desde la izquierda (-100)
  gsap.from("#scene-stars .sticky-content", {
    scrollTrigger: {
      trigger: "#scene-stars",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  // La imagen entra con un pequeño escalado
  gsap.from("#scene-stars .sticky-image-box", {
    scrollTrigger: {
      trigger: "#scene-stars",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.7)"
  });

  // --- Escena 2 (Llantas de Aleación) ---
  // El texto está a la derecha, por lo que entra desde la derecha (+100)
  gsap.from("#scene-wheels .sticky-content", {
    scrollTrigger: {
      trigger: "#scene-wheels",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
    },
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  // La imagen está a la izquierda, entra escalándose también
  gsap.from("#scene-wheels .sticky-image-box", {
    scrollTrigger: {
      trigger: "#scene-wheels",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.7)"
  });

  // --- Escena 3: Ver más Extras (Timeline con Scrub) ---
  // scrub: true o número vincula la animación a la posición de la rueda del ratón
  const tlMore = gsap.timeline({
    scrollTrigger: {
      trigger: "#scene-more",
      start: "top 90%", // Trigger temprano para evitar esperas
      end: "bottom 50%",
      scrub: 1, // Suavizado de 1 segundo de inercia
    }
  });

  // fromTo: definimos explícitamente el inicio y el fin
  tlMore.fromTo("#maybach-full", 
    { 
      scale: 1.1, // Inicio: grande para impacto
      y: 20
    },
    { 
      scale: 0.85, // Fin: se encoge un poco
      y: -20,
      duration: 1,
      ease: "power1.inOut"
    }
  )
  // El botón sale al mismo tiempo ("<") que el coche se encoge
  .to("#info-trigger-container", {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: "power2.out"
  }, "<");
}
