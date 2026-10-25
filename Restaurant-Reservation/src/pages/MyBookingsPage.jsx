import { useMemo, useState } from "react";
import { CalendarDays, Clock, MapPin, Search, Trash2 } from "lucide-react";

import useBookings from "../hooks/useBookings";
import "../styles/my-bookings.css";

function MyBookingsPage() {
  const { bookings, removeBooking } = useBookings();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return bookings;

    return bookings.filter((booking) => {
      const date = booking.date ?? booking.bookingDate;
      const time = booking.time ?? booking.bookingTime;

      return [
        booking.restaurantName,
        booking.city,
        booking.state,
        booking.address,
        date,
        time,
        booking.status,
        booking.bookingEmail,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [bookings, searchTerm]);

  function formatDate(dateValue) {
    if (!dateValue) return "Date not available";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Date not available";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function handleCancel(booking) {
    const confirmed = window.confirm(
      `Cancel your reservation at ${booking.restaurantName}?`,
    );

    if (confirmed) {
      removeBooking(booking.id);
    }
  }

  return (
    <section className="my-bookings-page">
      <div className="bookings-banner">
        <div className="bookings-banner-inner">
          <p className="bookings-eyebrow">Your dining plans</p>
          <h1>My Bookings</h1>
          <p>View and manage your restaurant reservations.</p>
        </div>
      </div>

      <div className="bookings-container">
        <div className="bookings-heading">
          <div>
            <h2>Your Reservations</h2>
            <p>
              {bookings.length}{" "}
              {bookings.length === 1 ? "reservation" : "reservations"} saved
            </p>
          </div>

          <label className="booking-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search your bookings..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search bookings"
            />
          </label>
        </div>

        {filteredBookings.length > 0 ? (
          <div className="booking-list">
            {filteredBookings.map((booking, index) => {
              const date = booking.date ?? booking.bookingDate;
              const time = booking.time ?? booking.bookingTime;

              return (
                <article
                  className="saved-booking-card"
                  key={booking.id ?? `${booking.restaurantName}-${index}`}
                >
                  <div className="saved-booking-icon">
                    <CalendarDays size={25} />
                  </div>

                  <div className="saved-booking-details">
                    <h3>{booking.restaurantName}</h3>

                    <p className="saved-booking-location">
                      <MapPin size={14} />
                      {[booking.address, booking.city, booking.state]
                        .filter(Boolean)
                        .join(", ")}
                    </p>

                    <div className="saved-booking-meta">
                      <p>
                        <CalendarDays size={14} />
                        {formatDate(date)}
                      </p>
                      <p>
                        <Clock size={14} />
                        {time || "Time not available"}
                      </p>
                    </div>
                  </div>

                  <div className="saved-booking-actions">
                    <span className="booking-status">
                      {booking.status || "Confirmed"}
                    </span>

                    <button
                      type="button"
                      className="cancel-booking-button"
                      onClick={() => handleCancel(booking)}
                      aria-label={`Cancel booking at ${booking.restaurantName}`}
                    >
                      <Trash2 size={15} />
                      Cancel
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bookings-empty-state">
            <CalendarDays size={42} strokeWidth={1.4} />
            <h3>
              {bookings.length === 0
                ? "No bookings yet"
                : "No matching bookings"}
            </h3>
            <p>
              {bookings.length === 0
                ? "Your reservations will appear here after you book a restaurant."
                : "Try another restaurant name, date, city, or status."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default MyBookingsPage;
