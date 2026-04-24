import React from 'react'
import styles from "./Checkout.module.css"
import CheckoutForm from '../CheckoutForm/CheckoutForm'

const Checkout = () => {
  return (
    <>
           {/* Hero */}
            <section className={styles.hero}>
                <img src="https://res.cloudinary.com/dkzkxte95/image/upload/v1777015058/waterpark_v7zqhk.webp" className={styles.heroImg} />

                <div className={styles.overlay}></div>

                <div className={styles.heroContent}>
                    <h2>Ready for a Splash?</h2>
                    <p>
                        Book your day of adventure. From thrilling slides to lazy rivers,
                        we have the perfect experience for every water lover.
                    </p>
                </div>
            </section>
            <CheckoutForm />
    </>
  )
}

export default Checkout