"use client";
import React, { useState } from "react";
import styles from "./Rides.module.css";
import RidesModal from "./RidesModal";

const rides = [
  {
    image: "/52_1.JPG",
    title: "52 inch water slide",
    desc: "This 52 inch double float water slides is a signature attraction, it’s creates an illusion during high speed, feels like a time travel. ",
  },
  {
    image: "/kidsPlay_1.JPG",
    title: "Kids’ Play Station",
    desc: "A dedicated zone for children with colorful slides, shallow pools, and fun water features to keep them entertained all day.",
  },
  {
    image: "/multiRacer_1.JPG",
    title: "Multi racer strip",
    desc: "The heat is on and you can challenge your friend for a good hearty race down the hill. Three friends one soul. Racing board available.",
  },
  {
    image: "/superLoop_1.JPG",
    title: "Super loop",
    desc: "One for the most thrilling rides you will find in Aqua Marina. This ride has a launcher where the trap door flicks open and you will go down the rabbit hole.",
  },
  {
    image: "/wave_1.jpg",
    title: "Wave Pool",
    desc: "Experience the ocean-like waves right in the heart of Aqua Marina—relax or ride the waves your way with state of the art technology to give you a slice of the BAY of BENGAL.",
  },
  {
    image: "/family_2.JPG",
    title: "Family Slides",
    desc: "Enjoy safe and exciting mini slides designed for families and kids, mini slides, and interactive water play.",
  },
];

// ✅ Separate images
const ridesImages = {
  0: ["/52_1.JPG", "/52_2.JPG", "/52_3.JPG", "/52_4.png"],
  1: ["/kidsPlay_1.JPG", "/kidsPlay_2.JPG", "/kidsPlay_3.JPG", "/kidsPlay_4.JPG"],
  2: ["/multiRacer_2.JPG", "/multiRacer_3.JPG", "/multiRacer_4.JPG"],
  3: ["/superLoop_1.JPG", "/superLoop_2.webp", "/superLoop_3.mp4", "/superLoop_4.mp4"],
  4: ["/wave_1.jpg", "/wave_2.JPG", "/wave_3.JPG", "/wave_4.JPG","/wave_5.JPG", "/wave_6.mp4", "/wave_7.mp4"],
  5: ["/family_2.JPG","/family_1.mp4"],
};

const Rides = () => {

  const [selectedRide, setSelectedRide] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className={styles.ridesSection}>
      <div className="container">

        <div className={styles.header}>
          <h2>Thrill Rides</h2>
          <p>
          Get your heart racing with our high-speed slides, wave pools, and splash zones. Perfect for adventure lovers looking for an adrenaline rush.
          </p>
        </div>

        <div className={styles.ridesGrid}>
          {rides.map((ride, index) => (
            <div key={index} className={styles.cardWrapper}>

              <div className={styles.card}
                onClick={() => {
                  setSelectedRide({ ...ride, index });
                  setCurrentIndex(0);
                }}>
                <img src={ride.image} alt={ride.title} />

                <div className={styles.cardContent}>
                  <h3>{ride.title}</h3>
                  <p>{ride.desc}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ✅ MODAL */}
      {selectedRide && (
        <RidesModal
          ride={selectedRide}
          images={ridesImages[selectedRide.index] || []}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setSelectedRide(null)}
        />
      )}
    </section>
  );
};

export default Rides;