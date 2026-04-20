"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ParkPass.module.css";
import { FiChevronDown } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import moment from "moment";
import Spinner from "../Spinners/Spinner";
import { toggleCart } from "@/store/uiSlice";

const rides = [
    {
        id: 1,
        type: "park",
        subtype: "single",
        title: "Single Day Pass",
        adultPrice: 500,
        childPrice: 400,
        image: "/passimage.jpg",
        description: "Individual entry for adults & children."
    },
    {
        id: 2,
        title: "Single Day Outing",
        type: "park",
        subtype: "group",
        adultPrice: 450,
        childPrice: 200,
        image: "/singleOuting.JPG",
        description: "Max 30 people allowed."
    },
    // {
    //     id: 4,
    //     title: "Group Offer (Weekend)",
    //     type: "park",
    //     subtype: "group",
    //     adultPrice: 450,
    //     childPrice: 200,
    //     image: "/passimage.jpg",
    //     description: "Min 10 people. Access to all rides."
    // },
    // {
    //     id: 5,
    //     title: "Family Pack",
    //     type: "park",
    //     subtype: "family",
    //     adultPrice: 500,
    //     childPrice: 300,
    //     image: "/passimage.jpg",
    //     description: "Min 4 people. Access to all rides."
    // },
    // {
    //     id: 6,
    //     title: "Family Pack",
    //     type: "park",
    //     subtype: "family",
    //     adultPrice: 500,
    //     childPrice: 300,
    //     image: "/passimage.jpg",
    //     description: "Min 4 people. Access to all rides."
    // }

];
const MAX_GROUP = 30;

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
        const date = dates[ride.id];

        const adults = adultQty[ride.id] || (
            ride.subtype === "group" ? 1 :
                ride.subtype === "family" ? 4 : 1
        );

        const children = childQty[ride.id] || 0;

        const totalPeople = adults + children;

        const min =
            ride.subtype === "group" ? 1 :
                ride.subtype === "family" ? 4 : 1;

        // ❌ Prevent invalid add
        if (totalPeople < min) return;

        dispatch(
            addToCart({
                id: ride.id,
                type: "park",
                subtype: ride.subtype,
                title: ride.title,
                price: ride.adultPrice,
                childPrice: ride.childPrice,
                image: ride.image,
                description: ride.description,
                adults,
                children,
                quantity: totalPeople, // derived
                date: today,
            })
        );

        // ✅ RESET VALUES
        setAdultQty((prev) => ({
            ...prev,
            [ride.id]:
                ride.subtype === "group"
                    ? 1
                    : ride.subtype === "family"
                        ? 4
                        : 1,
        }));

        setChildQty((prev) => ({
            ...prev,
            [ride.id]: 0,
        }));

        // ✅ OPEN CART
        dispatch(toggleCart());
    };


    const increaseAdult = (id, subtype) => {
        const adults = adultQty[id] || 1;
        const children = childQty[id] || 0;

        if (subtype === "group" && adults + children >= MAX_GROUP) return;

        setAdultQty({
            ...adultQty,
            [id]: adults + 1
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

    const increaseChild = (id, subtype) => {
        const adults = adultQty[id] || 1;
        const children = childQty[id] || 0;

        if (subtype === "group" && adults + children >= MAX_GROUP) return;

        setChildQty({
            ...childQty,
            [id]: children + 1
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

            <h2>Park Pass</h2>
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
                                    {ride.subtype === "group" ? (
                                        <>₹{ride.adultPrice}/-</>
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

                            {ride.subtype === "single" ? (

                                // 🔵 SINGLE
                                (() => {
                                    const adults = adultQty[ride.id] || 1;
                                    const children = childQty[ride.id] || 0;

                                    return (
                                        <div className={styles.priceColumn}>

                                            {/* ADULT */}
                                            <div className={styles.priceRow}>
                                                <span className={styles.priceLabel}>
                                                    Adult (₹{ride.adultPrice})
                                                </span>

                                                <div className={styles.quantityBox}>
                                                    <button
                                                        className={styles.qtyBtn}
                                                        onClick={() => decreaseAdult(ride.id)}
                                                        disabled={adults === 1}
                                                    >−</button>

                                                    <span className={styles.qtyNumber}>{adults}</span>

                                                    <button
                                                        className={styles.qtyBtn}
                                                        onClick={() => increaseAdult(ride.id)}
                                                    >+</button>
                                                </div>
                                            </div>

                                            {/* CHILD */}
                                            <div className={styles.priceRow}>
                                                <span className={styles.priceLabel}>
                                                    Child (₹{ride.childPrice})
                                                </span>

                                                <div className={styles.quantityBox}>
                                                    <button
                                                        className={styles.qtyBtn}
                                                        onClick={() => decreaseChild(ride.id)}
                                                        disabled={children === 0}
                                                    >−</button>

                                                    <span className={styles.qtyNumber}>{children}</span>

                                                    <button
                                                        className={styles.qtyBtn}
                                                        onClick={() => increaseChild(ride.id)}
                                                    >+</button>
                                                </div>
                                            </div>

                                            {/* TOTAL */}
                                            {/* <div className={styles.totalRow}>
                                                Rs. - {(
                                                    (ride.adultPrice * adults) +
                                                    (ride.childPrice * children)
                                                ).toFixed(2)}
                                            </div> */}

                                            <button
                                                className={styles.addBtn}
                                                onClick={() => handleAddToCart(ride)}
                                            >
                                                Add To Cart
                                            </button>

                                        </div>
                                    );
                                })()

                            ) : (

                                // 🟢 GROUP + FAMILY
                                (() => {
                                    const min = ride.subtype === "group" ? 1 : 4;

                                    const adults = adultQty[ride.id] || min;
                                    const children = childQty[ride.id] || 0;
                                    const totalPeople = adults + children;

                                    return (
                                        <div className={styles.priceColumn}>

                                            {/* ADULT */}
                                            <div className={styles.priceRow}>
                                                <span className={styles.priceLabel}>
                                                    Adult (₹{ride.adultPrice})
                                                </span>

                                                <div className={styles.quantityBox}>
                                                    <button
                                                        className={styles.qtyBtn}
                                                        onClick={() =>
                                                            setAdultQty({
                                                                ...adultQty,
                                                                [ride.id]: Math.max(min, adults - 1)
                                                            })
                                                        }
                                                        disabled={adults === min}
                                                    >−</button>

                                                    <span className={styles.qtyNumber}>{adults}</span>

                                                    <button
                                                        className={styles.qtyBtn}
                                                        onClick={() => increaseAdult(ride.id, ride.subtype)}
                                                        disabled={
                                                            ride.subtype === "group" && totalPeople >= MAX_GROUP
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            {/* CHILD */}
                                            <div className={styles.priceRow}>
                                                <span className={styles.priceLabel}>
                                                    Child (₹{ride.childPrice})
                                                </span>

                                                <div className={styles.quantityBox}>
                                                    <button
                                                        className={styles.qtyBtn}
                                                        onClick={() => decreaseChild(ride.id)}
                                                        disabled={children === 0}
                                                    >−</button>

                                                    <span className={styles.qtyNumber}>{children}</span>
                                                    <button
                                                        className={styles.qtyBtn}
                                                        onClick={() => increaseChild(ride.id, ride.subtype)}
                                                        disabled={
                                                            ride.subtype === "group" && totalPeople >= MAX_GROUP
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            {/* VALIDATION */}
                                            {totalPeople < min && (
                                                <p className={styles.errorText}>
                                                    Minimum {min} people required
                                                </p>
                                            )}

                                            {/* TOTAL */}
                                            {/* <div className={styles.totalRow}>
                                                Rs. - {(
                                                    (ride.adultPrice * adults) +
                                                    (ride.childPrice * children)
                                                ).toFixed(2)}
                                            </div> */}

                                            <button
                                                className={styles.addBtn}
                                                onClick={() => handleAddToCart(ride)}
                                                disabled={totalPeople < min}
                                            >
                                                Add To Cart
                                            </button>

                                        </div>
                                    );
                                })()

                            )}


                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default ParkPass;