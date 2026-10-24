import { useEffect, useState } from "react";
import { fetchStates } from "../services/restaurantApi";

export default function useRestData() {
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [statesError, setStatesError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadStates() {
      try {
        setLoadingStates(true);
        setStatesError("");

        const data = await fetchStates();

        if (active) {
          setStates(Array.isArray(data) ? data : []);
        }
      } catch {
        if (active) {
          setStatesError("Unable to load states. Please try again.");
        }
      } finally {
        if (active) {
          setLoadingStates(false);
        }
      }
    }

    loadStates();

    return () => {
      active = false;
    };
  }, []);

  return { states, loadingStates, statesError };
}
