"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Hotels.module.css";
import { FiChevronDown } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import moment from "moment";
import Spinner from "../Spinners/Spinner";
import { toggleCart } from "@/store/uiSlice";

const Hotels = () => {
  const [rooms, setRooms] = useState([]);

  const [dates, setDates] = useState({});
  const [guests, setGuests] = useState({});
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true); // start loader

        const res = await fetch(
          "https://aquamarina-backend.onrender.com/rooms/get-rooms"
        );

        const data = await res.json();

        console.log("Data", data.response);

        if (data.success) {
          setRooms(data.response || []);
        } else {
          setRooms([]);
        }

      } catch (err) {
        console.error("Error fetching rooms", err);
        setRooms([]);
      } finally {
        setLoading(false); // stop loader
      }
    };

    fetchRooms();
  }, []);


  useEffect(() => {
    const defaults = {};

    rooms.forEach((room) => {
      const checkIn = moment().format("YYYY-MM-DD");
      const checkOut = moment().add(1, "day").format("YYYY-MM-DD");

      defaults[`in-${room._id}`] = checkIn;
      defaults[`out-${room._id}`] = checkOut;
    });

    setDates(defaults);
  }, [rooms]);

  const getDefaultDates = () => {
    const defaults = {};

    rooms.forEach((ride) => {
      const checkIn = moment().format("YYYY-MM-DD");
      const checkOut = moment().add(1, "day").format("YYYY-MM-DD");

      defaults[`in-${ride._id}`] = checkIn;
      defaults[`out-${ride._id}`] = checkOut;
    });

    return defaults;
  };



  const dispatch = useDispatch();

  const dateRefs = useRef({});

  const today = new Date().toISOString().split("T")[0];

  const calculateDays = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 1;

    const start = moment(checkIn);
    const end = moment(checkOut);

    const days = end.diff(start, "days");

    console.log(days)
    // Minimum 1 day booking
    return days <= 0 ? 1 : days;
  };
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

  const formatNextDate = (date) => {
    return moment(date || moment().add(1, "day"))
      .format("DD-MMM-YYYY")
      .toUpperCase();
  };

  /* ======================
     ADULT HANDLERS
  ====================== */

  const increaseAdult = (id) => {
    const current = guests[id]?.adults ?? 1;
    const roomQty = quantities[id] || 1;

    const maxAdults = 2 * roomQty;

    if (current >= maxAdults) return;

    setGuests({
      ...guests,
      [id]: {
        ...guests[id],
        adults: current + 1,
        children: guests[id]?.children ?? 0
      }
    });
  };

  const decreaseAdult = (id) => {
    const current = guests[id]?.adults ?? 1;

    if (current <= 1) return;

    setGuests({
      ...guests,
      [id]: {
        ...guests[id],
        adults: current - 1,
        children: guests[id]?.children ?? 0
      }
    });
  };

  /* ======================
     CHILD HANDLERS
  ====================== */

  const increaseChild = (id) => {
    const current = guests[id]?.children ?? 0;
    const roomQty = quantities[id] || 1;

    const maxChildren = 1 * roomQty;

    if (current >= maxChildren) return;

    setGuests({
      ...guests,
      [id]: {
        adults: guests[id]?.adults ?? 1,
        children: current + 1
      }
    });
  };

  const decreaseChild = (id) => {
    const current = guests[id]?.children ?? 0;

    // minimum = 0 children
    if (current <= 0) return;

    setGuests({
      ...guests,
      [id]: {
        adults: guests[id]?.adults ?? 1,
        children: current - 1
      }
    });
  };

  const increaseQty = (id) => {
    const current = quantities[id] || 1;

    if (current >= 10) return; // max rooms

    setQuantities({
      ...quantities,
      [id]: current + 1
    });
  };

  const decreaseQty = (id) => {
    const current = quantities[id] || 1;
    if (current <= 1) return;

    const newQty = current - 1;

    const maxAdults = 2 * newQty;
    const maxChildren = 1 * newQty;

    setQuantities({
      ...quantities,
      [id]: newQty
    });

    // Adjust guests automatically
    setGuests({
      ...guests,
      [id]: {
        adults: Math.min(guests[id]?.adults ?? 1, maxAdults),
        children: Math.min(guests[id]?.children ?? 0, maxChildren)
      }
    });
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <Spinner type="ring" size={50} />
      </div>
    );
  }

  const handleAddToCart = async (hotel) => {
    const quantity = quantities[hotel._id] || 1;

    const checkIn = dates[`in-${hotel._id}`];
    const checkOut = dates[`out-${hotel._id}`];

    const adults = guests[hotel._id]?.adults ?? 1;
    const children = guests[hotel._id]?.children ?? 0;

    // ✅ Validate dates first
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate < checkInDate) {
      alert("Check-out date must be after check-in date");
      return;
    }


    const days = calculateDays(checkIn, checkOut);

    try {
      // ✅ check availability first
      const res = await fetch(
        "https://aquamarina-backend.onrender.com/rooms/check-room-availability",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            roomId: hotel._id,
            checkIn,
            checkOut,
            qty: quantity
          })
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message); // show error
        return;
      }


      dispatch(
        addToCart({
          id: hotel._id,
          type: "hotel",
          title: hotel.title,
          price: hotel.price,
          image: hotel.featureImage.url,
          shortDescription: hotel.shortDescription,
          description: hotel.description,
          quantity,
          checkIn,
          checkOut,
          adults,
          children,
          days,
          total: hotel.price * quantity * days,
        })
      );


    // ✅ OPEN CART
    dispatch(toggleCart());

    // ✅ RESET VALUES
    setQuantities((prev) => ({
      ...prev,
      [hotel._id]: 1
    }));

    setGuests((prev) => ({
      ...prev,
      [hotel._id]: {
        adults: 1,
        children: 0
      }
    }));

    setDates((prev) => ({
      ...prev,
      [`in-${hotel._id}`]: moment().format("YYYY-MM-DD"),
      [`out-${hotel._id}`]: moment().add(1, "day").format("YYYY-MM-DD")
    }));
    }
    catch (err) {
      console.error("Availability check failed", err);
      alert("Unable to check room availability");
    }
  };

  return (
    <section className={styles.section}>

      <h2>Hotels</h2>
      <p>Comfortable stays with beautiful views and relaxing surroundings.</p>

      <div className={styles.grid}>

        {rooms.map((ride) => {

          const adults = guests[ride._id]?.adults ?? 1;
          const children = guests[ride._id]?.children ?? 0;

          return (
            <div key={ride._id} className={styles.card}>

              {/* IMAGE */}
              <div className={styles.imageWrapper}>
                <img src={ride.featureImage.url} alt={ride.title} />

                <div className={styles.priceTag}>
                  <div className={styles.price}>₹{ride.price}/-</div>
                  <div className={styles.gst}>Including GST</div>
                </div>
              </div>

              {/* CONTENT */}
              <div className={styles.cardContent}>

                <h4>{ride.title}</h4>
                <p className={styles.description}>{ride.shortDescription}</p>

                {/* CHECK-IN */}
                <div className={styles.field}>
                  <label>Check-In :</label>

                  <div
                    className={styles.dateBox}
                    onClick={() => openCalendar(`in-${ride._id}`)}
                  >
                    <div className={styles.calendarCircle}>
                      <FaCalendarAlt />
                    </div>

                    <span className={styles.dateText}>
                      {formatDate(dates[`in-${ride._id}`])}
                    </span>

                    <FiChevronDown className={styles.arrow} />

                    <input
                      ref={(el) => (dateRefs.current[`in-${ride._id}`] = el)}
                      type="date"
                      className={styles.hiddenDate}
                      min={today}
                      value={dates[`in-${ride._id}`] || ""}
                      onChange={(e) =>
                        handleDateChange(`in-${ride._id}`, e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* CHECK-OUT */}
                <div className={styles.field}>
                  <label>Check-Out :</label>

                  <div
                    className={styles.dateBox}
                    onClick={() => openCalendar(`out-${ride._id}`)}
                  >
                    <div className={styles.calendarCircle}>
                      <FaCalendarAlt />
                    </div>

                    <span className={styles.dateText}>
                      {formatNextDate(dates[`out-${ride._id}`])}
                    </span>

                    <FiChevronDown className={styles.arrow} />

                    <input
                      ref={(el) => (dateRefs.current[`out-${ride._id}`] = el)}
                      type="date"
                      className={styles.hiddenDate}
                      min={today}
                      value={dates[`out-${ride._id}`] || ""}
                      onChange={(e) =>
                        handleDateChange(`out-${ride._id}`, e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div className={styles.priceRow}>
                  <span className={styles.dynamicPrice}>Rooms:</span>

                  <div className={styles.quantityBox}>
                    <button
                      onClick={() => decreaseQty(ride._id)}
                      className={styles.qtyBtn}
                      disabled={(quantities[ride._id] || 1) === 1}
                    >
                      −
                    </button>

                    <span className={styles.qtyNumber}>
                      {quantities[ride._id] || 1}
                    </span>

                    <button
                      onClick={() => increaseQty(ride._id)}
                      className={styles.qtyBtn}
                      disabled={(quantities[ride._id] || 1) === 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ADULT */}
                <div className={styles.priceRow}>
                  <span className={styles.dynamicPrice}>Adult:</span>

                  <div className={styles.quantityBox}>
                    <button
                      onClick={() => decreaseAdult(ride._id)}
                      className={styles.qtyBtn}
                      disabled={adults === 1}
                    >
                      −
                    </button>

                    <span className={styles.qtyNumber}>{adults}</span>

                    <button
                      onClick={() => increaseAdult(ride._id)}
                      className={styles.qtyBtn}
                      disabled={adults === 2 * (quantities[ride._id] || 1)}                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CHILD */}
                <div className={styles.priceRow}>
                  <span className={styles.dynamicPrice}>Child:</span>

                  <div className={styles.quantityBox}>
                    <button
                      onClick={() => decreaseChild(ride._id)}
                      className={styles.qtyBtn}
                      disabled={children === 0}
                    >
                      −
                    </button>

                    <span className={styles.qtyNumber}>{children}</span>

                    <button
                      onClick={() => increaseChild(ride._id)}
                      className={styles.qtyBtn}
                      disabled={children === 1 * (quantities[ride._id] || 1)} 
                    >
                      +
                    </button>
                  </div>
                </div>

                <button className={styles.addBtn}
                  onClick={() => handleAddToCart(ride)}
                >
                  Add To Cart
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hotels;