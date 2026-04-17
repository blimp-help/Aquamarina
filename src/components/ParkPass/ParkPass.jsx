"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ParkPass.module.css";
import { FiChevronDown } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import moment from "moment";
import Spinner from "../Spinners/Spinner";

const rides = [
    {
        id: 1,
        type: "single",
        title: "Single Day Pass(Weekday)",
        adultPrice: 500,
        childPrice: 300,
        image: "/passimage.jpg",
        description: "Individual entry for adults & children."
    },
    {
        id: 2,
        type: "single",
        title: "Single Day Pass(Weekend)",
        adultPrice: 500,
        childPrice: 300,
        image: "/passimage.jpg",
        description: "Individual entry for adults & children."
    },
    {
        id: 3,
        title: "Group Offer (Weekday)",
        type: "group",
        price: 450,
        image: "/passimage.jpg",
        description: "Min 10 people. Access to all rides."
    },
    {
        id: 4,
        title: "Group Offer (Weekend)",
        type: "group",
        price: 550,
        image: "/passimage.jpg",
        description: "Min 10 people. Access to all rides."
    },
    {
        id: 5,
        title: "Family Pack",
        price: 650,
        image: "/passimage.jpg",
        description: "Min 10 people. Access to all rides."
    },
    {
        id: 6,
        title: "Family Pack",
        price: 650,
        image: "/passimage.jpg",
        description: "Min 10 people. Access to all rides."
    }

];

