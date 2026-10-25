
import { useEffect, useState } from "react";
import { fetchCities } from "../services/restaurantApi";

function normalizeCities(data) {
  if (!Array.isArray(data)) return [];

  return data
    .map((item) => {
      if (typeof item === "string") return item;

      return item?.city ?? item?.name ?? item?.cityName ?? "";
    })
    .filter(Boolean);
}

export default function useCities(state) {
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [citiesError, setCitiesError] = useState("");

  useEffect(() => {
    let active = true;

    function initialize() {
      if (!state) {
        setCities([]);
        setLoadingCities(false);
        setCitiesError("");
        return undefined;
      }
    }

    async function loadCities() {
      setLoadingCities(true);
      setCities([]);
      setCitiesError("");

      try {
        const data = await fetchCities(state);
        const names = normalizeCities(data);

        if (active) setCities(names);
      } catch (error) {
        if (active) {
          setCitiesError("Unable to load cities. Please try again.");
          console.error(`Failed to fetch cities for ${state}:`, error);
        }
      } finally {
        if (active) setLoadingCities(false);
      }
    }

    initialize()
    loadCities();

    return () => {
      active = false;
    };
  }, [state]);

  return { cities, loadingCities, citiesError };
}
