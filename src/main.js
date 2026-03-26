import "./css/bootstrap.min.css";
import "./style.css";
import "./css/david.css";
import "./css/roberto.css";
import "./css/ivan.css";
import "./js/bootstrap.bundle.min.js";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  // Navbar
  // Animación de entrada del logo
  gsap.to(".navbar-logo", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.1,
  });

  // Cambia de estilo al hacer scroll
  window.addEventListener("scroll", () => {
    const nav = document.querySelector(".premium-navbar");
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // David
  gsap.set("#especs-maybach-imagen", { opacity: 0, x: -300, scale: 1.5 });
  gsap.set(".tarjeta-der", { opacity: 0, x: 50, rotationY: 90 });
  gsap.set(".tarjeta-izq", { opacity: 0, x: -50, rotationY: -90 });
  gsap.set(".foco-luz-coche", { opacity: 0, scale: 0.5 });
  gsap.set([".barra-velocidad", ".barra-potencia", ".barra-aceleracion"], {
    width: "0%",
  });

  const davidTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".especs-maybach-section",
      start: "center center",
      end: "+=150%",
      pin: true,
      scrub: 1,
    },
  });

  davidTl
    .to("#especs-maybach-imagen", { opacity: 1, duration: 2 })
    .to(".tarjeta-der", {
      opacity: 1,
      x: 0,
      rotationY: 0,
      duration: 2,
      stagger: 1,
    })
    .to(".barra-potencia", { width: "100%", duration: 1.5 })
    .to(".barra-aceleracion", { width: "80%", duration: 1.5 })
    .to(".foco-luz-coche", { opacity: 1, scale: 1.2, duration: 2 }, "-=1")
    .to("#especs-maybach-imagen", { x: 0, scale: 1, duration: 2 })
    .to(".tarjeta-izq", {
      opacity: 1,
      x: 0,
      rotationY: 0,
      duration: 2,
      stagger: 1,
    })
    .to(".barra-velocidad", { width: "95%", duration: 1.5 });

  // Roberto
  // Título y Subtítulo (aparecen a la vez)
  gsap.from(".roberto-title, .roberto-subtitle", {
    scrollTrigger: {
      trigger: "#roberto-intro", // Elemento que activa la animación
      start: "top 60%", // Empieza cuando el inicio de la sección llega al 60% de la pantalla
      toggleActions: "play none none reverse", // Se activa al bajar y al subir rebobina para repetir el efecto
    },
    y: 50, // Ambos suben 50px desde abajo
    opacity: 0, // Empiezan invisibles
    duration: 1, // Tiempo que tardan en aparecer por completo
    ease: "power3.out",
    stagger: 0 // Salen exactamente a la vez
  });

  // Scrollytelling
  // Guardamos todos los extras en un array para luego recorrerlo
  const robertoSteps = gsap.utils.toArray(".roberto-step");

  if (robertoSteps.length > 0) {
    // Hacemos un foreach para recorrer extra por extra y aplicar los efectos
    robertoSteps.forEach((step) => {
      gsap.from(step.querySelector(".roberto-card"), {
        scrollTrigger: {
          trigger: step, // El extra que esta en pantalla se activa cuando entra en el scroll
          start: "top 80%", // Empieza a subir cuando asoma por abajo
          end: "center center", // Termina de colocarse al llegar al medio
          scrub: 1, // La animación sigue el scroll
        },
        y: 100, // Viene desde 100px más abajo
        opacity: 0, // Empieza invisible
        ease: "power2.out",
      });
    });

    // Cambiamos la imagen de fondo al segundo extra
    gsap.to(".roberto-bg-llantas", {
      scrollTrigger: {
        trigger: robertoSteps[1], // Se activa cuando estamos en el segundo extra
        start: "top 80%", // Empieza a subir cuando asoma por abajo
        end: "center center", // Termina de colocarse al llegar al medio
        scrub: 1, // La animación sigue el scroll
      },
      opacity: 1, // La imagen se vuelve visible
    });

    // Cambiamos la imagen de fondo al tercer extra
    gsap.to(".roberto-bg-maybach", {
      scrollTrigger: {
        trigger: robertoSteps[2], // Se activa cuando estamos en el tercer extra
        start: "top 80%", // Empieza a subir cuando asoma por abajo
        end: "center center", // Termina de colocarse al llegar al medio
        scrub: 1, // La animación sigue el scroll
      },
      opacity: 1, // La imagen se vuelve visible
    });
  }

  // Iván
  const maybachSection = document.querySelector(".maybach-section");
  if (maybachSection) {
    // ---- TIMELINE 1: Encabezado (H1 y párrafo) ----
    const ivanHeaderTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".maybach-section",
        start: "top 80%",
        end: "top 50%",
        scrub: 1.5,
      },
    });
    ivanHeaderTl
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
    // ---- ANIMACION COLOR DEL H1 AL BAJAR ----
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
    // ---- EFECTO VUELO IMAGEN coche ----
    gsap.fromTo(
      ".maybach-img",
      {
        y: -150,
        x: () => (window.innerWidth >= 992 ? "25vw" : "0"),
        scale: 1.6,
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
    // ---- TIMELINE 2: Contenido Principal ----
    const ivanContentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".maybach-section",
        start: "top 20%",
        end: "top -10%",
        scrub: 1.5,
      },
    });
    ivanContentTl
      .fromTo(
        ".car-details",
        { x: -60, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: "power3.inOut" },
        0,
      )
      .fromTo(
        ".payment-details",
        { x: 60, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
        0,
      )
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
      .fromTo(
        ".payment-field",
        { x: 20, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.in",
        },
        "-=0.2",
      )
      .fromTo(
        ".confirm-btn",
        { scale: 0.9, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.6, ease: "elastic.out(1, 0.7)" },
        "-=0.1",
      )
      .fromTo(
        ".secure-info",
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 },
        "-=0.3",
      );
  }

  ScrollTrigger.refresh();
});
