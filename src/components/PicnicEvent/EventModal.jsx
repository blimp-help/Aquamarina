"use client";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./EventModal.module.css";

export default function EventModal({
  event,
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}) {
  if (!event) return null;

  // 🔒 Disable background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Preload gallery images for instant transitions
  useEffect(() => {
    if (images && images.length > 0) {
      images.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    }
  }, [images]);

  const nextSlide = () => {
    if (!images?.length) return;
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (!images?.length) return;
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ❌ Close */}
        <button className={styles.close} onClick={onClose}>
          <FaTimes />
        </button>

        {/* 📄 Content */}
        <div className={styles.content}>
          <h3>{event.title}</h3>
          <p>{event.shortDescription}</p>
        </div>

        {/* 🖼️ Slider Row (arrows outside) */}
        <div className={styles.sliderRow}>
          <button className={styles.arrow} onClick={prevSlide}>
            <FaChevronLeft />
          </button>

          <div className={styles.slider}>
            <img
              src={images?.[currentIndex] || event.image}
              alt={event.title}
              className={styles.sliderImage}
            />
          </div>

          <button className={styles.arrow} onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>

        {/* 🔘 Pagination */}
        <div className={styles.pagination}>
          {images?.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                currentIndex === index ? styles.activeDot : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}