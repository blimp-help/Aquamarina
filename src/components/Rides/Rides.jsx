"use client";
import React, { useState } from "react";
import styles from "./Rides.module.css";
import RidesModal from "./RidesModal";

const rides = [
  {
    image: "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015012/52_1_zku7ch.webp",
    title: "52 inch water slide",
    desc: "This 52 inch double float water slides is a signature attraction, it’s creates an illusion during high speed, feels like a time travel. ",
  },
  {
    image: "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015027/kidsPlay_1_aeaalp.webp",
    title: "Kids’ Play Station",
    desc: "A dedicated zone for children with colorful slides, shallow pools, and fun water features to keep them entertained all day.",
  },
  {
    image: "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015030/multiRacer_1_ivzwzc.webp",
    title: "Multi racer strip",
    desc: "The heat is on and you can challenge your friend for a good hearty race down the hill. Three friends one soul. Racing board available.",
  },
  {
    image: "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015054/superLoop_1_cw8ktk.webp",
    title: "Super loop",
    desc: "One for the most thrilling rides you will find in Aqua Marina. This ride has a launcher where the trap door flicks open and you will go down the rabbit hole.",
  },
  {
    image: "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015056/wave_1_wzwily.webp",
    title: "Wave Pool",
    desc: "Experience the ocean-like waves right in the heart of Aqua Marina—relax or ride the waves your way with state of the art technology to give you a slice of the BAY of BENGAL.",
  },
  {
    image: "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015016/family_2_zllzrd.webp",
    title: "Family Slides",
    desc: "Enjoy safe and exciting mini slides designed for families and kids, mini slides, and interactive water play.",
  },
];

// ✅ Separate images
const ridesImages = {
  0: ["https://res.cloudinary.com/dkzkxte95/image/upload/v1777015012/52_1_zku7ch.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015012/52_2_c9gxgx.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015012/52_3_azr8bk.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015013/52_4_ed3gdl.webp"],
  1: ["https://res.cloudinary.com/dkzkxte95/image/upload/v1777015027/kidsPlay_1_aeaalp.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015026/kidsPlay_2_vmtb5q.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015029/kidsPlay_3_xycazx.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015028/kidsPlay_4_afflz9.webp"],
  2: ["https://res.cloudinary.com/dkzkxte95/image/upload/v1777015031/multiRacer_2_lvvuhy.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015032/multiRacer_3_swrsni.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015033/multiRacer_4_mxvigz.webp"],
  3: ["https://res.cloudinary.com/dkzkxte95/video/upload/v1777016254/superLoop_3_h48qpy.mp4", "https://res.cloudinary.com/dkzkxte95/video/upload/v1777016284/superLoop_4_fnpnm4.mp4"],
  4: ["https://res.cloudinary.com/dkzkxte95/image/upload/v1777015056/wave_1_wzwily.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015058/wave_2_yrxvzd.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015058/wave_3_dmtbbi.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015059/wave_4_pniqo5.webp","https://res.cloudinary.com/dkzkxte95/image/upload/v1777015059/wave_5_wrq5vz.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015059/wave_5_wrq5vz.webp", "https://res.cloudinary.com/dkzkxte95/video/upload/v1777016436/wave_7_us7d4e.mp4"],
  5: ["https://res.cloudinary.com/dkzkxte95/image/upload/v1777015016/family_2_zllzrd.webp","https://res.cloudinary.com/dkzkxte95/video/upload/v1777016585/family_1_m2ilcn.mp4", "https://res.cloudinary.com/dkzkxte95/video/upload/v1777016969/video-1_mjsjla.mp4"],
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