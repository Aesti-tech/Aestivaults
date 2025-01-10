import { useEffect, useRef, useState } from "react";

function useAutoSlide(setCurrentSlide, slides) {
  const carouselRef = useRef(null); // Ref for the carousel
  const intervalRef = useRef(null); // Ref for managing the interval

  const [width2, setWidth2] = useState(window.innerWidth);
  const slidesPerView = Math.floor(width2 / 350);

  // Handle auto-slide logic
  useEffect(() => {
    const startSliding = () => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const maxSlide = Math.floor(slides.length / slidesPerView - 1);
          if (prev >= maxSlide) {
            return maxSlide - 1; // Reverse direction logic can go here if needed
          }
          return prev + 1;
        });
      }, 4000);
    };

    const stopSliding = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    // Check if carousel is focused
    const handleFocus = () => stopSliding();
    const handleBlur = () => startSliding();

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("focus", handleFocus);
      carouselElement.addEventListener("blur", handleBlur);
    }

    startSliding(); // Start the interval initially

    // Cleanup
    return () => {
      stopSliding();
      if (carouselElement) {
        carouselElement.removeEventListener("focus", handleFocus);
        carouselElement.removeEventListener("blur", handleBlur);
      }
    };
  }, [slides.length, slidesPerView]);

  return { setWidth2, carouselRef, slidesPerView };
}

export { useAutoSlide };
