import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Star, MessageSquare } from "lucide-react";

import "../styles/history.css";

const STORAGE_KEY = "productRecommendationConversations";

function readConversations() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function HistoryPage() {
  const [conversations] = useState(readConversations);
  const [ratingFilter, setRatingFilter] = useState("all");

  const filteredConversations = useMemo(() => {
    if (ratingFilter === "all") return conversations;

    return conversations.filter(
      (conversation) =>
        String(conversation.overallRating ?? conversation.rating ?? "") ===
        ratingFilter,
    );
  }, [conversations, ratingFilter]);

  function formatDate(dateValue) {
    if (!dateValue) return "Date unavailable";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <div className="history-page">
      <header className="history-header">
        <Link to="/" className="history-back-link">
          <ArrowLeft size={18} />
          Back to chat
        </Link>

        <h1>Product Recommendation AI</h1>
      </header>

      <main className="history-content">
        <h2>Previous Suggestions</h2>

        <div className="history-filter">
          <label htmlFor="rating-filter">Filter by rating</label>

          <select
            id="rating-filter"
            value={ratingFilter}
            onChange={(event) => setRatingFilter(event.target.value)}
          >
            <option value="all">All Ratings</option>
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={String(rating)}>
                {rating} {rating === 1 ? "Star" : "Stars"}
              </option>
            ))}
          </select>
        </div>

        {filteredConversations.length === 0 ? (
          <div className="history-empty">
            <MessageSquare size={36} />
            <h3>No previous suggestions found</h3>
            <p>Saved conversations will appear here after you save them.</p>
            {ratingFilter !== "all" && (
              <button type="button" onClick={() => setRatingFilter("all")}>
                Clear rating filter
              </button>
            )}
          </div>
        ) : (
          <div className="history-list">
            {filteredConversations.map((conversation, index) => {
              const messages = Array.isArray(conversation.messages)
                ? conversation.messages
                : [];

              const rating = conversation.overallRating ?? conversation.rating;

              return (
                <article
                  className="history-card"
                  key={conversation.id ?? index}
                >
                  <div className="history-card-header">
                    <div>
                      <h3>
                        {conversation.title ||
                          messages.find((message) => message.sender === "user")
                            ?.text ||
                          messages.find((message) => message.role === "user")
                            ?.content ||
                          `Conversation ${index + 1}`}
                      </h3>

                      <p className="history-date">
                        <CalendarDays size={15} />
                        {formatDate(
                          conversation.updatedAt ??
                            conversation.createdAt ??
                            conversation.timestamp,
                        )}
                      </p>
                    </div>

                    {rating != null && (
                      <span className="history-rating">
                        <Star size={16} fill="currentColor" />
                        {rating}/5
                      </span>
                    )}
                  </div>

                  <div className="history-messages">
                    {messages.map((message, messageIndex) => {
                      const isUser =
                        message.sender === "user" || message.role === "user";

                      const content =
                        message.text ??
                        message.content ??
                        message.message ??
                        "";

                      return (
                        <div
                          className={`history-message ${
                            isUser ? "history-user" : "history-assistant"
                          }`}
                          key={message.id ?? messageIndex}
                        >
                          <strong>
                            {isUser ? "You" : "Product Recommendation AI"}
                          </strong>
                          <p>{content}</p>
                        </div>
                      );
                    })}
                  </div>

                  {conversation.feedback && (
                    <div className="history-feedback">
                      <strong>Feedback</strong>
                      <p>{conversation.feedback}</p>
                    </div>
                  )}

                  {conversation.subjectiveFeedback && (
                    <div className="history-feedback">
                      <strong>Your feedback</strong>
                      <p>{conversation.subjectiveFeedback}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default HistoryPage;
