import { MapPin, Star } from "lucide-react";

function RestaurantCard({ restaurant, onBook }) {
  const { restaurantName, rating, address, city, state } = restaurant;

  return (
    <article className="restaurant-card">
      <div className="restaurant-card-image">
        <MapPin size={28} />
      </div>

      <div className="restaurant-card-content">
        <h3>{restaurantName}</h3>

        <p className="restaurant-address">{address}</p>

        <p className="restaurant-location">
          {city}, {state}
        </p>

        <p className="restaurant-rating">
          <Star size={13} fill="currentColor" />
          {rating ?? "Not rated"}
        </p>

        <p className="restaurant-fee">
          FREE <span>Registration fee</span>
        </p>

        <button
          type="button"
          className="book-restaurant-button"
          onClick={() => onBook(restaurant)}
        >
          Book FREE Reservation
        </button>
      </div>
    </article>
  );
}

export default RestaurantCard;
