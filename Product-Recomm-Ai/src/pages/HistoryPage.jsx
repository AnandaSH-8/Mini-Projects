import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MessageSquare } from "lucide-react";

import "../styles/history.css";

const STORAGE_KEY = "productRecommendationConversations";

function readConversations() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getMessageText(message) {
  if (Array.isArray(message.text)) {
    return message.text.join("\n");
  }

  return message.text ?? message.content ?? message.message ?? "";
}

function HistoryPage() {
  const [conversations, setConversations] = useState(readConversations);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [theme] = useState(
    () => localStorage.getItem("productRecommendationTheme") || "light",
  );

  function refreshHistory() {
    setConversations(readConversations());
  }

  const filteredConversations = conversations.filter((conversation) => {
    if (ratingFilter === "all") return true;

    return (
      String(conversation.overallRating ?? conversation.rating ?? "") ===
      ratingFilter
    );
  });

  return (
    <div className={`app-shell theme-${theme}`}>
      <div className="history-page">
        <header className="history-header">
          <Link to="/" className="history-back-link">
            <ArrowLeft size={20} />
            <span>Back to Chat</span>
          </Link>

          <h1>Previous Suggestions</h1>

          <label className="rating-filter">
            <span>Filter by rating</span>
            <select
              value={ratingFilter}
              onChange={(event) => setRatingFilter(event.target.value)}
            >
              <option value="all">All Ratings</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={String(rating)}>
                  {rating} Star{rating > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </label>
        </header>

        <main className="history-content">
          <button
            type="button"
            className="history-refresh-button"
            onClick={refreshHistory}
          >
            Refresh history
          </button>

          {filteredConversations.length === 0 ? (
            <section className="history-empty-state">
              <MessageSquare size={44} />
              <h2>No previous suggestions yet</h2>
              <p>Start a conversation, then select Save to see it here.</p>
              <Link to="/">Start a conversation</Link>
            </section>
          ) : (
            <div className="history-list">
              {filteredConversations.map((conversation) => {
                const rating =
                  conversation.overallRating ?? conversation.rating ?? 0;

                return (
                  <article className="history-card" key={conversation.id}>
                    <div className="history-card-header">
                      <div>
                        <h2>Product suggestions</h2>
                        <p className="history-date">
                          {conversation.createdAt
                            ? new Date(conversation.createdAt).toLocaleString()
                            : "Date unavailable"}
                        </p>
                      </div>

                      {rating > 0 && (
                        <div
                          className="history-rating"
                          aria-label={`${rating} out of 5 stars`}
                        >
                          <Star size={17} fill="currentColor" />
                          <span>{rating}/5</span>
                        </div>
                      )}
                    </div>

                    <div className="history-messages">
                      {(conversation.messages ?? []).map((message, index) => (
                        <div
                          className={`history-message ${
                            message.sender === "user" || message.role === "user"
                              ? "history-user-message"
                              : "history-bot-message"
                          }`}
                          key={message.id ?? `${conversation.id}-${index}`}
                        >
                          <strong>
                            {message.sender === "user" ||
                            message.role === "user"
                              ? "You"
                              : "AI"}
                          </strong>

                          <p>{getMessageText(message)}</p>

                          {message.rating > 0 && (
                            <div className="history-message-rating">
                              {Array.from(
                                { length: message.rating },
                                (_, starIndex) => (
                                  <Star
                                    key={starIndex}
                                    size={13}
                                    fill="currentColor"
                                  />
                                ),
                              )}
                            </div>
                          )}

                          {message.additionalFeedback && (
                            <p className="history-feedback">
                              Feedback: {message.additionalFeedback}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {conversation.feedback && (
                      <div className="history-overall-feedback">
                        <strong>Conversation feedback</strong>
                        <p>{conversation.feedback}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </main>

        <footer className="history-footer">
          <Link to="/">Want new suggestion?</Link>
        </footer>
      </div>
    </div>
  );
}

export default HistoryPage;
