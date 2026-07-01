"use client";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import styles from "./RoomsModal.module.css";
import { useEffect } from "react";

const getOptimizedImageUrl = (url, width = 1000) => {
    if (!url) return "";
    if (url.includes("cloudinary.com") && !url.includes("/video/")) {
        if (url.includes("/upload/")) {
            return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
        }
    }
    return url;
};

export default function RoomModal({
    room,
    images,
    currentIndex,
    setCurrentIndex,
    onClose,
    onCheckAvailability,
}) {
    if (!room) return null;

     // Block scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden"; // disable background scroll
        return () => {
            document.body.style.overflow = ""; // restore scroll on unmount
        };
    }, []);

    // Preload gallery images for instant transitions
    useEffect(() => {
        if (images && images.length > 0) {
            images.forEach((url) => {
                if (url && !url.includes("/video/") && !url.endsWith(".mp4")) {
                    const img = new Image();
                    img.src = getOptimizedImageUrl(url, 1000);
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
                    <h3>{room.title}</h3>
                    <p>{room.description}</p>
                </div>

                {/* Slider */}
                <div className={styles.sliderWrapper}>
                    <button className={styles.arrow} onClick={prevSlide}>
                        <FaChevronLeft />
                    </button>

                    <div className={styles.slider}>
                        <img
                            src={getOptimizedImageUrl(images?.[currentIndex] || "/room1.jpg", 1000)}
                            alt="room"
                            className={styles.sliderImage}
                        />
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

                <button className={styles.btn} onClick={onCheckAvailability}>
                    Check Availability
                </button>
            </div>
        </div>
    );
}