const ParkPass = () => {

    const [dates, setDates] = useState({});
    const [quantities, setQuantities] = useState({});
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [adultQty, setAdultQty] = useState({});
    const [childQty, setChildQty] = useState({});




    const dateRefs = useRef({});

    const handleDateChange = (id, value) => {
        setDates({ ...dates, [id]: value });
    };

    const openCalendar = (id) => {
        const input = dateRefs.current[id];

        if (!input) return;

        // modern browsers
        if (input.showPicker) {
            input.showPicker();
        } else {
            input.focus();
            input.click();
        }
    };

    const formatDate = (date) => {
        return moment(date || new Date())
            .format("DD-MMM-YYYY")
            .toUpperCase();
    };

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

        if (current === 10) return;

        setQuantities({
            ...quantities,
            [id]: current - 1
        });
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
                <Spinner type="ring" size={50} />
            </div>
        );
    }

    const handleAddToCart = (ride) => {
        const quantity = quantities[ride.id] || 10;
        const date = dates[ride.id];

        //   if (!date) {
        //     alert("Please select a date");
        //     return;
        //   }

        dispatch(
            addToCart({
                id: ride.id,
                type: "park",
                title: ride.title,
                price: ride.price,
                image: ride.image,
                description: ride.description,
                quantity,
                date: today,
                total: ride.price * quantity,
            })
        );
    };

    const increaseAdult = (id) => {
        setAdultQty({
            ...adultQty,
            [id]: (adultQty[id] || 1) + 1
        });
    };

    const decreaseAdult = (id) => {
        const current = adultQty[id] || 1;
        if (current === 1) return;

        setAdultQty({
            ...adultQty,
            [id]: current - 1
        });
    };

    const increaseChild = (id) => {
        setChildQty({
            ...childQty,
            [id]: (childQty[id] || 0) + 1
        });
    };

    const decreaseChild = (id) => {
        const current = childQty[id] || 0;
        if (current === 0) return;

        setChildQty({
            ...childQty,
            [id]: current - 1
        });
    };
    return (
        <section className={styles.section}>

            <h2>Park Passes</h2>
            <p>
                Explore thrilling water rides, exciting slides, and splash-filled
                adventures designed for fun.
            </p>

            <div className={styles.grid}>

                {rides.map((ride) => (
                    <div key={ride.id} className={styles.card}>

                        {/* IMAGE */}
                        <div className={styles.imageWrapper}>
                            <img src={ride.image} alt={ride.title} />

                            <div className={styles.priceTag}>
                                <div className={styles.price}>
                                    {ride.type === "group" ? (
                                        <>₹{ride.price}/-</>
                                    ) : (
                                        <>
                                            ₹{ride.adultPrice}/-
                                        </>
                                    )}
                                </div>
                                <div className={styles.gst}>Including GST</div>
                                <div className={styles.person}>(For One Person)</div>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className={styles.cardContent}>

                            <h4>{ride.title}</h4>

                            <p className={styles.description}>
                                {ride.description}
                            </p>

                            {/* BOOKING DATE */}
                            <div className={styles.field}>
                                <label>Booking Date :</label>

                                <div
                                    className={styles.dateBox}
                                    onClick={() => openCalendar(ride.id)}
                                >
                                    <div className={styles.calendarCircle}>
                                        <FaCalendarAlt />
                                    </div>

                                    <span className={styles.dateText}>
                                        {formatDate(dates[ride.id])}
                                    </span>

                                    <FiChevronDown className={styles.arrow} />

                                    <input
                                        ref={(el) => (dateRefs.current[ride.id] = el)}
                                        type="date"
                                        className={styles.hiddenDate}
                                        min={today}
                                        value={dates[ride.id] || ""}
                                        onChange={(e) =>
                                            handleDateChange(ride.id, e.target.value)
                                        }
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>

                            {/* PRICE + QUANTITY */}
                            {ride.type === "group" ? (

                                // 🟢 GROUP UI (your existing code)
                                <div className={styles.priceRow}>

                                    <span className={styles.dynamicPrice}>
                                        Rs. - {(ride.price * (quantities[ride.id] || 10)).toFixed(2)}
                                    </span>

                                    <div className={styles.quantityBox}>

                                        <button
                                            onClick={() => decreaseQty(ride.id)}
                                            className={styles.qtyBtn}
                                            disabled={(quantities[ride.id] || 10) === 10}
                                        >
                                            −
                                        </button>

                                        <span className={styles.qtyNumber}>
                                            {quantities[ride.id] || 10}
                                        </span>

                                        <button
                                            onClick={() => increaseQty(ride.id)}
                                            className={styles.qtyBtn}
                                        >
                                            +
                                        </button>

                                    </div>

                                </div>

                            ) : (

                                // 🔵 SINGLE PACK UI
                                <div
                                    className={styles.priceRow}
                                    style={{ flexDirection: "column", alignItems: "stretch", gap: "10px" }}
                                >

                                    {/* ADULT */}
                                    <div className={styles.priceRow}>
                                        <span className={styles.priceLabel}>Adult (₹{ride.adultPrice})</span>

                                        <div className={styles.quantityBox}>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => decreaseAdult(ride.id)}
                                                disabled={(adultQty[ride.id] || 1) === 1}

                                            >
                                                −
                                            </button>

                                            <span className={styles.qtyNumber}>
                                                {adultQty[ride.id] || 1}
                                            </span>

                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => increaseAdult(ride.id)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* CHILD */}
                                    <div className={styles.priceRow}>
                                        <span className={styles.priceLabel}>Child (₹{ride.childPrice}) between 5 to 10 years</span>

                                        <div className={styles.quantityBox}>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => decreaseChild(ride.id)}
                                                disabled={(childQty[ride.id] || 0) === 0}

                                            >
                                                −
                                            </button>

                                            <span className={styles.qtyNumber}>
                                                {childQty[ride.id] || 0}
                                            </span>

                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => increaseChild(ride.id)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* TOTAL */}
                                    <div className={styles.dynamicPrice} style={{ textAlign: "right" }}>
                                        Rs. - {
                                            (
                                                (ride.adultPrice * (adultQty[ride.id] || 1)) +
                                                (ride.childPrice * (childQty[ride.id] || 0))
                                            ).toFixed(2)
                                        }
                                    </div>

                                </div>

                            )}

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

export default ParkPass;