import { useEffect, useState } from "react";

const STORAGE_KEY = "bookings";

function loadBookings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function createBookingId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function useBookings() {
  const [bookings, setBookings] = useState(loadBookings);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (error) {
      console.error("Unable to save bookings:", error);
    }
  }, [bookings]);

  function addBooking(booking) {
    const newBooking = {
      ...booking,
      id: createBookingId(),
      createdAt: new Date().toISOString(),
      status: "Confirmed",
    };

    const updated = [newBooking, ...loadBookings()];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Unable to save booking:", error);
    }

    setBookings(updated);
    return newBooking;
  }

  function removeBooking(id) {
    const updated = loadBookings().filter((booking) => booking.id !== id);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Unable to remove booking:", error);
    }

    setBookings(updated);
  }

  return { bookings, addBooking, removeBooking };
}
