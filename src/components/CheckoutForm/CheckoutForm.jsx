"use client"
import React, { useState } from 'react'
import styles from "./CheckoutForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { loadRazorpay } from '@/utils/razorpay';
import { useRouter } from 'next/navigation';
import { clearCart } from '@/store/cartSlice';
import "react-phone-input-2/lib/style.css";
import PhoneInput from 'react-phone-input-2';

const CheckoutForm = () => {
    const [errors, setErrors] = useState({});
    const cartItems = useSelector((state) => state.cart.items);

    console.log(cartItems)

    const dispatch = useDispatch();
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const subtotal = cartItems.reduce((sum, item) => {
        const spot = item.spotPrice || 0;
        const quantity = item.quantity || 1;

        // ✅ If hotel → include days
        const itemTotal =
            item.type === "hotel"
                ? item.price * quantity * (item.days || 1)
                : item.price * quantity;

        return sum + spot + itemTotal;
    }, 0);

    // extract included tax (18%)
    const tax = Math.round((subtotal * 18) / 118);

    // total is same as subtotal (tax already included)
    const total = subtotal;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({ ...form, [name]: value });

        if (name === "email") {
            if (!isValidEmail(value)) {
                setErrors((prev) => ({ ...prev, email: "Invalid email" }));
            } else {
                setErrors((prev) => ({ ...prev, email: "" }));
            }
        }
    };

    const handlePayment = async () => {
        if (!isValidEmail(form.email)) {
            alert("Please enter a valid email address ❌");
            return;
        }

        if (!form.name || !form.phone) {
            alert("Please fill all required fields ❌");
            return;
        }

        const res = await loadRazorpay();

        if (!res) {
            alert("Razorpay SDK failed to load");
            return;
        }

        // 🔥 Step 1: Create order from backend
        const orderRes = await fetch("https://aquamarina-backend.onrender.com/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: total,
            }),
        });

        const data = await orderRes.json();

        if (!data.success) {
            alert("Order creation failed");
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: data.order.amount,
            currency: "INR",
            name: "Aquamarina",
            description: "Booking Payment",
            order_id: data.order.id,

            handler: async function (response) {

                const verifyRes = await fetch("https://aquamarina-backend.onrender.com/verify-payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...response,

                        // 🔥 ADD THESE (VERY IMPORTANT)
                        form,
                        cartItems,
                        amount: total,

                    }),
                });

                const verifyData = await verifyRes.json();

                if (verifyData.success) {
                    alert("Payment successful & verified ✅");


                    dispatch(clearCart());

                    router.push("/");
                } else {
                    alert("Payment verification failed ❌");
                }
            },

            prefill: {
                name: form.name,
                email: form.email,
                contact: form.phone.replace(/^\+?91/, ""),
            },

            theme: {
                color: "#000",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Checkout</h2>

            <div className={styles.wrapper}>
                {/* LEFT: Contact Info */}
                <div className={styles.card}>
                    <h3>Contact Information</h3>

                    <label>Full Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <label>Email Address*</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    {errors.email && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.email}
                        </span>
                    )}

                    <label>Phone Number*</label>
                    <PhoneInput
                        country={"in"}
                        value={form.phone}
                        onChange={(phone) => setForm({ ...form, phone })}
                        enableSearch={true}
                        disableDropdown={false} // allow changing country (optional)
                        countryCodeEditable={false}
                        inputStyle={{
                            width: "100%",
                        }}
                    />
                </div>

                {/* RIGHT: Order Summary */}
                <div className={styles.card}>
                    <h3>Order Summary</h3>

                    <div className={styles.itemsList}>
                        {cartItems.map((item, index) => (
                            <div key={index} className={styles.item}>
                                <img
                                    src={item.image || "/placeholder.png"}
                                    alt={item.title}
                                    className={styles.itemImage}
                                />

                                <div className={styles.itemDetails}>
                                    <p className={styles.title}>{item.title}</p>

                                    <span className={styles.date}>
                                        {item.type === "hotel"
                                            ? moment(item.checkIn).format("dddd, MMMM D, YYYY")
                                            : moment(item.date).format("dddd, MMMM D, YYYY")}
                                    </span>

                                    <span className={styles.qty}>
                                        {item.type === "hotel"
                                            ? `Quantity: ${item.quantity || 1}`
                                            : `Persons: ${item.quantity || 1}`}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coupon */}
                    <div className={styles.coupon}>
                        <input placeholder="Apply Coupon" />
                        <button>Apply</button>
                    </div>

                    {/* Pricing */}
                    <div className={styles.pricing}>
                        <div>
                            <span>Subtotal</span>
                            <span>₹{subtotal - tax}</span>
                        </div>
                        <div>
                            <span>Taxes & Fees (18%)</span>
                            <span>₹{tax}</span>
                        </div>
                        <div className={styles.total}>
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    <button className={styles.payBtn} onClick={handlePayment}>
                        Pay Online
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutForm