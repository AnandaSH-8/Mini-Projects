import { useCallback, useState } from "react";
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
        throw new Error("Expected an array of restaurants.");
      }

      setRestaurants(data);
    } catch (error) {
      setRestaurantsError("Unable to load restaurants. Please try again.");
      console.error("Failed to fetch restaurants:", error);
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
