document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const introTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#roberto-intro",
            start: "top 60%", 
            toggleActions: "play none none reverse"
        }
    });

    introTl.from(".roberto-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from(".roberto-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6");

    const steps = gsap.utils.toArray(".roberto-step");

    if(steps.length > 0) {
        steps.forEach((step, index) => {
            gsap.from(step.querySelector(".roberto-card"), {
                scrollTrigger: {
                    trigger: step,
                    start: "top 80%", 
                    end: "center center",
                    scrub: 1,
                },
                y: 100,
                opacity: 0,
                ease: "power2.out"
            });
        });

        gsap.to(".roberto-bg-llantas", {
            scrollTrigger: {
                trigger: steps[1],
                start: "top 80%",
                end: "center center",
                scrub: 1
            },
            opacity: 1
        });

        gsap.to(".roberto-bg-maybach", {
            scrollTrigger: {
                trigger: steps[2],
                start: "top 80%",
                end: "center center",
                scrub: 1
            },
            opacity: 1
        });

        gsap.to(".roberto-bg", {
            scrollTrigger: {
                trigger: ".roberto-scrollytelling-wrapper",
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            scale: 1.15,
            transformOrigin: "center center",
            ease: "none"
        });
    }

});
