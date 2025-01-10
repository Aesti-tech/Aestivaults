import { useEffect, useState } from "react";
import { items } from "../services/Constants";

function useAppendSlides() {
  const [slides, setSlides] = useState(items);

  useEffect(() => {
    if (slides.length === items.length) {
      // Duplicate slides with unique IDs
      const nextSlides = items.map((item, index) => ({
        ...item,
        id: slides.length + index + 1, // Unique IDs for appended slides
      }));

      // Append new slides before the last one
      const updatedSlides = [
        ...slides.slice(0, slides.length - 1),
        ...nextSlides,
        slides[slides.length - 1], // Keep the last slide intact
      ];

      setSlides(updatedSlides);
    }
  }, [slides.length, items.length, slides]);

  return { slides };
}

export { useAppendSlides };
