import { useEffect, useState } from "react";
import { fetchCities } from "../services/restaurantApi";

export default function useCities(selectedState) {
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [citiesError, setCitiesError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCities() {
      try {
        setCities([]);
        setCitiesError("");

        if (!selectedState) {
          setLoadingCities(false);
          return;
        }

        setLoadingCities(true);

        const data = await fetchCities(selectedState);

        if (active) {
          setCities(Array.isArray(data) ? data : []);
        }
      } catch {
        if (active) {
          setCitiesError("Unable to load cities. Please try again.");
        }
      } finally {
        if (active) {
          setLoadingCities(false);
        }
      }
    }

    loadCities();

    return () => {
      active = false;
    };
  }, [selectedState]);

  return { cities, loadingCities, citiesError };
}
