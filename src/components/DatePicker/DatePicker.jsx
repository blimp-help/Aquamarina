"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import moment from "moment";
import styles from "./DatePicker.module.css";

const DatePicker = ({ isOpen, onClose, value, onChange, minDate }) => {
  const [mounted, setMounted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(moment());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset currentMonth to the selected value when opened
  useEffect(() => {
    if (isOpen && value) {
      setCurrentMonth(moment(value));
    } else if (isOpen) {
      setCurrentMonth(moment(minDate || undefined));
    }
  }, [isOpen, value, minDate]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handlePrevMonth = () => {
    setCurrentMonth(moment(currentMonth).subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(moment(currentMonth).add(1, "month"));
  };

  const startOfMonth = moment(currentMonth).startOf("month");
  const endOfMonth = moment(currentMonth).endOf("month");
  const startDayOfWeek = startOfMonth.day(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = currentMonth.daysInMonth();

  const daysGrid = [];

  // Add empty slots for days of the previous month
  for (let i = 0; i < startDayOfWeek; i++) {
    daysGrid.push(null);
  }

  // Add days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    daysGrid.push(moment(currentMonth).date(day));
  }

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handleDaySelect = (day) => {
    if (!day) return;
    const formatted = day.format("YYYY-MM-DD");
    if (minDate && formatted < minDate) return;
    onChange(formatted);
    onClose();
  };

  const isPrevDisabled =
    minDate &&
    currentMonth.format("YYYY-MM") <= moment(minDate).format("YYYY-MM");

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <button
            onClick={handlePrevMonth}
            className={styles.navBtn}
            disabled={isPrevDisabled}
          >
            &lt;
          </button>
          <span className={styles.monthTitle}>
            {currentMonth.format("MMMM YYYY")}
          </span>
          <button onClick={handleNextMonth} className={styles.navBtn}>
            &gt;
          </button>
        </div>

        <div className={styles.weekdaysGrid}>
          {weekdays.map((wd) => (
            <span key={wd} className={styles.weekday}>
              {wd}
            </span>
          ))}
        </div>

        <div className={styles.daysGrid}>
          {daysGrid.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className={styles.emptyDay} />;
            }

            const formatted = day.format("YYYY-MM-DD");
            const isSelected = value === formatted;
            const isDisabled = minDate && formatted < minDate;
            const isToday = moment().format("YYYY-MM-DD") === formatted;

            return (
              <button
                key={formatted}
                onClick={() => handleDaySelect(day)}
                disabled={isDisabled}
                className={`${styles.dayBtn} ${
                  isSelected ? styles.selected : ""
                } ${isToday ? styles.today : ""} ${
                  isDisabled ? styles.disabled : ""
                }`}
              >
                {day.date()}
              </button>
            );
          })}
        </div>

        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default DatePicker;
