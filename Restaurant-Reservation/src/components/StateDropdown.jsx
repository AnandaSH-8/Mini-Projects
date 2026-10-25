import { useState } from "react";

export default function StateDropdown({
  states = [],
  value = "",
  onChange,
  loading = false,
  error = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="state" className="search-field">
      <button
        type="button"
        className="dropdown-trigger"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {value || "Select State"}
      </button>

      {isOpen && (
        <ul className="dropdown-options">
          {loading && <li>Loading states...</li>}

          {!loading && error && <li>{error}</li>}

          {!loading &&
            !error &&
            states.map((state) => (
              <li
                key={state}
                onClick={() => {
                  onChange(state);
                  setIsOpen(false);
                }}
              >
                {state}
              </li>
            ))}

          {!loading && !error && states.length === 0 && (
            <li>No states available</li>
          )}
        </ul>
      )}
    </div>
  );
}
