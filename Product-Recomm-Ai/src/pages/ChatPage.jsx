import { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";

// import botImage from "../assets/bot.png";
// import newChatImage from "../assets/newchat.png";

import "../styles/chat.css";

const QUICK_SUGGESTIONS = ["Jeans", "Smartphone", "Laptop", "T-Shirt"];

function ChatPage() {
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  function handleNewSuggestion() {
    setInput("");
    setIsSidebarOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!input.trim()) return;

    // Conversation logic will be connected in a later step.
    console.log("User query:", input.trim());
  }

  function handleSave(event) {
    event.preventDefault();

    // LocalStorage persistence will be implemented in a later step.
  }

  return (
    <div className={`app-shell theme-${theme}`}>
      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Link
          to="/"
          className="new-suggestion-link"
          onClick={handleNewSuggestion}
        >
          {/* <img src={newChatImage} alt="" /> */}
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
          <div className="welcome-section">
            <h2>Hi, Please tell me what you want?</h2>
            {/* <img src={botImage} alt="Product Recommendation AI bot" /> */}
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

          <div className="chat-messages" aria-live="polite" />

          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Please tell me about your query!"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-label="Your product query"
            />

            <button type="submit" className="ask-button">
              Ask
            </button>

            <button type="submit" className="save-button" onClick={handleSave}>
              Save
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default ChatPage;
