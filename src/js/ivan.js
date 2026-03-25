// Asegurarnos de que GSAP y ScrollTrigger están cargados
gsap.registerPlugin(ScrollTrigger);

// Animaciones para la Sección 4 - Maybach
document.addEventListener("DOMContentLoaded", () => {
  const maybachSection = document.querySelector(".maybach-section");

  if (maybachSection) {
    // ---- TIMELINE 1: Encabezado (H1 y párrafo) ----
    const tlHeader = gsap.timeline({
      scrollTrigger: {
        trigger: ".maybach-section",
        start: "top 80%", // El título entra cuando asomamos un poco a la sección
        end: "top 50%", // Termina el movimiento de entrada
        scrub: 1.5, // Vinculado al scroll para que desaparezca al subir
      },
    });

    tlHeader
      .fromTo(
        ".maybach-header h1",
        { y: -50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
      )
      .fromTo(
        ".maybach-header p",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
        "-=0.7",
      );

    // ---- ANIMACION COLOR DEL H1 AL BAJAR (NUEVO) ----
    // Cambiamos progresivamente el color de plata/gris oscuro (#9ca3af) a negro profundo (#1a1a1a)
    // Se vincula al scroll a traves de 'scrub'
    gsap.fromTo(
      ".maybach-header h1",
      { color: "#9ca3af" },
      {
        color: "#1a1a1a",
        ease: "none",
        scrollTrigger: {
          trigger: ".maybach-section",
          start: "top 70%",
          end: "top 10%",
          scrub: true,
        },
      },
    );

    // ---- EFECTO VUELO IMAGEN coche (NUEVO) ----
    // Queremos que la imagen empiece en el medio, justo debajo del H1.
    // Estando en la columna izquierda, moverla un 25% del total del ancho de la pantalla (25vw)
    // la centra perfectamente. Y la movemos -120px hacia arriba para que quede alta.
    gsap.fromTo(
      ".maybach-img",
      {
        y: -150,
        // Solo desplazamos a la derecha en pantallas grandes para que en móviles no se rompa y se quede normal encima de la tarjeta
        x: () => (window.innerWidth >= 992 ? "25vw" : "0"),
        scale: 1.6, // Empieza más grande
      },
      {
        y: 0,
        x: 0,
        scale: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".maybach-section",
          start: "top 30%",
          end: "top 10%",
          scrub: 2,
        },
      },
    );

    // ---- TIMELINE 2: Contenido Principal (Tarjetas e info) ----
    const tlContent = gsap.timeline({
      scrollTrigger: {
        trigger: ".maybach-section",
        start: "top 20%",
        end: "top -10%",
        scrub: 1.5,
      },
    });

    // 1. Aparecen los contenedores
    tlContent
      .fromTo(
        ".car-details .card-body",
        { x: -60, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: "power3.inout" },
        0,
      )
      .fromTo(
        ".payment-details",
        { x: 60, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
        0,
      )

      // 2. Elementos anidados: Aparecen los métodos de pago (stagger secuencial)
      .fromTo(
        ".payment-method",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "back.out(1.5)",
        },
        "-=0.4",
      )

      // 3. Aparecen los inputs del formulario
      .fromTo(
        ".payment-field",
        { x: 20, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.2",
      )

      // 4. Animar el botón de confirmación
      .fromTo(
        ".confirm-btn",
        { scale: 0.9, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.6, ease: "elastic.out(1, 0.7)" },
        "-=0.1",
      )

      // 5. Un toque en el iconito seguro de abajo al final
      .fromTo(
        ".secure-info",
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 },
        "-=0.3",
      );
  }
});
