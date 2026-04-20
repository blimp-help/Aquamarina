"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import styles from "./BookingTabs.module.css";

import { FaTicketAlt, FaHotel } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

import ParkPass from "../ParkPass/ParkPass";
import PicnicEvent from "../PicnicEvent/PicnicEvent";
import Hotels from "../Hotels/Hotels";

export default function BookingTabs() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState("passes");

  /* Open correct tab from URL */
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  /* Change tab + update URL */
  const changeTab = (tab) => {
    setActiveTab(tab);

    router.push(`/booking?tab=${tab}`, { scroll: false });
  };

  return (
    <div className={styles.tabsWrapper}>

      <div className={styles.tabsContainer}>

        {/* Tabs */}

        <div className={styles.tabs}>

          <button
            className={`${styles.tab} ${
              activeTab === "passes" ? styles.active : ""
            }`}
            onClick={() => changeTab("passes")}
          >
            <FaTicketAlt className={styles.icon} />
            Park Pass
          </button>

          <button
            className={`${styles.tab} ${
              activeTab === "hotels" ? styles.active : ""
            }`}
            onClick={() => changeTab("hotels")}
          >
            <FaHotel className={styles.icon} />
            Hotels
          </button>

          <button
            className={`${styles.tab} ${
              activeTab === "picnic" ? styles.active : ""
            }`}
            onClick={() => changeTab("picnic")}
          >
            <MdEvent className={styles.icon} />
            Event Spot
          </button>

        </div>

        {/* Tab Content */}

        <div className={styles.content}>

          {activeTab === "passes" && <ParkPass />}

          {activeTab === "hotels" && <Hotels />}

          {activeTab === "picnic" && <PicnicEvent />}

        </div>

      </div>

    </div>
  );
}