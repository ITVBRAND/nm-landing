const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsapSmoother = window.gsap && window.ScrollTrigger && window.ScrollSmoother;

if (!reducedMotion && hasGsapSmoother) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    document.documentElement.classList.add("has-gsap-smoother");

    const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        smoothTouch: 0.1,
        effects: true
    });

    const getSamePageTarget = (link) => {
        const url = new URL(link.href, window.location.href);

        if (
            url.origin !== window.location.origin ||
            url.pathname !== window.location.pathname ||
            url.search !== window.location.search ||
            !url.hash
        ) {
            return null;
        }

        return document.getElementById(decodeURIComponent(url.hash.slice(1)));
    };

    document.addEventListener("click", (event) => {
        const link = event.target.closest("a[href]");

        if (
            !link ||
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            link.target === "_blank" ||
            link.hasAttribute("download")
        ) {
            return;
        }

        const target = getSamePageTarget(link);

        if (!target) {
            return;
        }

        event.preventDefault();

        const hash = `#${encodeURIComponent(target.id)}`;
        if (window.location.hash !== hash) {
            window.history.pushState(null, "", hash);
        }

        smoother.scrollTo(target, true, "top top");
    });

    if (window.location.hash) {
        const initialTarget = document.getElementById(
            decodeURIComponent(window.location.hash.slice(1))
        );

        if (initialTarget) {
            requestAnimationFrame(() => smoother.scrollTo(initialTarget, false, "top top"));
        }
    }

    const productsList = document.querySelector(".products__list");
    const canPinProductCards = window.matchMedia(
        "(min-width: 1101px) and (prefers-reduced-motion: no-preference)"
    ).matches;

    if (productsList && canPinProductCards) {
        const productCards = gsap.utils.toArray(".products__row", productsList);
        const baseOffset = 80;
        const stackStep = 18;

        productCards.forEach((card, index) => {
            ScrollTrigger.create({
                trigger: card,
                start: `top ${baseOffset + index * stackStep}px`,
                endTrigger: productsList,
                end: "bottom bottom",
                pin: card,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: true
            });

            const nextCard = productCards[index + 1];

            if (nextCard) {
                gsap.to(card, {
                    opacity: 0.2,
                    ease: "none",
                    scrollTrigger: {
                        trigger: nextCard,
                        start: `top ${baseOffset + (index + 1) * stackStep}px`,
                        end: "+=220",
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                });
            }
        });

        ScrollTrigger.refresh();
    }
}
