import { useState } from "react";

export function useTouch(nextSlide, prevSlide) {
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const touchEndX = e.touches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        // Swiped left
        nextSlide();
      } else {
        // Swiped right
        prevSlide();
      }
    }
  };

  return { handleTouchMove, handleTouchStart };
}
