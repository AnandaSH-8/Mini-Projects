import { useFetchJokes } from "../hooks/usefetchJokes";
import "../styles/jokeCard.css";

export function JokeCard() {
  const { joke, loading, error, fetchJoke } = useFetchJokes();

  return (
    <main className="container">
      <section className="joke-card">
        <h1>Random Joke</h1>

        <p className="subtitle">Click the button to fetch a fresh one.</p>

        <button onClick={fetchJoke} disabled={loading} className="fetch-button">
          {loading ? "Fetching..." : "Fetch joke"}
        </button>

        <div className="result" aria-live="polite">
          {loading ? (
            <p className="status-message">Fetching a joke...</p>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>

              <button className="retry-button" onClick={fetchJoke}>
                Try again
              </button>
            </div>
          ) : joke ? (
            <div className="joke-content">
              <p className="setup">{joke.setup}</p>
              <p className="punchline">{joke.punchline}</p>
            </div>
          ) : (
            <p className="status-message">No joke yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
