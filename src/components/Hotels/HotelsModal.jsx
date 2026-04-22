"use client";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import styles from "./HotelsModal.module.css";
import { useEffect } from "react";

export default function HotelsModal({
    images,
    currentIndex,
    setCurrentIndex,
    onClose,
}) {
    if (!images || images.length === 0) return null;

    // 🔒 Block background scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                {/* ❌ Close */}
                <button className={styles.close} onClick={onClose}>
                    <FaTimes />
                </button>

                {/* 🖼️ Slider */}
                <div className={styles.sliderWrapper}>
                    <button className={styles.arrow} onClick={prevSlide}>
                        <FaChevronLeft />
                    </button>

                    <div className={styles.slider}>
                        <img
                            src={images[currentIndex]}
                            alt="room"
                            className={styles.sliderImage}
                        />
                    </div>

                    <button className={styles.arrow} onClick={nextSlide}>
                        <FaChevronRight />
                    </button>
                </div>

                {/* 🔘 Dots */}
                <div className={styles.pagination}>
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${
                                currentIndex === index ? styles.activeDot : ""
                            }`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}