"use client";

import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaTimes, FaCartPlus } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/store/uiSlice";
import { HiOutlineShoppingCart } from "react-icons/hi2";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const isBookingPage = pathname === "/booking";

  const isCheckoutPage = pathname === "/checkout";

  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <>
    <header className={styles.header}>

      {/* Top Bar */}
      <div className={styles.topbar}>
        <div className={styles.topbarContent}>
          <span>⚙ Summer Offer 20% off</span>
          <span>⚙ Summer Offer 20% off</span>
          <span>⚙ Summer Offer 20% off</span>
          <span>⚙ Summer Offer 20% off</span>
          <span>⚙ Summer Offer 20% off</span>
          <span>⚙ Summer Offer 20% off</span>
          <span>⚙ Summer Offer 20% off</span>


        </div>
      </div>

      {/* Desktop Navbar */}
      <div className={styles.desktopNavbar}>
        <div className="container">
          <div className={styles.navbarContent}>
            {/* Logo */}
            <div className={styles.logo}>
              <Link href="/">
                <img src="/Aquamarina.png" alt="Aquamarina" />
              </Link>
            </div>

            {/* Desktop Links */}
            <nav className={styles.navLinks}>
              {/* <Link href="/booking?tab=passes">Explore Park</Link>
              <Link href="/booking?tab=passes">Ticket & Pass</Link>
              <Link href="/booking?tab=hotels">Hotel & Packages</Link>
              <Link href="/#food">Food Court</Link> */}
               {/* <Link href="/">About Us</Link> */}
            </nav>

            {/* Book Now or Cart */}
            {isBookingPage || isCheckoutPage ? (
              <button
                className={styles.cartIcon}
                onClick={() => dispatch(toggleCart())}
              >
                <HiOutlineShoppingCart size={35} />

                {totalItems > 0 && (
                  <span className={styles.cartBadge}>
                    {totalItems}
                  </span>
                )}
              </button>
            ) : (
              <Link href="/booking">
                <button className={styles.bookBtn}>Book Now</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className={styles.mobileNavbar}>
        <div className="container">
          <div className={styles.navbarContent}>
            {/* Hamburger */}
            <div
              className={styles.menuIcon}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Logo */}
            <div className={styles.logo}>
              <Link href="/">
                <img src="/Aquamarina.png" alt="Aquamarina" />
              </Link>
            </div>

            {/* Mobile Book Now or Cart */}
            {isBookingPage || isCheckoutPage ? (
              <button
                className={styles.cartIcon}
                onClick={() => dispatch(toggleCart())}
              >
                <HiOutlineShoppingCart size={28} />

                {totalItems > 0 && (
                  <span className={styles.cartBadge}>
                    {totalItems}
                  </span>
                )}
              </button>
            ) : (
              <Link href="/booking">
                {/* <button className={styles.mobileBookBtn}>Book Now</button> */}
              </Link>
            )}
          </div>
        </div>

         {/* Blur Overlay */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            {/* <ul className={styles.mobileNavSection}>
              <li className={styles.sectionHeading}>Explore</li>
              <li>
                <Link href="/booking?tab=passes" onClick={() => setMenuOpen(false)}>Explore Park</Link>
              </li>
              <li>
                <Link href="/booking?tab=passes" onClick={() => setMenuOpen(false)}>Ticket & Pass</Link>
              </li>
            </ul>

            <ul className={styles.mobileNavSection}>
              <li className={styles.sectionHeading}>Stay</li>
              <li>
                <Link href="/booking?tab=hotels" onClick={() => setMenuOpen(false)}>Hotel & Packages</Link>
              </li>
            </ul>

            <ul className={styles.mobileNavSection}>
              <li className={styles.sectionHeading}>Food</li>
              <li>
                <Link href="/#food" onClick={() => setMenuOpen(false)}>Food Court</Link>
              </li>
            </ul> */}
          </div>
        )}
      </div>
    </header>

    {menuOpen && (
  <div
    className={styles.menuOverlay}
    onClick={() => setMenuOpen(false)}
  />
)}
    
    </>
  );
};

export default Navbar;