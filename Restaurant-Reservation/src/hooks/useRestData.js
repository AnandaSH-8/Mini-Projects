
import { useEffect, useState } from "react";
import { fetchStates } from "../services/restaurantApi";

function normalizeNames(data, keys) {
  if (!Array.isArray(data)) return [];

  return data
    .map((item) => {
      if (typeof item === "string") return item;

      for (const key of keys) {
        if (typeof item?.[key] === "string") {
          return item[key];
        }
      }

      return "";
    })
    .filter(Boolean);
}

export default function useRestData() {
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [statesError, setStatesError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadStates() {
      setLoadingStates(true);
      setStatesError("");

      try {
        const data = await fetchStates();
        const names = normalizeNames(data, [
          "state",
          "name",
          "stateName",
        ]);

        if (active) {
          setStates(names);
        }
      } catch (error) {
        if (active) {
          setStatesError("Unable to load states. Please try again.");
          console.error("Failed to fetch states:", error);
        }
      } finally {
        if (active) setLoadingStates(false);
      }
    }

    loadStates();

    return () => {
      active = false;
    };
  }, []);

  return { states, loadingStates, statesError };
}
