import React from "react";
import Image from "next/image";
import styles from "./Foods.module.css";

const Foods = () => {
  const features = [
    {
      image: "/foods1.jpg",
      title: "Comfortable Dining for Everyone",
      description:
        "Enjoy delicious meals in a cool and comfortable air-conditioned space designed for families and groups. Relax, recharge, and savor a variety of tasty dishes after an exciting day at the water park. ",
    },
    {
      image: "/foods2.jpg",
      title: "Quick Bites, Big Flavor",
      description:
        "Grab your favorite quick bites and tasty snacks whenever hunger strikes. From crispy treats to refreshing drinks, it’s the perfect spot to enjoy fast, delicious food between all the fun and excitement.",
    },
    {
      image: "/foods4.JPG",
      title: "Sweet Treats for Every Craving",
      description:
        "Treat yourself to a variety of sweet delights, creamy ice creams, and irresistible desserts loved by kids and adults alike. It’s the perfect way to cool down and add a little extra sweetness to your day.",
    },
  ];

  return (
    <section id="food" className={styles.fuelSection}>
      <div className={styles.container}>
        {/* Heading */}
        <div className={styles.heading}>
          <h2>restaurant, snack bar & in room Dining</h2>
          <p>
           Refuel and refresh with a wide range of delicious food and beverages. From quick snacks to full meals, Aqua Marina offers something to satisfy every craving.
          </p>
        </div>

        {/* Feature Cards */}
        <div className={styles.cardGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={400}
                  height={300}
                  className={styles.cardImage}
                />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Foods;