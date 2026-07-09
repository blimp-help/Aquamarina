"use client"
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Rooms.module.css";
import { FaBath, FaBed, FaConciergeBell, FaSnowflake, FaTv, FaUserCircle, FaWifi } from "react-icons/fa";
import { useRouter } from "next/navigation";
import RoomModal from "./RoomModal";

const stays = [
    {
        tag: "Log Hut Premium",
        image: "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015050/room1_hinkg6.webp",
        description:
            "Escape to our cozy log hut room with a beautiful garden view. Wake up to fresh air and scores of nature. Enjoy a peaceful stay surrounded by lush greenery.",
    },
    {
        tag: "Premium Mud House",
        image: "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015049/resort13_ba9z9w.webp",
        description:
            "Experience the charm of a traditional mud hut with premium comfort. Relax in a spacious room overlooking a lush, serene garden.",
    },
    {
        tag: "Deluxe Room",
        image: "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015042/resort5_wbfndu.webp",
        description:
            "Our Deluxe Room is designed for comfort, whether you're traveling for business, an office outing, or a family stay. Enjoy spacious interiors, modern amenities, and a relaxing ambiance. Ideal for corporate guests, families, and leisure travelers alike.",
    },
    {
        tag: "Boutique Room",
        image: "https://res.cloudinary.com/dkzkxte95/image/upload/v1782813328/rooms/mtxd0gmqs1271znzxx2i.webp",
        description:
            "Perfect for couples, solo travelers, and nature lovers seeking a unique escape.Experience a harmonious blend of the earthiness and serene natural beauty with porch area. Great spot to have a beer with your friend.",
    },
];

const Rooms = () => {

    const router = useRouter();

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);



    // ✅ Separate images
    const roomImages = {
        0: ["https://res.cloudinary.com/dkzkxte95/image/upload/v1777015040/resort1_jsieth.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015044/resort8_bcdvq1.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015048/resort9_w7wvye.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015048/resort12_tizyxy.webp"],
        1: ["https://res.cloudinary.com/dkzkxte95/image/upload/v1777015049/resort13_ba9z9w.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015049/resort14_itxkmc.webp"],
        2: ["https://res.cloudinary.com/dkzkxte95/image/upload/v1777015042/resort5_wbfndu.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015041/resort4_l70y9c.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015043/resort6_p80bi1.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1777015045/resort7_bw6kcs.webp"],
        3: ["https://res.cloudinary.com/dkzkxte95/image/upload/v1782813328/rooms/ryodthxbhbbuwu3vhpde.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1782813329/rooms/kvqjogydlpjhlvxsvsjw.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1782813329/rooms/jwvbnt3viufhekk0h0iv.webp", "https://res.cloudinary.com/dkzkxte95/image/upload/v1782813330/rooms/hgb8ej432gvoa6mh6lxr.webp"],
    };

    const handleClick = () => {
        // Navigate to /booking with query tab=hotels
        router.push("/booking?tab=hotels");
    };

    return (
        <section className={styles.staySection}>
            <div className={styles.container}>

                <div className={styles.heading}>
                    <h2>water park with the best greenery</h2>
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
                            {/* <h3>{stay.title}</h3> */}

                            <p>{stay.description}</p>

                            <div className={styles.features}>
                                <div className={styles.featureItem}><FaSnowflake /> Air Conditioning</div>
                                <div className={styles.featureItem}><FaBed /> King Size Bed</div>
                                {/* <div className={styles.featureItem}><FaWifi /> Free Wi-Fi</div> */}
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