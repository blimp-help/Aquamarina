"use client";
import React, { useState } from "react";
import styles from "./Hero.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";

const slides = [
  {
    id: 1,
    type: "image",
    src: "/hero.jpg",
    title: "One Vacation That Changes Everything",
    description:
      "Escape the ordinary and dive into unforgettable fun, thrilling rides, and refreshing adventures for the whole family.",
  },
  {
    id: 2,
    type: "youtube",
    src: "https://www.youtube.com/embed/xWi8gshGmwU",
    thumbnail: "/hero.jpg",
    title: "Experience Aquamarina Like Never Before",
    description:
      "Feel the adrenaline with exciting water rides and unforgettable moments.",
  },
];

// const Hero = () => {
//   const videoUrl = "/Hero.mp4"; 
  // const [current, setCurrent] = useState(0);
  // const [playVideo, setPlayVideo] = useState(false);

  // const nextSlide = () => {
  //   setCurrent((prev) => (prev + 1) % slides.length);
  //   setPlayVideo(false);
  // };

  // const prevSlide = () => {
  //   setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  //   setPlayVideo(false);
  // };

  // const slide = slides[current];

  // return (
  //   <section className={styles.hero}>

      {/* IMAGE SLIDE */}
      {/* {slide.type === "image" && (
        <img src={slide.src} className={styles.media} alt="" />
      )} */}

      {/* YOUTUBE SLIDE */}
      {/* {slide.type === "youtube" && !playVideo && (
        <div className={styles.videoPreview}>
          <img
            src={slide.thumbnail}
            className={styles.media}
            alt=""
          />

          <button
            className={styles.playButton}
            onClick={() => setPlayVideo(true)}
          >
         <FaPlay size={18} />
          </button>
        </div>
      )}

      {slide.type === "youtube" && playVideo && (
        <iframe
          src={`${slide.src}?autoplay=1&mute=1&controls=0&loop=1&playlist=xWi8gshGmwU`}
          className={styles.media}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )} */}

      {/* Overlay */}
      <div className={styles.overlay}></div>

      {/* <div className={`container ${styles.heroContent}`}>
        <div className={styles.textContent}>
          <h1>{slide.title}</h1>
          <p>{slide.description}</p>
          <button className={styles.detailsbtn}>Get Details</button>
        </div>

        <div className={styles.sliderControls}>
          <button onClick={prevSlide} className={styles.arrow}><FiChevronLeft /></button>
          <button onClick={nextSlide} className={styles.arrow}><FiChevronRight /></button>
        </div>
      </div> */}

      // <div className={`container ${styles.heroContent}`}>
        {/* <div className={styles.textContent}>
          <h1>{slide.title}</h1>
          <p>{slide.description}</p>

        </div>

        <div className={styles.actionRow}>
          <button className={styles.detailsbtn}>Get Details</button>

          <div className={styles.sliderControls}>
            <button onClick={prevSlide} className={styles.arrow}>
              <FiChevronLeft />
            </button>
            <button onClick={nextSlide} className={styles.arrow}>
              <FiChevronRight />
            </button>
          </div>

        </div> */}
        {/* <div className={styles.videoPreview}>
  <video
    className={styles.media}
    autoPlay
    loop
    muted
    playsInline
  >
    <source src={videoUrl} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
      </div> */}

    {/* </section>
  );
}; */}


const Hero = () => {
  const videoUrl = "/Hero.webm";

  return (
    <section className={styles.hero}>
      <video
        className={styles.media}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default Hero;

