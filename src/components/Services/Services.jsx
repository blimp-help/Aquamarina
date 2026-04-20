"use client";

import React from "react";
import styles from "./Services.module.css";
import Link from "next/link";

import {
  HiTicket,
  HiUsers,
  HiBuildingOffice,
  HiMap,
  HiTag,
  HiShoppingBag,
} from "react-icons/hi2";

const services = [
  { icon: HiTicket, title: "Park Passes", tab: "passes" },
  // { icon: HiUsers, title: "Group Tickets", tab: "passes" },
  { icon: HiBuildingOffice, title: "Hotel", tab: "hotels" },
  { icon: HiMap, title: "Event Spot", tab: "picnic" },
  // { icon: HiTag, title: "Deals & Specials", tab: "passes" },
  { icon: HiShoppingBag, title: "Foods", link: "#food" },
];

const Services = () => {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesBox}>

        {services.map(({ icon: Icon, title, tab, link }, index) => (
          <Link
            key={index}
            href={link ? link : `/booking?tab=${tab}`}
            className={styles.serviceItem}
          >
            <Icon className={styles.icon} />
            <span>{title}</span>
          </Link>
        ))}

      </div>
    </section>
  );
};

export default Services;