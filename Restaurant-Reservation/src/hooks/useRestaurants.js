import { useState, useCallback } from "react";
import { fetchRestaurants } from "../services/restaurantApi";

export default function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [restaurantsError, setRestaurantsError] = useState("");

  const searchRestaurants = useCallback(async (state, city) => {
    setLoadingRestaurants(true);
    setRestaurantsError("");
    setRestaurants([]);

    try {
      const data = await fetchRestaurants(state, city);

      if (!Array.isArray(data)) {
        throw new Error("Unexpected restaurant response.");
      }

      setRestaurants(data);
    } catch {
      setRestaurantsError("Unable to load restaurants. Please try again.");
    } finally {
      setLoadingRestaurants(false);
    }
  }, []);

  return {
    restaurants,
    loadingRestaurants,
    restaurantsError,
    searchRestaurants,
  };
}
