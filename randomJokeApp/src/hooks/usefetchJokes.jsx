import { useState } from "react";

const API_URL = "https://official-joke-api.appspot.com/random_joke";

export function useFetchJokes() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJoke = async () => {
    setJoke(null);
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not fetch a joke. Try again.");
      }

      const data = await response.json();

      if (!data.setup || !data.punchline) {
        throw new Error("Could not fetch a joke. Try again.");
      }

      setJoke(data);
    } catch {
      setError("Could not fetch a joke. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { joke, loading, error, fetchJoke };
}
