import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X, ThumbsUp, ThumbsDown, Star } from "lucide-react";

import botImage from "../assets/bot.png";
import newChatImage from "../assets/newchat.png";

import { getBotResponse } from "../services/chatService";
import "../styles/chat.css";

const QUICK_SUGGESTIONS = ["Jeans", "Smartphone", "Laptop", "T-Shirt"];
const STORAGE_KEY = "productRecommendationConversations";
const THEME_KEY = "productRecommendationTheme";

function readConversations() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function MessageContent({ message }) {
  if (Array.isArray(message.text)) {
    return (
      <div className="recommendation-list">
        {message.text.map((line, index) => {
          const match = line.match(/^(.*?),\s*Link:\s*(https?:\/\/\S+)$/);

          if (match) {
            return (
              <p key={`${line}-${index}`}>
                <a href={match[2]} target="_blank" rel="noreferrer">
                  {match[1]}
                </a>
              </p>
            );
          }

          return <p key={`${line}-${index}`}>{line}</p>;
        })}
      </div>
    );
  }

  return <p>{message.text}</p>;
}

function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "light",
  );

  const [feedbackMessageId, setFeedbackMessageId] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [overallRating, setOverallRating] = useState(0);
  const [overallFeedback, setOverallFeedback] = useState("");
  const [showConversationFeedback, setShowConversationFeedback] =
    useState(false);

  const [conversationId, setConversationId] = useState(
    () => `conversation-${Date.now()}`,
  );

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  function persistConversation(conversationMessages = messages, extra = {}) {
    if (!conversationMessages.length) return;

    const conversations = readConversations();

    const conversation = {
      id: conversationId,
      createdAt: extra.createdAt || new Date().toISOString(),
      messages: conversationMessages,
      overallRating: extra.overallRating ?? overallRating,
      feedback: extra.feedback ?? overallFeedback,
    };

    const existingIndex = conversations.findIndex(
      (item) => item.id === conversation.id,
    );

    if (existingIndex >= 0) {
      conversations[existingIndex] = conversation;
    } else {
      conversations.unshift(conversation);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const action = event.nativeEvent.submitter?.value || "ask";

    if (action === "save") {
      persistConversation();
      return;
    }

    const query = input.trim();
    if (!query) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      createdAt: new Date().toISOString(),
    };

    const response = getBotResponse(query, messages);

    const botMessage = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      type: response.type,
      text: response.text,
      product: response.product,
      budget: response.budget,
      createdAt: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage, botMessage];

    setMessages(updatedMessages);
    setInput("");
    setShowConversationFeedback(false);
    setFeedbackMessageId(null);
  }

  function handleNewSuggestion() {
    if (messages.length) {
      persistConversation();
    }

    setMessages([]);
    setInput("");
    setOverallRating(0);
    setOverallFeedback("");
    setSelectedRating(0);
    setFeedbackText("");
    setFeedbackMessageId(null);
    setFeedbackModalOpen(false);
    setShowConversationFeedback(false);
    setIsSidebarOpen(false);
    setConversationId(`conversation-${Date.now()}`);
  }

  function handleMessageRating(messageId, rating) {
    const updatedMessages = messages.map((message) =>
      message.id === messageId ? { ...message, rating } : message,
    );

    setMessages(updatedMessages);
    setSelectedRating(rating);
    setFeedbackMessageId(null);
    persistConversation(updatedMessages);
  }

  function submitAdditionalFeedback() {
    const updatedMessages = messages.map((message) =>
      message.id === feedbackMessageId
        ? { ...message, additionalFeedback: feedbackText.trim() }
        : message,
    );

    setMessages(updatedMessages);
    persistConversation(updatedMessages);
    setFeedbackModalOpen(false);
    setFeedbackText("");
    setFeedbackMessageId(null);
  }

