"use client";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import styles from "./RidesModal.module.css";
import { useEffect } from "react";

export default function RidesModal({
    ride,
    images,
    currentIndex,
    setCurrentIndex,
    onClose,
}) {
    if (!ride) return null;

    // Block scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden"; // disable background scroll
        return () => {
            document.body.style.overflow = ""; // restore scroll on unmount
        };
    }, []);

    const nextSlide = () => {
        if (!images || images.length === 0) return;
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        if (!images || images.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Close */}
                <button className={styles.close} onClick={onClose}>
                    <FaTimes />
                </button>

                {/* Content */}
                <div className={styles.content}>
                    <h3>{ride.title}</h3>
                    <p>{ride.desc}</p>
                </div>

                {/* Slider */}
                <div className={styles.sliderWrapper}>
                    <button className={styles.arrow} onClick={prevSlide}>
                        <FaChevronLeft />
                    </button>

                    <div className={styles.slider}>
                        {images?.[currentIndex]?.endsWith(".mp4") ? (
                            <video
                                key={images[currentIndex]}  // ✅ THIS FIXES IT
                                className={styles.sliderImage}
                                autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src={images[currentIndex]} type="video/mp4" />
                            </video>
                        ) : (
                            <img
                                src={images?.[currentIndex]}
                                alt="ride"
                                className={styles.sliderImage}
                            />
                        )}
                    </div>

                    <button className={styles.arrow} onClick={nextSlide}>
                        <FaChevronRight />
                    </button>
                </div>

                {/* Pagination */}
                <div className={styles.pagination}>
                    {images?.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ""}`}
                            onClick={() => goToSlide(index)}
                        ></span>
                    ))}
                </div>

            </div>
        </div>
    );
}