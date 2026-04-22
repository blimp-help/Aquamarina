import React from 'react';
import styles from './Footer.module.css';
import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={styles.footerContainer}>
            {/* Top Logo Section */}
            <div className={styles.footerLogo}>
                <img src="/Aquamarina.png" alt="Aqua Marina Logo" />
            </div>

            {/* Navigation Links */}
            {/* <nav className={styles.navLinks}>
                <Link href="/booking?tab=passes">Explore Park</Link>
                <Link href="/booking?tab=passes">Tickets & Passes</Link>
                <Link href="/booking?tab=hotels">Hotel & Packages</Link>
                <Link href="/#food">Food Court</Link>
            </nav> */}

            {/* Info Columns */}
            <div className={styles.footerInfoGrid}>
                <div className={styles.infoItem}>
                    <a
                        href="https://www.google.com/maps?q=22.906557896917896,88.36924780184587"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                    >
                        <div className={styles.icon}>
                            <FaMapMarkerAlt />
                        </div>
                    </a>
                    <h4>Address</h4>
                    <a
                        href="https://www.google.com/maps?q=22.906557896917896,88.36924780184587"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.addressLink}
                    >
                        Aqua Marina Water Park
                    </a>
                </div>

                <div className={styles.infoItem}>
                    <a href="tel:09831203440" className={styles.iconLink}>
                        <div className={styles.icon}>
                            <FaPhoneAlt />
                        </div>
                    </a>
                    <h4>Phone</h4>
                    <a href="tel:09831203440" className={styles.phoneLink}>
                        098312 03440
                    </a>
                </div>

                <div className={styles.infoItem}>
                    <a href="mailto:info@aquamarina.com" className={styles.iconLink}>
                        <div className={styles.icon}>
                            <FaEnvelope />
                        </div>
                    </a>
                    <h4>Email</h4>
                    <a href="mailto:info@aquamarina.com" className={styles.emailLink}>
                        info@aquamarina.com
                    </a>
                </div>
            </div>

            {/* Social Links & Copyright */}
            <div className={styles.footerBottom}>
                <div className={styles.socialIcons}>
                    <a href="#"><FaFacebookF /></a>
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaTwitter /></a>
                </div>
                <p className={styles.copyright}>
                    Copyright © Aquamarina. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;