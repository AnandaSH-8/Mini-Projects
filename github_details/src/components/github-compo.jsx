import { useState } from "react";
import "../styles/github.css";

export function GithubCompo() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchUser = async (event) => {
    event.preventDefault();

    const trimmedUsername = username.trim();

    setUser(null);
    setError("");
    setHasSearched(true);

    if (!trimmedUsername) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(trimmedUsername)}`,
      );

      if (response.status === 404) {
        throw new Error("User not found. Please try another username.");
      }

      if (!response.ok) {
        throw new Error("Failed to fetch user. Please try again.");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message || "Failed to fetch user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-container">
      <section className="finder-card">
        <header className="finder-header">
          <h1>GitHub User Finder</h1>
          <p>Search a GitHub username to see profile details.</p>
        </header>

        <form className="search-form" onSubmit={searchUser}>
          <input
            type="text"
            name="username"
            placeholder="e.g. torvalds, gaearon, octocat"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            aria-label="GitHub username"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {loading && (
          <p className="status-message" role="status">
            Searching for user...
          </p>
        )}

        {!loading && error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && user && (
          <section className="user-profile">
            <img
              className="avatar"
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
            />

            <div className="profile-details">
              <h2>
                {user.name || user.login}{" "}
                <a
                  className="username-link"
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{user.login}
                </a>
              </h2>

              {user.bio && <p className="bio">{user.bio}</p>}

              <div className="stats">
                <span>
                  <strong>{user.public_repos}</strong> Repos
                </span>
                <span>
                  <strong>{user.followers}</strong> Followers
                </span>
                <span>
                  <strong>{user.following}</strong> Following
                </span>
              </div>

              <div className="profile-meta">
                {user.location && (
                  <span>
                    <span aria-hidden="true">📍</span> {user.location}
                  </span>
                )}

                {user.company && (
                  <span>
                    <span aria-hidden="true">🏢</span> {user.company}
                  </span>
                )}

                {user.blog && (
                  <a
                    href={
                      /^https?:\/\//i.test(user.blog)
                        ? user.blog
                        : `https://${user.blog}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    🔗 {user.blog}
                  </a>
                )}

                <a href={user.html_url} target="_blank" rel="noreferrer">
                  🔥 View on GitHub
                </a>
              </div>
            </div>
          </section>
        )}

        {!hasSearched && !user && !error && (
          <p className="status-message">
            No user yet. Try searching for 'octocat'.
          </p>
        )}
      </section>
    </main>
  );
}
