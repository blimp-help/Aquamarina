"use client";
import { useEffect, useState } from "react";
import styles from "./PicnicEvent.module.css";
import Spinner from "../Spinners/Spinner";

const events = [
  {
    id: 1,
    title: "Weddings",
    shortDescription: "Celebrate your big day in a beautiful open-air venue with premium arrangements.",
    image: "/wedding1.jpeg",
  },
  {
    id: 2,
    title: "Birthday Parties",
    shortDescription: "Make birthdays extra special with fun rides, food, and entertainment.",
    image: "/birthday.jpeg",
  },
  {
    id: 3,
    title: "Live Concerts",
    shortDescription: "Host energetic concerts with large crowd capacity and stage setup.",
    image: "/wedding.jpeg",
  },
];

const CONTACT_NUMBER = "+91 98765 43210";

const PicnicEvent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <Spinner type="ring" size={50} />
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <h2>Events & Celebrations</h2>
      <p>
        Host weddings, birthdays and concerts in a vibrant space designed for unforgettable experiences.
      </p>

      {/* GRID */}
      <div className={styles.grid}>
        {events.map((event) => (
          <div key={event.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={event.image} alt={event.title} />
            </div>

            <div className={styles.cardContent}>
              <h4>{event.title}</h4>
              <p className={styles.description}>{event.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ GLOBAL CONTACT (outside map) */}
      <div className={styles.globalContact}>
        For bookings & enquiries:{" "}
        <a href={`tel:${CONTACT_NUMBER}`}>{CONTACT_NUMBER}</a>
      </div>
    </section>
  );
};

export default PicnicEvent;