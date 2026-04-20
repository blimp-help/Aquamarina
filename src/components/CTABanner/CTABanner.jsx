"use client";
import React from "react";
import styles from "./CTABanner.module.css"; // Create a separate CSS module
import Link from "next/link";

const CTABanner = () => {
  return (
    <section className={styles.container} >
        <div className={styles.ctaBanner}>
      <h2>Plan Your Perfect Getaway with Ease</h2>
      <p>
        Make your trip planning simple and stress-free with everything you need in one place. 
        Explore exciting attractions, comfortable stays, and great dining options to create 
        a fun-filled and memorable experience for everyone.
      </p>
      <Link href="/booking?tab=passes">
       <button className={styles.bookBtn}>Book Now</button>
      </Link>
     
      </div>
    </section>
  );
};

export default CTABanner;