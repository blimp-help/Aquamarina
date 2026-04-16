"use client";
import React, { useState } from "react";
import styles from "./GetInto.module.css";

const GetInto = () => {
  const [play, setPlay] = useState(false);

  const stopVideo = () => {
    setPlay(false);
  };

  return (
    <section className={styles.getIntoSection}>
      <div className="container">
        <div className={styles.content}>

          <h2>Let’s Get Into It</h2>
          <p>
            Step into a world of splashes, slides, and nonstop excitement.
            From thrilling rides to relaxing spots, every moment is packed
            with fun for friends and family.
          </p>
        </div>
      </div>
{/* 
      <div className={styles.videoHero} onClick={stopVideo}>
        {!play && (
          <img
            src="/thumbnail.jpg"
            alt="Water Park"
            className={styles.media}
          />
        )}

        {play && (
          <video
            className={styles.media}
            src="/video.mp4"
            autoPlay
            muted
            controls
            playsInline
          />
        )}

        <div className={styles.overlay}></div>

        <div className={`container ${styles.heroContent}`}>
          <div
            className={styles.textContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h1>One Vacation That Changes Every Things.</h1>
            <p>
              Dive into thrilling slides, splash zones and unforgettable
              adventures waiting for you and your family.
            </p>

            {!play && (
              <button
                className={styles.detailsbtn}
                onClick={() => setPlay(true)}
              >
                Play Now
              </button>
            )}
          </div>
        </div>
      </div> */}

       <div className={styles.videoHero}>
        {/* ✅ Always Video */}
        <video
          className={styles.media}
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        </div>
    </section>
  );
};

export default GetInto;