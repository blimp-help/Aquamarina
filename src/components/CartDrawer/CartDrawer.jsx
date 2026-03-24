"use client";

import { useSelector, useDispatch } from "react-redux";
import { closeCart, toggleCart } from "@/store/uiSlice";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/store/cartSlice";
import styles from "./CartDrawer.module.css";
import { IoClose } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"; // import icons
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const CartDrawer = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.isCartOpen);
    const cartItems = useSelector((state) => state.cart.items);

    const router = useRouter();

    // Block scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // block scroll
        } else {
            document.body.style.overflow = "";       // restore scroll
        }

        // Cleanup in case component unmounts
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const totalPrice = cartItems.reduce((sum, item) => {
        const spot = item.spotPrice || 0;
        const quantity = item.quantity || 1;

        // ✅ If hotel → include days
        const itemTotal =
            item.type === "hotel"
                ? item.price * quantity * (item.days || 1)
                : item.price * quantity;

        return sum + spot + itemTotal;
    }, 0);

    return (
        <>
            {/* Drawer */}
            <div
                className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
            >
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>Your Cart</h2>
                    <button
                        className={styles.closeBtn}
                        onClick={() => dispatch(closeCart())}
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Content */}
                {cartItems.length === 0 ? (
                    <p className={styles.empty}>Cart is empty</p>
                ) : (
                    <div className={styles.list}>
                        {cartItems.map((item, index) => (
                            <div key={index} className={styles.item}>

                                {/* Left Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className={styles.image}
                                />

                                {/* Content */}
                                <div className={styles.details}>
                                    <h4 className={styles.title}>{item.title}</h4>
                                    <p className={styles.subtitle}>
                                        {item.type === "hotel" ? item.shortDescription : item.description}
                                    </p>

                                    {/* Controls Container */}
                                    {/* <div className={styles.controls}>
                                        <div className={styles.qtyBox}>
                                            <button
                                                onClick={() => dispatch(decreaseQuantity(index))}
                                                disabled={item.quantity <= 10} 
                                            >
                                                <AiOutlineMinus size={18} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => dispatch(increaseQuantity(index))}>
                                                <AiOutlinePlus size={18} />
                                            </button>
                                        </div>

                                        <button
                                            className={styles.deleteBtn}
                                            onClick={() => dispatch(removeFromCart(index))}
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </div> */}

                                    <div className={styles.controls}>
                                        {item.type === "hotel" ? (
                                            // Show adults & children counts for hotels
                                            <div className={styles.adultsChildren}>
                                                <span>Adults: {item.adults ?? 1}</span>
                                                <span>Children: {item.children ?? 0}</span>
                                            </div>
                                        ) : (
                                            // Quantity controls for other items
                                            <div className={styles.qtyBox}>
                                                <button
                                                    onClick={() => dispatch(decreaseQuantity(index))}
                                                    disabled={item.quantity <= 10} // min 10
                                                >
                                                    <AiOutlineMinus size={18} />
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button onClick={() => dispatch(increaseQuantity(index))}>
                                                    <AiOutlinePlus size={18} />
                                                </button>
                                            </div>
                                        )}

                                        {/* Delete button for all */}
                                        <button
                                            className={styles.deleteBtn}
                                            onClick={() => dispatch(removeFromCart(index))}
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className={styles.footer}>
                        <h3>Total: ₹{totalPrice}</h3>
                        <button
                            className={styles.checkout}
                            onClick={() => {
                                dispatch(toggleCart());
                                router.push("/checkout");
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => dispatch(closeCart())}
                />
            )}
        </>
    );
};

export default CartDrawer;