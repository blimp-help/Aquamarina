"use client";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import styles from "./RidesModal.module.css";
import { useEffect } from "react";

const getOptimizedMediaUrl = (url, width = 1000) => {
    if (!url) return "";
    if (url.includes("cloudinary.com")) {
        if (url.includes("/upload/")) {
            if (url.includes("/video/") || url.endsWith(".mp4")) {
                return url.replace("/upload/", `/upload/f_auto,q_auto,vc_auto,w_800/`);
            } else {
                return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
            }
        }
    }
    return url;
};

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

    // Preload gallery images & videos for instant transitions
    useEffect(() => {
        if (images && images.length > 0) {
            images.forEach((url) => {
                if (url) {
                    if (url.includes("/video/") || url.endsWith(".mp4")) {
                        const video = document.createElement("video");
                        video.src = getOptimizedMediaUrl(url);
                        video.preload = "auto";
                    } else {
                        const img = new Image();
                        img.src = getOptimizedMediaUrl(url, 1000);
                    }
                }
            });
        }
    }, [images]);

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
                                key={images[currentIndex]}
                                className={styles.sliderImage}
                                src={getOptimizedMediaUrl(images[currentIndex])}
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        ) : (
                            <img
                                src={getOptimizedMediaUrl(images?.[currentIndex], 1000)}
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