function handleSave(event) {
  event.preventDefault();

  if (messages.length === 0) {
    return;
  }

  persistConversation(messages);
}

  function submitConversationFeedback() {
    persistConversation(messages, {
      overallRating,
      feedback: overallFeedback.trim(),
    });
    setShowConversationFeedback(false);
  }

  return (
    <div className={`app-shell theme-${theme}`}>
      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Link
          to="/"
          className="new-suggestion-link"
          onClick={handleNewSuggestion}
        >
          <img src={newChatImage} alt="" />
          <span>Want new suggestion?</span>
          <span className="new-chat-symbol" aria-hidden="true">
            ✚
          </span>
        </Link>

        <Link
          to="/history"
          className="history-link"
          onClick={() => setIsSidebarOpen(false)}
        >
          Previous Suggestions
        </Link>
      </aside>

      {isSidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="chat-main">
        <header className="app-header">
          <button
            type="button"
            className="mobile-menu-button"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsSidebarOpen((open) => !open)}
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <h1>Product Recommendation AI</h1>

          <button
            type="button"
            className="theme-toggle"
            onClick={() =>
              setTheme((current) => (current === "light" ? "dark" : "light"))
            }
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <span>{theme === "light" ? "Light" : "Dark"}</span>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </header>

        <section className="chat-content">
          {messages.length === 0 && (
            <>
              <div className="welcome-section">
                <h2>Hi, Please tell me what you want?</h2>
                <img src={botImage} alt="Product Recommendation AI bot" />
              </div>

              <div className="quick-suggestions">
                {QUICK_SUGGESTIONS.map((product) => (
                  <button
                    type="button"
                    className="suggestion-card"
                    key={product}
                    onClick={() => setInput(product)}
                  >
                    <strong>{product}</strong>
                    <span>Get immediate AI generated response</span>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="chat-messages" aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-row ${message.sender === "user" ? "user-message" : "bot-message"}`}
              >
                <div className="message-bubble">
                  <MessageContent message={message} />

                  {message.sender === "bot" && (
                    <div className="message-feedback">
                      <button
                        type="button"
                        aria-label="Rate this response positively"
                        title="Helpful"
                        onClick={() => {
                          setFeedbackMessageId(message.id);
                          setFeedbackModalOpen(false);
                        }}
                      >
                        <ThumbsUp size={16} />
                      </button>

                      <button
                        type="button"
                        aria-label="Provide additional feedback"
                        title="Not helpful"
                        onClick={() => {
                          setFeedbackMessageId(message.id);
                          setFeedbackModalOpen(true);
                        }}
                      >
                        <ThumbsDown size={16} />
                      </button>

                      {feedbackMessageId === message.id &&
                        !feedbackModalOpen && (
                          <div
                            className="star-rating"
                            aria-label="Rate response"
                          >
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                type="button"
                                key={star}
                                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                                onClick={() =>
                                  handleMessageRating(message.id, star)
                                }
                              >
                                <Star
                                  size={18}
                                  fill={
                                    star <= (message.rating || selectedRating)
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  )}

                  {message.additionalFeedback && (
                    <p className="saved-feedback">
                      Your feedback: {message.additionalFeedback}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {messages.length > 0 && !showConversationFeedback && (
            <button
              type="button"
              className="conversation-feedback-trigger"
              onClick={() => setShowConversationFeedback(true)}
            >
              Rate this conversation
            </button>
          )}

          {showConversationFeedback && (
            <section className="conversation-feedback">
              <h3>Rate this conversation</h3>
              <div className="overall-rating" aria-label="Overall rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    onClick={() => setOverallRating(star)}
                  >
                    <Star
                      size={22}
                      fill={star <= overallRating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={overallFeedback}
                onChange={(event) => setOverallFeedback(event.target.value)}
                placeholder="Share your feedback (optional)"
                aria-label="Conversation feedback"
              />
              <button type="button" onClick={submitConversationFeedback}>
                Submit feedback
              </button>
            </section>
          )}

          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Please tell me about your query!"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-label="Your product query"
            />

            <button
              type="submit"
              name="action"
              value="ask"
              className="ask-button"
            >
              Ask
            </button>

            <button type="button" className="save-button" onClick={handleSave}>
              Save
            </button>
          </form>
        </section>
      </main>

      {feedbackModalOpen && (
        <div
          className="feedback-modal-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setFeedbackModalOpen(false);
            }
          }}
        >
          <section
            className="feedback-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
          >
            <button
              type="button"
              className="feedback-modal-close"
              aria-label="Close feedback"
              onClick={() => setFeedbackModalOpen(false)}
            >
              <X size={20} />
            </button>

            <h2 id="feedback-modal-title">Provide Additional Feedback</h2>
            <textarea
              value={feedbackText}
              onChange={(event) => setFeedbackText(event.target.value)}
              placeholder="Tell us how we can improve this response..."
              aria-label="Additional feedback"
            />
            <button type="button" onClick={submitAdditionalFeedback}>
              Submit
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
