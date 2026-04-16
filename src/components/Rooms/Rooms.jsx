"use client"
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Rooms.module.css";
import { FaBath, FaBed, FaConciergeBell, FaSnowflake, FaTv, FaUserCircle, FaWifi } from "react-icons/fa";
import { useRouter } from "next/navigation";
import RoomModal from "./RoomModal";

const stays = [
    {
        title: "Rustic Luxury Stay",
        tag: "Log Huts Premium",
        image: "/room1.jpg",
        description:
            "Enjoy a cozy wooden retreat designed for comfort and relaxation. With modern amenities and a peaceful atmosphere, it’s the perfect place to unwind after a fun-filled day at the water park.",
    },
    {
        title: "Stay with Amazing View",
        tag: "Pool Facing",
        image: "/room2.jpg",
        description:
            "Enjoy a relaxing stay with beautiful views of the pool right from your room. Perfect for guests who love a vibrant atmosphere while staying close to the fun and excitement of the water park.",
    },
    {
        title: "Rustic Luxury Stay",
        tag: "Garden Facing",
        image: "/room3.jpg",
        description:
            "Enjoy a cozy wooden retreat designed for comfort and relaxation. With modern amenities and a peaceful atmosphere, it’s the perfect place to unwind after a fun-filled day at the water park.",
    },
     {
        title: "Stay with Amazing View",
        tag: "Pool Facing",
        image: "/room2.jpg",
        description:
            "Enjoy a relaxing stay with beautiful views of the pool right from your room. Perfect for guests who love a vibrant atmosphere while staying close to the fun and excitement of the water park.",
    },
];

const Rooms = () => {

    const router = useRouter();

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);



    // ✅ Separate images
    const roomImages = {
        0: ["/room1.jpg", "/room2.jpg", "/room3.jpg"],
        1: ["/room2.jpg", "/room1.jpg"],
        2: ["/room3.jpg", "/room2.jpg"],
        3: ["/room2.jpg", "/room3.jpg"],
    };

    const handleClick = () => {
        // Navigate to /booking with query tab=hotels
        router.push("/booking?tab=hotels");
    };

    return (
        <section className={styles.staySection}>
            <div className={styles.container}>

                <div className={styles.heading}>
                    <h2>Stay Cool. Stay Comfortable</h2>
                    <p>
                        Take a break from the excitement and relax in a cool, comfortable environment designed for families and groups. Whether you're recharging between rides or enjoying a peaceful moment, our spaces ensure you stay refreshed and relaxed throughout your visit.
                    </p>
                </div>

                {stays.map((stay, index) => (
                    <div
                        key={index}
                        className={`${styles.roomWrapper} ${index % 2 !== 0 ? styles.reverse : ""
                            }`}
                    >

                        {/* TEXT */}
                        <div className={styles.textCard}>
                            <h3>{stay.title}</h3>

                            <p>{stay.description}</p>

                            <div className={styles.features}>
                                <div className={styles.featureItem}><FaSnowflake /> Air Conditioning</div>
                                <div className={styles.featureItem}><FaBed /> King Size Bed</div>
                                <div className={styles.featureItem}><FaWifi /> Free Wi-Fi</div>
                                <div className={styles.featureItem}><FaTv /> LED TV</div>
                                <div className={styles.featureItem}><FaBath /> Bathroom with Hot & Cold Water</div>
                                <div className={styles.featureItem}><FaUserCircle /> Wardrobe & Dressing Area</div>
                                <div className={styles.featureItem}><FaConciergeBell /> Room Service</div>
                            </div>

                            <p
                                className={styles.seeMore}
                                onClick={() => {
                                    setSelectedRoom({ ...stay, index });
                                    setCurrentIndex(0);
                                }}
                            >
                                See More Details
                            </p>
                            <button className={styles.btn} onClick={handleClick}>
                                Check Availability
                            </button>
                        </div>


                        {/* IMAGE */}
                        <div className={styles.imageWrapper}>
                            <span className={styles.tag}>{stay.tag}</span>

                            <Image
                                src={stay.image}
                                alt={stay.title}
                                width={554}
                                height={500}
                            />
                        </div>

                    </div>
                ))}

            </div>

            {/* ✅ MODAL */}
            {selectedRoom && (
                <RoomModal
                    room={selectedRoom}
                    images={roomImages[selectedRoom.index] || []}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    onClose={() => setSelectedRoom(null)}
                    onCheckAvailability={handleClick}
                />
            )}
        </section>
    );
};

export default Rooms;