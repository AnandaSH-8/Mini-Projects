import { useEffect, useState } from "react";
import { X, CalendarDays, Clock } from "lucide-react";
import { getBookingDateRange } from "../utils/dateUtils";
import "../styles/booking-modal.css";

const TIME_SLOTS = [
  {
    period: "Morning",
    slots: ["9:00 AM", "10:00 AM", "11:00 AM"],
  },
  {
    period: "Afternoon",
    slots: ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"],
  },
  {
    period: "Evening",
    slots: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"],
  },
];

function BookingModal({ restaurant, onClose, onConfirm }) {
  const { minDate, maxDate } = getBookingDateRange();

  const [date, setDate] = useState(minDate);
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!restaurant) return null;

  function handleDateChange(event) {
    setDate(event.target.value);
    setTime("");
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { minDate: today, maxDate: lastDate } = getBookingDateRange();

    if (!date || date < today || date > lastDate) {
      setError("Please select a date within the next 7 days.");
      return;
    }

    if (!time) {
      setError("Please select an available time slot.");
      return;
    }

    onConfirm({
      restaurantName: restaurant.restaurantName,
      address: restaurant.address,
      city: restaurant.city,
      state: restaurant.state,
      rating: restaurant.rating,
      date,
      time,
    });
  }

  return (
    <div
      className="booking-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <button
          type="button"
          className="booking-close"
          aria-label="Close booking dialog"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <p className="booking-eyebrow">FREE TABLE RESERVATION</p>

        <h2 id="booking-modal-title">Book Your Table</h2>

        <div className="booking-restaurant-info">
          <h3>{restaurant.restaurantName}</h3>
          <p>{restaurant.address}</p>
          <p>
            {restaurant.city}, {restaurant.state}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="booking-label" htmlFor="booking-date">
            <CalendarDays size={16} />
            Reservation date
          </label>

          <input
            id="booking-date"
            type="date"
            value={date}
            min={minDate}
            max={maxDate}
            onChange={handleDateChange}
            required
          />

          <p className="booking-today-label">Today</p>

          <label className="booking-label">
            <Clock size={16} />
            Select a time
          </label>

          {TIME_SLOTS.map(({ period, slots }) => (
            <div className="time-period" key={period}>
              <p>{period}</p>

              <div className="time-slot-grid">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`time-slot ${time === slot ? "selected" : ""}`}
                    aria-pressed={time === slot}
                    onClick={() => {
                      setTime(slot);
                      setError("");
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {error && (
            <p className="booking-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="booking-confirm-button">
            Confirm FREE Reservation
          </button>
        </form>
      </section>
    </div>
  );
}

export default BookingModal;
