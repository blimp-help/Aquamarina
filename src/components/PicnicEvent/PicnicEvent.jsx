"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./PicnicEvent.module.css";
import { FiChevronDown } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import moment from "moment";
import Spinner from "../Spinners/Spinner";


const PicnicEvent = () => {

    const [picnicSpots, setPicnicSpots] = useState([]);

    const [dates, setDates] = useState({});
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();


    const handleDateChange = (id, value) => {
        setDates({ ...dates, [id]: value });
    };


    const formatDate = (date) => {
        return moment(date || new Date())
            .format("DD-MMM-YYYY")
            .toUpperCase();
    };

    useEffect(() => {
        const fetchPicnicSpots = async () => {
            try {
                const res = await fetch(
                    "https://aquamarina-backend.onrender.com/picnicSpots/get-picnicspots",
                    {
                        method: "GET",
                    }
                ); const data = await res.json();

                console.log(data.response)

                if (data.success) {
                    setPicnicSpots(data.response || []);
                }
            } catch (error) {
                console.error("Error fetching picnic spots:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPicnicSpots();
    }, []);


   if (loading) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <Spinner type="ring" size={50} />
    </div>
  );
}


    const today = new Date().toISOString().split("T")[0];

    const increaseQty = (id) => {
        const current = quantities[id] || 10;

        setQuantities({
            ...quantities,
            [id]: current + 1
        });
    };

    const decreaseQty = (id) => {
        const current = quantities[id] || 10;

        if (current === 20) return;

        setQuantities({
            ...quantities,
            [id]: current - 1
        });
    };

    const handleAddToCart = async (ride) => {
        const quantity = quantities[ride._id] || 10;
        const date = dates[ride._id] || today;
        try {
            // ✅ check availability first
            const res = await fetch(
                "https://aquamarina-backend.onrender.com/picnicSpots/check-spot-avilability",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        spotid: ride._id,
                        date: date,
                        spotQty: 1,
                    }),
                }
            );

            const data = await res.json();

            if (!data.success) {
                alert(data.message); // show error
                return;
            }

            dispatch(
                addToCart({
                    id: ride._id,
                    type: "picnic",
                    title: ride.title,
                    price: ride.price,
                    image: ride.featureImage.url,
                    description: ride.description,
                    spotQuantity: 1,
                    spotPrice: ride.spotPrice,
                    quantity,
                    date: date,
                    total: ride.price * quantity,
                })
            );
        }
        catch (err) {
            console.error("Availability check failed", err);
            alert("Unable to check room availability");
        }
    };


    return (
        <section className={styles.section}>

            <h2>Events & Celebrations</h2>
            <p>
                Plan unforgettable picnics and celebrations with spacious areas, great food, and fun-filled attractions perfect for families, groups, and special occasions.
            </p>

            <div className={styles.grid}>

                {picnicSpots.map((ride) => (
                    <div key={ride._id} className={styles.card}>

                        {/* IMAGE */}
                        <div className={styles.imageWrapper}>
                            <img src={ride.featureImage.url} alt={ride.title} />

                            <div className={styles.priceTag}>
                                <div className={styles.price}>₹{ride.price}/-</div>
                                <div className={styles.gst}>Including GST</div>
                                <div className={styles.person}>(For One Person)</div>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className={styles.cardContent}>

                            <div className={styles.cardHeader}>
                                {/* Left Column: Title & Description */}
                                <div className={styles.titleDesc}>
                                    <h4>{ride.title}</h4>
                                    <p className={styles.description}>{ride.shortDescription}</p>
                                </div>

                                {/* Right Column: Price */}
                                <div className={styles.priceColumn}>
                                    <span className={styles.spotLabel}>Spot Price:</span>
                                    <span className={styles.spotPrice}>₹{ride.spotPrice}/-</span>
                                </div>
                            </div>

                            {/* BOOKING DATE */}
                            <div className={styles.field}>
                                <label>Booking Date :</label>
                                <div
                                    className={styles.dateBox}
                                    onClick={() => document.getElementById(`date-${ride._id}`).showPicker()}
                                >
                                    <div className={styles.calendarCircle}>
                                        <FaCalendarAlt />
                                    </div>
                                    <span className={styles.dateText}>
                                        {formatDate(dates[ride._id])}
                                    </span>
                                    <FiChevronDown className={styles.arrow} />
                                    <input
                                        id={`date-${ride._id}`}
                                        type="date"
                                        className={styles.hiddenDate}
                                        min={today}
                                        value={dates[ride._id] || ""}
                                        onChange={(e) => handleDateChange(ride._id, e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* PRICE + QUANTITY */}
                            <div className={styles.priceRow}>

                                <span className={styles.dynamicPrice}>
                                    Rs. - {(ride.spotPrice + ride.price * (quantities[ride._id] || 10)).toFixed(2)}
                                </span>

                                <div className={styles.quantityBox}>

                                    <button
                                        onClick={() => decreaseQty(ride._id)}
                                        className={styles.qtyBtn}
                                        disabled={(quantities[ride._id] || 10) === 10}
                                    >
                                        −
                                    </button>

                                    <span className={styles.qtyNumber}>
                                        {quantities[ride._id] || 10}
                                    </span>

                                    <button
                                        onClick={() => increaseQty(ride._id)}
                                        className={styles.qtyBtn}
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                            {/* BUTTON */}
                            <button className={styles.addBtn}
                                onClick={() => handleAddToCart(ride)}
                            >
                                Add To Cart
                            </button>

                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default PicnicEvent;