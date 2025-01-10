import { useEffect, useState } from "react";
import styles from "../../modules/LatestDrops.module.css";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

import { useAppendSlides } from "../../hooks/useAppendSlides";
import { useAutoSlide } from "../../hooks/useAutoSlide";
import { useTouch } from "../../hooks/useTouch";

function LatestDrops() {
  const [ActiveId, setActiveId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { slides } = useAppendSlides();
  const { setWidth2, carouselRef, slidesPerView } = useAutoSlide(
    setCurrentSlide,
    slides
  );

  useEffect(() => {
    const handleResize = () => setWidth2(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = Math.floor(slides.length / slidesPerView);
      return prev < maxSlide ? prev + 1 : 0; // Loop back to the first slide
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      return prev > 0 ? prev - 1 : Math.floor(slides.length / slidesPerView); // Loop to the last slide
    });
  };

  function handleSelect(id) {
    setActiveId((prev) => (prev === id ? null : id));
  }

  const { handleTouchMove, handleTouchStart } = useTouch(nextSlide, prevSlide);

  return (
    <section
      className={styles.carouselWrapper}
      tabIndex="0" // Makes it focusable
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <h2 className={styles.lineTitle}>Trending Artworks</h2>
      <div
        className={styles.carousel}
        style={{
          transform: `translateX(-${340 * currentSlide * slidesPerView}px)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${
              slide.id === ActiveId ? styles.active : ""
            }`}
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            onClick={() => handleSelect(slide.id)}
          >
            <div className={styles.itemDesc}>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.button} onClick={prevSlide}>
        <HiArrowNarrowLeft />
      </button>
      <button className={styles.button} onClick={nextSlide}>
        <HiArrowNarrowRight />
      </button>
    </section>
  );
}

export default LatestDrops;
